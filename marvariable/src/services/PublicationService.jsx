import { apiFetch } from "./apiClient";
import { sortByDateDesc } from "../utils/sort";
import { API_BASE_URL } from "../config/api";

const BASE_URL = `${API_BASE_URL}/api/publications`;

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

  return sortByDateDesc(await response.json());
}

export async function getPublicationById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener la publicación");
  }

  return response.json();
}

export async function createPublication(publicationData) {
  const response = await apiFetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(publicationData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Backend error:", errorText);
    throw new Error(errorText || "Error al crear la publicación");
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export async function updatePublication(id, publicationData) {
  const response = await apiFetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(publicationData),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la publicación");
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export async function deletePublication(id) {
  const response = await apiFetch(`${BASE_URL}/${id}`, {
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

  return sortByDateDesc(await response.json());
}

export async function getHomeSelectedPublications() {
  const response = await fetch(`${BASE_URL}/home-selected`);

  if (!response.ok) {
    throw new Error("Error al obtener publicaciones del home");
  }

  return sortByDateDesc(await response.json());
}