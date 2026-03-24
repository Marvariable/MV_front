import { useEffect, useState } from "react";
import "./Publications.css";

export default function Narrative() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNarrativePublications() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/publications/section/NARRATIVA"
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Narrativa desde backend:", data);
        setPublications(data);
      } catch (err) {
        console.error("Error al cargar narrativa:", err);
        setError("No se pudieron cargar los textos de narrativa");
      } finally {
        setLoading(false);
      }
    }

    loadNarrativePublications();
  }, []);

  if (loading) return <p>Cargando textos de narrativa...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="publications-container">
      <h1 className="publication-title">Narrativa</h1>

      {publications.length === 0 ? (
        <p>No hay publicaciones de narrativa todavía.</p>
      ) : (
        <div className="publications-list">
          {publications.map((publication) => (
            <article key={publication.id} className="publication-card">
              <img
                src={`http://localhost:8080${publication.imageUrl}`}
                alt={publication.title}
                className="publication-image"
              />
              <div className="publication-content">
                <h2 className="publication-title">{publication.title}</h2>

                <p className="publication-description">
                  <strong>Descripción:</strong> {publication.description}
                </p>

                <p className="publication-date">
                  <strong>Fecha de publicación:</strong>{" "}
                  {publication.publicationDate}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}