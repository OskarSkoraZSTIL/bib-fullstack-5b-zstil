# Importowanie Danych
W projekcie pod `backend/bib/` istnieje plik nazwany `data.py`. Przechowuje on dane potrzebne dla funkcjonalności aplikacji przez autora. Aby dane zaimportować, w CMD trzeba wpisać komendę:
```
python manage.py automate_records
```
Po wpisaniu komendy, wszystkie dane z listy `BOOKS` w pliku `data.py` zostaną automatycznie zaimportowane do bazy danych w Django, razem z trzema tabelami (Gatunek, Autor, Książki) i Kluczami Obcymi.

Jest to komenda stworzona specjalnie pod aplikacje, i nie jest ona wbudowana w Django.