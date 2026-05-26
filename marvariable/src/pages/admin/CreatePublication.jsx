import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicationForm from "../../components/admin/PublicationForm";
import { createPublication } from "../../services/PublicationService";

export default function CreatePublication() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleCreate(formData) {
    try {
      setLoading(true);
      await createPublication(formData);
      const msg = formData.status === "DRAFT" ? "Guardado como borrador" : "Publicación creada exitosamente";
      navigate("/admin/publicaciones", { state: { successMsg: msg } });
    } catch (error) {
      console.error(error);
      alert("No se pudo crear la publicación");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", padding: "40px 48px", boxSizing: "border-box" }}>
      <div style={{ paddingBottom: "24px", marginBottom: "32px", borderBottom: "1px solid #DDD0C4" }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#7b1e2b", marginBottom: "5px" }}>
          Panel de administración
        </p>
        <h1 style={{ fontSize: "24px", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1A1410", margin: 0 }}>
          Nueva publicación
        </h1>
      </div>

      <PublicationForm onSubmit={handleCreate} loading={loading} submitText="Crear publicación" />
    </div>
  );
}
