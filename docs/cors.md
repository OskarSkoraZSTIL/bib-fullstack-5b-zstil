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

Po wpisaniu `curl -i -X OPTIONS -H "Origin: http://localhost:5173" -H "Access-Control-Request-Method: POST" http://localhost:8000/api/products/` CMD zwrócił nam następującą odpowiedź:
```
HTTP/1.1 200 OK
Date: Wed, 21 Oct 2026 09:15:08 GMT
Server: WSGIServer/0.2 CPython/3.12.0
content-length: 0
Content-Type: text/html; charset=utf-8
Vary: origin
access-control-allow-origin: http://localhost:5173
access-control-allow-headers: accept, authorization, content-type, user-agent, x-csrftoken, x-requested-with
access-control-allow-methods: DELETE, GET, OPTIONS, PATCH, POST, PUT
access-control-max-age: 86400
```

## Co przeglądarka robi krok po kroku na podstawie tej odpowiedzi?
1. Przeglądarka porównuje swój bieżący adres (`http://localhost:5173`) z wartością `access-control-allow-origin`.
2. Sprawdza, czy zamierzona metoda (`POST`) znajduje się w `access-control-allow-methods`.
3. Sprawdza, czy nagłówki, które chce wysłać frontend, znajdują się w `access-control-allow-headers`.
4. Ponieważ wszystkie warunki są spełnione, przeglądarka automatycznie i bezbłędnie wykonuje właściwe zapytanie `POST` z danymi z frontendu do backendu.

## `SECRET_KEY`

Jeżeli nie mamy `SECRET_KEY` w `backend/core/settings.py`, i nie ma pliku `.env`, a spróbujemy odpalić backend, to konsola odpowie w taki sposób:

```
(venv) C:\Users\uczen\bib-fullstack\backend>pip install python-dotenv
Collecting python-dotenv
  Downloading python_dotenv-1.2.4-py3-none-any.whl.metadata (29 kB)
Downloading python_dotenv-1.2.4-py3-none-any.whl (23 kB)
Installing collected packages: python-dotenv
Successfully installed python-dotenv-1.2.4

(venv) C:\Users\uczen\bib-fullstack\backend>pip freeze > requirements.txt

(venv) C:\Users\uczen\bib-fullstack\backend>py manage.py runserver
Traceback (most recent call last):
  File "C:\Users\uczen\bib-fullstack\backend\manage.py", line 22, in <module>
    main()
  File "C:\Users\uczen\bib-fullstack\backend\manage.py", line 18, in main
    execute_from_command_line(sys.argv)
  File "C:\Users\uczen\bib-fullstack\backend\venv\Lib\site-packages\django\core\management\__init__.py", line 443, in execute_from_command_line
    utility.execute()
  File "C:\Users\uczen\bib-fullstack\backend\venv\Lib\site-packages\django\core\management\__init__.py", line 383, in execute
    settings.INSTALLED_APPS
  File "C:\Users\uczen\bib-fullstack\backend\venv\Lib\site-packages\django\conf\__init__.py", line 122, in __getattr__
    self._setup(name)
  File "C:\Users\uczen\bib-fullstack\backend\venv\Lib\site-packages\django\conf\__init__.py", line 109, in _setup
    self._wrapped = Settings(settings_module)
                    ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\uczen\bib-fullstack\backend\venv\Lib\site-packages\django\conf\__init__.py", line 253, in __init__
    mod = importlib.import_module(self.SETTINGS_MODULE)
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\uczen\AppData\Local\Programs\Python\Python312\Lib\importlib\__init__.py", line 90, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<frozen importlib._bootstrap>", line 1381, in _gcd_import
  File "<frozen importlib._bootstrap>", line 1354, in _find_and_load
  File "<frozen importlib._bootstrap>", line 1325, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 929, in _load_unlocked
  File "<frozen importlib._bootstrap_external>", line 994, in exec_module
  File "<frozen importlib._bootstrap>", line 488, in _call_with_frames_removed
  File "C:\Users\uczen\bib-fullstack\backend\core\settings.py", line 38, in <module>
    SECRET_KEY = os.environ["SECRET_KEY"]
                 ~~~~~~~~~~^^^^^^^^^^^^^^
  File "<frozen os>", line 685, in __getitem__
KeyError: 'SECRET_KEY'
```

## Bezpieczeństwo zmiennej `SECRET_KEY`

Dlaczego to zachowanie jest lepsze niż start z domyślnym kluczem?
1. Gwarancja braku domyślnych kluczy na produkcji (Fail-Fast):
Jeśli w kodzie umieścimy fallback (np. `os.environ.get("SECRET_KEY", "default-unsafe-key"))`, istnieje ogromne ryzyko, że aplikacja zostanie przypadkowo wdrożona na środowisko produkcyjne z domyślnym, publicznie znanym kluczem.
2. Ochrona integralności sesji i tokenów:
Django używa `SECRET_KEY` m.in. do podpisywania plików cookie sesji, tokenów CSRF, tokenów do resetu haseł oraz szyfrowania danych. Domyślny lub słaby klucz umożliwia atakującemu fałszowanie tokenów, przejmowanie sesji użytkowników oraz przeprowadzanie ataków typu CSRF.
3. Jawność konfiguracji:
Aplikacja wymusza zasadę *12 Factor App* — cała konfiguracja zależna od środowiska musi być jawnie przekazana przez zmienne środowiskowe. Brak zmiennej jest błędem krytycznym, o którym programista dowiaduje się natychmiast przy próbie startu, zamiast działać w nieświadomości wdrożenia luki bezpieczeństwa.

## Co się stanie jak się usunie prefix `VITE_`?

Podczas gdy konsola potrafi normalnie wypisać adres API gdy jest prefix uwzględniony (w tym przypadku `localhost:8000/api`), to gdy jego brakuje to w konsoli API jest wypisane jako `undefined`.