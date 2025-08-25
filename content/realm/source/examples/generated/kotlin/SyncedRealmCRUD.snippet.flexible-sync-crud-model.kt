class Item : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var ownerId: String = ""
    var itemName: String = ""
    var complexity: Int = 0
}
