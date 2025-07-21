# start-models
from django.db import models
from django.db.models import Q, F
from django_mongodb_backend.models import EmbeddedModel
from django_mongodb_backend.fields import EmbeddedModelField, ArrayField

class Nutrition(EmbeddedModel):
    calories = models.IntegerField(default=0)
    carb_grams = models.IntegerField(default=0)
    protein_grams = models.IntegerField(default=0)

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    cuisine = models.CharField(max_length=200)
    cook_time = models.IntegerField(default=0)
    allergens = ArrayField(models.CharField(max_length=100), null=True, blank=True)
    nutrition = EmbeddedModelField(Nutrition, null=True, blank=True)

    class Meta:
        db_table = "recipes"

    def __str__(self):
        return self.title
# end-models

# start-single-field-meta
class Meta:
    db_table = "recipes"
    indexes = [
        models.Index(fields=["title"], name="title_idx"),
    ]
# end-single-field-meta

# start-single-field-option
class Recipe(models.Model):
    title = models.CharField(max_length=200, db_index=True)
# end-single-field-option

# start-compound
class Meta:
    db_table = "recipes"
    indexes = [
        models.Index(fields=["title", "cook_time"]),
    ]
# end-compound

# start-multikey
class Meta:
    db_table = "recipes"
    indexes = [
        models.Index(fields=["allergens"], name="allergy_idx"),
    ]
# end-multikey

# start-embedded
class Meta:
    db_table = "recipes"
    indexes = [
        models.Index(fields=["nutrition"]),
    ]
# end-embedded

# start-partial
class Meta:
    db_table = "recipes"
    indexes = [
        models.Index(fields=["cuisine"],
                     condition=Q(cook_time__lt=30),
                     name="fast_cuisine_idx"),
    ]
# end-partial

# start-unique-single
cuisine = models.CharField(max_length=200, unique=True)
# end-unique-single

# start-unique-compound
class Meta:
    db_table = "recipes"
    constraints = [
        models.UniqueConstraint(fields=["title", "cuisine"],
                                name="unique_regional_meal"),
    ]
# end-unique-compound