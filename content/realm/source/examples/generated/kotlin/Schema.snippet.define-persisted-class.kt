@PersistedName(name = "Frog_Entity") // Remapped class name
class Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int = 0
    var species: String? = null
    var owner: String? = null
}
