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
            Carlos Rojas desarrolla una obra atravesada por la reflexión, la
            escena, la escritura y la imagen. Su trabajo se sitúa en un espacio
            donde la sensibilidad estética y el pensamiento crítico dialogan de
            manera constante.
          </p>

          <p className="author-cinema-bio">
            Esta sección puede presentar su trayectoria, sus intereses
            creativos, su universo literario y la relación entre sus textos y
            las distintas áreas del proyecto: teoría, narrativa, teatro y obra
            publicada.
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