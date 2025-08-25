// Implements the `RealmObject` interface
class Frog : RealmObject { // Empty constructor required by Realm
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int = 0
    var species: String? = null
    var owner: String? = null
}
