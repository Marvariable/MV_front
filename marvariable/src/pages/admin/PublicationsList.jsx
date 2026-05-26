import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getPublications, deletePublication } from "../../services/PublicationService";
import ConfirmModal from "../../components/admin/ConfirmModal";
import EditModal from "../../components/admin/EditModal";

export default function PublicationsList() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [editId, setEditId] = useState(null);
  const timerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMsg) {
      setSuccessMsg(location.state.successMsg);
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  }, []);

  async function loadPublications(filters = {}) {
    try {
      setLoading(true);
      const data = await getPublications(filters);
      setPublications(data);
    } catch (error) {
      console.error(error);
      alert("No se pudieron cargar las publicaciones");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadPublications(); }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      loadPublications({ title: searchTitle, publicationDate: searchDate });
    }, 300);
    return () => clearTimeout(timerRef.current);
  }, [searchTitle, searchDate]);

  async function handleSearch(event) {
    event.preventDefault();
    await loadPublications({ title: searchTitle, publicationDate: searchDate });
  }

  async function handleDelete() {
    try {
      await deletePublication(confirmId);
      setConfirmId(null);
      await loadPublications({ title: searchTitle, publicationDate: searchDate });
      setSuccessMsg("Publicación eliminada correctamente");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la publicación");
    }
  }

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    background: "#FFFFFF", border: "1px solid #DDD0C4",
    borderRadius: "6px", color: "#1A1410", fontSize: "13px",
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px 48px", boxSizing: "border-box" }}>

      {editId && (
        <EditModal
          id={editId}
          onClose={() => setEditId(null)}
          onSuccess={() => {
            setEditId(null);
            loadPublications({ title: searchTitle, publicationDate: searchDate });
            setSuccessMsg("Publicación actualizada correctamente");
            setTimeout(() => setSuccessMsg(""), 3000);
          }}
        />
      )}

      {confirmId && (
        <ConfirmModal
          message="Esta acción no se puede deshacer. ¿Confirmas que deseas eliminar esta publicación?"
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {successMsg && (
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          background: "#F0FAF4", border: "1px solid #A8D5B5",
          borderRadius: "6px", padding: "14px 18px", marginBottom: "24px",
          fontSize: "13px", color: "#2D6B4A",
        }}>
          ✓ {successMsg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingBottom: "24px", marginBottom: "28px", borderBottom: "1px solid #DDD0C4" }}>
        <div>
          <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#7b1e2b", marginBottom: "5px" }}>
            Panel de administración
          </p>
          <h1 style={{ fontSize: "24px", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1A1410", margin: 0 }}>
            Publicaciones
          </h1>
        </div>
        <Link
          to="/admin/publicaciones/nueva"
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 20px",
            background: "#7b1e2b", color: "#FFFFFF",
            borderRadius: "6px", textDecoration: "none",
            fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
            fontWeight: 600, transition: "background 0.25s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#651823"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#7b1e2b"; }}
        >
          <PlusCircleIcon style={{ width: "15px", height: "15px" }} />
          Nueva publicación
        </Link>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} style={{
        display: "grid", gridTemplateColumns: "1fr 1fr auto",
        gap: "16px", alignItems: "end",
        background: "#FEFCF8", border: "1px solid #DDD0C4",
        borderRadius: "8px", padding: "20px 24px", marginBottom: "24px",
      }}>
        <div>
          <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5A4538", marginBottom: "7px", fontWeight: 600 }}>
            Buscar por título
          </label>
          <input type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}
            style={inputStyle} placeholder="Título..."
            onFocus={(e) => { e.target.style.borderColor = "#7b1e2b"; e.target.style.boxShadow = "0 0 0 3px rgba(123,30,43,0.08)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#DDD0C4"; e.target.style.boxShadow = "none"; }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5A4538", marginBottom: "7px", fontWeight: 600 }}>
            Buscar por fecha
          </label>
          <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)}
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = "#7b1e2b"; e.target.style.boxShadow = "0 0 0 3px rgba(123,30,43,0.08)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#DDD0C4"; e.target.style.boxShadow = "none"; }}
          />
        </div>
        <button type="submit"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "10px 20px", background: "#7b1e2b", border: "none", borderRadius: "6px",
            color: "#FFFFFF", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
            cursor: "pointer", fontWeight: 600, transition: "background 0.2s ease", whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#651823"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#7b1e2b"; }}
        >
          <MagnifyingGlassIcon style={{ width: "14px", height: "14px" }} />
          Buscar
        </button>
      </form>

      {/* Table */}
      <div style={{ background: "#FEFCF8", border: "1px solid #DDD0C4", borderRadius: "8px", overflow: "hidden" }}>
        {loading ? (
          <p style={{ padding: "40px", textAlign: "center", fontSize: "13px", color: "#9A8E84" }}>Cargando publicaciones...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F5EFE8", borderBottom: "1px solid #DDD0C4" }}>
                {["Título", "Fecha", "Sección", "Estado", "Acciones"].map((h) => (
                  <th key={h} style={{ padding: "12px 18px", fontSize: "12px", letterSpacing: "0.05em", color: "#5A4538", fontWeight: 600, textAlign: "left" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {publications.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", fontSize: "13px", color: "#9A8E84" }}>
                    No hay publicaciones para mostrar.
                  </td>
                </tr>
              ) : (
                publications.map((pub) => (
                  <tr key={pub.id} style={{ borderBottom: "1px solid #EDE5DC", transition: "background 0.15s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#FDF5EE"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <td style={{ padding: "14px 18px", fontSize: "14px", color: "#1A1410", maxWidth: "260px" }}>
                      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pub.title}</span>
                    </td>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "#6B5848", whiteSpace: "nowrap" }}>{pub.publicationDate}</td>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "#6B5848" }}>
                      {{ TEORIA: "Teoría", NARRATIVA: "Narrativa", TEATRO: "Teatro" }[pub.section] || pub.section}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span style={{
                        fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase",
                        padding: "3px 10px", borderRadius: "4px",
                        background: pub.status === "PUBLISHED" ? "#EBF7F0" : "#F5EFE8",
                        color: pub.status === "PUBLISHED" ? "#2D6B4A" : "#7A6050",
                        border: `1px solid ${pub.status === "PUBLISHED" ? "#A8D5B5" : "#DDD0C4"}`,
                        fontWeight: 500,
                      }}>
                        {pub.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => setEditId(pub.id)}
                          style={{ padding: "6px 14px", border: "1px solid #DDD0C4", borderRadius: "5px", background: "transparent", color: "#5A4538", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontWeight: 500, transition: "all 0.2s ease" }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.color = "#9A7A20"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#DDD0C4"; e.currentTarget.style.color = "#5A4538"; }}
                        >
                          Editar
                        </button>
                        <button onClick={() => setConfirmId(pub.id)}
                          style={{ padding: "6px 14px", border: "1px solid #DDD0C4", borderRadius: "5px", background: "transparent", color: "#7b1e2b", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontWeight: 500, transition: "all 0.2s ease" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#7b1e2b"; e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.borderColor = "#7b1e2b"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#7b1e2b"; e.currentTarget.style.borderColor = "#DDD0C4"; }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
