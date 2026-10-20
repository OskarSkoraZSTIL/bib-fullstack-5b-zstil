import { formatPrice } from "../format";

function BookCard ({ book, onSelect }) {
  return (
    <article className="card" onClick={() => onSelect(book)}>
      {book.stock === 0 ? (
        <h2 className="out"><b>Niedostępne</b>: </h2>
      ) : (
        <h2 className="in"><b>Na stanie</b>: </h2>
      )}
      <h3>{book.name}</h3>
      <h4 className="author">Autor: {book.author}</h4>
      <p className="genre">Gatunek: {book.genre}</p>
      <p className="price">{formatPrice(book.price)}</p>
      {book.stock < 7 && book.stock > 0 && <p className="warning"><b>Ostatnie sztuki!</b></p>}
    </article>
  );
}

export default BookCard;