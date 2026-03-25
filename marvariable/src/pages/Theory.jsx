import { useEffect, useState } from "react";
import "./Theory.css";

export default function Theory() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTheoryPublications() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/publications/section/TEORIA"
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Teoría desde backend:", data);
        setPublications(data);
      } catch (err) {
        console.error("Error al cargar teoría:", err);
        setError("No se pudieron cargar los textos de teoría");
      } finally {
        setLoading(false);
      }
    }

    loadTheoryPublications();
  }, []);

  if (loading) return <p>Cargando textos de teoría...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="publications-container">
         <h1 className="theory-title"> C A R L O S R O J A S  </h1>


      {publications.length === 0 ? (
        <p>No hay publicaciones de teoría todavía.</p>
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
                  <strong>Fragmento:</strong> {publication.description}
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