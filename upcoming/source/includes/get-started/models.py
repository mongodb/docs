from django.db import models
from django.conf import settings
from django_mongodb_backend.fields import EmbeddedModelField, ArrayField
from django_mongodb_backend.models import EmbeddedModel

class Award(EmbeddedModel):
    wins = models.IntegerField(default=0)
    nominations = models.IntegerField(default=0)
    text = models.CharField(max_length=100)

class Movie(models.Model):
    title = models.CharField(max_length=200)
    plot = models.TextField(blank=True)
    runtime = models.IntegerField(default=0)
    released = models.DateTimeField("release date", null=True, blank=True)
    awards = EmbeddedModelField(Award, null=True, blank=True)
    genres = ArrayField(models.CharField(max_length=100), null=True, blank=True)

    class Meta:
        db_table = "movies"
        managed = False

    def __str__(self):
        return self.title

class Viewer(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=200)

    class Meta:
        db_table = "users"
        managed = False

    def __str__(self):
        return self.name