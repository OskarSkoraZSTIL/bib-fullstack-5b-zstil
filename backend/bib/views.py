from django.shortcuts import render
from django.http import JsonResponse
from .data import BOOKS

# Create your views here.
def health(request):
    return JsonResponse({"status":"ok"})

def endpoint(request):
    data = {"books": BOOKS}
    return JsonResponse(data)