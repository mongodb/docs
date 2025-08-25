// Relationships of RealmList<E> or RealmSet<E> must be of RealmObject type
class Forest : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Set of RealmObject type (CANNOT be null)
    var frogsThatLiveHere: RealmSet<Frog> = realmSetOf()
    // List of RealmObject type (CANNOT be null)
    var nearbyPonds: RealmList<Pond> = realmListOf()
}
