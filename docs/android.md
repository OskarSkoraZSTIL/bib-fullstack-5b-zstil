# Dane z JSON na Java w Android Studio

## JSON
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
    "stock": 0,
    "genre": "Dramat",
    "created_at": "2026-10-13T06:36:15.317355+00:00"
  },
  {
    "id": 8,
    "name": "Zemsta",
    "author": "Aleksander Fredro",
    "price": "19.90",
    "stock": 6,
    "genre": "Komedia",
    "created_at": "2026-10-13T06:36:15.322369+00:00"
  }
]
```

## Java
```java
package com.example.sklep;

public class Product {

    private final int id;
    private final String name;
    private final String author;
    private final String price;
    private final int stock;
    private final String genre;

    public Product(int id, String name, String author,
                   String price, int stock, String genre) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.price = price;
        this.stock = stock;
        this.genre = genre;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAuthor() {
        return author;
    }

    public String getPrice() {
        return price;
    }

    public int getStock() {
        return stock;
    }

    public String getGenre() {
        return genre;
    }
}
```

## Dlaczego findViewById znajduje się w konstruktorze ViewHolder?

findViewById znajduje się w konstruktorze ViewHolder, ponieważ służy do wyszukania elementów widoku, takich jak pola tekstowe, i wystarczy zrobić to tylko raz podczas tworzenia danego wiersza listy.

RecyclerView ponownie wykorzystuje utworzone już widoki podczas przewijania listy. Nie ma więc potrzeby szukania tych samych elementów za każdym razem, gdy wyświetlane są nowe dane.

Gdyby findViewById znajdowało się w onBindViewHolder, byłoby wykonywane wielokrotnie, co niepotrzebnie obciążałoby aplikację i mogłoby spowalniać przewijanie listy.

Dzięki umieszczeniu go w konstruktorze ViewHolder elementy są wyszukiwane tylko raz, a później adapter korzysta z zapamiętanych referencji i zmienia jedynie ich zawartość.