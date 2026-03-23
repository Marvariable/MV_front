import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getPublications,deletePublication,} from "../../services/PublicationService";
import adminPublicationsBg from "../../assets/banner4.jpg";

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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${adminPublicationsBg})` }}
    >
      <div className="min-h-screen bg-[#F5F1EC]/88 p-2 text-[#1F2937]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#1F2937]">
            Mis Publicaciones
          </h2>

          <Link
            to="/admin/publicaciones/nueva"
            className="bg-[#7B1E2B] text-white px-5 py-2.5 rounded-xl hover:bg-[#651823] transition"
          >
            Nueva publicación
          </Link>
        </div>

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-sm border border-[#E7DED5] p-4 mb-6 grid md:grid-cols-3 gap-4"
        >
          <div>
            <label className="block mb-1 font-medium text-[#1F2937]">
              Buscar por título
            </label>
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="w-full border border-[#E7DED5] rounded-xl px-3 py-2 text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#7B1E2B] focus:border-[#7B1E2B]"
              placeholder="Escribe un título"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#1F2937]">
              Buscar por fecha
            </label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full border border-[#E7DED5] rounded-xl px-3 py-2 text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#7B1E2B] focus:border-[#7B1E2B]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="bg-[#7B1E2B] text-white px-4 py-2 rounded-xl w-full hover:bg-[#651823] transition"
            >
              Buscar
            </button>
          </div>
        </form>

        {loading ? (
          <p className="text-[#1F2937]">Cargando publicaciones...</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E7DED5] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#7B1E2B] text-white">
                <tr>
                  <th className="text-left p-4">Título</th>
                  <th className="text-left p-4">Fecha</th>
                  <th className="text-left p-4">Categoría</th>
                  <th className="text-left p-4">Estado</th>
                  <th className="text-left p-4">Acciones</th>
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
                    <tr
                      key={publication.id}
                      className="border-t border-[#E7DED5] text-[#1F2937]"
                    >
                      <td className="p-4">{publication.title}</td>
                      <td className="p-4">{publication.publicationDate}</td>
                      <td className="p-4">{publication.category}</td>
                      <td className="p-4">{publication.status}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/publicaciones/${publication.id}/editar`}
                            className="px-3 py-1.5 rounded-lg border border-[#7B1E2B] text-[#7B1E2B] bg-white hover:bg-[#F9ECEF] transition"
                          >
                            Editar
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(publication.id)}
                            className="px-3 py-1.5 rounded-lg bg-[#B42318] text-white hover:bg-[#912018] transition"
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
    </div>
  );
}