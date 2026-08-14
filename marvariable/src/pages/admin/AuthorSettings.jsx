import { useEffect, useState } from "react";
import { DocumentArrowUpIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { apiFetch } from "../../services/apiClient";

const CLOUDINARY_CLOUD = "de96ah1mw";
const CLOUDINARY_PRESET_DOCS = "cristina_docs";
const API = "http://localhost:8080/api/settings/cv";

export default function AuthorSettings() {
  const [cvUrl, setCvUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => { if (data.cvUrl) setCvUrl(data.cvUrl); })
      .catch(() => {});
  }, []);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", CLOUDINARY_PRESET_DOCS);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/raw/upload`, { method: "POST", body: form });
      const data = await res.json();
      if (data.error) { setError("Error al subir: " + data.error.message); return; }
      setCvUrl(data.secure_url);
    } catch {
      setError("No se pudo subir el archivo.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!cvUrl) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await apiFetch(API, {
        method: "PUT",
        body: JSON.stringify({ cvUrl }),
      });
      if (!res.ok) throw new Error();
      setSuccess("CV guardado correctamente.");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("No se pudo guardar. Comprueba la sesión.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    setSaving(true);
    setError("");
    try {
      await apiFetch(API, {
        method: "PUT",
        body: JSON.stringify({ cvUrl: null }),
      });
      setCvUrl("");
      setSuccess("CV eliminado.");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("No se pudo eliminar.");
    } finally {
      setSaving(false);
    }
  }

  const labelStyle = {
    display: "block", marginBottom: "7px",
    fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em",
    textTransform: "uppercase", color: "#5A4538",
  };

  return (
    <div style={{ padding: "48px 56px", maxWidth: "700px" }}>
      <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "18px", fontWeight: 400, color: "#1A1410", letterSpacing: "0.1em", marginBottom: "6px" }}>
        Configuración del autor
      </h1>
      <p style={{ fontSize: "13px", color: "#9A8E84", marginBottom: "40px" }}>
        Sube el CV del autor en PDF. Los visitantes podrán verlo y descargarlo desde la página "Sobre el autor".
      </p>

      <div style={{ background: "#FFFFFF", borderRadius: "10px", border: "1px solid #E8E0D8", padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Upload */}
        <div>
          <label style={labelStyle}>Curriculum Vitae — PDF</label>
          <label style={{
            display: "flex", alignItems: "center", gap: "16px",
            border: `2px dashed ${cvUrl ? "#C9A84C" : "#DDD0C4"}`,
            borderRadius: "8px", padding: "18px 22px", cursor: "pointer",
            background: cvUrl ? "rgba(201,168,76,0.04)" : "#FEFCF8",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { if (!cvUrl) { e.currentTarget.style.borderColor = "#7b1e2b"; e.currentTarget.style.background = "#FDF5EE"; } }}
            onMouseLeave={e => { if (!cvUrl) { e.currentTarget.style.borderColor = "#DDD0C4"; e.currentTarget.style.background = "#FEFCF8"; } }}
          >
            <DocumentArrowUpIcon style={{ width: "22px", height: "22px", color: "#7b1e2b", flexShrink: 0, opacity: 0.8 }} />
            <div style={{ flex: 1 }}>
              {uploading ? (
                <span style={{ fontSize: "13px", color: "#6B5848" }}>Subiendo...</span>
              ) : cvUrl ? (
                <span style={{ fontSize: "13px", color: "#C9A84C", fontWeight: 500 }}>Archivo subido — haz clic para reemplazar</span>
              ) : (
                <span style={{ fontSize: "13px", color: "#6B5848" }}>Seleccionar PDF</span>
              )}
              <span style={{ display: "block", fontSize: "11px", color: "#9A8E84", marginTop: "2px" }}>Solo PDF</span>
            </div>
            <input type="file" accept=".pdf,application/pdf" onChange={handleUpload} style={{ display: "none" }} disabled={uploading} />
          </label>
        </div>

        {/* Preview */}
        {cvUrl && (
          <div>
            <label style={labelStyle}>Vista previa</label>
            <iframe
              src={cvUrl}
              title="CV del autor"
              style={{ width: "100%", height: "380px", border: "1px solid #DDD0C4", borderRadius: "6px" }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <a href={cvUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7b1e2b", textDecoration: "none", border: "1px solid #7b1e2b", padding: "7px 16px" }}>
                Abrir en nueva pestaña
              </a>
              <button type="button" onClick={handleRemove} disabled={saving}
                style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B42318", background: "none", border: "1px solid #B42318", padding: "7px 16px", cursor: "pointer" }}>
                Quitar CV
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        {success && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2D6B4A", fontSize: "13px" }}>
            <CheckCircleIcon style={{ width: "16px", height: "16px" }} />{success}
          </div>
        )}
        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#B42318", fontSize: "13px" }}>
            <ExclamationCircleIcon style={{ width: "16px", height: "16px" }} />{error}
          </div>
        )}

        {/* Save */}
        <button type="button" onClick={handleSave} disabled={saving || !cvUrl || uploading}
          style={{
            padding: "13px", border: "none", borderRadius: "6px",
            background: saving || !cvUrl ? "#DDD0C4" : "#7b1e2b",
            color: saving || !cvUrl ? "#9A8E84" : "#FFFFFF",
            fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase",
            fontWeight: 600, cursor: saving || !cvUrl ? "not-allowed" : "pointer",
            transition: "background 0.25s ease",
          }}
          onMouseEnter={e => { if (!saving && cvUrl) e.currentTarget.style.background = "#651823"; }}
          onMouseLeave={e => { if (!saving && cvUrl) e.currentTarget.style.background = "#7b1e2b"; }}
        >
          {saving ? "Guardando..." : "Guardar CV"}
        </button>
      </div>
    </div>
  );
}
