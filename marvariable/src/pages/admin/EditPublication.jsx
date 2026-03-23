import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PublicationForm from "../../components/admin/PublicationForm";
import { getPublicationById,updatePublication} from "../../services/PublicationService";

export default function EditPublication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadPublication() {
      try {
        const data = await getPublicationById(id);
        setInitialData(data);
      } catch (error) {
        console.error(error);
        alert("No se pudo cargar la publicación");
      } finally {
        setLoading(false);
      }
    }

    loadPublication();
  }, [id]);

  async function handleUpdate(formData) {
    try {
      setSaving(true);
      await updatePublication(id, formData);
      navigate("/admin/publicaciones");
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar la publicación");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Cargando publicación...</p>;
  }

  if (!initialData) {
    return <p>No se encontró la publicación.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Editar publicación</h2>

      <PublicationForm
        initialData={initialData}
        onSubmit={handleUpdate}
        loading={saving}
        submitText="Guardar cambios"
      />
    </div>
  );
}