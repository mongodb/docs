from django.http import HttpResponse
from django.shortcuts import render

from .models import Movie, Viewer

def index(request):
    return HttpResponse("Hello, world. You're at the application index.")

def recent_movies(request):
    movies = Movie.objects.order_by("-released")[:5]
    return render(request, "recent_movies.html", {"movies": movies})

def viewers_list(request):
    viewers = Viewer.objects.order_by("name")[:10]
    return render(request, "viewers_list.html", {"viewers": viewers})