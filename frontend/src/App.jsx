import { useCallback, useEffect, useState } from "react";

import { fetchBooks } from "./api";
import BookCard from "./components/BookCard";
import BookDetails from "./components/BookDetails";


function App() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selected, setSelected] = useState(null);
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tryDownloadingData = useCallback(async () => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    tryDownloadingData();
  }, [tryDownloadingData]);

  const genres = [...new Set(books.map((book) => book.genre))];

  const filteredBooks = books.filter((book) => {
    const matchesQuery = book.name.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = genre === "all" || book.genre === genre;
    return matchesQuery && matchesGenre;
  });

  const visible = [...filteredBooks].sort((a, b) => {
    const comparison =
      sortBy === "price"
        ? Number(a.price) - Number(b.price)
        : a.name.localeCompare(b.name, "pl");

    return sortDirection === "asc" ? comparison : -comparison;
  });

  if (selected) {
    return <BookDetails book={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <main>
      <h1>Katalog Książek</h1>
      
      <input 
      type="text"
      placeholder="Szukaj Książki..."
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      />
      
      <select value={genre} onChange={(event) => setGenre(event.target.value)}>
        <option value="all">Wszystkie gatunki</option>
        {genres.map((genreName) => (
          <option key={genreName} value={genreName}>
            {genreName}
          </option>
        ))}
      </select>

      <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
        <option value="name">Nazwa</option>
        <option value="price">Cena</option>
      </select>

      <select value={sortDirection} onChange={(event) => setSortDirection(event.target.value)}>
        <option value="asc">Rosnąco</option>
        <option value="desc">Malejąco</option>
      </select>

      {loading && <p>Ładowanie produktów...</p>}

      {error && (
        <section>
          <p className="error">
            Nie udało się pobrać danych: {error}
          </p>

          <button onClick={tryDownloadingData}>
            Spróbuj Ponownie
          </button>
        </section>
      )}

      {!loading && !error && visible.length === 0 && (
        <p>Nic nie pasuje do wyszukiwania</p>
      )}

      {!loading && !error && (
        <div className="grid">
          {visible.map((book) => (
            <BookCard key={book.id} book={book} onSelect={setSelected} />
          ))}
        </div>
      )}
    </main>
  );
}

export default App;