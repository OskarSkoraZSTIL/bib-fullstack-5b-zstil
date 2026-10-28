import { useCallback, useEffect, useState } from "react";

import { fetchBooks, fetchInfo } from "./api";
import BookCard from "./components/BookCard";
import BookDetails from "./components/BookDetails";


function App() {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selected, setSelected] = useState(null);
  const [seletedID, setSelectedID] = useState(null);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tryDownloadingData = useCallback(async () => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchBooks(genre);
        if (!ignore) setBooks(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    }
  }, [genre]);

  useEffect(() => {
    tryDownloadingData();
  }, [tryDownloadingData]);

  useEffect(() => {
  fetchInfo()
    .then((info) => setGenres(info.data_source.categories))
    .catch(() => setGenres([]));
}, []);

  // const genres = [...new Set(books.map((book) => book.genre))];

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

  if (seletedID) {
    return <BookDetails bookID={seletedID} onBack={() => setSelectedID(null)} />;
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
        <option value="all">wszystkie kategorie</option>
        {genres.map((name) => (
          <option key={name} value={name}>{name}</option>
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
            <BookCard key={book.id} book={book} onSelect={() => setSelectedID(book.id)} />
          ))}
        </div>
      )}
    </main>
  );
}

export default App;