# Dokumentacja bazy danych

## 1. Opis modeli i relacji

Baza danych zawiera trzy modele: `Author` (autor), `Genre` (gatunek) oraz `Book` (książka).

Model `Book` jest powiązany z modelem `Author` przez klucz obcy `author_id` oraz z modelem `Genre` przez klucz obcy `genre_id`. Jeden autor może mieć wiele książek, a jeden gatunek może być przypisany do wielu książek.

## 2. Uzasadnienie typów pól

Baza danych wykorzystuje SQLite.

### 1. Author:
| Pole | Typ Django | Typ SQL | Uzasadnienie |
|---|---|---|---|
| `id` | `BigAutoField` lub `AutoField` | `integer PRIMARY KEY AUTOINCREMENT` | Automatycznie generowany identyfikator jednoznacznie rozróżnia każdego autora. |
| `name` | `CharField(max_length=100, unique=True)` | `varchar(100) UNIQUE` | Nazwa autora jest tekstem o ograniczonej długości, a `unique=True` zapobiega duplikatom. |

### 2. Genre:
| Pole | Typ Django | Typ SQL | Uzasadnienie |
|---|---|---|---|
| `id` | `BigAutoField` lub `AutoField` | `integer PRIMARY KEY AUTOINCREMENT` | Automatyczny klucz główny zapewnia każdemu gatunkowi unikalny identyfikator. |
| `name` | `CharField(max_length=50, unique=True)` | `varchar(50) UNIQUE` | Nazwa gatunku jest krótkim tekstem, a ograniczenie unikalności zapobiega powtarzaniu nazw. |

### 3. Book (Główny Model):
| Pole | Typ Django | Typ SQL | Uzasadnienie |
|---|---|---|---|
| `id` | `BigAutoField` lub `AutoField` | `integer PRIMARY KEY AUTOINCREMENT` | Automatyczny identyfikator pozwala jednoznacznie zidentyfikować książkę. |
| `name` | `CharField(max_length=200)` | `varchar(200)` | Tytuł książki jest tekstem o określonej maksymalnej długości. |
| `price` | `DecimalField` | `decimal` | Cena wymaga typu dziesiętnego, który pozwala dokładniej reprezentować wartości pieniężne niż typ zmiennoprzecinkowy. |
| `stock` | `PositiveIntegerField` | `integer unsigned` oraz `CHECK (stock >= 0)` | Liczba egzemplarzy w magazynie jest nieujemną liczbą całkowitą. |
| `created_at` | `DateTimeField` | `datetime` | Pole przechowuje datę i godzinę utworzenia rekordu. |
| `author` | `ForeignKey(Author)` | `bigint` z odwołaniem do `bib_author(id)` | Klucz obcy łączy książkę z autorem i zapewnia integralność relacji. |
| `genre` | `ForeignKey(Genre)` | `bigint` z odwołaniem do `bib_genre(id)` | Klucz obcy przypisuje książkę do istniejącego gatunku. |

## 3. Dowód wygenerowanego SQL

Polecenie użyte do wygenerowania instrukcji SQL:

`python manage.py sqlmigrate bib 0001`

Wynik polecenia:

```sql
BEGIN;
--
-- Create model Author
--
CREATE TABLE "bib_author" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(100) NOT NULL UNIQUE);
--
-- Create model Genre
--
CREATE TABLE "bib_genre" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(50) NOT NULL UNIQUE);
--
-- Create model Book
--
CREATE TABLE "bib_book" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(200) NOT NULL, "price" decimal NOT NULL, "stock" integer unsigned NOT NULL CHECK ("stock" >= 0), "created_at" datetime NOT NULL, "author_id" bigint NOT NULL REFERENCES "bib_author" ("id") DEFERRABLE INITIALLY DEFERRED, "genre_id" bigint NOT NULL REFERENCES "bib_genre" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "bib_book_author_id_8da87c36" ON "bib_book" ("author_id");
CREATE INDEX "bib_book_genre_id_cbb223b3" ON "bib_book" ("genre_id");
COMMIT;
```

Wygenerowany SQL potwierdza utworzenie trzech tabel, kluczy głównych, ograniczeń unikalności, relacji kluczy obcych oraz indeksów dla pól relacyjnych.