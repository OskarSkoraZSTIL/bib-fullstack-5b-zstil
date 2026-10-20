import { formatPrice } from "../format";

function BookCard ({ book }) {
  return (
    <article className="card">
      <h2>{book.name}</h2>
      <p className="category">{book.category}</p>
      <p className="price">{formatPrice(book.price)}</p>
    </article>
  );
}

export default BookCard;