import { formatPrice } from "../format";

function BookDetails({ book, onBack }) {
  return (
    <article className="details">
      <button onClick={onBack}>&larr; Wróć do listy</button>

      <h1>{book.name}</h1>
      <h3>{book.author}</h3>
      <p className="price">{formatPrice(book.price)}</p>
      <p>Gatunek: {book.genre}</p>
      <p>Na stanie: {book.stock} szt.</p>
    </article>
  );
}

export default BookDetails;