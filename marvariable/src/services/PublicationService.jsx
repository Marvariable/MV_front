const BASE_URL = "http://localhost:8080/api/publications";

export async function getPublications(filters = {}) {
  const params = new URLSearchParams();

  if (filters.title) {
    params.append("title", filters.title);
  }

  if (filters.publicationDate) {
    params.append("publicationDate", filters.publicationDate);
  }

  const url = params.toString()
    ? `${BASE_URL}?${params.toString()}`
    : BASE_URL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al obtener las publicaciones");
  }

  return response.json();
}

export async function getPublicationById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener la publicación");
  }

  return response.json();
}

export async function createPublication(publicationData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(publicationData),
  });

  if (!response.ok) {
    throw new Error("Error al crear la publicación");
  }

  return response.json();
}

export async function updatePublication(id, publicationData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(publicationData),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la publicación");
  }

  return response.json();
}

export async function deletePublication(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la publicación");
  }

  return true;
}

export async function getPublicationsBySection(section) {
  const response = await fetch(`${BASE_URL}/section/${section}`);

  if (!response.ok) {
    throw new Error("Error al obtener publicaciones por sección");
  }

  return response.json();
}

export async function getHomeSelectedPublications() {
  const response = await fetch(`${BASE_URL}/home-selected`);

  if (!response.ok) {
    throw new Error("Error al obtener publicaciones del home");
  }

  return response.json();
}