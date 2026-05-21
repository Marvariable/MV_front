import { useEffect, useState } from "react";
import { motion } from "motion/react";
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-neutral-500 tracking-widest text-sm">Cargando...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <section className="publications-container theory-section">
      <h1 className="theater-title">I &nbsp; S &nbsp; I &nbsp; D &nbsp; R &nbsp; O &nbsp; &nbsp; L &nbsp; U &nbsp; N &nbsp; A</h1>

      {publications.length === 0 ? (
        <p className="text-neutral-500 text-sm tracking-wide">
          No hay publicaciones de teatro todavía.
        </p>
      ) : (
        <div className="flex flex-col gap-8 w-full">
          {publications.map((publication, index) => (
            <motion.article
              key={publication.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex gap-0 overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm"
            >
              <img
                src={publication.imageUrl ? (publication.imageUrl.startsWith("http") ? publication.imageUrl : `http://localhost:8080${publication.imageUrl}`) : ""}
                alt={publication.title}
                className="w-44 self-stretch object-cover flex-shrink-0"
              />

              <div className="flex flex-col justify-between p-6 flex-1">
                <div>
                  <h2 className="inline-block bg-neutral-900 text-white text-lg font-medium px-3 py-1 mb-4 tracking-wide">
                    {publication.title}
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed text-justify" style={{ whiteSpace: "pre-line" }}>
                    <span className="font-semibold text-neutral-800">Fragmento: </span>
                    {publication.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-4 flex-wrap">
                  <span className="inline-block bg-[#7b1e2b]/10 text-[#7b1e2b] border-l-[3px] border-[#7b1e2b] px-3 py-1 text-xs tracking-wide">
                    <span className="font-semibold">Publicado: </span>
                    {publication.publicationDate}
                  </span>
                  {publication.fileUrl && (
                    <a
                      href={publication.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#7b1e2b] text-white text-xs font-semibold px-4 py-1.5 tracking-wide hover:bg-[#651823] transition"
                    >
                      Leer texto completo →
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
