import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicationForm from "../../components/admin/PublicationForm";
import { createPublication } from "../../services/PublicationService";

export default function CreatePublication() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleCreate(formData) {
    try {
      setLoading(true);
      await createPublication(formData);
      navigate("/admin/publicaciones");
    } catch (error) {
      console.error(error);
      alert("No se pudo crear la publicación");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Nueva publicación</h2>

      <PublicationForm
        onSubmit={handleCreate}
        loading={loading}
        submitText="Crear publicación"
      />
    </div>
  );
}