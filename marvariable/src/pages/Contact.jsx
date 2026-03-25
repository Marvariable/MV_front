import "./Contact.css";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Formulario enviado:", formData);
  }

  return (
    <section className="contact-art-page">
   
      <div className="contact-bg-word contact-bg-word-two">CONTACT</div>

      <div className="contact-art-wrapper">
    
        <div className="contact-art-left">
          <p className="contact-art-tag">Contacto</p>

          <h1 className="contact-art-title">
            Hablemos
            <span>de la obra</span>
          </h1>

          <div className="contact-art-line"></div>

          <p className="contact-art-text">
            Si deseas establecer contacto, compartir una lectura, proponer una
            colaboración o escribir en torno a cualquiera de las líneas del
            proyecto, este espacio permanece abierto.
          </p>

          <p className="contact-art-text">
            MARVARIABLE entiende el contacto como una extensión del diálogo
            artístico: una forma de encuentro entre pensamiento, escritura,
            escena e imagen.
          </p>

          <div className="contact-art-info">
            <div className="contact-info-block">
              <span className="contact-info-label">Correo</span>
              <p>carlosrojas@gmail.com</p>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">Ubicación</span>
              <p>Quito/ Ecuador</p>
            </div>
          </div>
        </div>

        <div className="contact-art-right">
          <form onSubmit={handleSubmit} className="contact-art-form">
            <div className="contact-form-group">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="email">Correo</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Tu correo"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Motivo del mensaje"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribe aquí tu mensaje..."
              />
            </div>

            <button type="submit" className="contact-art-button">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}