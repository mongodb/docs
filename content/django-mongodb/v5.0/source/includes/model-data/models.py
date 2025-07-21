# start-models
from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)
    plot = models.TextField(blank=True)
    runtime = models.IntegerField(default=0)
    released = models.DateTimeField("release date", null=True, blank=True)

    class Meta:
        db_table = "movies"
        managed = False
    
    def __str__(self):
        return self.title
# end-models

# start-json-field
from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)
    plot = models.TextField(blank=True)
    runtime = models.IntegerField(default=0)
    released = models.DateTimeField("release date", null=True, blank=True)
    imdb = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = "movies"
        managed = False
    
    def __str__(self):
        return self.title
# end-json-field

# start-array-field
from django.db import models
from django_mongodb_backend.fields import ArrayField

class Movie(models.Model):
    title = models.CharField(max_length=200)
    plot = models.TextField(blank=True)
    runtime = models.IntegerField(default=0)
    released = models.DateTimeField("release date", null=True, blank=True)
    genres = ArrayField(
             models.CharField(max_length=100),
             size=5,
             null=True,
             blank=True)

    class Meta:
        db_table = "movies"
        managed = False
    
    def __str__(self):
        return self.title
# end-array-field

# start-embedded-field
from django.db import models
from django_mongodb_backend.models import EmbeddedModel
from django_mongodb_backend.fields import EmbeddedModelField

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

    class Meta:
        db_table = "movies"
        managed = False
    
    def __str__(self):
        return self.title
# end-embedded-field