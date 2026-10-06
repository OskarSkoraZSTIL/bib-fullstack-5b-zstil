from django.urls import path
from . import views

urlpatterns = [
    path("health/", views.health),
    path("endpoint/", views.endpoint),
    path("endpoint/<int:book_id>/", views.endpoint_detail),
    path("endpoint/<str:filter>/<str:filVal>", views.endpoint_filter),
]
