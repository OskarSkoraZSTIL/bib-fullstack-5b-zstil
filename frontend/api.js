const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts(genre) {
  const url = new URL(`${API_URL}/endpoint/`);

  if (genre && genre !== "all") {
    url.searchParams.set("genre", genre);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Serwer odpowiedział błędem ${response.status}`);
  }

  return response.json();
}