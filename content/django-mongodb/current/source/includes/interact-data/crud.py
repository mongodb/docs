# start-models
from django.db import models
from django_mongodb_backend.fields import ArrayField

class Movie(models.Model):
    title = models.CharField(max_length=200)
    plot = models.TextField(blank=True)
    runtime = models.IntegerField(default=0)
    released = models.DateTimeField("release date", null=True, blank=True)
    genres = ArrayField(models.CharField(max_length=100), null=True, blank=True)

    class Meta:
        db_table = "movies"
        managed = False
    
    def __str__(self):
        return self.title
# end-models

# start-insert
Movie.objects.create(title="Poor Things", runtime=141)
# end-insert

# start-save
movie = Movie(title="Poor Things", runtime=141)
movie.save()
# end-save

# start-find-many
Movie.objects.filter(released=timezone.make_aware(datetime(2000, 1, 1)))
# end-find-many

# start-find-one
Movie.objects.get(title="Boyhood")
# end-find-one

# start-update
Movie.objects.filter(
    title="High Fidelity").update(
    plot="Rob, a record store owner, recounts his top five breakups,including the one in progress.")
# end-update

# start-delete
Movie.objects.filter(runtime=5).delete()
# end-delete