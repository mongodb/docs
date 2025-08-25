class Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int? = null
    // To-many relationship (can have many ponds)
    var favoritePonds: RealmList<Pond> = realmListOf()
}
