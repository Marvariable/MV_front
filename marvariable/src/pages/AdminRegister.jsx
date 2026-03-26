import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner2 from "../assets/banner2.jpg";
import "./AdminRegister.css";

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      console.log("Login correcto:", data);
      setMessage("Inicio de sesión correcto");
      navigate("/admin/publicaciones");
    } catch (error) {
      console.error("Error en login:", error);
      setMessage("Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="admin-register-page"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 24, 20, 0.35), rgba(30, 24, 20, 0.35)), url(${banner2})`,
      }}
    >
      <div className="admin-register-overlay">
        <div className="admin-register-content">
          <section className="admin-register-section">
            <h1 className="admin-register-title">Iniciar sesión</h1>

            <p className="admin-register-subtitle">
              Accede a tu espacio creativo para gestionar publicaciones, textos y contenido artístico.
            </p>

            <form onSubmit={handleSubmit} className="admin-register-form">
              <div className="admin-register-grid">
                <div className="admin-field admin-field-wide">
                  <label htmlFor="email" className="admin-label">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="admin-input"
                    placeholder="Escribe tu correo"
                  />
                </div>

                <div className="admin-field admin-field-wide">
                  <label htmlFor="password" className="admin-label">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="admin-input"
                    placeholder="Escribe tu contraseña"
                  />
                </div>
              </div>

              <div className="admin-login-options">
                <label className="admin-remember">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <span>Recordarme</span>
                </label>

                <a href="#" className="admin-forgot-password">
                  ¿Olvidaste la contraseña?
                </a>
              </div>

              <div className="admin-register-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className="admin-save-button"
                >
                  {loading ? "Entrando..." : "Iniciar sesión"}
                </button>
              </div>

              {message && <p className="admin-message">{message}</p>}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}