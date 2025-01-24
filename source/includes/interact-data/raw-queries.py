# start-models
from django.db import models
from django_mongodb_backend.fields import ArrayField
from django_mongodb_backend.managers import MongoManager

class Movie(models.Model):
    title = models.CharField(max_length=200)
    plot = models.TextField(blank=True)
    runtime = models.IntegerField(default=0)
    released = models.DateTimeField("release date", null=True, blank=True)
    genres = ArrayField(models.CharField(max_length=100), null=True, blank=True)
    objects = MongoManager()

    class Meta:
        db_table = "movies"
        managed = False

    def __str__(self):
        return self.title

class Theater(models.Model):
    theaterId = models.IntegerField(default=0)
    objects = MongoManager()

    class Meta:
        db_table = "theaters"
        managed = False
    
    def __str__(self):
        return self.theaterId
# end-models

# start-filter-project
movies = Movie.objects.raw_aggregate([
    {"$match": {"title": "The Parent Trap"}},
    {"$project": {
        "title": 1,
        "released": 1
    }
}])

for m in movies:
    print(f"Plot of {m.title}, released on {m.released}: {m.plot}\n")
# end-filter-project

# start-atlas-search
movies = Movie.objects.raw_aggregate([
    {
        "$search": {
            "index": "<search-index-name>",
            "phrase": {
                "path": "plot",
                "query": "whirlwind romance",
                "slop": 3
            },
            "highlight": {
                "path": "plot"
            }
        }
    },
    {
        "$project": {
            "title": 1,
            "highlight": {"$meta": "searchHighlights"}
        }
    }
])

for m in movies:
    print(f"Title: {m.title}, text match details: {m.highlight}\n")
# end-atlas-search

# start-geo
chicago_bounds = {
    "type": "Polygon",
    "coordinates": [[
        [-87.851, 41.976],
        [-87.851, 41.653],
        [-87.651, 41.653],
        [-87.651, 41.976],
        [-87.851, 41.976] 
    ]]
}

theaters = Theater.objects.raw_aggregate([
    {
        "$match": {
            "location.geo": {
                "$geoWithin": {
                    "$geometry": chicago_bounds
                }
            }
        }
    },
    {
        "$project": {
            "theaterId": 1
        }
    }
])

for t in theaters:
    print(f"Theater ID: {t.theaterId}")
# end-geo