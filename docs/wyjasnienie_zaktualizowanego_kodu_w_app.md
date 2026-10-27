# Wyjaśnienie Zaaktualizowanego Kodu w `App.jsx`

## 1. Importy
```jsx
import { useEffect, useState } from "react";

import { fetchBooks } from "./api";
import BookCard from "./components/BookCard";
import BookDetails from "./components/BookDetails";
```
Importujesz tutaj elementy potrzebne do działania aplikacji.

- useState – pozwala przechowywać stan, czyli dane, które mogą się zmieniać w trakcie działania aplikacji.
- useEffect – pozwala wykonywać operacje związane z cyklem życia komponentu, np. pobierać dane z API.
- fetchBooks – funkcja z pliku api, która prawdopodobnie pobiera listę książek z serwera.
- BookCard – komponent odpowiedzialny za wyświetlenie pojedynczej książki na liście.
- BookDetails – komponent wyświetlający szczegółowe informacje o wybranej książce.

Możesz wyobrazić sobie strukturę aplikacji tak:

|-|-|-|
|---|---|---|
|-|<div align="center">**App.jsx**<br>Główny komponent – zarządza aplikacją</div>|-|
|<div align="center">**BookCard**<br>Karta Książki</div>|-|<div align="center">**BookDetails**<br>Szczegóły Książki</div>
|-|<div align="center">**api.js**<br>Pobieranie Danych o Książkach</div>

**Ważne**: `App.jsx` nie musi samodzielnie definiować wyglądu każdej książki. Przekazuje to zadanie innym komponentom.

## 2. Przechowywanie stanu za pomocą useState
Na początku komponentu masz kilka zmiennych stanu:


```jsx
const [query, setQuery] = useState("");
const [genre, setGenre] = useState("all");
const [sortBy, setSortBy] = useState("name");
const [sortDirection, setSortDirection] = useState("asc");
const [selected, setSelected] = useState(null);

const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```
Zrozumienie tego fragmentu jest bardzo ważne, ponieważ stanowi podstawę działania Reacta.

### Jak działa useState?
Przykład:
```jsx
const [query, setQuery] = useState("");
```
Ta instrukcja tworzy dwa elementy:

- `query` – aktualna wartość wyszukiwarki.
- `setQuery` – funkcja, która pozwala zmienić tę wartość.

`useState("")` oznacza, że początkowa wartość query to pusty tekst.

Jeżeli użytkownik wpisze 'Harry Potter', wywołanie:
```jsx
setQuery("Harry Potter");
```
zmieni stan. React ponownie wyrenderuje komponent, aby wyświetlić aktualne wyniki.

### Co przechowują poszczególne stany?

|Stan|Wartość początkowa|Zastosowanie|
|---|---|---|
|`query`|`""`|Tekst wyszukiwania|
|`genre`|`"all"`|Wybrany gatunek książki|
|`sortBy`|`"name"`|Pole, według którego sortujemy|
|`sortDirection`|`"asc"`|Kierunek sortowania|
|`selected`|`null`|Wybrana książka|
|`books`|`[]`|Lista pobranych książek|
|`loading`|`true`|Czy dane są pobierane|
|`error`|`null`|Informacja o błędzie|

**Zwróć uwagę**: `genre`, `sortBy` i `sortDirection` są zdefiniowane, ale w obecnym kodzie nie są jeszcze wykorzystywane do filtrowania ani sortowania książek. Prawdopodobnie mają zostać użyte w kolejnych etapach rozwoju aplikacji.

## 3. Pobieranie książek z API – useEffect
To fragment odpowiedzialny za pobranie danych:
```jsx
useEffect(() => {
  async function load() {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchBooks();
      setBooks(data);
    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  }

  load();
}, []);
```

### Krok 1. Kiedy uruchomi się useEffect?
```jsx
useEffect(() => {
  // ...
}, []);
```
Drugi argument to pusta tablica `[]`.

Oznacza to, że efekt uruchomi się po zamontowaniu komponentu, czyli gdy React po raz pierwszy wyświetli go na stronie.
Dzięki temu aplikacja może pobrać książki na początku, zamiast robić to przy każdej zmianie wyszukiwarki.

### Krok 2. Tworzysz funkcję load
```jsx
async function load() {
  // ...
}
```
Słowo `async` pozwala używać wewnątrz funkcji słowa `await`, które umożliwia oczekiwanie na zakończenie operacji asynchronicznej.

Pobieranie danych z serwera może potrwać, dlatego aplikacja nie powinna zakładać, że dane będą dostępne natychmiast.

### Krok 3. Włączasz stan ładowania
```jsx
setLoading(true);
setError(null);
setLoading(true) // informuje aplikację, że właśnie pobierasz dane.

setError(null) // usuwa ewentualny wcześniejszy komunikat o błędzie.
```
Dzięki temu użytkownik może zobaczyć informację, że dane są pobierane.

### Krok 4. Pobierasz dane
```jsx
try {
  const data = await fetchBooks();
  setBooks(data);
}
```
#### Co tutaj się dzieje?

1. Wywołujesz `fetchBooks()`.
2. `await` czeka na zakończenie pobierania.
3. Otrzymane dane zapisujesz do zmiennej data.
4. `setBooks(data)` umieszcza pobrane książki w stanie aplikacji.

Przykładowo, jeśli API zwróci taką tablicę:
```jsx
[
  { id: 1, name: "Hobbit" },
  { id: 2, name: "Wiedźmin" },
  { id: 3, name: "Harry Potter" }
]
```
to po wykonaniu `setBooks(data)` stan `books` będzie zawierał te trzy książki.

To tylko przykład struktury danych – rzeczywisty format zależy od Twojego API.

## Krok 5. Obsługujesz błędy
```jsx
catch (err) {
  setError(err.message);
}
```
Jeżeli pobieranie danych się nie powiedzie, kod wejdzie do bloku `catch`.

Na przykład może wystąpić problem z połączeniem internetowym lub serwer może zwrócić błąd.

Wtedy:
```jsx
setError(err.message);
```
zapisuje treść błędu w stanie `error`.

## Krok 6. Kończysz ładowanie
```jsx
finally {
  setLoading(false);
}
```
Blok `finally` wykona się zarówno wtedy, gdy pobieranie się powiedzie, jak i wtedy, gdy wystąpi błąd.

Dlatego po zakończeniu próby pobierania ustawiasz:
```jsx
loading = false
```
Na koniec:
```jsx
load();
```
uruchamia wcześniej zdefiniowaną funkcję.

## 4. Filtrowanie książek – `filter()`
```jsx
const visible = books.filter((book) => 
  book.name.toLowerCase().includes(query.toLowerCase())
);
```
Ten fragment odpowiada za wyszukiwarkę.

Metoda `filter()` tworzy nową tablicę zawierającą tylko te elementy, które spełniają określony warunek.

Rozbijmy warunek na części:
```jsx
book.name.toLowerCase()
```
Zamienia nazwę książki na małe litery.
```jsx
query.toLowerCase()
```
Zamienia wpisany tekst na małe litery.
```jsx
.includes(...)
```
Sprawdza, czy nazwa książki zawiera wpisany tekst.

### Przykład działania
Załóżmy, że masz następujące książki:
```jsx
const books = [
  { id: 1, name: "Hobbit" },
  { id: 2, name: "Harry Potter" },
  { id: 3, name: "Wiedźmin" }
];
```
Jeśli użytkownik wpisze w wyszukiwarce "harry", otrzymasz:
```jsx
[
  { id: 2, name: "Harry Potter" }
]
```
### Dlaczego?

Hobbit nie zawiera tekstu harry.
Harry Potter zawiera tekst harry, jeśli porównujemy małe litery.
Wiedźmin nie zawiera tekstu harry.

Dzięki `toLowerCase()` wyszukiwanie nie rozróżnia wielkich i małych liter. Wpisanie HARRY, Harry lub harry da ten sam wynik.

### Co oznacza `book`?
```jsx
books.filter((book) => ...)
```
`book` reprezentuje pojedynczy element tablicy podczas sprawdzania warunku. Nazwę tę można zmienić, np. na `item`, ale `book` jest tutaj bardziej czytelne.

**Ważne**: visible to wynik filtrowania, a nie osobny stan. Nie musisz wywoływać setVisible, ponieważ lista wyników jest obliczana na podstawie books i query przy każdym renderowaniu.

## 5. Wyświetlanie szczegółów wybranej książki
```jsx
if (selected) {
  return <BookDetails book={selected} onBack={() => setSelected(null)} />;
}
```
To warunek, który decyduje, czy pokazujesz katalog, czy szczegóły konkretnej książki.

Na początku masz:
```jsx
const [selected, setSelected] = useState(null);
```
Wartość `null` oznacza, że żadna książka nie została wybrana.

Kiedy użytkownik wybierze książkę, komponent `BookCard` otrzymuje funkcję `setSelected` i może jej użyć, aby zapisać wybraną książkę w stanie.

Wtedy `selected` będzie zawierać obiekt książki, a warunek:
```jsx
if (selected)
```
będzie prawdziwy.

React zwróci wówczas:
```jsx
<BookDetails
  book={selected}
  onBack={() => setSelected(null)}
/>
```
Przekazujesz tutaj dwa propsy:

1. `book={selected}` – przekazujesz dane wybranej książki.
2. `onBack={() => setSelected(null)}` – przekazujesz funkcję powrotu do katalogu.

Gdy użytkownik kliknie przycisk powrotu w komponencie `BookDetails`, wywołanie tej funkcji ustawi `selected` na `null`. React ponownie wyświetli katalog.

Można to przedstawić tak:

|-|
|---|
|<div align="center">**Katalog książek**<br>`selected = null`<br>**⇓**</div>|
|<div align="center">**Użytkownik wybiera Książkę**<br>`setSelected(book)`<br>**⇓**</div>|
|<div align="center">**`BookDetails`**<br>`selected` zawiera wybraną Książkę</div>|
|<div align="center">**⇑**<br>Kliknięcie powrotu wywołuje `setSelected(null)` i przywraca katalog.</div>|

Ten mechanizm pozwala przełączać widoki bez konieczności przechodzenia na inną stronę w przeglądarce.

## 6. Główny widok aplikacji
Jeśli żadna książka nie jest wybrana, kod przechodzi do:
```jsx
return (
  <main>
    <h1>Katalog Książek</h1>
    ...
  </main>
);
```
Element `<main>` to semantyczny element HTML oznaczający główną treść strony.

Nagłówek
```jsx
<h1>Katalog Książek</h1>
```
Wyświetla tytuł aplikacji.
### Pole wyszukiwania
```jsx
<input 
  type="text"
  placeholder="Szukaj Książki..."
  value={query}
  onChange={(event) => setQuery(event.target.value)}
/>
```
To kontrolowane pole formularza.

Najważniejsze są tutaj dwa propsy:
```jsx
value={query}
```
Ustawia tekst widoczny w polu na aktualną wartość stanu query.
```jsx
onChange={(event) => setQuery(event.target.value)}
```
Reaguje na zmianę tekstu. `event.target.value` oznacza aktualną zawartość pola.

Przykładowo, gdy wpiszesz literę H, React wywoła `setQuery("H")`. Następnie ponownie obliczy `visible` i wyświetli pasujące książki.

W efekcie wyszukiwanie odbywa się na bieżąco, bez konieczności klikania przycisku „Szukaj”.

## 7. Komunikat o ładowaniu
```jsx
{loading && <p>Ładowanie produktów...</p>}
```
Tutaj używasz krótkiego zapisu warunkowego z operatorem `&&`. Możesz go czytać tak:
- Jeśli `loading` jest prawdziwe, wyświetl tekst „Ładowanie produktów...”.
- Jeśli `loading` jest fałszywe, nie wyświetlaj tego tekstu.

Warto zauważyć, że aplikacja dotyczy książek, więc tekst Ładowanie produktów... można zmienić na bardziej pasujący:
```jsx
{loading && <p>Ładowanie książek...</p>}
```
To nie zmienia działania aplikacji, a poprawia komunikat dla użytkownika.

## 8. Wyświetlanie błędu
```jsx
{error && (
  <p className="error">
    Nie udało się pobrać danych: {error}
  </p>
)}
```
Jeżeli `error` zawiera tekst błędu, pojawi się komunikat.

Przykładowo, gdy `error` ma wartość `"Network Error"`, użytkownik zobaczy:
```
Nie udało się pobrać danych: Network Error
```
Klasa CSS:
```jsx
className="error"
```
umożliwia ostylowanie komunikatu, np. nadanie mu czerwonego koloru. Sam kod JSX nie określa jednak tego wyglądu – potrzebna jest odpowiednia reguła CSS.

## 9. Komunikat o braku wyników
```jsx
{!loading && !error && visible.length === 0 && (
  <p>Nic nie pasuje do wyszukiwania</p>
)}
```
Tutaj sprawdzasz jednocześnie trzy warunki:

1. `!loading` – dane nie są już pobierane.
2. `!error` – nie wystąpił błąd.
3. `visible.length === 0` – lista pasujących książek jest pusta.

Dopiero gdy wszystkie trzy warunki są spełnione, pojawi się komunikat
```
„Nic nie pasuje do wyszukiwania”.
```

### Dlaczego to ważne?
Bez tych warunków aplikacja mogłaby wyświetlać komunikat o braku wyników, zanim dane zdążą się pobrać, albo jednocześnie z komunikatem o błędzie.

## 10. Wyświetlanie listy książek
```jsx
{!loading && !error && (
  <div className="grid">
    {visible.map((book) => (
      <BookCard
        key={book.id}
        book={book}
        onSelect={setSelected}
      />
    ))}
  </div>
)}
```
To fragment, który generuje karty książek.

### Dlaczego używasz map()?
Metoda `map()` przechodzi przez każdy element tablicy i tworzy nowy wynik.

W tym przypadku dla każdej książki tworzysz komponent `BookCard`.

Jeżeli `visible` zawiera trzy książki, powstaną trzy karty.

### Co oznacza `key={book.id}`?
```jsx
key={book.id}
```
React używa właściwości `key`, aby rozpoznawać poszczególne elementy listy podczas aktualizacji widoku.

Najlepiej, żeby `book.id` był unikalny dla każdej książki.

### Co oznacza `book={book}`?
Przekazujesz obiekt książki do komponentu `BookCard`. Dzięki temu komponent może wyświetlić jej nazwę, autora, okładkę lub inne informacje, jeśli znajdują się w danych i jego implementacja je obsługuje.

### Co oznacza `onSelect={setSelected}`?
Przekazujesz do `BookCard` funkcję, która zapisuje wybraną książkę w stanie `selected`.

W uproszczeniu komponent `BookCard` może zawierać coś takiego:
```jsx
function BookCard({ book, onSelect }) {
  return (
    <div onClick={() => onSelect(book)}>
      <h2>{book.name}</h2>
    </div>
  );
}
```
To przykładowa implementacja ilustrująca działanie propsów. Jeśli użytkownik kliknie kartę, wywoła się `onSelect(book)`, a więc w Twoim `App.jsx` zostanie wykonane `setSelected(book)`.

Klasa `grid` prawdopodobnie odpowiada w CSS za ułożenie kart w siatkę, np. w kilku kolumnach.

## 11. Eksport komponentu
```jsx
export default App;
```
Ta instrukcja umożliwia importowanie komponentu App w innym pliku, np. w pliku wejściowym aplikacji:
```jsx
import App from "./App";
```
Bez eksportu domyślnego nie można byłoby w ten sposób zaimportować komponentu.
## 12. Jak cała aplikacja działa w praktyce?
### 1. Uruchomienie aplikacji
`useEffect` uruchamia `fetchBooks()`. Pojawia się komunikat o ładowaniu.
### 2. Wyświetlenie książek
Dane trafiają do `books`, a `map()` tworzy karty `BookCard`.
### 3. Wyszukiwanie
Zmiana `query` powoduje ponowne filtrowanie tablicy `books` i aktualizację wyników.
### 4. Wybór książki
`setSelected(book)` zapisuje książkę, a aplikacja wyświetla `BookDetails`.
### 5. Powrót do katalogu
`setSelected(null)` przywraca główny widok.

## 13. Co warto zapamiętać?
W tym kodzie najważniejsze są cztery mechanizmy Reacta:

|Mechanizm|Do czego służy?|
|---|---|
|`useState`|Przechowuje zmieniające się dane|
|`useEffect`|Uruchamia pobieranie danych po zamontowaniu komponentu|
|`filter()`|Wybiera książki pasujące do wyszukiwania|
|`map()`|Tworzy komponent dla każdej książki|

Dodatkowo:

- `try` / `catch` / `finally` obsługuje pobieranie danych i błędy.
- `&&` pozwala warunkowo wyświetlać komunikaty i elementy strony.
- Propsy (`book`, `onSelect`, `onBack`) umożliwiają przekazywanie danych i funkcji między komponentami.
- `return` z warunkiem `if (selected)` pozwala przełączać widok katalogu na widok szczegółów.

**Na koniec jedna istotna rzecz**: masz już stany `genre`, `sortBy` i `sortDirection`, ale aktualnie nie wpływają one na wynik. Jeśli zamierzasz rozbudować katalog, możesz wykorzystać je do filtrowania według gatunku oraz sortowania książek po nazwie rosnąco lub malejąco.

Najlepszy sposób na dalszą naukę to teraz przeanalizować plik `BookCard.jsx`, bo właśnie tam zobaczysz, jak karta książki odbiera dane i wywołuje onSelect, aby otworzyć szczegóły.
