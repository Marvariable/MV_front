import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./Rhumor.css";
import { getVisualArts } from "../services/VisualArtsService";

export default function Rhumor() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getVisualArts();
        setImages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const close = useCallback(() => setSelectedIndex(null), []);
  const prev = useCallback(() => setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1)), [images.length]);
  const next = useCallback(() => setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1)), [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    function handleKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, close, prev, next]);

  return (
    <div className="rhumor-page">

      <header className="rhumor-header">
<h1 className="rhumor-title">
          <span className="rhumor-title-main">R H U M O R</span>
          <span className="rhumor-title-sub">Artes Visuales</span>
        </h1>
        <div className="rhumor-title-rule" />
      </header>

      {loading ? (
        <p className="rhumor-loading">Cargando colección...</p>
      ) : images.length === 0 ? (
        <p className="rhumor-loading">Sin obras disponibles.</p>
      ) : (
        <div className="rhumor-masonry">
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              className="rhumor-artwork"
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: index * 0.07, ease: "easeOut" }}
              whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="rhumor-frame">
                <div className="rhumor-mat">
                  <img
                    src={image.imageUrl?.startsWith("http") ? image.imageUrl : `http://localhost:8080${image.imageUrl}`}
                    alt={image.nombre}
                    className="rhumor-artwork-img"
                  />
                </div>
                <div className="rhumor-frame-glow" />
                <div className="rhumor-zoom-hint">＋</div>
              </div>
              <div className="rhumor-artwork-info">
                <p className="rhumor-artwork-label">{image.nombre}</p>
                {image.publicationDate && (
                  <p className="rhumor-artwork-year">
                    {new Date(image.publicationDate).getFullYear()}
                  </p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="rhumor-lb-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <button
              className="rhumor-lb-nav rhumor-lb-prev"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Anterior"
            >
              ‹
            </button>

            <motion.div
              className="rhumor-lb-content"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rhumor-lb-frame">
                <img
                  src={images[selectedIndex].imageUrl?.startsWith("http") ? images[selectedIndex].imageUrl : `http://localhost:8080${images[selectedIndex].imageUrl}`}
                  alt={images[selectedIndex].nombre}
                  className="rhumor-lb-img"
                />
              </div>
              <div className="rhumor-lb-footer">
                <span className="rhumor-lb-title">{images[selectedIndex].nombre}</span>
                <span className="rhumor-lb-counter">
                  {selectedIndex + 1} / {images.length}
                </span>
                <button className="rhumor-lb-close" onClick={close}>✕ Cerrar</button>
              </div>
            </motion.div>

            <button
              className="rhumor-lb-nav rhumor-lb-next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Siguiente"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
