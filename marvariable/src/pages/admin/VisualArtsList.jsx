import { useEffect, useState } from "react";
import { PhotoIcon, PlusCircleIcon, ExclamationCircleIcon, XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { getVisualArts, createVisualArt, updateVisualArt, deleteVisualArt } from "../../services/VisualArtsService";

const CLOUDINARY_CLOUD = "de96ah1mw";
const CLOUDINARY_PRESET = "cristina";

const inputStyle = (hasError) => ({
  width: "100%", padding: "11px 14px",
  background: "#FFFFFF", border: `1px solid ${hasError ? "#B42318" : "#DDD0C4"}`,
  borderRadius: "6px", color: "#1A1410", fontSize: "14px",
  outline: "none", boxSizing: "border-box",
});

const labelStyle = {
  display: "block", marginBottom: "7px",
  fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em",
  textTransform: "uppercase", color: "#5A4538",
};

function VisualArtForm({ initialData, onSubmit, loading, submitText, onCancel }) {
  const [formData, setFormData] = useState({ nombre: "", publicationDate: "", imageUrl: "", showOnHome: false, ...initialData });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(initialData?.imageUrl || null);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!formData.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!formData.publicationDate) e.publicationDate = "La fecha es obligatoria.";
    if (!formData.imageUrl) e.imageUrl = "Debes subir una imagen.";
    return e;
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
      if (result.error) { alert("Error Cloudinary: " + result.error.message); return; }
      setFormData((prev) => ({ ...prev, imageUrl: result.secure_url }));
      setPreview(result.secure_url);
      setErrors((prev) => ({ ...prev, imageUrl: undefined }));
    } catch { alert("No se pudo subir la imagen"); }
    finally { setUploading(false); }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <label style={labelStyle}>Nombre</label>
        <input type="text" value={formData.nombre}
          onChange={(e) => { setFormData((p) => ({ ...p, nombre: e.target.value })); setErrors((p) => ({ ...p, nombre: undefined })); }}
          style={inputStyle(errors.nombre)}
          onFocus={(e) => { e.target.style.borderColor = "#7b1e2b"; e.target.style.boxShadow = "0 0 0 3px rgba(123,30,43,0.08)"; }}
          onBlur={(e) => { e.target.style.borderColor = errors.nombre ? "#B42318" : "#DDD0C4"; e.target.style.boxShadow = "none"; }}
        />
        {errors.nombre && <p style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "5px", fontSize: "12px", color: "#B42318" }}><ExclamationCircleIcon style={{ width: "13px", height: "13px" }} />{errors.nombre}</p>}
      </div>

      <div>
        <label style={labelStyle}>Fecha de publicación</label>
        <input type="date" value={formData.publicationDate}
          onChange={(e) => { setFormData((p) => ({ ...p, publicationDate: e.target.value })); setErrors((p) => ({ ...p, publicationDate: undefined })); }}
          style={inputStyle(errors.publicationDate)}
          onFocus={(e) => { e.target.style.borderColor = "#7b1e2b"; e.target.style.boxShadow = "0 0 0 3px rgba(123,30,43,0.08)"; }}
          onBlur={(e) => { e.target.style.borderColor = errors.publicationDate ? "#B42318" : "#DDD0C4"; e.target.style.boxShadow = "none"; }}
        />
        {errors.publicationDate && <p style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "5px", fontSize: "12px", color: "#B42318" }}><ExclamationCircleIcon style={{ width: "13px", height: "13px" }} />{errors.publicationDate}</p>}
      </div>

      <div>
        <label style={labelStyle}>Imagen</label>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <label style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            border: `2px dashed ${errors.imageUrl ? "#B42318" : "#DDD0C4"}`,
            borderRadius: "8px", padding: "24px", cursor: "pointer",
            transition: "all 0.2s ease", background: "#FEFCF8",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#7b1e2b"; e.currentTarget.style.background = "#FDF5EE"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = errors.imageUrl ? "#B42318" : "#DDD0C4"; e.currentTarget.style.background = "#FEFCF8"; }}
          >
            <PhotoIcon style={{ width: "26px", height: "26px", color: "#7b1e2b", marginBottom: "7px", opacity: 0.7 }} />
            <span style={{ fontSize: "13px", color: "#6B5848" }}>{uploading ? "Subiendo..." : "Seleccionar imagen"}</span>
            <span style={{ fontSize: "11px", color: "#9A8E84", marginTop: "3px" }}>JPG · PNG · WEBP</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} disabled={uploading} />
          </label>
          {preview && <img src={preview} alt="preview" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "6px", border: "1px solid #DDD0C4", flexShrink: 0 }} />}
        </div>
        {errors.imageUrl && <p style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "5px", fontSize: "12px", color: "#B42318" }}><ExclamationCircleIcon style={{ width: "13px", height: "13px" }} />{errors.imageUrl}</p>}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setFormData((p) => ({ ...p, showOnHome: !p.showOnHome }))}>
          <div style={{ width: "42px", height: "24px", borderRadius: "12px", background: formData.showOnHome ? "#7b1e2b" : "#DDD0C4", transition: "background 0.25s ease" }} />
          <div style={{ position: "absolute", top: "4px", left: formData.showOnHome ? "22px" : "4px", width: "16px", height: "16px", borderRadius: "50%", background: "#FFFFFF", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.25s ease" }} />
        </div>
        <span style={{ fontSize: "13px", color: "#5A4538", fontWeight: 500 }}>Mostrar en Home</span>
      </div>

      <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
        {onCancel && (
          <button type="button" onClick={onCancel}
            style={{ flex: 1, padding: "11px", border: "1px solid #DDD0C4", borderRadius: "6px", background: "transparent", color: "#5A4538", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontWeight: 500 }}>
            Cancelar
          </button>
        )}
        <button type="submit" disabled={loading || uploading}
          style={{ flex: 1, padding: "11px", border: "none", borderRadius: "6px", background: loading || uploading ? "#DDD0C4" : "#7b1e2b", color: loading || uploading ? "#9A8E84" : "#FFFFFF", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading || uploading ? "not-allowed" : "pointer", fontWeight: 600 }}>
          {loading ? "Guardando..." : submitText}
        </button>
      </div>
    </form>
  );
}

function DarkModal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,12,8,0.5)", backdropFilter: "blur(4px)" }} onClick={onClose} />
      <div style={{ position: "relative", background: "#F5F0EA", border: "1px solid #DDD0C4", borderRadius: "12px", width: "100%", maxWidth: "480px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: "1px solid #DDD0C4", background: "#FEFCF8", borderRadius: "12px 12px 0 0" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#1A1410", margin: 0 }}>{title}</h3>
          <button onClick={onClose}
            style={{ background: "none", border: "1px solid #DDD0C4", borderRadius: "5px", padding: "6px", cursor: "pointer", color: "#9A8E84", display: "flex", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#7b1e2b"; e.currentTarget.style.color = "#7b1e2b"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#DDD0C4"; e.currentTarget.style.color = "#9A8E84"; }}
          >
            <XMarkIcon style={{ width: "15px", height: "15px" }} />
          </button>
        </div>
        <div style={{ padding: "28px" }}>{children}</div>
      </div>
    </div>
  );
}

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,12,8,0.5)", backdropFilter: "blur(4px)" }} onClick={onCancel} />
      <div style={{ position: "relative", background: "#FEFCF8", border: "1px solid #DDD0C4", borderRadius: "12px", width: "100%", maxWidth: "380px", padding: "36px", boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(123,30,43,0.08)", border: "1px solid rgba(123,30,43,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ExclamationTriangleIcon style={{ width: "24px", height: "24px", color: "#7b1e2b" }} />
          </div>
          <div>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#1A1410", marginBottom: "8px" }}>¿Eliminar imagen?</p>
            <p style={{ fontSize: "13px", color: "#6B5848" }}>Esta acción no se puede deshacer.</p>
          </div>
          <div style={{ display: "flex", gap: "12px", width: "100%" }}>
            <button onClick={onCancel} style={{ flex: 1, padding: "11px", border: "1px solid #DDD0C4", borderRadius: "6px", background: "transparent", color: "#5A4538", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontWeight: 500 }}>Cancelar</button>
            <button onClick={onConfirm} style={{ flex: 1, padding: "11px", border: "none", borderRadius: "6px", background: "#7b1e2b", color: "#FFFFFF", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontWeight: 600 }}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VisualArtsList({ category, title }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    try { setLoading(true); const data = await getVisualArts(category); setItems(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, [category]);

  function showSuccess(msg) { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(""), 3000); }

  async function handleCreate(formData) {
    try { setSaving(true); await createVisualArt({ ...formData, category }); setShowCreateModal(false); await load(); showSuccess("Imagen añadida correctamente"); }
    catch (err) { alert(err.message || "No se pudo crear"); }
    finally { setSaving(false); }
  }

  async function handleUpdate(formData) {
    try { setSaving(true); await updateVisualArt(editItem.id, { ...formData, category }); setEditItem(null); await load(); showSuccess("Imagen actualizada correctamente"); }
    catch (err) { alert(err.message || "No se pudo actualizar"); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    try { await deleteVisualArt(confirmId); setConfirmId(null); await load(); showSuccess("Imagen eliminada correctamente"); }
    catch { alert("No se pudo eliminar"); }
  }

  return (
    <div style={{ minHeight: "100vh", padding: "40px 48px", boxSizing: "border-box" }}>

      {showCreateModal && (
        <DarkModal title="Nueva imagen" onClose={() => setShowCreateModal(false)}>
          <VisualArtForm onSubmit={handleCreate} loading={saving} submitText="Añadir imagen" onCancel={() => setShowCreateModal(false)} />
        </DarkModal>
      )}

      {editItem && (
        <DarkModal title="Editar imagen" onClose={() => setEditItem(null)}>
          <VisualArtForm initialData={editItem} onSubmit={handleUpdate} loading={saving} submitText="Guardar cambios" onCancel={() => setEditItem(null)} />
        </DarkModal>
      )}

      {confirmId && <ConfirmDeleteModal onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />}

      {successMsg && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#F0FAF4", border: "1px solid #A8D5B5", borderRadius: "6px", padding: "14px 18px", marginBottom: "24px", fontSize: "13px", color: "#2D6B4A" }}>
          ✓ {successMsg}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingBottom: "24px", marginBottom: "32px", borderBottom: "1px solid #DDD0C4" }}>
        <div>
          <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#7b1e2b", marginBottom: "5px" }}>Arte visual</p>
          <h1 style={{ fontSize: "24px", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1A1410", margin: 0 }}>{title}</h1>
        </div>
        <button onClick={() => setShowCreateModal(true)}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#7b1e2b", border: "none", borderRadius: "6px", color: "#FFFFFF", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontWeight: 600, transition: "background 0.25s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#651823"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#7b1e2b"; }}
        >
          <PlusCircleIcon style={{ width: "15px", height: "15px" }} />
          Nueva imagen
        </button>
      </div>

      {loading ? (
        <p style={{ fontSize: "13px", color: "#9A8E84" }}>Cargando...</p>
      ) : items.length === 0 ? (
        <p style={{ fontSize: "13px", color: "#9A8E84" }}>No hay imágenes todavía.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
          {items.map((item) => (
            <div key={item.id}
              style={{ background: "#FEFCF8", border: "1px solid #DDD0C4", borderRadius: "8px", overflow: "hidden", transition: "box-shadow 0.25s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(123,30,43,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.nombre} style={{ width: "100%", height: "175px", objectFit: "contain", display: "block", background: "#F5EFE8", padding: "6px" }} />
              ) : (
                <div style={{ width: "100%", height: "175px", background: "#F5EFE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhotoIcon style={{ width: "36px", height: "36px", color: "#DDD0C4" }} />
                </div>
              )}
              <div style={{ padding: "14px" }}>
                <p style={{ fontSize: "13px", color: "#1A1410", fontWeight: 500, marginBottom: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.nombre}</p>
                <p style={{ fontSize: "11px", color: "#9A8E84", marginBottom: "12px" }}>{item.publicationDate}</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => setEditItem(item)}
                    style={{ flex: 1, padding: "7px", border: "1px solid #DDD0C4", borderRadius: "5px", background: "transparent", color: "#5A4538", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontWeight: 500, transition: "all 0.2s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.color = "#9A7A20"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#DDD0C4"; e.currentTarget.style.color = "#5A4538"; }}
                  >
                    Editar
                  </button>
                  <button onClick={() => setConfirmId(item.id)}
                    style={{ flex: 1, padding: "7px", border: "1px solid #DDD0C4", borderRadius: "5px", background: "transparent", color: "#7b1e2b", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontWeight: 500, transition: "all 0.2s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#7b1e2b"; e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.borderColor = "#7b1e2b"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#7b1e2b"; e.currentTarget.style.borderColor = "#DDD0C4"; }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
