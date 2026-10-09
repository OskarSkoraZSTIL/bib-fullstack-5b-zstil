from django.db import models


class Category(models.Model):
    name = models.CharField("nazwa", max_length=50, unique=True)

    class Meta:
        verbose_name = "kategoria"
        verbose_name_plural = "kategorie"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField("nazwa", max_length=200)
    author = models.TextField("autor", blank=True)
    price = models.DecimalField("cena", max_digits=8, decimal_places=2)
    stock = models.PositiveIntegerField("stan magazynowy", default=0)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
        verbose_name="kategoria",
    )
    created_at = models.DateTimeField("data dodania", auto_now_add=True)

    class Meta:
        verbose_name = "produkt"
        verbose_name_plural = "produkty"
        ordering = ["name"]

    def __str__(self):
        return self.name