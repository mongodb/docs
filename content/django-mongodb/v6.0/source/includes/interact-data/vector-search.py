from django_mongodb_backend.expressions import SearchVector
# start-models
from django.db import models
from django_mongodb_backend.fields import ArrayField

class MovieWithEmbeddings(models.Model):
    title = models.CharField(max_length=200)
    runtime = models.IntegerField(default=0)
    plot_embedding = ArrayField(models.FloatField(), size=1536, null=True, blank=True)
    
    class Meta:
        db_table = "embedded_movies"
        managed = False
    
    def __str__(self):
        return self.title
# end-models

# start-basic-example
vector_values = [float(i % 10) * 0.1 for i in range(1536)]
MovieWithEmbeddings.objects.annotate(
    score=SearchVector(
        path="plot_embedding",
        query_vector=vector_values,
        limit=5,
        num_candidates=150,
        exact=False,
    )
)
# end-basic-example

# start-search-score
vector_values = [float(i % 10) * 0.1 for i in range(1536)]
MovieWithEmbeddings.objects.annotate(
    score=SearchVector(
        path="plot_embedding",
        query_vector=vector_values,
        limit=5,
        num_candidates=150,
        exact=False,
    )
).values("title", "score")
# end-search-score