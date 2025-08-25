class Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var birthdate: RealmInstant? = null
    var fliesEaten: MutableRealmInt? = null
    var favoriteThings: RealmList<RealmAny?> = realmListOf()
}
