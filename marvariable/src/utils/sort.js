export function sortByDateDesc(items, dateKey = "publicationDate") {
  return [...items].sort((a, b) => new Date(b[dateKey]) - new Date(a[dateKey]));
}
