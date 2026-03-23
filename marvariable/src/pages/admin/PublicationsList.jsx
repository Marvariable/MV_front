import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getPublications,deletePublication,} from "../../services/PublicationService";

export default function PublicationsList() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState("");

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

  useEffect(() => {
    loadPublications();
  }, []);

  async function handleSearch(event) {
    event.preventDefault();

    await loadPublications({
      title: searchTitle,
      publicationDate: searchDate,
    });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar esta publicación?"
    );

    if (!confirmed) return;

    try {
      await deletePublication(id);
      await loadPublications({
        title: searchTitle,
        publicationDate: searchDate,
      });
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la publicación");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Publicaciones</h2>

        <Link
          to="/admin/publicaciones/nueva"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Nueva publicación
        </Link>
      </div>

      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow p-4 mb-6 grid md:grid-cols-3 gap-4"
      >
        <div>
          <label className="block mb-1 font-medium">Buscar por título</label>
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
            placeholder="Escribe un título"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Buscar por fecha</label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="bg-slate-900 text-white px-4 py-2 rounded-lg w-full"
          >
            Buscar
          </button>
        </div>
      </form>

      {loading ? (
        <p>Cargando publicaciones...</p>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3">Título</th>
                <th className="text-left p-3">Fecha</th>
                <th className="text-left p-3">Categoría</th>
                <th className="text-left p-3">Estado</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {publications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-slate-500">
                    No hay publicaciones para mostrar.
                  </td>
                </tr>
              ) : (
                publications.map((publication) => (
                  <tr key={publication.id} className="border-t border-slate-200">
                    <td className="p-3">{publication.title}</td>
                    <td className="p-3">{publication.publicationDate}</td>
                    <td className="p-3">{publication.category}</td>
                    <td className="p-3">{publication.status}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/publicaciones/${publication.id}/editar`}
                          className="px-3 py-1 rounded bg-blue-600 text-white"
                        >
                          Editar
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(publication.id)}
                          className="px-3 py-1 rounded bg-red-600 text-white"
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
        </div>
      )}
    </div>
  );
}