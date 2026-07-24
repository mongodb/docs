from django_mongodb_extensions.rest_framework import (
    MongoModelSerializer,
    EmbeddedModelSerializer,
)

from .models import (
    Viewer,
    Award,
    Movie,
)


class ViewerSerializer(MongoModelSerializer):
    class Meta:
        model = Viewer
        fields = "__all__"


class AwardSerializer(EmbeddedModelSerializer):
    class Meta:
        model = Award
        fields = "__all__"


class MovieSerializer(MongoModelSerializer):
    awards = AwardSerializer()

    class Meta:
        model = Movie
        fields = "__all__"
