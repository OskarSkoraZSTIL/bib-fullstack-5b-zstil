# Object Relational Mapping (ORM)
Poniżej są zalogowane komendy dokumentujące zapytania wysłane do shell'a aby... nie wiem w sumie, tak mi zadanie kazało to tak zrobiłem. Poniżej występuje 11 zapytań:
```shell
>>> from bib.models import Genre, Book
>>> Book.objects.all()
<QuerySet [<Book: Balladyna>, <Book: Ferdydurke>, <Book: Kamienie na szaniec>, <Book: Krzyżacy>, <Book: Lalka>, <Book: Ogniem i mieczem>, <Book: Pan Tadeusz>, <Book: Potop>, <Book: Przedwiośnie>, <Book: Quo Vadis>, <Book: Wesele>, <Book: Zemsta>]>
>>> Book.objects.count()
12
>>> Book.objects.first()
<Book: Balladyna>
>>> Book.objects.filter(stock=7)
<QuerySet [<Book: Balladyna>, <Book: Zemsta>]>
>>> Book.objects.filter(price__lt=30)
<QuerySet [<Book: Balladyna>, <Book: Ferdydurke>, <Book: Pan Tadeusz>, <Book: Przedwiośnie>, <Book: Wesele>, <Book: Zemsta>]>
>>> Book.objects.filter(name__icontains="balladyna")
<QuerySet [<Book: Balladyna>]>
>>> Book.objects.filter(genre__name="Powieść")
<QuerySet [<Book: Ferdydurke>, <Book: Przedwiośnie>]>
>>> Book.objects.exclude(stock=9)
<QuerySet [<Book: Balladyna>, <Book: Ferdydurke>, <Book: Kamienie na szaniec>, <Book: Lalka>, <Book: Ogniem i mieczem>, <Book: Pan Tadeusz>, <Book: Potop>, <Book: Przedwiośnie>, <Book: Quo Vadis>, <Book: Wesele>, <Book: Zemsta>]>
>>> Book.objects.exclude(stock=10)
<QuerySet [<Book: Balladyna>, <Book: Ferdydurke>, <Book: Krzyżacy>, <Book: Lalka>, <Book: Ogniem i mieczem>, <Book: Pan Tadeusz>, <Book: Przedwiośnie>, <Book: Quo Vadis>, <Book: Wesele>, <Book: Zemsta>]>
>>> Book.objects.order_by("-price")
<QuerySet [<Book: Potop>, <Book: Ogniem i mieczem>, <Book: Krzyżacy>, <Book: Lalka>, <Book: Kamienie na szaniec>, <Book: Quo Vadis>, <Book: Ferdydurke>, <Book: Przedwiośnie>, <Book: Pan Tadeusz>, <Book: Balladyna>, <Book: Wesele>, <Book: Zemsta>]>
>>> b = Book.objects.get(id=1)
>>> b.genre.name
'Powieść historyczna'
>>> b.genre.books.count()
4
```