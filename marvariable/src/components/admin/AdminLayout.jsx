import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-white border-r border-slate-200 p-6">
        <h1 className="text-2xl font-bold mb-8">Panel Admin</h1>

        <nav className="flex flex-col gap-3">
          <Link
            to="/admin/publicaciones"
            className="px-3 py-2 rounded-lg hover:bg-slate-100"
          >
            Publicaciones
          </Link>

          <Link
            to="/admin/publicaciones/nueva"
            className="px-3 py-2 rounded-lg hover:bg-slate-100"
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