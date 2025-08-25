class Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int? = null
    // To-one relationship (MUST be optional)
    var favoritePond: Pond? = null
}
