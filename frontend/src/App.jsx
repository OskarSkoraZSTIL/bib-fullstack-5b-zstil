import { useState } from "react";
import { BOOKS } from "./data";
import BookCard from "./components/BookCard";

function App() {
  const [query, setQuery] = useState("");
  const visible = BOOKS.filter((book) => book.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <main>
      <h1>Katalog Książek</h1>
      
      <input type="text" placeholder="Szukaj Książki..." value={query} onChange={(event) => setQuery(event.target.value)}/>
      
      {visible.length === 0 && <p role="status">Nie znaleziono książek pasujących do wyszukiwania.</p>}

      <div className="grid">
        {visible.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}

export default App;