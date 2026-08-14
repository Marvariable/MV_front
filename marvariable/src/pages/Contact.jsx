import "./Contact.css";
import { useState } from "react";

function validate(formData) {
  const errors = {};
  if (!formData.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  }
  if (!formData.email.trim()) {
    errors.email = "El correo es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Introduce un correo válido.";
  }
  if (!formData.message.trim()) {
    errors.message = "El mensaje es obligatorio.";
  } else if (formData.message.trim().length < 10) {
    errors.message = "El mensaje debe tener al menos 10 caracteres.";
  }
  return errors;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate({ ...formData, [name]: value })[name] }));
    }
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(formData)[name] }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    setErrors(validate(formData));
  }

  return (
    <section className="contact-art-page">

      <div className="contact-art-wrapper">

        {/* ── Columna izquierda ── */}
        <div className="contact-art-left">

          <div className="contact-eyebrow">
            <span className="contact-eyebrow-line" />
            <span>Marvariable — Quito</span>
          </div>

          <h1 className="contact-art-title">
            Hablemos
            <em>de la obra</em>
          </h1>

          <p className="contact-art-text">
            Si deseas establecer contacto, compartir una lectura, proponer una
            colaboración o escribir en torno a cualquiera de las líneas del
            proyecto, este espacio permanece abierto.
          </p>

          <div className="contact-art-info">
            <div className="contact-info-item">
              <div className="contact-info-content">
                <span className="contact-info-label">Correo</span>
                <a href="mailto:isidrolu@gmail.com">isidrolu@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Columna derecha — Formulario ── */}
        <div className="contact-art-right">
          <div className="contact-form-header">
            <span className="contact-form-eyebrow">Escríbenos</span>
            <div className="contact-form-header-line" />
          </div>

          <form onSubmit={handleSubmit} className="contact-art-form">
            <div className="contact-form-group">
              <label htmlFor="name">Nombre</label>
              <input
                id="name" name="name" type="text"
                value={formData.name}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="Tu nombre"
                className={errors.name && touched.name ? "input-error" : ""}
              />
              {errors.name && touched.name && <span className="contact-field-error">{errors.name}</span>}
            </div>

            <div className="contact-form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email" name="email" type="email"
                value={formData.email}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="Tu correo"
                className={errors.email && touched.email ? "input-error" : ""}
              />
              {errors.email && touched.email && <span className="contact-field-error">{errors.email}</span>}
            </div>

            <div className="contact-form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message" name="message" rows="6"
                value={formData.message}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="Escribe aquí tu mensaje..."
                className={errors.message && touched.message ? "input-error" : ""}
              />
              {errors.message && touched.message && <span className="contact-field-error">{errors.message}</span>}
            </div>

            <button type="submit" className="contact-art-button">
              <span>Enviar mensaje</span>
              <span className="contact-btn-arrow">→</span>
            </button>
          </form>
        </div>
      </div>

    </section>
  );
}
