import { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./Publications.css";
import banner80 from "../assets/banner80.jpg";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch("http://localhost:8080/api/books");
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError("No se pudieron cargar los libros");
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  if (loading)
    return (
      <div className="pub-loading" style={{ backgroundImage: `linear-gradient(rgba(10,6,4,0.55), rgba(10,6,4,0.55)), url(${banner80})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <p className="pub-loading-text">Cargando</p>
      </div>
    );

  if (error)
    return (
      <div className="pub-loading" style={{ backgroundImage: `linear-gradient(rgba(10,6,4,0.55), rgba(10,6,4,0.55)), url(${banner80})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <p style={{ color: "#e8d498", letterSpacing: "0.2em", fontSize: "12px" }}>{error}</p>
      </div>
    );

  return (
    <section className="pub-page" style={{ backgroundImage: `linear-gradient(rgba(10,6,4,0.55), rgba(10,6,4,0.55)), url(${banner80})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>

      <motion.header
        className="pub-header"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="books-page-title">
          <span className="books-page-main">L I B R O S</span>
          <span className="books-page-sub">Publicados</span>
        </h1>
        <div className="books-page-rule" />
      </motion.header>

      {books.length === 0 ? (
        <p className="pub-empty">No hay libros publicados todavía.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", padding: "0 48px 80px" }}>
          {books.map((book, index) => (
            <motion.article
              key={book.id}
              id={`book-${book.id}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.14 }}
              whileHover={{ y: -3, transition: { duration: 0.25 } }}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                background: "#f5f0e8",
                boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
                overflow: "hidden",
                borderTop: "3px solid #7b1e2b",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", overflow: "hidden", minHeight: "260px" }}>
                <img
                  src={book.imageUrl || ""}
                  alt={book.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: book.imagePosition || "center", display: "block", transition: "transform 0.6s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(245,240,232,0.3), transparent)" }} />
              </div>

              {/* Content */}
              <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "20px", background: "linear-gradient(to left, #fdfaf4, #f5f0e8)" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: "#7b1e2b", letterSpacing: "0.5em", fontWeight: 400 }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #C9A84C, transparent)" }} />
                  </div>

                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(15px, 1.6vw, 20px)", fontWeight: 400, color: "#1a1410", letterSpacing: "0.06em", marginBottom: "18px", lineHeight: 1.4 }}>
                    {book.title}
                  </h2>

                  {book.description && (
                    <p style={{ fontSize: "13px", color: "#5a4e44", lineHeight: 1.95, whiteSpace: "pre-line", borderLeft: "2px solid #C9A84C", paddingLeft: "16px", marginBottom: book.cita ? "16px" : 0 }}>
                      {book.description}
                    </p>
                  )}

                  {book.cita && (
                    <blockquote style={{ margin: "0", padding: "14px 18px", background: "rgba(123,30,43,0.06)", borderLeft: "3px solid #7b1e2b", fontStyle: "italic", fontSize: "13px", color: "#3a2e28", lineHeight: 1.9 }}>
                      <span style={{ fontSize: "22px", color: "#7b1e2b", lineHeight: 0, verticalAlign: "-6px", marginRight: "4px" }}>"</span>
                      {book.cita}
                      <span style={{ fontSize: "22px", color: "#7b1e2b", lineHeight: 0, verticalAlign: "-6px", marginLeft: "4px" }}>"</span>
                    </blockquote>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "18px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7b5a1a" }}>
                    {new Date(book.publicationDate).toLocaleDateString("es-ES", { year: "numeric", month: "long" })}
                  </span>
                  {book.link && (
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", textDecoration: "none", background: "#7b1e2b", padding: "7px 16px", transition: "background 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#651823"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#7b1e2b"; }}
                    >
                      Ver libro →
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
