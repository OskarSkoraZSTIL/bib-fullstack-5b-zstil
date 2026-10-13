import sys
import time

import django

from django.shortcuts import render
from django.http import JsonResponse
from .data import BOOKS
from django.conf import settings
from django.db import connection
from django.db.models import Count, Sum, Avg, F, ExpressionWrapper, DecimalField

from .models import Genre, Book

APP_VERSION = "0.2.0"
START_TIME = time.time()

# Create your views here.
def health(request):
    try:
        connection.ensure_connection()
    except Exception:
        return json_response({"status":"error", "database":False}, status=503)

    return JsonResponse({"status":"ok", "database": True})

def endpoint(request):
    data = {"books": BOOKS}
    return JsonResponse(data)

def endpoint_list(request):
    books = Book.objects.select_related("genre")

    genre = request.GET.get("genre")
    if genre:
        books = books.filter(genre__name=genre)

    return json_response([book_to_dict(p) for p in books])

def endpoint_detail(request, book_id):
    try:
        book = Book.objects.select_related("genre").get(id=book_id)
    except Book.DoesNotExist:
        return json_response({"error":f"Book {book_id} not found"}, status=404)

    return json_response(book_to_dict(book))

def endpoint_filter(request, filter, filVal):
    matchingBooks = []

    for book in BOOKS:
        if book[filter] == filVal:
            matchingBooks.append(book)

    if matchingBooks:
        return JsonResponse({"books": matchingBooks})

    return JsonResponse(
          {"error": f"Catergory {filter} or value {filVal} could not be found"},
          status=404,
     )

def info(request):
    return JsonResponse({
        "application": "Shop API",
        "app_version": APP_VERSION,
        "python_version": sys.version.split()[0],
        "django_version": django.get_version(),
        "data_source": {
            "type": "sqlite",
            "engine": settings.DATABASES["default"]["ENGINE"].split(".")[-1],
            "record_count": Book.objects.count(),
            "categories": list(
                Genre.objects.order_by("name").values_list("name",flat=True)
            ),
        },
        "uptime_seconds": round(time.time() - START_TIME, 1),
    })

def statistics(request):
    return JsonResponse({
        "bookAmountByCategory": [
            f'{item["genre__name"]}: {item["count"]}'
            for item in Book.objects.values("genre__name")
            .annotate(count=Count("id"))
            .order_by("genre__name")
        ],

        "bookAmountByAuthor": [
            f'{item["author__name"]}: {item["count"]}'
            for item in Book.objects.values("author__name")
            .annotate(count=Count("id"))
            .order_by("author__name")
        ],

        "bookStockByCategory": [
            f'{item["genre__name"]}: {item["stock"]}'
            for item in Book.objects.values("genre__name")
            .annotate(stock=Sum("stock"))
            .order_by("genre__name")
        ],

        "bookStockByTitle": [
            f'{item["name"]}: {item["stock"]}'
            for item in Book.objects.values("name")
            .annotate(stock=Sum("stock"))
            .order_by("name")
        ],

        "bookStockByAuthor": [
            f'{item["author__name"]}: {item["stock"]}'
            for item in Book.objects.values("author__name")
            .annotate(stock=Sum("stock"))
            .order_by("author__name")
        ],

        "potentialProfitByTitle": [
            f'{item["name"]}: {round(item["profit"] or 0, 2)}'
            for item in Book.objects.values("name")
            .annotate(
                profit=Sum(
                    ExpressionWrapper(
                        F("price") * F("stock"),
                        output_field=DecimalField(
                            max_digits=16,
                            decimal_places=2,
                        ),
                    )
                )
            )
            .order_by("name")
        ],

        "avgBookPrice": round(
            Book.objects.aggregate(avg=Avg("price"))["avg"] or 0,
            2,
        ),
    })

def json_response(data, status=200):
    """Nasza wersja json response"""
    return JsonResponse(
        data,
        safe=False,
        status=status,
        json_dumps_params={"ensure_ascii":False}
    )

def book_to_dict(book):
    return {
        "id": book.id,
        "name": book.name,
        "author": book.author.name,
        "price": str(book.price),
        "stock": book.stock,
        "genre": book.genre.name,
        "created_at": book.created_at.isoformat()
    }