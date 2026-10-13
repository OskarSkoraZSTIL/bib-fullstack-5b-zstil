from django.core.management.base import BaseCommand
from django.db import transaction
from decimal import Decimal

from bib.models import Book, Author, Genre
from bib.data import BOOKS


class Command(BaseCommand):
    help = "Import books into the database"

    @transaction.atomic
    def handle(self, *args, **options):
        for item in BOOKS[1:]:
            if not item.get("title"):
                continue

            author, _ = Author.objects.get_or_create(
                name=item["author"]
            )

            genre, _ = Genre.objects.get_or_create(
                name=item["category"]
            )

            book, created = Book.objects.update_or_create(
                name=item["title"],
                defaults={
                    "author": author,
                    "genre": genre,
                    "price": Decimal(str(item["price"])),
                    "stock": item["stock"],
                },
            )

            action = "Created" if created else "Updated"
            self.stdout.write(f"{action}: {book.name}")

        self.stdout.write(
            self.style.SUCCESS("Book import completed!")
        )