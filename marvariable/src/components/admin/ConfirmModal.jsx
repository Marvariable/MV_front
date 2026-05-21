import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(20,12,8,0.5)", backdropFilter: "blur(4px)" }}
        onClick={onCancel}
      />
      <div style={{
        position: "relative",
        background: "#FEFCF8",
        border: "1px solid #DDD0C4",
        borderRadius: "12px",
        padding: "40px 36px",
        width: "100%",
        maxWidth: "400px",
        margin: "0 16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            background: "rgba(123,30,43,0.08)", border: "1px solid rgba(123,30,43,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ExclamationTriangleIcon style={{ width: "24px", height: "24px", color: "#7b1e2b" }} />
          </div>

          <div>
            <h3 style={{
              fontSize: "16px", fontWeight: 600, color: "#1A1410",
              marginBottom: "8px", letterSpacing: "0.02em",
            }}>
              Confirmar eliminación
            </h3>
            <p style={{ fontSize: "13px", color: "#6B5848", lineHeight: 1.7 }}>{message}</p>
          </div>

          <div style={{ display: "flex", gap: "12px", width: "100%", marginTop: "8px" }}>
            <button
              onClick={onCancel}
              style={{
                flex: 1, padding: "11px",
                border: "1px solid #DDD0C4", borderRadius: "6px",
                background: "transparent", color: "#5A4538",
                fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", fontWeight: 500, transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#F5EFE8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              style={{
                flex: 1, padding: "11px",
                border: "none", borderRadius: "6px",
                background: "#7b1e2b", color: "#FFFFFF",
                fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", fontWeight: 600, transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#651823"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#7b1e2b"; }}
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
