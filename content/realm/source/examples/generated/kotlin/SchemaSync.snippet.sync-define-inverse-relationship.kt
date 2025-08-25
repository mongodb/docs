class Pond : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Backlink to the `Frog` that has this `Pond` as its favorite
    val frog: RealmResults<Frog> by backlinks(Frog::favoritePonds)
}
class Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int? = null
    // To-many relationship (can have many ponds)
    var favoritePonds: RealmList<Pond> = realmListOf()
}
