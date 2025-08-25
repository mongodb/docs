@PersistedName(name = "Feline")
class Cat : RealmObject {
    var name: String = ""
    var color: String? = null
    var age: Int = 0
}
