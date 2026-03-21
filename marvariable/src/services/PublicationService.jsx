export async function getPublications() {
  const response = await fetch("http://localhost:8080/publications");

  if (!response.ok) {
    throw new Error("Error al obtener publicaciones");
  }

  return response.json();
}