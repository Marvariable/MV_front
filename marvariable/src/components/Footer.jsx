import { Link } from "react-router-dom";
import "./Footer.css";
import logoMar from "../assets/logomar.jpg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top-rule" />

      <div className="footer-main">

        {/* Col 1 — Contacto */}
        <div className="footer-col">
          <span className="footer-col-label">Contacto</span>
          <a href="mailto:isidrolu@gmail.com" className="footer-email">isidrolu@gmail.com</a>
          <Link to="/contact" className="footer-contact-btn">Escribir →</Link>
        </div>

        {/* Col 2 — Logo central */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo-link">
            <img src={logoMar} alt="Marvariable" className="footer-logo-img" />
          </Link>
          <div className="footer-logo-rule" />
          <Link to="/" className="footer-logo-name">Marvariable</Link>
          <p className="footer-phrase">
            Filosofía, narrativa<br />y <em>teatro</em> desde Quito.
          </p>
        </div>

      </div>

      {/* Bottom band */}
      <div className="footer-bottom-rule" />
      <div className="footer-brand-band">
        <span className="footer-brand-name">Marvariable</span>
        <p className="footer-copyright">© {new Date().getFullYear()} — Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
