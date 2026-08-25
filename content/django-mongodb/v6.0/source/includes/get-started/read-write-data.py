# start-imports
from sample_mflix.models import Movie, Award, Viewer
from django.utils import timezone
from datetime import datetime
# end-imports

# start-insert-movie
movie_awards = Award(wins=122, nominations=245, text="Won 1 Oscar")
movie = Movie.objects.create(
    title="Minari",
    plot="A Korean-American family moves to an Arkansas farm in search of their own American Dream",
    runtime=217,
    released=timezone.make_aware(datetime(2020, 1, 26)),
    awards=movie_awards,
    genres=["Drama", "Comedy"]
)
# end-insert-movie

# start-update-movie
movie.runtime = 117
movie.save()
# end-update-movie

# start-insert-viewer
viewer = Viewer.objects.create(
    name="Abigail Carter",
    email="abigail.carter@fakegmail.com"
)
# end-insert-viewer

# start-delete-viewer
old_viewer = Viewer.objects.filter(name="Alliser Thorne").first()
old_viewer.delete()
# end-delete-viewer

# start-query-email
from sample_mflix.models import Movie, Viewer

Viewer.objects.filter(email="jason_momoa@gameofthron.es").first()
# end-query-email

# start-query-runtime
Movie.objects.filter(runtime__lt=10)
# end-query-runtime