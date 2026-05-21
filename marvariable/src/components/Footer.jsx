import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top-rule" />

      <div className="footer-body">

        <div className="footer-left">
          <p className="footer-label">Contacto</p>
          <div className="footer-location">
            <span className="footer-city">Quito</span>
            <span className="footer-country">Ecuador</span>
          </div>
          <a href="mailto:marvariable@gmail.com" className="footer-email">
            marvariable@gmail.com
          </a>
          <Link to="/contact" className="footer-contact-btn">
            Contáctame
          </Link>
        </div>

        <div className="footer-center">
          <Link to="/" className="footer-brand-link">
            <span className="footer-brand-letter">M</span>
            <span className="footer-brand-full">Marvariable</span>
          </Link>
          <div className="footer-brand-rule" />
        </div>

        <div className="footer-right">
          <p className="footer-label">Navegar</p>
          <nav className="footer-nav">
            <Link to="/publications" className="footer-nav-link">Obras publicadas</Link>
            <Link to="/theory" className="footer-nav-link">Teoría</Link>
            <Link to="/narrative" className="footer-nav-link">Narrativa</Link>
            <Link to="/theater" className="footer-nav-link">Teatro</Link>
            <Link to="/visual-arts" className="footer-nav-link">Artes visuales</Link>
          </nav>
          <p className="footer-phrase">
            Escritura, imagen<br />
            y <em>pensamiento</em>
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Marvariable — Todos los derechos reservados
        </p>
        <div className="footer-bottom-ornament">
          <span />
          <span />
          <span />
        </div>
      </div>
    </footer>
  );
}
