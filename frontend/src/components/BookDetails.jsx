import { formatPrice } from "../format";

function BookDetails({ book, onBack }) {
  return (
    <article className="details">
      <button onClick={onBack}>&larr; Wróć do listy</button>

      <h1>{book.name}</h1>
      <p className="price">{formatPrice(book.price)}</p>
      <p>Kategoria: {book.category}</p>
      <p>Na stanie: {book.stock} szt.</p>
    </article>
  );
}

export default BookDetails;