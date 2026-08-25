# start-embed
from django.db import models
from django_mongodb_backend.models import EmbeddedModel
from django_mongodb_backend.fields import EmbeddedModelField

class Director(EmbeddedModel):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

class Movie(models.Model):
    title = models.CharField(max_length=200)
    director = EmbeddedModelField(Director, null=True, blank=True)
# end-embed

# start-arrayfield
from django.db import models
from django_mongodb_backend.fields import ArrayField

class Movie(models.Model):
    title = models.CharField(max_length=200)
    cast = ArrayField(models.CharField(max_length=100), blank=True)
# end-arrayfield

# start-foreignkey
from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)

class Comment(models.Model):
    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
    )
    text = models.TextField()
# end-foreignkey

# start-onetoone
from django.db import models
from django_mongodb_backend.fields import ArrayField

class Movie(models.Model):
    title = models.CharField(max_length=200)

class EmbeddedMovie(models.Model):
    movie = models.OneToOneField(
        Movie,
        on_delete=models.CASCADE,
    )
    plot_embedding = ArrayField(models.FloatField(), blank=True)
# end-onetoone

# start-manytomany
from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)

class Viewer(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=200)
    watched = models.ManyToManyField(Movie, blank=True)
# end-manytomany

# start-relational-before
from django.db import models

class Director(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

class Award(models.Model):
    wins = models.IntegerField(default=0)
    nominations = models.IntegerField(default=0)
    text = models.CharField(max_length=100)

class Writer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

class Movie(models.Model):
    title = models.CharField(max_length=200)
    director = models.ForeignKey(
        Director,
        null=True,
        on_delete=models.SET_NULL,
    )
    awards = models.OneToOneField(
        Award,
        null=True,
        on_delete=models.SET_NULL,
    )
    writers = models.ManyToManyField(Writer, blank=True)
# end-relational-before

# start-relational-after
from django.db import models
from django_mongodb_backend.models import EmbeddedModel
from django_mongodb_backend.fields import (
    EmbeddedModelField,
    EmbeddedModelArrayField,
)

class Director(EmbeddedModel):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

class Award(EmbeddedModel):
    wins = models.IntegerField(default=0)
    nominations = models.IntegerField(default=0)

class Writer(EmbeddedModel):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

class Movie(models.Model):
    title = models.CharField(max_length=200)
    director = EmbeddedModelField(Director, null=True, blank=True)
    awards = EmbeddedModelField(Award, null=True, blank=True)
    writers = EmbeddedModelArrayField(Writer, blank=True)
# end-relational-after
