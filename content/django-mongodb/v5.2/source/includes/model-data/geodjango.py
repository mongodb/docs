# start-geo-models
from django.contrib.gis.db import models
from django_mongodb_backend.models import EmbeddedModel
from django_mongodb_backend.fields import EmbeddedModelField

class Location(EmbeddedModel):
    address = models.JSONField(null=True)
    geo = models.PointField()

class Theater(models.Model):
    theater_id = models.IntegerField(default=0, db_column="theaterId")
    location = EmbeddedModelField(Location, null=True, blank=True)

    class Meta:
        db_table = "theaters"
        managed = False
    
    def __str__(self):
        return self.theater_id
# end-geo-models