// These objects have RealmSet properties that get serializers
// from declaring `@file:UseSerializers(RealmSetKSerializer::class)`.
// No need to individually declare them on every `RealmSet` property in the file.
class Movie : RealmObject {
    var movieTitle: String = ""
    var actors: RealmSet<String> = realmSetOf()
}

class TVSeries : RealmObject {
    var seriesTitle: String = ""
    var episodeTitles: RealmSet<String> = realmSetOf()
}
