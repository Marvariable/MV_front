import { useState } from "react";
import { PhotoIcon, ExclamationCircleIcon, DocumentArrowUpIcon } from "@heroicons/react/24/outline";

const CLOUDINARY_CLOUD = "de96ah1mw";
const CLOUDINARY_PRESET = "cristina";
const CLOUDINARY_PRESET_DOCS = "cristina_docs";

function validate(formData) {
  const errors = {};
  if (!formData.title.trim()) errors.title = "El título es obligatorio.";
  else if (formData.title.trim().length < 3) errors.title = "Mínimo 3 caracteres.";
  else if (formData.title.trim().length > 200) errors.title = "Máximo 200 caracteres.";
  if (!formData.description.trim()) errors.description = "La descripción es obligatoria.";
  else if (formData.description.trim().length < 10) errors.description = "Mínimo 10 caracteres.";
  if (!formData.publicationDate) errors.publicationDate = "La fecha es obligatoria.";
  if (!formData.imageUrl) errors.imageUrl = "Debes subir una imagen.";
  return errors;
}

const inputStyle = (hasError) => ({
  width: "100%",
  padding: "11px 14px",
  background: "#FFFFFF",
  border: `1px solid ${hasError ? "#B42318" : "#DDD0C4"}`,
  borderRadius: "6px",
  color: "#1A1410",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease",
});

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "#5A4538",
};

const ErrorMsg = ({ text }) =>
  text ? (
    <p style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "5px", fontSize: "12px", color: "#B42318" }}>
      <ExclamationCircleIcon style={{ width: "13px", height: "13px" }} />
      {text}
    </p>
  ) : null;

export default function PublicationForm({
  initialData = {
    title: "", description: "", cita: "", publicationDate: "", imageUrl: "", fileUrl: "",
    status: "DRAFT", link: "", section: "TEORIA", showInHome: false,
  },
  onSubmit,
  loading = false,
  submitText = "Guardar",
}) {
  const [formData, setFormData] = useState({ fileUrl: "", ...initialData });
  const [uploading, setUploading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [preview, setPreview] = useState(initialData.imageUrl || null);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_PRESET);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, { method: "POST", body: data });
      const result = await res.json();
      if (result.error) { alert("Error de Cloudinary: " + result.error.message); return; }
      setFormData((prev) => ({ ...prev, imageUrl: result.secure_url }));
      setPreview(result.secure_url);
      setErrors((prev) => ({ ...prev, imageUrl: undefined }));
    } catch { alert("No se pudo subir la imagen"); }
    finally { setUploading(false); }
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    setUploadingFile(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_PRESET_DOCS);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/raw/upload`, { method: "POST", body: data });
      const result = await res.json();
      if (result.error) { alert("Error de Cloudinary: " + result.error.message); return; }
      if (!result.secure_url) { alert("Cloudinary no devolvió URL"); return; }
      setFormData((prev) => ({ ...prev, fileUrl: result.secure_url }));
    } catch { alert("No se pudo subir el archivo"); }
    finally { setUploadingFile(false); }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    onSubmit({ ...formData, category: formData.section });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Título</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange}
            style={inputStyle(errors.title)}
            onFocus={(e) => { e.target.style.borderColor = "#7b1e2b"; e.target.style.boxShadow = "0 0 0 3px rgba(123,30,43,0.08)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.title ? "#B42318" : "#DDD0C4"; e.target.style.boxShadow = "none"; }}
          />
          <ErrorMsg text={errors.title} />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Descripción</label>
          <textarea name="description" value={formData.description} onChange={handleChange}
            rows={10}
            placeholder="Escribe aquí el contenido..."
            style={{ ...inputStyle(errors.description), resize: "vertical", lineHeight: 1.8, paddingTop: "12px" }}
            onFocus={(e) => { e.target.style.borderColor = "#7b1e2b"; e.target.style.boxShadow = "0 0 0 3px rgba(123,30,43,0.08)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.description ? "#B42318" : "#DDD0C4"; e.target.style.boxShadow = "none"; }}
          />
          <ErrorMsg text={errors.description} />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>
            Cita{" "}
            <span style={{ color: "#9A8E84", fontWeight: 400, fontSize: "10px", textTransform: "none", letterSpacing: "0.03em" }}>— opcional</span>
          </label>
          <textarea name="cita" value={formData.cita} onChange={handleChange}
            rows={3}
            placeholder="Ej: Rojas, C. (2012). Título. Editorial, página."
            style={{ ...inputStyle(false), resize: "vertical", lineHeight: 1.8, paddingTop: "12px" }}
            onFocus={(e) => { e.target.style.borderColor = "#7b1e2b"; e.target.style.boxShadow = "0 0 0 3px rgba(123,30,43,0.08)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#DDD0C4"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        <div>
          <label style={labelStyle}>Fecha de publicación</label>
          <input type="date" name="publicationDate" value={formData.publicationDate} onChange={handleChange}
            style={inputStyle(errors.publicationDate)}
            onFocus={(e) => { e.target.style.borderColor = "#7b1e2b"; e.target.style.boxShadow = "0 0 0 3px rgba(123,30,43,0.08)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.publicationDate ? "#B42318" : "#DDD0C4"; e.target.style.boxShadow = "none"; }}
          />
          <ErrorMsg text={errors.publicationDate} />
        </div>

        <div>
          <label style={labelStyle}>Estado</label>
          <select name="status" value={formData.status} onChange={handleChange}
            style={{ ...inputStyle(false), cursor: "pointer" }}
            onFocus={(e) => { e.target.style.borderColor = "#7b1e2b"; }}
            onBlur={(e) => { e.target.style.borderColor = "#DDD0C4"; }}
          >
            <option value="DRAFT">Borrador</option>
            <option value="PUBLISHED">Publicado</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Sección</label>
          <select name="section" value={formData.section} onChange={handleChange}
            style={{ ...inputStyle(false), cursor: "pointer" }}
            onFocus={(e) => { e.target.style.borderColor = "#7b1e2b"; }}
            onBlur={(e) => { e.target.style.borderColor = "#DDD0C4"; }}
          >
            <option value="TEORIA">Teoría</option>
            <option value="NARRATIVA">Narrativa</option>
            <option value="TEATRO">Teatro</option>
          </select>
        </div>

        {/* Image upload */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Imagen</label>
          <div style={{ display: "flex", gap: "12px", alignItems: "stretch" }}>
            <label style={{
              flex: 1,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              border: `2px dashed ${errors.imageUrl ? "#B42318" : "#DDD0C4"}`,
              borderRadius: "8px", padding: "28px", cursor: "pointer",
              transition: "all 0.2s ease", background: "#FEFCF8",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#7b1e2b"; e.currentTarget.style.background = "#FDF5EE"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = errors.imageUrl ? "#B42318" : "#DDD0C4"; e.currentTarget.style.background = "#FEFCF8"; }}
            >
              <PhotoIcon style={{ width: "28px", height: "28px", color: "#7b1e2b", marginBottom: "8px", opacity: 0.7 }} />
              <span style={{ fontSize: "13px", color: "#6B5848" }}>{uploading ? "Subiendo..." : preview ? "Cambiar imagen" : "Seleccionar imagen"}</span>
              <span style={{ fontSize: "11px", color: "#9A8E84", marginTop: "4px" }}>JPG · PNG · WEBP</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} disabled={uploading} />
            </label>
            {preview && (
              <img src={preview} alt="Vista previa" style={{ width: "90px", height: "auto", objectFit: "cover", borderRadius: "6px", border: "1px solid #DDD0C4", flexShrink: 0 }} />
            )}
          </div>
          <ErrorMsg text={errors.imageUrl} />
        </div>

        {/* File upload */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>
            Archivo del texto{" "}
            <span style={{ color: "#9A8E84", fontWeight: 400, fontSize: "10px", textTransform: "none", letterSpacing: "0.03em" }}>
              — PDF o Word (opcional)
            </span>
          </label>
          <label style={{
            display: "flex", alignItems: "center", gap: "16px",
            border: `2px dashed ${formData.fileUrl ? "#C9A84C" : "#DDD0C4"}`,
            borderRadius: "8px", padding: "16px 20px", cursor: "pointer",
            transition: "all 0.2s ease",
            background: formData.fileUrl ? "rgba(201,168,76,0.04)" : "#FEFCF8",
          }}
            onMouseEnter={(e) => { if (!formData.fileUrl) { e.currentTarget.style.borderColor = "#7b1e2b"; e.currentTarget.style.background = "#FDF5EE"; } }}
            onMouseLeave={(e) => { if (!formData.fileUrl) { e.currentTarget.style.borderColor = "#DDD0C4"; e.currentTarget.style.background = "#FEFCF8"; } }}
          >
            <DocumentArrowUpIcon style={{ width: "22px", height: "22px", color: "#7b1e2b", flexShrink: 0, opacity: 0.7 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              {uploadingFile ? (
                <span style={{ fontSize: "13px", color: "#6B5848" }}>Subiendo archivo...</span>
              ) : formData.fileUrl ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "13px", color: "#C9A84C", fontWeight: 500 }}>Archivo subido</span>
                  <a href={formData.fileUrl} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontSize: "12px", color: "#7b1e2b", textDecoration: "underline" }}>
                    Ver archivo
                  </a>
                </div>
              ) : (
                <span style={{ fontSize: "13px", color: "#6B5848" }}>Seleccionar archivo</span>
              )}
              <span style={{ fontSize: "11px", color: "#9A8E84", marginTop: "2px", display: "block" }}>PDF · DOC · DOCX</span>
            </div>
            <input type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileUpload} style={{ display: "none" }} disabled={uploadingFile} />
          </label>
          {formData.fileUrl && (
            <button type="button"
              onClick={() => setFormData((p) => ({ ...p, fileUrl: "" }))}
              style={{ marginTop: "6px", fontSize: "12px", color: "#B42318", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              Quitar archivo
            </button>
          )}
        </div>

        {/* Show in Home toggle */}
        <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setFormData((p) => ({ ...p, showInHome: !p.showInHome }))}>
            <div style={{
              width: "42px", height: "24px", borderRadius: "12px",
              background: formData.showInHome ? "#7b1e2b" : "#DDD0C4",
              transition: "background 0.25s ease",
            }} />
            <div style={{
              position: "absolute", top: "4px",
              left: formData.showInHome ? "22px" : "4px",
              width: "16px", height: "16px", borderRadius: "50%",
              background: "#FFFFFF",
              boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
              transition: "left 0.25s ease",
            }} />
          </div>
          <span style={{ fontSize: "13px", color: "#5A4538", fontWeight: 500 }}>
            Mostrar en Home
          </span>
        </div>
      </div>

      <button type="submit" disabled={loading || uploading}
        style={{
          width: "100%", padding: "14px", border: "none", borderRadius: "6px",
          background: loading || uploading ? "#DDD0C4" : "#7b1e2b",
          color: loading || uploading ? "#9A8E84" : "#FFFFFF",
          fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase",
          fontWeight: 600, cursor: loading || uploading ? "not-allowed" : "pointer",
          transition: "background 0.25s ease", marginTop: "8px",
        }}
        onMouseEnter={(e) => { if (!loading && !uploading) e.currentTarget.style.background = "#651823"; }}
        onMouseLeave={(e) => { if (!loading && !uploading) e.currentTarget.style.background = "#7b1e2b"; }}
      >
        {loading ? "Guardando..." : submitText}
      </button>
    </form>
  );
}
