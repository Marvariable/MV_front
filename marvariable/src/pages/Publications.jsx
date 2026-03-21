import { useEffect, useState } from "react";
import "./Publications.css";

function Publications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPublications() {
      try {
        const response = await fetch("http://localhost:8080/api/publications");

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Datos del backend:", data);
        setPublications(data);
      } catch (err) {
        console.error("Error real al cargar publicaciones:", err);
        setError("No se pudieron cargar las publicaciones");
      } finally {
        setLoading(false);
      }
    }

    loadPublications();
  }, []);

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="publications-container">
      {publications.length === 0 ? (
        <p>No hay publicaciones todavía.</p>
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
                <h1 className="publication-title">{publication.title}</h1>

                <p className="publication-description">
                  <strong>Descripción:</strong> {publication.description}
                </p>

                <p className="publication-category">
                 <strong>Categoría:</strong>{publication.category}
                </p>

                <p className="publication-date">
                  <strong>Fecha de publicación :</strong>{publication.publication.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Publications;