from django_mongodb_backend.expressions import (
    SearchEquals, SearchAutocomplete, SearchExists, SearchIn, 
    SearchPhrase, SearchQueryString, SearchRange, SearchRegex, 
    SearchText, SearchWildcard, SearchGeoShape, SearchGeoWithin, 
    SearchMoreLikeThis, CompoundExpression, SearchScoreOption
)
# start-models
from django.db import models
from django.contrib.gis.db import models
from django_mongodb_backend.fields import ArrayField

class Movie(models.Model):
    title = models.CharField(max_length=200)
    plot = models.TextField(blank=True)
    runtime = models.IntegerField(default=0)
    genres = ArrayField(models.CharField(max_length=100), null=True, blank=True)

    class Meta:
        db_table = "movies"
        managed = False

    def __str__(self):
        return self.title

class Theater(models.Model):
    theater_id = models.IntegerField(default=0, db_column="theaterId")
    geo = models.PointField(db_column="location.geo")

    class Meta:
        db_table = "theaters"
        managed = False
    
    def __str__(self):
        return self.theater_id
# end-models

# start-search-equals
Movie.objects.annotate(score=SearchEquals(path="title", value="Finding Nemo"))
# end-search-equals

# start-search-autocomplete
Movie.objects.annotate(score=SearchAutocomplete(path="title", query="First"))
# end-search-autocomplete

# start-search-exists
Movie.objects.annotate(score=SearchExists(path="plot"))
# end-search-exists

# start-search-in
Movie.objects.annotate(score=SearchIn(path="runtime", value=[100, 200, 300]))
# end-search-in

# start-search-phrase
Movie.objects.annotate(score=SearchPhrase(path="plot", query="space adventure", slop=2))
# end-search-phrase

# start-search-query-string
Movie.objects.annotate(score=SearchQueryString(path="plot", query="romance AND (paris OR tokyo)"))
# end-search-query-string

# start-search-range
Movie.objects.annotate(score=SearchRange(path="runtime", gt=90, lt=120))
# end-search-range

# start-search-regex
Movie.objects.annotate(score=SearchRegex(path="title", query=r".*winter.*"))
# end-search-regex

# start-search-text
Movie.objects.annotate(score=SearchText(
    path="plot", 
    query="sudden disappearance", 
    fuzzy={"maxEdits": 2}, 
    match_criteria="all"
))
# end-search-text

# start-search-wildcard
Movie.objects.annotate(score=SearchWildcard(path="title", query="Star*"))
# end-search-wildcard

# start-search-geo-shape
chicago = {
    "type": "Polygon",
    "coordinates": [
        [
            [-87.851, 41.976],
            [-87.851, 41.653],
            [-87.651, 41.653],
            [-87.651, 41.976],
            [-87.851, 41.976],
        ]
    ]
}
theaters = Theater.objects.annotate(score=SearchGeoShape(
    path="geo", 
    relation="within", 
    geometry=chicago
))
# end-search-geo-shape

# start-search-geo-within
circle = {
    "center": {"type": "Point", "coordinates": [-73.98, 40.75]},
    "radius": 5000
}
theaters = Theater.objects.annotate(score=SearchGeoWithin(
    path="geo", 
    kind="circle", 
    geometry=circle
))
# end-search-geo-within

# start-search-more-like-this
Movie.objects.annotate(score=SearchMoreLikeThis([
    {"title": "The Godfather"}, {"genres": ["Crime", "Drama"]}
]))
# end-search-more-like-this

# start-compound-expression
plot_exists = SearchExists(path="plot")
plot_text = SearchText(path="plot", query="fast-paced")
genres_range = SearchIn(path="genres", value=["Romance", "Comedy"])

Movie.objects.annotate(
    score=CompoundExpression(
        must=[plot_exists, plot_text],
        must_not=[genres_range]
    )
)
# end-compound-expression

# start-bitwise
expr = SearchText(path="plot", query="heartwarming") | SearchIn(path="genres", value=["Romance", "Comedy"])

Movie.objects.annotate(score=expr)
# end-bitwise

# start-search-score-option
boost = SearchScoreOption({"boost": {"value": 3}})

Movie.objects.annotate(
    score=SearchEquals(
        path="title",
        value="Life of Pi",
        score=boost
    )
)
# end-search-score-option