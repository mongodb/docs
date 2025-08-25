// Relationships of Realm objects must be of RealmObject type
class Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int = 0
    // Property of RealmObject type (MUST be null)
    var favoritePond: Pond? = null
    var bestFriend: Frog? = null
}
