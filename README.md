# Biblioteka – Backend API

Projekt przedstawia prosty backend API wykonany w technologii Django. Aplikacja udostępnia informacje o książkach, pozwala wyszukiwać książki po ID oraz filtrować je według wybranego pola.

## Technologie

Python 3.12
Django 6.1.1
Django JsonResponse
Dane książek przechowywane w pamięci jako lista słowników

## Struktura projektu

```bib-fullstack-5b-zstil/
└── backend/
    ├── manage.py
    ├── requirements.txt
    ├── core/
    │   ├── settings.py
    │   └── urls.py
    └── bib/
        ├── data.py
        ├── urls.py
        └── views.py
```

## Endpointy API
Bazowy adres API: ```http://127.0.0.1:8000/api/```


|Metoda|Adres|Opis|Przykładowa odpowiedź|
|------|-----|----|---------------------|
|GET|/api/health/|Sprawdza, czy serwer działa|{"status": "ok"}|
|GET|/api/endpoint/|Zwraca wszystkie książki|{"books": [...]}|
|GET|/api/endpoint/<id>/|Zwraca książkę o podanym ID|{"id": 1, "title": "Ogniem i mieczem", ...}|
|GET|/api/endpoint/<filter>/<value>|Zwraca wszystkie książki spełniające podany warunek|{"books": [...]}|
|GET|/api/info/|Zwraca informacje o aplikacji i danych|{"application": "Shop API", ...}|
|GET|/api/statistics/|Zwraca statystyki dotyczące książek|{"bookAmountByCategory": [...], ...}|

## Domeny
### 1. Health check
```GET /api/health/```
Sprawdza, czy backend działa poprawnie.

Przykład:
```
GET http://127.0.0.1:8000/api/health/
```

Odpowiedź:
```
{
    "status": "ok"
}
```

### 2. Lista wszystkich książek
```GET /api/endpoint/```
Zwraca wszystkie książki znajdujące się w danych aplikacji.

Przykład:
```
GET http://127.0.0.1:8000/api/endpoint/
```

Odpowiedź:
```
{
    "books": [
        {
            "id": 1,
            "title": "Ogniem i mieczem",
            "author": "Henryk Sienkiewicz",
            "price": 39.99,
            "category": "Powieść historyczna",
            "stock": 12
        },
        {
            "id": 2,
            "title": "Przedwiośnie",
            "author": "Stefan Żeromski",
            "price": 27.5,
            "category": "Powieść",
            "stock": 8
        }
    ]
}
```

### 3. Szczegóły książki
```GET /api/endpoint/<id>/```
Zwraca jedną książkę na podstawie jej ID.

Przykład:
```
GET http://127.0.0.1:8000/api/endpoint/8/
```

Odpowiedź:
```
{
    "id": 8,
    "title": "Zemsta",
    "author": "Aleksander Fredro",
    "price": 19.9,
    "category": "Komedia",
    "stock": 7
}
```

Jeżeli książka o podanym ID nie istnieje:
```
{
    "error": "Book 999 not found"
}
```

Status HTTP:
```
404 Not Found
```

### 4. Filtrowanie książek
```GET /api/endpoint/<filter>/<value>```
Pozwala wyszukiwać książki na podstawie wybranego pola.

Dostępne pola wynikają ze struktury książki:
```
id
title
author
price
category
stock
```

#### Filtrowanie po kategorii

Przykład:
```GET http://127.0.0.1:8000/api/endpoint/category/Komedia```

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
```GET http://127.0.0.1:8000/api/endpoint/author/Henryk%20Sienkiewicz```
Zwraca wszystkie książki Henryka Sienkiewicza.

#### Filtrowanie po tytule

Przykład:
```GET http://127.0.0.1:8000/api/endpoint/title/Lalka```

Zwraca książkę:
```
{
    "books": [
        {
            "id": 3,
            "title": "Lalka",
            "author": "Bolesław Prus",
            "price": 34.9,
            "category": "Powieść realistyczna",
            "stock": 15
        }
    ]
}
```
Jeżeli nie znaleziono żadnej pasującej książki, API zwraca status 404.

### 5. Informacje o aplikacji
```GET /api/info/```
Zwraca informacje dotyczące aplikacji, wersji, używanej wersji Pythona i Django oraz danych znajdujących się w pamięci.

Przykład:
```
GET http://127.0.0.1:8000/api/info/
```

Przykładowa odpowiedź:
```
{
    "application": "Shop API",
    "app_version": "0.1.0",
    "python_version": "3.12.0",
    "django_version": "6.1.1",
    "data_source": {
        "type": "in-memory list",
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

### 6. Statystyki
```GET /api/statistics/```
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

Po aktywacji powinien pojawić się przedrostek ```(venv)``` przed ścieżką w terminalu.

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
- Tzdata 2026.5.

### 5. Uruchomienie serwera

Będąc w katalogu backend, uruchom:
```
python manage.py runserver
```
Django uruchomi serwer developerski, domyślnie pod adresem ```http://127.0.0.1:8000/```

### 6. Sprawdzenie działania

W przeglądarce można wejść na: ```http://127.0.0.1:8000/api/health/```. Jeżeli wszystko działa prawidłowo, powinien pojawić się:
```
{
    "status": "ok"
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

http://127.0.0.1:8000/api/endpoint/category/Komedia

http://127.0.0.1:8000/api/endpoint/author/Henryk%20Sienkiewicz

http://127.0.0.1:8000/api/info/

http://127.0.0.1:8000/api/statistics/
```

## Zatrzymanie serwera

Aby zatrzymać działający serwer Django, należy nacisnąć Ctrl + C. Środowisko wirtualne można następnie opuścić poleceniem ```deactivate```.
