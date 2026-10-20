import { useState } from "react";
import { BOOKS } from "./data";
import BookCard from "./components/BookCard";
import BookDetails from "./components/BookDetails"; 


function App() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const genres = ["all", ...new Set(BOOKS.map((p) => p.genre))];
  const [selected, setSelected] = useState(null);
  
  
  const visible = BOOKS.filter((book) => {
    const matchesQuery = book.name.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = genre === "all" || book.genre === genre;
    return matchesQuery && matchesGenre;
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