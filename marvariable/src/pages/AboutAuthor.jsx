import { useEffect, useState } from "react";
import "./AboutAuthor.css";
import autora from "../assets/autor.png";

export default function AboutAuthor() {
  const [cvUrl, setCvUrl] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/settings/cv")
      .then(r => r.json())
      .then(data => { if (data.cvUrl) setCvUrl(data.cvUrl); })
      .catch(() => {});
  }, []);

  return (
    <section className="author-cinema-page">
      <div className="author-cinema-intro"></div>

      <h1 className="author-cinema-main-name">CARLOS ROJAS</h1>

      <div className="author-cinema-layout">
        <div className="author-cinema-text">
          <p className="author-cinema-tag">Sobre el autor</p>

          <h2 className="author-cinema-title">
            Escritura, pensamiento y sensibilidad artística
          </h2>

          <div className="author-cinema-line"></div>

          <p className="author-cinema-bio">
            Doctor en Estudios Culturales Latinoamericanos por la Universidad Andina Simón Bolívar (2012), Máster en Desarrollo Económico para América Latina por la Universidad Internacional de Andalucía (1998), Doctor en Medicina (1978) y Licenciado en Humanidades Modernas (1976).

            Fue profesor en las universidades de Cuenca y del Azuay, en las áreas de filosofía, epistemología y estética. Ha desarrollado una amplia trayectoria como crítico de arte y curador de exposiciones nacionales e internacionales, además de ser miembro activo de la Asociación Internacional de Críticos de Arte (AICA, sección ecuatoriana).

            Su trabajo combina la reflexión filosófica con la crítica cultural, abordando especialmente la ontología, la estética y el arte contemporáneo.
          </p>

          <div className="author-cinema-quote">
            <span className="author-cinema-quote-mark">&ldquo;</span>
            <p>
              La escritura no solo construye sentido: también inventa una forma
              de mirar.
            </p>
          </div>

          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="author-cv-link"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              Curriculum Vitae
            </a>
          )}
        </div>

        <div className="author-cinema-image-wrapper">
          <img
            src={autora}
            alt="Carlos Rojas"
            className="author-cinema-image"
          />
        </div>
      </div>
    </section>
  );
}
