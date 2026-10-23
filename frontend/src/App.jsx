import { useState } from "react";
import { BOOKS } from "./data";
import BookCard from "./components/BookCard";
import BookDetails from "./components/BookDetails"; 


function App() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const genres = ["all", ...new Set(BOOKS.map((p) => p.genre))];
  const [selected, setSelected] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  
  const filteredBooks = BOOKS.filter((book) => {
    const matchesQuery = book.name.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = genre === "all" || book.genre === genre;
    return matchesQuery && matchesGenre;
  });

  const visible = [...filteredBooks].sort((a, b) => {
    const comparison = sortBy === "name"
      ? a.name.localeCompare(b.name, "pl")
      : Number(a.price) - Number(b.price);
    return sortDirection === "asc" ? comparison : -comparison;
  });

  if (selected) {
    return <BookDetails book={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <main>
      <h1>Katalog Książek</h1>
      
      <input type="text" placeholder="Szukaj Książki..." value={query} onChange={(event) => setQuery(event.target.value)}/>

      <select value={genre} onChange={(event) => setGenre(event.target.value)}>
        {genres.map((name) => (
          <option key={name} value={name}>
            {name === "all" ? "wszystkie gatunki" : name}
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
        
      {visible.length === 0 && <p role="status">Nie znaleziono książek pasujących do wyszukiwania.</p>}

      <div className="grid">
        {visible.map((book) => (
          <BookCard key={book.id} book={book} onSelect={setSelected} />
        ))}
      </div>
    </main>
  );
}

export default App;