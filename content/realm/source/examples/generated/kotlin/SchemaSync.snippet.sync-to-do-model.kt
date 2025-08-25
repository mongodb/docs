class List : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var ownerId: String = ""
    var items: RealmList<Item> = realmListOf()
}

class Item : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var complete: Boolean = false
}
