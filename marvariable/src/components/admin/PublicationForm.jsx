import { useState } from "react";

export default function PublicationForm({
  initialData = {
    title: "",
    description: "",
    publicationDate: "",
    imageUrl: "",
    category: "",
    status: "DRAFT",
    link: "",
  },
  onSubmit,
  loading = false,
  submitText = "Guardar",
}) {
  const [formData, setFormData] = useState(initialData);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-6 space-y-5 max-w-3xl"
    >
      <div>
        <label className="block mb-1 font-medium">Título</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 min-h-32"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Fecha de publicación</label>
        <input
          type="date"
          name="publicationDate"
          value={formData.publicationDate}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">URL de imagen</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
          placeholder="/img/obra.jpg o https://..."
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Categoría</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Estado</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
          required
        >
          <option value="DRAFT">Borrador</option>
          <option value="PUBLISHED">Publicado</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Enlace</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-5 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Guardando..." : submitText}
      </button>
    </form>
  );
}