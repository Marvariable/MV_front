import { useEffect, useState } from "react";
import "./Publications.css";

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPublishedWorks() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/publications/section/OBRAS_PUBLICADAS"
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Obras publicadas desde backend:", data);
        setPublications(data);
      } catch (err) {
        console.error("Error al cargar obras publicadas:", err);
        setError("No se pudieron cargar las obras publicadas");
      } finally {
        setLoading(false);
      }
    }

    loadPublishedWorks();
  }, []);

  if (loading) return <p>Cargando obras publicadas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="publications-container">
       <h1 className="narrative-title"> C A R L O S R O J A S    / L  I Z L U I S Q U I R O G A / I   S   I   D     R      O    L   U   N   A / R  H  U M O R  </h1>

    
      {publications.length === 0 ? (
        <p>No hay obras publicadas todavía.</p>
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