# Różnice w Wersjach
Różnice endpointów pomiędzy wersjami `0.1.0` a `0.2.0` aplikacji.

## Różnice w `api/endpoint/`
### Wersja 0.1.0
W wersji `0.1.0` aplikacja zmuszała Python'a do liczenia przedmiotów w liście `BOOKS` w wewnętrznym pliku `data.py`, i wypisywało pod `api/endpoint/` w taki sposób, sortując po id'kach:
```json
{
  "books": [
    {
      "id": 0,
      "title": "",
      "author": "",
      "price": 0,
      "category": "",
      "stock": 0
    },
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
    },
    {
      "id": 3,
      "title": "Lalka",
      "author": "Bolesław Prus",
      "price": 34.9,
      "category": "Powieść realistyczna",
      "stock": 15
    },
    {
      "id": 4,
      "title": "Wesele",
      "author": "Stanisław Wyspiański",
      "price": 22.99,
      "category": "Dramat",
      "stock": 6
    },
    {
      "id": 5,
      "title": "Potop",
      "author": "Henryk Sienkiewicz",
      "price": 42,
      "category": "Powieść historyczna",
      "stock": 10
    },
    {
      "id": 6,
      "title": "Krzyżacy",
      "author": "Henryk Sienkiewicz",
      "price": 36.75,
      "category": "Powieść historyczna",
      "stock": 9
    },
    {
      "id": 7,
      "title": "Quo Vadis",
      "author": "Henryk Sienkiewicz",
      "price": 31.99,
      "category": "Powieść historyczna",
      "stock": 14
    },
    {
      "id": 8,
      "title": "Zemsta",
      "author": "Aleksander Fredro",
      "price": 19.9,
      "category": "Komedia",
      "stock": 7
    },
    {
      "id": 9,
      "title": "Ferdydurke",
      "author": "Witold Gombrowicz",
      "price": 29.5,
      "category": "Powieść",
      "stock": 11
    },
    {
      "id": 10,
      "title": "Pan Tadeusz",
      "author": "Adam Mickiewicz",
      "price": 25.99,
      "category": "Epopeja",
      "stock": 13
    }
  ]
}
```

### Wersja 0.2.0
W wersji `0.2.0` aplikacja nawoływuje stworzoną bazę danych do działania na swoich własnych rekordach, <u>*na podstawie*</u> wewnętrznego pliku `data.py`, ale nie na samym pliku. Baza danych pozyskała rekordy z tego pliku za pomocą komendy `python manage.py automate_records`, i po wejściu na `api/endpoint/` wypisuje rekordy w taki sposób, sortując alfabetycznie po nazwach:
```json
[
  {
    "id": 12,
    "name": "Balladyna",
    "author": "Juliusz Słowacki",
    "price": "24.99",
    "stock": 7,
    "genre": "Dramat romantyczny",
    "created_at": "2026-10-13T06:36:15.327366+00:00"
  },
  {
    "id": 9,
    "name": "Ferdydurke",
    "author": "Witold Gombrowicz",
    "price": "29.50",
    "stock": 11,
    "genre": "Powieść",
    "created_at": "2026-10-13T06:36:15.323370+00:00"
  },
  {
    "id": 11,
    "name": "Kamienie na szaniec",
    "author": "Aleksander Kamiński",
    "price": "32.99",
    "stock": 10,
    "genre": "Literatura wojenna",
    "created_at": "2026-10-13T06:36:15.326365+00:00"
  },
  {
    "id": 6,
    "name": "Krzyżacy",
    "author": "Henryk Sienkiewicz",
    "price": "36.75",
    "stock": 9,
    "genre": "Powieść historyczna",
    "created_at": "2026-10-13T06:36:15.319362+00:00"
  },
  {
    "id": 3,
    "name": "Lalka",
    "author": "Bolesław Prus",
    "price": "34.90",
    "stock": 15,
    "genre": "Powieść realistyczna",
    "created_at": "2026-10-13T06:36:15.316356+00:00"
  },
  {
    "id": 1,
    "name": "Ogniem i mieczem",
    "author": "Henryk Sienkiewicz",
    "price": "39.99",
    "stock": 12,
    "genre": "Powieść historyczna",
    "created_at": "2026-10-13T06:36:15.312360+00:00"
  },
  {
    "id": 10,
    "name": "Pan Tadeusz",
    "author": "Adam Mickiewicz",
    "price": "25.99",
    "stock": 13,
    "genre": "Epopeja",
    "created_at": "2026-10-13T06:36:15.324368+00:00"
  },
  {
    "id": 5,
    "name": "Potop",
    "author": "Henryk Sienkiewicz",
    "price": "42.00",
    "stock": 10,
    "genre": "Powieść historyczna",
    "created_at": "2026-10-13T06:36:15.318355+00:00"
  },
  {
    "id": 2,
    "name": "Przedwiośnie",
    "author": "Stefan Żeromski",
    "price": "27.50",
    "stock": 8,
    "genre": "Powieść",
    "created_at": "2026-10-13T06:36:15.314358+00:00"
  },
  {
    "id": 7,
    "name": "Quo Vadis",
    "author": "Henryk Sienkiewicz",
    "price": "31.99",
    "stock": 14,
    "genre": "Powieść historyczna",
    "created_at": "2026-10-13T06:36:15.320360+00:00"
  },
  {
    "id": 4,
    "name": "Wesele",
    "author": "Stanisław Wyspiański",
    "price": "22.99",
    "stock": 6,
    "genre": "Dramat",
    "created_at": "2026-10-13T06:36:15.317355+00:00"
  },
  {
    "id": 8,
    "name": "Zemsta",
    "author": "Aleksander Fredro",
    "price": "19.90",
    "stock": 7,
    "genre": "Komedia",
    "created_at": "2026-10-13T06:36:15.322369+00:00"
  }
]
```

## Różnice w `api/endpoint/<id:int>`
### Wersja 0.1.0
W wersji `0.1.0`, po wpisaniu id przedmiotu w liście, pokazywał się sam przedmiot i nic więcej, w taki sposób: 
```json
{
  "id": 1,
  "title": "Ogniem i mieczem",
  "author": "Henryk Sienkiewicz",
  "price": 39.99,
  "category": "Powieść historyczna",
  "stock": 12
}
```
Natomiast po wpisaniu id który nie istnieje, np. `api/endpoint/20`, wypisywało:
```json
{
  "error": "Book 20 not found"
}
```
### Wersja 0.2.0
W wersji `0.2.0`, z racji tego że aplikacja działa na bazie danych a nie wewnętrznym pliku który przechowuje wszystkie dane, wypisuje on rekordy w inny sposób:
```json
{
  "id": 1,
  "name": "Ogniem i mieczem",
  "author": "Henryk Sienkiewicz",
  "price": "39.99",
  "stock": 12,
  "genre": "Powieść historyczna",
  "created_at": "2026-10-13T06:36:15.312360+00:00"
}
```
Jest to tak zrobione, ponieważ w bazie danych istnieje kolumna `genre` (Gatunek), a nie `category` (Kategoria). Dodano również moment utworzenia rekordu, który można zobaczyć pod `created_at`.

W przypadku wpisania rekordu który nie istnieje, tak jak np. `api/endpoint/20`, aplikacja wypisuje nam razem z kodem błędu `404`:
```json
{
  "error": "Book 20 not found"
}
```