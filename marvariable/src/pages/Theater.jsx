import { useEffect, useState } from "react";
import "./Theater.css";

export default function Theater() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTheaterPublications() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/publications/section/TEATRO"
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Teatro desde backend:", data);
        setPublications(data);
      } catch (err) {
        console.error("Error al cargar teatro:", err);
        setError("No se pudieron cargar los textos de teatro");
      } finally {
        setLoading(false);
      }
    }

    loadTheaterPublications();
  }, []);

  if (loading) return <p>Cargando textos de teatro...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="publications-container">
     <h1 className="theater-title"> I   S   I   D     R      O    L   U   N   A </h1>

      {publications.length === 0 ? (
        <p>No hay publicaciones de teatro todavía.</p>
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