import { useEffect, useState } from "react";

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
  
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchBooks();
        setBooks(data);
      }
      catch (err) {
        setError(err.message);
      }
      finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const visible = books.filter((book) => 
    book.name.toLowerCase().includes(query.toLowerCase())
  );

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

      {loading && <p>Ładowanie produktów...</p>}

      {error && (
        <p className="error">
          Nie udało się pobrać danych: {error}
        </p>
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