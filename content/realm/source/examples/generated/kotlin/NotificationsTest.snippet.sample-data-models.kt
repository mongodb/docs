class Character(): RealmObject {
    @PrimaryKey
    var name: String = ""
    var species: String = ""
    var age: Int = 0
    constructor(name: String, species: String, age: Int) : this() {
        this.name = name
        this.species = species
        this.age = age
    }
}
class Fellowship() : RealmObject {
    @PrimaryKey
    var name: String = ""
    var members: RealmList<Character> = realmListOf()
    constructor(name: String, members: RealmList<Character>) : this() {
        this.name = name
        this.members = members
    }
}
