import { BOOKS } from "./data";
import BookCard from "./components/BookCard";

function App() {
  return (
    <main>
      <h1>Katalog Książek</h1>
      <div className="grid">
        {BOOKS.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}

export default App;