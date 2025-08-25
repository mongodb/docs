class Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int? = null
    // Embed a single object (MUST be optional)
    var favoritePond: EmbeddedPond? = null
}

class Forest : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Embed multiple objects (can have many ponds)
    var forestPonds: RealmList<EmbeddedPond> = realmListOf()
}

class EmbeddedPond : EmbeddedRealmObject {
    var name: String? = null
}
