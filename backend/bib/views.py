import sys
import time

import django

from django.shortcuts import render
from django.conf import settings
from django.db import connection
from django.http import JsonResponse
from .data import BOOKS

from .models import Category, Product

APP_VERSION = "0.1.0"
START_TIME = time.time()

# Create your views here.
def health(request):
    try:
        connection.ensure_connection()
    except Exception:
        return json_response({"status": "error", "database": False}, status=503)
    
    return JsonResponse({"status":"ok", "database":True})

def endpoint(request):
    books = Product.objects.select_related("category")

    category = request.GET.get("category")
    if category:
        books = books.filter(category__name=category)

    return json_response([book_to_dict(p) for p in books])

def endpoint_detail(request, book_id):
    try:
        product = Product.objects.select_related("category")
    except Product.DoesNotExist:
        return json_response({"error": f"Product {book_id} not found"}, status=404)

    return json_response(book_to_dict(product))

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
            "record_count": Product.objects.count(),
            "categories": list(
                Category.objects.order_by("name").values_list("name",flat=True)
            ),
        },
        "uptime_seconds": round(time.time() - START_TIME, 1),
    })

def statistics(request):
    # ---- Functions ----
    def countByVariable(listIQ, variableIQ, variable2IQ):
        count = 0
        for book in listIQ:
            if book[variable2IQ] == variableIQ:
                count += 1
        return count

    def getStockByVariable(listIQ, variableIQ, variable2IQ):
        count = 0
        for book in listIQ:
            if book[variable2IQ] == variableIQ:
                count += book["stock"]
        return count

    def getPotentialProfit(listIQ, variableIQ, variable2IQ):
        profit = 0
        for book in listIQ:
            if book[variable2IQ] == variableIQ:
                profit += book["price"] * book["stock"]
        return round(profit, 2)

    def getAveragePrice(listIQ):
        price = 0
        bookAmnt = 0
        for book in listIQ:
            price += book["price"]
            bookAmnt += 1
        return round(price/bookAmnt, 2)

    # -------------------

    return JsonResponse({
        "bookAmountByCategory": sorted({p["category"] + f": {countByVariable(BOOKS,p["category"],"category")}" for p in BOOKS}),
        "bookAmountByAuthor": sorted({p["author"] + f": {countByVariable(BOOKS,p["author"],"author")}" for p in BOOKS}),
        "bookStockByCategory": sorted({p["category"] + f": {getStockByVariable(BOOKS, p["category"], "category")}" for p in BOOKS}),
        "bookStockByTitle": sorted({p["title"] + f": {getStockByVariable(BOOKS, p["title"], "title")}" for p in BOOKS}),
        "bookStockByAuthor": sorted({p["author"] + f": {getStockByVariable(BOOKS, p["author"], "author")}" for p in BOOKS}),
        "potentialProfitByTitle": sorted({p["title"] + f": {getPotentialProfit(BOOKS, p["title"], "title")}" for p in BOOKS}),
        "avgBookPrice": getAveragePrice(BOOKS)
    })

def json_response(data, status=200):
    """Nasza wersja JsonResponse: obsługuje listy i nie ucieka polskich znaków"""
    return JsonResponse(
        data,
        safe=False,
        status=status,
        json_dumps_params={"ensure_ascii": False}
    )

def book_to_dict(book):
    """Zamienia obiekt modelu na słownik gotowy do wysłania jako JSON."""
    return {
        "id": book.id,
        "name": book.name,
        "author": book.author,
        "price": str(book.price),
        "stock": book.stock,
        "category": book.category.name,
        "created_at": book.created_at.isoformat(),
    }