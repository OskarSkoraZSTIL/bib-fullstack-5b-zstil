from django.shortcuts import render
from django.http import JsonResponse
from .data import BOOKS

# Create your views here.
def health(request):
    return JsonResponse({"status":"ok"})

def endpoint(request):
    data = {"books": BOOKS}
    return JsonResponse(data)

def endpoint_detail(request, book_id):
    for book in BOOKS:
        if book["id"] == book_id:
                return JsonResponse(book)

    return JsonResponse(
        {"error": f"Book {book_id} not found"},
        status=404,
    )

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