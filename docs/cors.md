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

Po wpisaniu `curl -i -H "Origin: http://localhost:5173" http://localhost:8000/api/endpoint/` odpowiedź wygląda następująco:
```
HTTP/1.1 200 OK
Date: Wed, 21 Oct 2026 09:08:02 GMT
Server: WSGIServer/0.2 CPython/3.12.0
Content-Type: application/json
X-Frame-Options: DENY
Content-Length: 2078
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin
Vary: origin
access-control-allow-origin: http://localhost:5173

[{"id": 12, "name": "Balladyna", "author": "Juliusz Słowacki", "price": "24.99", "stock": 7, "genre": "Dramat romantyczny", "created_at": "2026-10-13T06:36:15.327366+00:00"}, {"id": 9, "name": "Ferdydurke", "author": "Witold Gombrowicz", "price": "29.50", "stock": 11, "genre": "Powieść", "created_at": "2026-10-13T06:36:15.323370+00:00"}, {"id": 11, "name": "Kamienie na szaniec", "author": "Aleksander Kamiński", "price": "32.99", "stock": 10, "genre": "Literatura wojenna", "created_at": "2026-10-13T06:36:15.326365+00:00"}, {"id": 6, "name": "Krzyżacy", "author": "Henryk Sienkiewicz", "price": "36.75", "stock": 9, "genre": "Powieść historyczna", "created_at": "2026-10-13T06:36:15.319362+00:00"}, {"id": 3, "name": "Lalka", "author": "Bolesław Prus", "price": "34.90", "stock": 15, "genre": "Powieść realistyczna", "created_at": "2026-10-13T06:36:15.316356+00:00"}, {"id": 1, "name": "Ogniem i mieczem", "author": "Henryk Sienkiewicz", "price": "39.99", "stock": 12, "genre": "Powieść historyczna", "created_at": "2026-10-13T06:36:15.312360+00:00"}, {"id": 10, "name": "Pan Tadeusz", "author": "Adam Mickiewicz", "price": "25.99", "stock": 13, "genre": "Epopeja", "created_at": "2026-10-13T06:36:15.324368+00:00"}, {"id": 5, "name": "Potop", "author": "Henryk Sienkiewicz", "price": "42.00", "stock": 10, "genre": "Powieść historyczna", "created_at": "2026-10-13T06:36:15.318355+00:00"}, {"id": 2, "name": "Przedwiośnie", "author": "Stefan Żeromski", "price": "27.50", "stock": 8, "genre": "Powieść", "created_at": "2026-10-13T06:36:15.314358+00:00"}, {"id": 7, "name": "Quo Vadis", "author": "Henryk Sienkiewicz", "price": "31.99", "stock": 14, "genre": "Powieść historyczna", "created_at": "2026-10-13T06:36:15.320360+00:00"}, {"id": 4, "name": "Wesele", "author": "Stanisław Wyspiański", "price": "22.99", "stock": 6, "genre": "Dramat", "created_at": "2026-10-13T06:36:15.317355+00:00"}, {"id": 8, "name": "Zemsta", "author": "Aleksander Fredro", "price": "19.90", "stock": 7, "genre": "Komedia", "created_at": "2026-10-13T06:36:15.322369+00:00"}]
```

Natomiast po wpisaniu tego samego z innym `origin`, np. `curl -i -H "Origin: http://example.com" http://localhost:8000/api/endpoint/`, to odpowiedź wygląda następująco:
```
HTTP/1.1 200 OK
Date: Wed, 21 Oct 2026 09:08:34 GMT
Server: WSGIServer/0.2 CPython/3.12.0
Content-Type: application/json
X-Frame-Options: DENY
Content-Length: 2078
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin
Vary: origin

[{"id": 12, "name": "Balladyna", "author": "Juliusz Słowacki", "price": "24.99", "stock": 7, "genre": "Dramat romantyczny", "created_at": "2026-10-13T06:36:15.327366+00:00"}, {"id": 9, "name": "Ferdydurke", "author": "Witold Gombrowicz", "price": "29.50", "stock": 11, "genre": "Powieść", "created_at": "2026-10-13T06:36:15.323370+00:00"}, {"id": 11, "name": "Kamienie na szaniec", "author": "Aleksander Kamiński", "price": "32.99", "stock": 10, "genre": "Literatura wojenna", "created_at": "2026-10-13T06:36:15.326365+00:00"}, {"id": 6, "name": "Krzyżacy", "author": "Henryk Sienkiewicz", "price": "36.75", "stock": 9, "genre": "Powieść historyczna", "created_at": "2026-10-13T06:36:15.319362+00:00"}, {"id": 3, "name": "Lalka", "author": "Bolesław Prus", "price": "34.90", "stock": 15, "genre": "Powieść realistyczna", "created_at": "2026-10-13T06:36:15.316356+00:00"}, {"id": 1, "name": "Ogniem i mieczem", "author": "Henryk Sienkiewicz", "price": "39.99", "stock": 12, "genre": "Powieść historyczna", "created_at": "2026-10-13T06:36:15.312360+00:00"}, {"id": 10, "name": "Pan Tadeusz", "author": "Adam Mickiewicz", "price": "25.99", "stock": 13, "genre": "Epopeja", "created_at": "2026-10-13T06:36:15.324368+00:00"}, {"id": 5, "name": "Potop", "author": "Henryk Sienkiewicz", "price": "42.00", "stock": 10, "genre": "Powieść historyczna", "created_at": "2026-10-13T06:36:15.318355+00:00"}, {"id": 2, "name": "Przedwiośnie", "author": "Stefan Żeromski", "price": "27.50", "stock": 8, "genre": "Powieść", "created_at": "2026-10-13T06:36:15.314358+00:00"}, {"id": 7, "name": "Quo Vadis", "author": "Henryk Sienkiewicz", "price": "31.99", "stock": 14, "genre": "Powieść historyczna", "created_at": "2026-10-13T06:36:15.320360+00:00"}, {"id": 4, "name": "Wesele", "author": "Stanisław Wyspiański", "price": "22.99", "stock": 6, "genre": "Dramat", "created_at": "2026-10-13T06:36:15.317355+00:00"}, {"id": 8, "name": "Zemsta", "author": "Aleksander Fredro", "price": "19.90", "stock": 7, "genre": "Komedia", "created_at": "2026-10-13T06:36:15.322369+00:00"}]
```

CORS nie jest zabezpieczeniem backendu przed odczytem, ponieważ to **sama przeglądarka internetowa wymusza zasady CORS**, blokując dostęp do danych kodowi JavaScript na niedozwolonej stronie, podczas gdy serwer zawsze zwraca pełną odpowiedź każdemu klientowi (np. `curl` czy Postman), który ten nagłówek zignoruje.