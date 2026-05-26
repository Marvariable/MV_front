import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

function NavLink({ to, icon: Icon, label, exact = false }) {
  const { pathname } = useLocation();
  const isActive = exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 24px",
        fontSize: "10px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        borderLeft: `2px solid ${isActive ? "#C9A84C" : "transparent"}`,
        color: isActive ? "#C9A84C" : "rgba(255,255,255,0.92)",
        background: isActive ? "rgba(0,0,0,0.15)" : "transparent",
        transition: "all 0.25s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = "#FFFFFF";
          e.currentTarget.style.borderLeftColor = "#C9A84C";
          e.currentTarget.style.background = "rgba(0,0,0,0.12)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = "rgba(255,255,255,0.92)";
          e.currentTarget.style.borderLeftColor = "transparent";
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      <Icon style={{ width: "14px", height: "14px", flexShrink: 0, opacity: 0.85 }} />
      {label}
    </Link>
  );
}

function SectionLabel({ label }) {
  return (
    <p style={{
      padding: "20px 24px 8px",
      fontSize: "8px",
      letterSpacing: "0.5em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.4)",
      fontWeight: 500,
    }}>
      {label}
    </p>
  );
}

export default function AdminLayout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#F0EBE3" }}>

      <aside style={{
        width: "220px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        background: "#7b1e2b",
        borderRight: "1px solid #651823",
      }}>

        <div style={{ padding: "36px 24px 28px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p style={{
              fontSize: "15px",
              fontWeight: 300,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              margin: 0,
            }}>
              MARVARIABLE
            </p>
            <p style={{
              fontSize: "7px",
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginTop: "5px",
              fontWeight: 300,
            }}>
              — Administración
            </p>
          </Link>
          <div style={{
            marginTop: "20px",
            height: "1px",
            background: "linear-gradient(to right, rgba(255,255,255,0.3), rgba(201,168,76,0.4), transparent)",
          }} />
        </div>

        <nav style={{ flex: 1, paddingBottom: "24px" }}>
          <NavLink to="/" icon={HomeIcon} label="Inicio" exact />

          <SectionLabel label="Escritura" />
          <NavLink to="/admin/publicaciones" icon={DocumentTextIcon} label="Publicaciones" exact />
          <NavLink to="/admin/publicaciones/nueva" icon={PlusCircleIcon} label="Nueva publicación" />

          <SectionLabel label="Arte Visual" />
          <NavLink to="/admin/arte-digital" icon={ComputerDesktopIcon} label="Arte digital" />
          <NavLink to="/admin/arte-manual" icon={PaintBrushIcon} label="Arte plástico" />

          <SectionLabel label="Colección" />
          <NavLink to="/admin/libros" icon={BookOpenIcon} label="Libros" />
        </nav>

        <div style={{
          padding: "20px 24px",
          borderTop: "1px solid rgba(255,255,255,0.15)",
        }}>
          <p style={{
            fontSize: "8px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}>
            © {new Date().getFullYear()} Marvariable
          </p>
        </div>
      </aside>

      <main style={{ flex: 1, overflow: "auto", background: "#F0EBE3" }}>
        <Outlet />
      </main>
    </div>
  );
}
