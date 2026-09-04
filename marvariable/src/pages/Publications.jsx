import { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./Publications.css";
import { sortByDateDesc } from "../utils/sort";
import { API_BASE_URL } from "../config/api";

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPublishedWorks() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/publications/section/OBRAS_PUBLICADAS`
        );
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        setPublications(sortByDateDesc(data));
      } catch (err) {
        setError("No se pudieron cargar las obras publicadas");
      } finally {
        setLoading(false);
      }
    }
    loadPublishedWorks();
  }, []);

  if (loading)
    return (
      <div className="pub-loading">
        <p className="pub-loading-text">Cargando</p>
      </div>
    );

  if (error)
    return (
      <div className="pub-loading">
        <p style={{ color: "#7b1e2b", letterSpacing: "0.2em", fontSize: "12px" }}>{error}</p>
      </div>
    );

  return (
    <div className="pub-page">

      <motion.header
        className="pub-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="pub-header-inner">
          <div className="pub-header-line" />
          <div className="pub-header-text">
            <span className="pub-header-eyebrow">Obras</span>
            <h1 className="pub-header-title">Publicadas</h1>
          </div>
        </div>
      </motion.header>

      {publications.length === 0 ? (
        <p className="pub-empty">No hay obras publicadas todavía.</p>
      ) : (
        <div className="pub-list">
          {publications.map((publication, index) => (
            <motion.article
              key={publication.id}
              className="pub-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            >
              <div className="pub-card-bg-wrapper">
                <img
                  src={
                    publication.imageUrl
                      ? publication.imageUrl.startsWith("http")
                        ? publication.imageUrl
                        : `${API_BASE_URL}${publication.imageUrl}`
                      : ""
                  }
                  alt={publication.title}
                  className="pub-card-bg-img"
                />
                <div className="pub-card-bg-gradient" />
              </div>

              <div className="pub-card-accent" />

              <div className="pub-card-body">
                <span className="pub-card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="pub-card-main">
                  <h2 className="pub-card-title">{publication.title}</h2>
                  <p className="pub-card-excerpt" style={{ whiteSpace: "pre-line" }}>
                    {publication.description}
                  </p>
                </div>

                <div className="pub-card-meta">
                  <span className="pub-card-date">
                    {new Date(publication.publicationDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                  {publication.fileUrl && (
                    <a
                      href={publication.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pub-card-link"
                    >
                      Leer completo →
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
