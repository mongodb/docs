// RealmSet<E> can be any supported primitive or
// BSON type or a RealmObject
class Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Set of RealmObject type (CANNOT be nullable)
    var favoriteSnacks: RealmSet<Snack> = realmSetOf()
    // Set of primitive type (can be nullable)
    var favoriteWeather: RealmSet<String?> = realmSetOf()
}

class Snack : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
}
