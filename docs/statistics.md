# Różnica Statystyk
W wersji `0.2.0` zmienił się również widok pod `api/statistics/`. Oto następujące wyniki:
## Wersja `0.1.0`
```json
{
  "bookAmountByCategory": [
    ": 1",
    "Dramat romantyczny: 1",
    "Dramat: 1",
    "Epopeja: 1",
    "Komedia: 1",
    "Literatura wojenna: 1",
    "Powieść historyczna: 4",
    "Powieść realistyczna: 1",
    "Powieść: 2"
  ],
  "bookAmountByAuthor": [
    ": 1",
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
    ": 0",
    "Dramat romantyczny: 7",
    "Dramat: 6",
    "Epopeja: 13",
    "Komedia: 7",
    "Literatura wojenna: 10",
    "Powieść historyczna: 45",
    "Powieść realistyczna: 15",
    "Powieść: 19"
  ],
  "bookStockByTitle": [
    ": 0",
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
    ": 0",
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
    ": 0.0",
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
  "avgBookPrice": 28.42
}
```

## Wersja `0.2.0`
```json
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
    "Ferdydurke: 324.50",
    "Kamienie na szaniec: 329.90",
    "Krzyżacy: 330.75",
    "Lalka: 523.50",
    "Ogniem i mieczem: 479.88",
    "Pan Tadeusz: 337.87",
    "Potop: 420.00",
    "Przedwiośnie: 220.00",
    "Quo Vadis: 447.86",
    "Wesele: 137.94",
    "Zemsta: 139.30"
  ],
  "avgBookPrice": "30.79"
}
```

Różnica jest głównie w kodzie a nie na samym wyniku statystyk, iż aplikacja już nie działa na wewnętrznym pliku `data.py`, a na rekordach istniejących w bazie danych. 