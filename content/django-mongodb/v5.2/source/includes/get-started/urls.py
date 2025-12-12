from django.urls import path

from . import views

urlpatterns = [
    path("recent_movies/", views.recent_movies, name="recent_movies"),
    path("viewers_list/", views.viewers_list, name="viewers_list"),
    path("", views.index, name="index"),
]