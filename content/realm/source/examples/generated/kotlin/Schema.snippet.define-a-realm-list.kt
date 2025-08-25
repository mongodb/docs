// RealmList<E> can be any supported primitive
// or BSON type, a RealmObject, or an EmbeddedRealmObject
class Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // List of RealmObject type (CANNOT be nullable)
    var favoritePonds: RealmList<Pond> = realmListOf()
    // List of EmbeddedRealmObject type (CANNOT be nullable)
    var favoriteForests: RealmList<EmbeddedForest> = realmListOf()
    // List of primitive type (can be nullable)
    var favoriteWeather: RealmList<String?> = realmListOf()
}

class Pond : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
}
