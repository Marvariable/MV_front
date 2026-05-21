import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PublicationForm from "./PublicationForm";
import { getPublicationById, updatePublication } from "../../services/PublicationService";

export default function EditModal({ id, onClose, onSuccess }) {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPublicationById(id);
        setInitialData(data);
      } catch (error) {
        console.error(error);
        alert("No se pudo cargar la publicación");
        onClose();
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleUpdate(formData) {
    try {
      setSaving(true);
      await updatePublication(id, formData);
      setSuccess(true);
      setTimeout(() => onSuccess(), 1500);
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar la publicación");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      overflowY: "auto", padding: "32px 16px",
    }}>
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(20,12,8,0.5)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div style={{
        position: "relative",
        background: "#F5F0EA",
        border: "1px solid #DDD0C4",
        borderRadius: "12px",
        width: "100%", maxWidth: "760px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "22px 32px",
          borderBottom: "1px solid #DDD0C4",
          background: "#FEFCF8",
          borderRadius: "12px 12px 0 0",
        }}>
          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#7b1e2b", marginBottom: "3px" }}>
              Administración
            </p>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1A1410", margin: 0 }}>
              Editar publicación
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "1px solid #DDD0C4", borderRadius: "6px",
              padding: "7px", cursor: "pointer", color: "#9A8E84",
              transition: "all 0.2s ease", display: "flex",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#7b1e2b"; e.currentTarget.style.color = "#7b1e2b"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#DDD0C4"; e.currentTarget.style.color = "#9A8E84"; }}
          >
            <XMarkIcon style={{ width: "16px", height: "16px" }} />
          </button>
        </div>

        <div style={{ padding: "32px" }}>
          {success && (
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "#F0FAF4", border: "1px solid #A8D5B5",
              borderRadius: "6px", padding: "14px 18px", marginBottom: "24px",
              fontSize: "13px", color: "#2D6B4A",
            }}>
              ✓ Cambios guardados correctamente
            </div>
          )}
          {loading ? (
            <p style={{ textAlign: "center", color: "#9A8E84", padding: "48px", fontSize: "13px" }}>Cargando...</p>
          ) : (
            <PublicationForm initialData={initialData} onSubmit={handleUpdate} loading={saving} submitText="Guardar cambios" />
          )}
        </div>
      </div>
    </div>
  );
}
