# Biblioteka – Backend API

Projekt przedstawia prosty backend API wykonany w technologii Django. Aplikacja udostępnia informacje o książkach, pozwala wyszukiwać książki po ID oraz filtrować je według wybranego pola. Dane książek są przechowywane w bazie danych SQLite.

## Technologie

- Python 3.12
- Django 6.1.2
- Django JsonResponse
- SQLite
- Django ORM – modele książek, autorów i gatunków

## Struktura projektu
```
bib-fullstack-5b-zstil/
└── backend/
    ├── manage.py
    ├── requirements.txt
    ├── db.sqlite3
    ├── core/
    │   ├── settings.py
    │   └── urls.py
    └── bib/
        ├── data.py
        ├── models.py
        ├── admin.py
        ├── urls.py
        └── views.py
```
## Endpointy API

Bazowy adres API: `http://127.0.0.1:8000/api/`

|Metoda|Adres|Opis|Przykładowa odpowiedź|
|---|---|---|---|
|GET|/api/health/|Sprawdza, czy serwer i baza danych działają|{"status": "ok", "database": true}
|GET|/api/endpoint/|Zwraca listę książek z bazy danych|[{...}]|
|GET|/api/endpoint/&lt;id&gt;/|Zwraca książkę o podanym ID|{"id": 1, "name": "...", ...}|
|GET|/api/endpoint/&lt;filter&gt;/&lt;value&gt;|Filtruje książki według wybranego pola **(NIE SKOŃCZONE)**|{"books": [...]}|
|GET|/api/info/|Zwraca informacje o aplikacji i bazie danych|{"application": "Shop API", ...}|
|GET|/api/statistics/|Zwraca statystyki dotyczące książek|{"bookAmountByCategory": [...], ...}|
## Domeny
### 1. Health check
`GET /api/health/`
Sprawdza, czy backend działa poprawnie i czy można nawiązać połączenie z bazą danych.

Przykład:
```
GET http://127.0.0.1:8000/api/health/
```
Odpowiedź:
```
{
    "status": "ok",
    "database": true
}
```

W przypadku problemu z połączeniem z bazą danych endpoint zwraca status `HTTP 503 Service Unavailable`.

### 2. Lista wszystkich książek
Zanim można sprawdzić listę, trzeba najpierw stworzyć dane w Bazie Danych Django. Można dodać swoje dane manualnie, aczkolwiek aplikacja zawiera wbudowany plik z gotowymi danymi pod `backend/bib/data.py`. Sam plik w sobie nic nie robi - nie jest on używany gdziekolwiek w jakimkolwiek zanczącym sensie, po prostu przechowuje gotowe dane aby *zaimportować* je do bazy danych w Django.

Aby to zrobić, w CMD trzeba wpisać komendę:
```
python manage.py automate_records
```
Po wpisaniu komendy, aby sprawdzić rekordy w aplikacji a nie panelu admin'a, można wejść na `GET /api/endpoint/`. URL zwraca wszystkie książki znajdujące się w bazie danych. Możliwe jest również filtrowanie po gatunku za pomocą parametru genre.

Przykład:
```
GET http://127.0.0.1:8000/api/endpoint/
```
Odpowiedź:
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

### 4. Filtrowanie książek <u>**(NIE DZIAŁA)**</u>

`GET /api/endpoint/<filter>/<value>`

Pozwala wyszukiwać książki na podstawie wybranego pola. Dostępne pola wynikają ze struktury danych książki:
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

#### iltrowanie po tytule

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
        "record_count": 11,
        "categories": [
            "Dramat",
            "Epopeja",
            "Komedia",
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
        "Epopeja: 1",
        "Komedia: 1",
        "Powieść: 2",
        "Powieść historyczna: 4",
        "Powieść realistyczna: 1"
    ],
    "bookAmountByAuthor": [
        "Adam Mickiewicz: 1",
        "Aleksander Fredro: 1",
        "Bolesław Prus: 1"
    ],
    "bookStockByCategory": [
        "Dramat: 6",
        "Epopeja: 13",
        "Komedia: 7"
    ],
    "bookStockByTitle": [
        "Ferdydurke: 11",
        "Krzyżacy: 9",
        "Lalka: 15"
    ],
    "bookStockByAuthor": [
        "Aleksander Fredro: 7",
        "Henryk Sienkiewicz: 45"
    ],
    "potentialProfitByTitle": [
        "Ferdydurke: 324.5",
        "Krzyżacy: 330.75",
        "Lalka: 523.5"
    ],
    "avgBookPrice": 30.35
}
```
Wartości statystyk są obliczane na podstawie aktualnych danych zapisanych w bazie danych.

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
- Django 6.1.2,
- Asgiref 3.12.1,
- Sqlparse 0.6.0,
- Tzdata 2026.5.
### 5. Przygotowanie bazy danych
Utwórz i zastosuj migracje Django:
```
python manage.py makemigrations
python manage.py migrate
```
Dane książek, autorów i gatunków są przechowywane w bazie SQLite.

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