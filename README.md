# Biblioteka – Aplikacja Full-Stack

Projekt składa się z backendu API wykonanego w technologii Django oraz frontendu w React i Vite. Backend udostępnia książki zapisane w bazie SQLite, szczegóły pojedynczej książki, informacje o API oraz statystyki. Frontend pobiera dane i listę gatunków z backendu, a następnie umożliwia wyszukiwanie, filtrowanie i sortowanie książek. **Frontend wymaga działającego backendu API.**

## Technologie

- Python 3.12
- Django 6.1.1 (wersja przypięta w `backend/requirements.txt`)
- Django JsonResponse
- SQLite
- Django ORM – modele książek, autorów i gatunków
- React
- Vite
- JavaScript
- Node.js i npm

## Struktura projektu
```
bib-fullstack-5b-zstil/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── core/
│   │   ├── settings.py
│   │   └── urls.py
│   └── bib/
│       ├── data.py
│       ├── models.py
│       ├── admin.py
│       ├── urls.py
│       ├── views.py
│       ├── migrations/
│       └── management/commands/automate_records.py
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── api.js
│       ├── format.js
│       ├── main.jsx
│       ├── assets/
│       └── components/
│           ├── BookCard.jsx
│           └── BookDetails.jsx
├── docs/
│   ├── README.MD
│   ├── baza.md
│   ├── cors.md
│   ├── dowod_na_stany.md
│   ├── importowanie_danych.md
│   ├── kontrakt.md
│   ├── orm.md
│   ├── react.md
│   ├── statistics.md
│   └── wyjasnienie_zaktualizowanego_kodu_w_app.md
├── assets/
│   └── screenshots/
└── README.md
```
## Endpointy API

Bazowy adres API: `http://127.0.0.1:8000/api/`

|Metoda|Adres|Opis|Przykładowa odpowiedź|
|---|---|---|---|
|GET|/api/health/|Sprawdza, czy serwer i baza danych działają|`{"status": "ok", "database": true}`|
|GET|/api/endpoint/|Zwraca książki z bazy danych; opcjonalnie filtruje po gatunku przez `?genre=`|`[{...}]`|
|GET|/api/endpoint/&lt;id&gt;/|Zwraca książkę o podanym ID|`{"id": 1, "name": "...", ...}`|
|GET|/api/endpoint/&lt;filter&gt;/&lt;value&gt;|Filtruje przykładowe dane z `backend/bib/data.py` po wskazanym polu|`{"books": [...]}`|
|GET|/api/info/|Zwraca informacje o aplikacji i bazie danych|`{"application": "Shop API", ...}`|
|GET|/api/statistics/|Zwraca statystyki dotyczące książek z bazy danych|`{"bookAmountByCategory": [...], ...}`|
## Domeny
### 1. Health check
`GET /api/health/`
Sprawdza, czy backend działa poprawnie i czy można nawiązać połączenie z bazą danych.

Przykład:
```
GET http://127.0.0.1:8000/api/health/
```
Przykładowa odpowiedź:
```
{
    "status": "ok",
    "database": true
}
```

W przypadku problemu z połączeniem z bazą danych endpoint zwraca status `HTTP 503 Service Unavailable`.

### 2. Lista książek
Endpoint zwraca książki zapisane w bazie danych. Można dodać je ręcznie w panelu admina albo zaimportować przykładowy zestaw z pliku `backend/bib/data.py` za pomocą komendy `automate_records`.

Aby zaimportować przykładowe dane, będąc w katalogu `backend`, uruchom:
```
python manage.py automate_records
```
Następnie można wejść na `GET /api/endpoint/`. URL zwraca wszystkie książki znajdujące się w bazie danych. Możliwe jest również filtrowanie po gatunku za pomocą parametru `genre`.

Przykład:
```
GET http://127.0.0.1:8000/api/endpoint/
```
Przykładowa odpowiedź:
```
[
    {
        "id": 1,
        "name": "Ogniem i mieczem",
        "author": "Henryk Sienkiewicz",
        "price": "39.99",
        "stock": 12,
        "genre": "Powieść historyczna",
        "created_at": "2026-01-01T12:00:00+01:00"
    }
]
```
Przykład filtrowania po gatunku:
```
GET http://127.0.0.1:8000/api/endpoint/?genre=Powieść
```

Odpowiedź zawiera listę książek należących do wskazanego gatunku.

### 3. Szczegóły książki

`GET /api/endpoint/<id>/`
Zwraca jedną książkę na podstawie jej ID.

Przykład:
```
GET http://127.0.0.1:8000/api/endpoint/8/
```

Odpowiedź:
```
{
    "id": 8,
    "name": "Zemsta",
    "author": "Aleksander Fredro",
    "price": "19.90",
    "stock": 7,
    "genre": "Komedia",
    "created_at": "2026-01-01T12:00:00+01:00"
}
```
Jeżeli książka o podanym ID nie istnieje:
```
{
    "error": "Book 999 not found"
}
```

Status HTTP: `404 Not Found`

### 4. Filtrowanie książek (ograniczone)

`GET /api/endpoint/<filter>/<value>` (bez końcowego ukośnika)

Endpoint wykonuje dokładne dopasowanie do przykładowych danych `backend/bib/data.py`, a nie do bazy danych. Filtrowanie działa dla tekstowych pól `title`, `author` i `category`. Pola `id`, `price` i `stock` są liczbowe, więc obecnie nie dopasują wartości przekazanej w adresie jako tekst. Dostępne klucze w danych to:
- id
- title
- author
- price
- category
- stock

#### Filtrowanie po kategorii

Przykład:
```
GET http://127.0.0.1:8000/api/endpoint/category/Komedia
```
Odpowiedź:
```
{
    "books": [
        {
            "id": 8,
            "title": "Zemsta",
            "author": "Aleksander Fredro",
            "price": 19.9,
            "category": "Komedia",
            "stock": 7
        }
    ]
}
```
#### Filtrowanie po autorze
Przykład:
```
GET http://127.0.0.1:8000/api/endpoint/author/Henryk%20Sienkiewicz
```
Zwraca wszystkie książki Henryka Sienkiewicza.

#### Filtrowanie po tytule

Przykład:
```
GET http://127.0.0.1:8000/api/endpoint/title/Lalka
```

Zwraca książki pasujące do podanego tytułu. Jeżeli nie znaleziono żadnej pasującej książki, API zwraca status 404 Not Found.

### 5. Informacje o aplikacji
```
GET /api/info/
```
Zwraca informacje dotyczące aplikacji, wersji, używanej wersji Pythona i Django oraz danych znajdujących się w bazie danych.

Przykład:
```
GET http://127.0.0.1:8000/api/info/
```
Przykładowa odpowiedź:
```
{
    "application": "Shop API",
    "app_version": "0.2.0",
    "python_version": "3.12.0",
    "django_version": "6.1.2",
    "data_source": {
        "type": "sqlite",
        "engine": "sqlite3",
        "record_count": 12,
        "categories": [
            "Dramat",
            "Dramat romantyczny",
            "Epopeja",
            "Komedia",
            "Literatura wojenna",
            "Powieść",
            "Powieść historyczna",
            "Powieść realistyczna"
        ]
    },
    "uptime_seconds": 25.4
}
```
Wartości w odpowiedzi zależą od aktualnej konfiguracji aplikacji, danych w bazie i czasu działania serwera.

### 6. Statystyki
```
GET /api/statistics/
```
Zwraca statystyki dotyczące książek.

Przykład:
```
GET http://127.0.0.1:8000/api/statistics/
```
Odpowiedź zawiera między innymi:
- liczbę książek według kategorii,
- liczbę książek według autora,
- stan magazynowy według kategorii,
- stan magazynowy według tytułu,
- stan magazynowy według autora,
- potencjalny przychód według tytułu,
- średnią cenę książki.

Przykładowa odpowiedź:
```
{
    "bookAmountByCategory": [
        "Dramat: 1",
        "Dramat romantyczny: 1",
        "Epopeja: 1",
        "Komedia: 1",
        "Literatura wojenna: 1",
        "Powieść: 2",
        "Powieść historyczna: 4",
        "Powieść realistyczna: 1"
    ],
    "bookAmountByAuthor": [
        "Adam Mickiewicz: 1",
        "Aleksander Fredro: 1",
        "Aleksander Kamiński: 1",
        "Bolesław Prus: 1",
        "Henryk Sienkiewicz: 4",
        "Juliusz Słowacki: 1",
        "Stanisław Wyspiański: 1",
        "Stefan Żeromski: 1",
        "Witold Gombrowicz: 1"
    ],
    "bookStockByCategory": [
        "Dramat: 6",
        "Dramat romantyczny: 7",
        "Epopeja: 13",
        "Komedia: 7",
        "Literatura wojenna: 10",
        "Powieść: 19",
        "Powieść historyczna: 45",
        "Powieść realistyczna: 15"
    ],
    "bookStockByTitle": [
        "Balladyna: 7",
        "Ferdydurke: 11",
        "Kamienie na szaniec: 10",
        "Krzyżacy: 9",
        "Lalka: 15",
        "Ogniem i mieczem: 12",
        "Pan Tadeusz: 13",
        "Potop: 10",
        "Przedwiośnie: 8",
        "Quo Vadis: 14",
        "Wesele: 6",
        "Zemsta: 7"
    ],
    "bookStockByAuthor": [
        "Adam Mickiewicz: 13",
        "Aleksander Fredro: 7",
        "Aleksander Kamiński: 10",
        "Bolesław Prus: 15",
        "Henryk Sienkiewicz: 45",
        "Juliusz Słowacki: 7",
        "Stanisław Wyspiański: 6",
        "Stefan Żeromski: 8",
        "Witold Gombrowicz: 11"
    ],
    "potentialProfitByTitle": [
        "Balladyna: 174.93",
        "Ferdydurke: 324.5",
        "Kamienie na szaniec: 329.9",
        "Krzyżacy: 330.75",
        "Lalka: 523.5",
        "Ogniem i mieczem: 479.88",
        "Pan Tadeusz: 337.87",
        "Potop: 420.0",
        "Przedwiośnie: 220.0",
        "Quo Vadis: 447.86",
        "Wesele: 137.94",
        "Zemsta: 139.3"
    ],
    "avgBookPrice": 30.79
}
```
Wartości statystyk są obliczane na podstawie aktualnych danych zapisanych w bazie danych. Powyższy przykład odpowiada przykładowym książkom po zaimportowaniu ich do pustej bazy.

## Uruchomienie backendu

Instrukcja zakłada, że na komputerze jest zainstalowany Python 3.12.

### 1. Pobranie repozytorium

Sklonuj repozytorium:
```
git clone https://github.com/OskarSkoraZSTIL/bib-fullstack-5b-zstil.git
```
Następnie przejdź do katalogu projektu:
```
cd bib-fullstack-5b-zstil
```
Przejdź do katalogu backendu:
```
cd backend
```
### 2. Utworzenie środowiska wirtualnego

Utwórz środowisko wirtualne:
```
python -m venv venv
```
### 3. Aktywacja środowiska
#### Windows
W PowerShell:
```
.\venv\Scripts\Activate.ps1
```
W CMD:
```
venv\Scripts\activate
```
Po aktywacji powinien pojawić się przedrostek (venv) przed ścieżką w terminalu.

#### Linux / macOS
```
source venv/bin/activate
```
### 4. Instalacja zależności

Zainstaluj wymagane biblioteki:
```
pip install -r requirements.txt
```
Projekt wykorzystuje między innymi:
- Django 6.1.1,
- Asgiref 3.12.1,
- Sqlparse 0.6.0,
- Tzdata 2026.3.
### 5. Przygotowanie bazy danych
Backend wczytuje konfigurację z `backend/.env`, a `SECRET_KEY` jest wymagany. Przed migracjami utwórz plik na podstawie przykładu (będąc w katalogu `backend`):
```
copy .env.example .env
```
W systemie Linux/macOS użyj `cp .env.example .env`. Uzupełnij `SECRET_KEY` w pliku `.env`; nie udostępniaj ani nie commituj tego pliku.

Zastosuj migracje Django:
```
python manage.py migrate
```
Dane książek, autorów i gatunków są przechowywane w bazie SQLite.

Jeżeli baza nie zawiera jeszcze książek, zaimportuj przykładowe rekordy:
```
python manage.py automate_records
```

### 6. Uruchomienie serwera

Będąc w katalogu backend, uruchom:
```
python manage.py runserver
```

Django uruchomi serwer deweloperski, domyślnie pod adresem `http://127.0.0.1:8000/.`

### 7. Sprawdzenie działania

W przeglądarce można wejść na `http://127.0.0.1:8000/api/health/.` Jeżeli wszystko działa prawidłowo, powinien pojawić się:
```
{
    "status": "ok",
    "database": true
}
```

Można również sprawdzić listę książek:
```
http://127.0.0.1:8000/api/endpoint/
```
#### Przykładowe adresy do testowania

Po uruchomieniu serwera można przetestować:
```
http://127.0.0.1:8000/api/health/

http://127.0.0.1:8000/api/endpoint/

http://127.0.0.1:8000/api/endpoint/8/

http://127.0.0.1:8000/api/endpoint/?genre=Powieść

http://127.0.0.1:8000/api/endpoint/category/Komedia

http://127.0.0.1:8000/api/endpoint/author/Henryk%20Sienkiewicz

http://127.0.0.1:8000/api/info/

http://127.0.0.1:8000/api/statistics/
```
#### Zatrzymanie serwera
Aby zatrzymać działający serwer Django, należy nacisnąć Ctrl + C. Środowisko wirtualne można następnie opuścić poleceniem deactivate.


### 8. Zmienne środowiskowe — backend

Konfiguracja backendu znajduje się w pliku `backend/.env`. Przed uruchomieniem aplikacji skopiuj `backend/.env.example` do `backend/.env` i uzupełnij wymagane wartości.

| Zmienna | Opis | Przykładowa wartość |
|---|---|---|
| `SECRET_KEY` | Klucz bezpieczeństwa Django. Należy ustawić własny, poufny klucz. | `wstaw-wlasny-klucz` |
| `DEBUG` | Włącza tryb debugowania. W środowisku lokalnym może mieć wartość `True`. | `True` |
| `ALLOWED_HOSTS` | Lista hostów, z których można uzyskać dostęp do aplikacji; elementy oddzielone przecinkami. | `localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | Lista originów frontendu dozwolonych przez CORS; adresy oddzielone przecinkami, bez końcowego ukośnika. | `http://localhost:5173,http://127.0.0.1:5173` |

Pliki `.env` zawierają lokalną konfigurację i nie powinny być dodawane do repozytorium. Przykładowe pliki konfiguracyjne to `backend/.env.example` i `frontend/.env.example`.
W środowisku produkcyjnym ustaw `DEBUG=False` i skonfiguruj własne wartości klucza, hostów oraz dozwolonych originów.


## Frontend

Frontend to aplikacja React uruchamiana przez Vite. Pobiera listę książek z `/api/endpoint/` oraz gatunki z `/api/info/`; wyszukiwanie, filtrowanie i sortowanie odbywają się po stronie frontendu. Szczegóły książki są pobierane z `/api/endpoint/<id>/`.

**Backend musi działać, zanim uruchomisz frontend.** Uruchom obie części w osobnych terminalach, w tej kolejności:
1. Skonfiguruj i uruchom backend zgodnie z sekcją „Uruchomienie backendu” powyżej. Pozostaw serwer Django działający pod `http://127.0.0.1:8000/`.
2. W drugim terminalu skonfiguruj i uruchom frontend zgodnie z poniższą instrukcją. Otwórz adres Vite, zwykle `http://localhost:5173/`.

Jeśli frontend nie może połączyć się z API, sprawdź, czy backend nadal działa oraz czy `VITE_API_URL` i `CORS_ALLOWED_ORIGINS` są zgodne z używanymi adresami.

### 1. Uruchomienie frontendu

Wymagany jest Node.js z npm. W nowym terminalu przejdź do katalogu frontendu:
```
cd frontend
```

Zainstaluj zależności:
```
npm install
```

Utwórz plik konfiguracyjny przed uruchomieniem Vite:
```
copy .env.example .env
```
W systemie Linux/macOS użyj `cp .env.example .env`.

Uruchom serwer deweloperski:
```
npm run dev
```

Frontend będzie dostępny pod adresem `http://localhost:5173/`.


### 2. Zmienne środowiskowe — frontend

Frontend odczytuje konfigurację z `frontend/.env`, utworzonego z `frontend/.env.example` zgodnie z instrukcją powyżej.

| Zmienna | Opis | Przykładowa wartość |
|---|---|---|
| `VITE_API_URL` | Bazowy adres API backendu. Frontend dokleja do niego ścieżki endpointów, takie jak `/endpoint/` i `/info/`. Nie dodawaj końcowego ukośnika. | `http://localhost:8000/api` |

Po zmianie `VITE_API_URL` uruchom ponownie serwer Vite. Zmienne dostępne w kodzie przeglądarkowym Vite muszą mieć prefiks `VITE_`. **Nie umieszczaj w pliku frontendu haseł, kluczy prywatnych ani innych sekretów**, ponieważ wartości te mogą zostać udostępnione użytkownikom aplikacji.
