# Error 404 Połączenia Frontend'u z Backend'em
Po próbie wpisania komendy `fetch` do konsoli pod adresem `localhost:5173` dla `localhost:8000`, kosnola wypisała 3 błędy:
```
Access to fetch at 'http://localhost:8000/api/products/' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```
```
VM122:1  GET http://localhost:8000/api/products/ net::ERR_FAILED 404 (Not Found)
(anonymous) @ VM122:1
```
```
VM122:1   Uncaught (in promise) TypeError: Failed to fetch
    at <anonymous>:1:1
```

Dane nie dotarły do skryptu, ponieważ zapytanie zwróciło error `404` - Not Found. Serwer odpowiedział, że zasób pod wskazanym adresem nie istnieje, co automatycznie uniemożliwiło pobranie danych. Spowodowane jest to tym, że CORS zablokował połączenie, i komenda `fetch` nie miała co sprawdzać.