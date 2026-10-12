from django.db import models

# Create your models here.
from django.db import models

# Tabela Gatunków
class Genre(models.Model):
    name = models.CharField("nazwa", max_length=50, unique=True)

    class Meta:
        verbose_name = "gatunek"
        verbose_name_plural = "gatunki"
        ordering = ["name"]

    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField("nazwa", max_length=100, unique=True)

    class Meta:
        verbose_name = "autor"
        verbose_name_plural = "autorzy"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Book(models.Model):
    name = models.CharField("nazwa", max_length=200)
    author = models.ForeignKey(
        Author,
        on_delete=models.PROTECT,
        related_name="books",
        verbose_name="autor",
    )
    price = models.DecimalField("cena", max_digits=8, decimal_places=2)
    stock = models.PositiveIntegerField("stan magazynowy", default=0)
    genre = models.ForeignKey(
        Genre,
        on_delete=models.PROTECT,
        related_name="books",
        verbose_name="gatunek",
    )
    created_at = models.DateTimeField("data dodania", auto_now_add=True)

    class Meta:
        verbose_name = "ksiazka"
        verbose_name_plural = "ksiazki"
        ordering = ["name"]

    def __str__(self):
        return self.name