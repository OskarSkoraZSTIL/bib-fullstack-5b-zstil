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
    if book_id in BOOKS:
            return JsonResponse(BOOKS[book_id])

    return JsonResponse(
        {"error": f"Book {book_id} not found"},
        status=404,
    )