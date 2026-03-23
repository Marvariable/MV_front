import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-[#F5F1EC]">
      <aside className="w-64 bg-[#7B1E2B] text-white border-r border-[#651823] p-6">
        <h1 className="text-2xl font-bold mb-8">Panel de Administración </h1>

        <nav className="flex flex-col gap-3">
          <Link
            to="/admin/publicaciones"
            className="px-4 py-3 rounded-xl text-white hover:bg-[#651823] transition"
          >
            Publicaciones
          </Link>

          <Link
            to="/admin/publicaciones/nueva"
            className="px-4 py-3 rounded-xl text-white hover:bg-[#651823] transition"
          >
            Nueva publicación
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}