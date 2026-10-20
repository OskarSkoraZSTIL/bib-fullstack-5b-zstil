import { formatPrice } from "../format";

function BookCard ({ book }) {
  return (
    <article className="card">
      {book.stock === 0 ? (
        <h2 className="out"><b>Niedostępne</b>: </h2>
      ) : (
        <h2 className="in"><b>Na stanie</b>: </h2>
      )}
      <h3>{book.name}</h3>
      <h4 className="author">Autor: {book.author}</h4>
      <p className="category">{book.category}</p>
      <p className="genre">Gatunek: {book.genre}</p>
      <p className="price">{formatPrice(book.price)}</p>
      <p className="stock">Sztuk: {book.stock}</p>
      {book.stock < 7 && book.stock > 0 && <p className="warning"><b>Ostatnie sztuki!</b></p>}
    </article>
  );
}

export default BookCard;