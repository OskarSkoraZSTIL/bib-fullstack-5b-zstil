import { useEffect, useState } from "react";

import { fetchBook } from "../api";
import { formatPrice } from "../format";

function bookDetails({ bookID, onBack }) {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetchBook(bookID)
      .then((data) => {
        if (!ignore) setBook(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      });

    return () => {
      ignore = true;
    };
  }, [bookID]);

  if (error) {
    return (
      <article className="details">
        <button onClick={onBack}>&larr; Wróć do listy</button>
        <p className="error">{error}</p>
      </article>
    );
  }

  if (!book) {
    return <p>Ładowanie...</p>;
  }

  return (
    <article className="details">
      <button onClick={onBack}>&larr; Wróć do listy</button>

      <h1>{book.name}</h1>
      <p>{book.author}</p>
      <p className="price">{formatPrice(book.price)}</p>
      <p>Gatunek: {book.genre}</p>
      <p>Na stanie: {book.stock} szt.</p>
    </article>
  );
}

export default bookDetails;