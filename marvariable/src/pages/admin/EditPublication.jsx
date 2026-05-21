import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PublicationForm from "../../components/admin/PublicationForm";
import { getPublicationById, updatePublication } from "../../services/PublicationService";

export default function EditPublication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadPublication() {
      try {
        const data = await getPublicationById(id);
        setInitialData(data);
      } catch (error) {
        console.error(error);
        alert("No se pudo cargar la publicación");
      } finally {
        setLoading(false);
      }
    }
    loadPublication();
  }, [id]);

  async function handleUpdate(formData) {
    try {
      setSaving(true);
      await updatePublication(id, formData);
      navigate("/admin/publicaciones");
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar la publicación");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "13px", color: "#9A8E84" }}>Cargando publicación...</p>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "13px", color: "#7b1e2b" }}>No se encontró la publicación.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "40px 48px", boxSizing: "border-box" }}>
      <div style={{ paddingBottom: "24px", marginBottom: "32px", borderBottom: "1px solid #DDD0C4" }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#7b1e2b", marginBottom: "5px" }}>
          Panel de administración
        </p>
        <h1 style={{ fontSize: "24px", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1A1410", margin: 0 }}>
          Editar publicación
        </h1>
      </div>

      <PublicationForm initialData={initialData} onSubmit={handleUpdate} loading={saving} submitText="Guardar cambios" />
    </div>
  );
}
