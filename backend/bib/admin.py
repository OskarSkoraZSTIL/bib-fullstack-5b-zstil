from django.contrib import admin
from .models import Genre, Author, Book

# Register your models here.
@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ("name",)

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("name",)

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("name", "author", "price", "stock", "genre", "created_at")
    list_filter = ("author", "genre")
    search_fields = ("name",)
    list_editable = ("price", "stock")