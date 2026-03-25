import { useState } from "react";
import "./Rhumor.css";
import mural from "../assets/mural.jpg";

export default function Rhumor() {
  const images = [
    { id: 1, src: mural, title: "0.1" },
    { id: 2, src: mural, title: "0.2" },
    { id: 3, src: mural, title: "0.3" },
    { id: 4, src: mural, title: "0.4" },
    { id: 5, src: mural, title: "0.5" },
    { id: 6, src: mural, title: "0.1" },
    { id: 7, src: mural, title: "0.2" },
    { id: 8, src: mural, title: "0.3" },
    { id: 9, src: mural, title: "0.4" },
    { id: 10, src: mural, title: "0.5" },



  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  function openImage(index) {
    setSelectedIndex(index);
  }

  function closeImage() {
    setSelectedIndex(null);
  }

  function showPrev() {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }

  function showNext() {
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }

  function handleOverlayClick(event) {
    if (event.target.classList.contains("rhumor-overlay")) {
      closeImage();
    }
  }

  return (
    <section className="rhumor-page">
      <div className="rhumor-header">
        <h1 className="rhumor-title">R  H U M O R</h1>

      </div>

      <div className="rhumor-gallery">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className="rhumor-card"
            onClick={() => openImage(index)}
          >
            <span className="rhumor-card-label">{image.title}</span>
            <img
              src={image.src}
              alt={`Obra ${image.title}`}
              className="rhumor-thumb"
            />
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="rhumor-overlay" onClick={handleOverlayClick}>
          <button
            type="button"
            className="rhumor-close"
            onClick={closeImage}
            aria-label="Cerrar imagen"
          >
            ×
          </button>

          <button
            type="button"
            className="rhumor-nav rhumor-nav-left"
            onClick={showPrev}
            aria-label="Imagen anterior"
          >
            ‹
          </button>

          <div className="rhumor-lightbox-frame">
            <img
              src={images[selectedIndex].src}
              alt={`Obra ampliada ${images[selectedIndex].title}`}
              className="rhumor-lightbox-image"
            />
          </div>

          <button
            type="button"
            className="rhumor-nav rhumor-nav-right"
            onClick={showNext}
            aria-label="Imagen siguiente"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}