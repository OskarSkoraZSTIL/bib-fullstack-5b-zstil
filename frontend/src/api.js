const API_URL = import.meta.env.VITE_API_URL;

export async function fetchBooks(genre) {
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

export async function fetchInfo() {
  const response = await fetch(`${API_URL}/info/`);

  if (!response.ok) {
    throw new Error(`Serwer odpowiedział błędem ${response.status}`);
  }

  return response.json();
}