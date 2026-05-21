const BASE_URL = "http://localhost:8080/api/books";

function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: token } : {}),
  };
}

export async function getBooks(showOnHome) {
  const params = new URLSearchParams();
  if (showOnHome !== undefined) params.append("showOnHome", showOnHome);
  const query = params.toString();
  const url = query ? `${BASE_URL}?${query}` : BASE_URL;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener los libros");
  return response.json();
}

export async function createBook(data) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const msg = await response.text().catch(() => "");
    throw new Error(`Error ${response.status}: ${msg || "al crear"}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export async function updateBook(id, data) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const msg = await response.text().catch(() => "");
    throw new Error(`Error ${response.status}: ${msg || "al actualizar"}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export async function deleteBook(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error("Error al eliminar");
  return true;
}
