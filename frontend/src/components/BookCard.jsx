import { formatPrice } from "../format";

function BookCard ({ book }) {
  return (
    <article className="card">
      <h2>{book.name}</h2>
      <h4 className="author">Autor: {book.author}</h4>
      <p className="category">{book.category}</p>
      <p className="genre">Gatunek: {book.genre}</p>
      <p className="stock">Sztuk: {book.stock}</p>
      <p className="price">{formatPrice(book.price)}</p>
    </article>
  );
}

export default BookCard;