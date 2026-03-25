import "./AboutAuthor.css";
import autora from "../assets/autor.png";

export default function AboutAuthor() {
  return (
    <section className="author-cinema-page">
      {/* Fondo negro inicial */}
      <div className="author-cinema-intro"></div>

      {/* Nombre grande inicial */}
      <h1 className="author-cinema-main-name">CARLOS ROJAS</h1>

      {/* Layout final */}
      <div className="author-cinema-layout">
        {/* Texto */}
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
            <span className="author-cinema-quote-mark">“</span>
            <p>
              La escritura no solo construye sentido: también inventa una forma
              de mirar.
            </p>
          </div>
        </div>

        {/* Foto */}
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