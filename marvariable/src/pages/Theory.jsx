import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import "./Theory.css";
import banner80 from "../assets/banner80.jpg";

export default function Theory() {
  const [publications, setPublications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filtered = publications.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (publications.length > 0 && window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        const delay = publications.length * 140 + 700;
        setTimeout(() => el.scrollIntoView({ behavior: "instant", block: "center" }), delay);
      }
    }
  }, [publications]);

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
    <section className="publications-container theory-section" style={{ backgroundImage: `linear-gradient(rgba(10,6,4,0.55), rgba(10,6,4,0.55)), url(${banner80})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <motion.header
        className="theory-header"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="theory-page-title">
          <span className="theory-page-main">C A R L O S &nbsp; R O J A S</span>
          <span className="theory-page-sub">Teoría</span>
        </h1>
        <div className="theory-page-rule" />
        <div style={{ position: "relative", marginTop: "20px", width: "280px" }}>
          <MagnifyingGlassIcon style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "14px", height: "14px", color: "#C9A84C", pointerEvents: "none" }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar publicación..."
            style={{
              width: "100%",
              padding: "10px 18px 10px 36px",
              background: "rgba(10,6,4,0.7)",
              border: "1px solid #C9A84C",
              color: "#f0ece8",
              fontSize: "12px",
              letterSpacing: "0.05em",
              outline: "none",
              boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
              boxSizing: "border-box",
            }}
          />
        </div>
      </motion.header>

      {publications.length === 0 ? (
        <p className="text-neutral-500 text-sm tracking-wide">
          No hay publicaciones de teoría todavía.
        </p>
      ) : (
        <>
        {filtered.length === 0 && (
          <div style={{ background: "rgba(10,6,4,0.75)", border: "1px solid rgba(201,168,76,0.4)", padding: "20px 24px", marginTop: "16px" }}>
            <p style={{ color: "#e8d498", fontSize: "13px", letterSpacing: "0.2em", margin: 0 }}>
              No se encontraron publicaciones.
            </p>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
          {filtered.map((publication, index) => (
            <motion.article
              key={publication.id}
              id={`publication-${publication.id}`}
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
                  src={publication.imageUrl ? (publication.imageUrl.startsWith("http") ? publication.imageUrl : `http://localhost:8080${publication.imageUrl}`) : ""}
                  alt={publication.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: publication.imagePosition || "center", display: "block", transition: "transform 0.6s ease" }}
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
                    {publication.title}
                  </h2>
                  {publication.description && (
                    <p style={{ fontSize: "13px", color: "#5a4e44", lineHeight: 1.95, whiteSpace: "pre-line", borderLeft: "2px solid #C9A84C", paddingLeft: "16px" }}>
                      {publication.description}
                    </p>
                  )}
                  {publication.cita && (
                    <blockquote style={{ margin: "16px 0 0", padding: "14px 18px", background: "rgba(123,30,43,0.06)", borderLeft: "3px solid #7b1e2b", fontStyle: "italic", fontSize: "13px", color: "#3a2e28", lineHeight: 1.9 }}>
                      <span style={{ fontSize: "22px", color: "#7b1e2b", lineHeight: 0, verticalAlign: "-6px", marginRight: "4px" }}>"</span>
                      {publication.cita}
                      <span style={{ fontSize: "22px", color: "#7b1e2b", lineHeight: 0, verticalAlign: "-6px", marginLeft: "4px" }}>"</span>
                    </blockquote>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "18px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#7b5a1a" }}>
                    {new Date(publication.publicationDate).toLocaleDateString("es-ES", { year: "numeric", month: "long" })}
                  </span>
                  {publication.fileUrl && (
                    <a
                      href={publication.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", textDecoration: "none", background: "#7b1e2b", padding: "7px 16px", transition: "background 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#651823"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#7b1e2b"; }}
                    >
                      Leer texto completo →
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        </>
      )}
    </section>
  );
}
