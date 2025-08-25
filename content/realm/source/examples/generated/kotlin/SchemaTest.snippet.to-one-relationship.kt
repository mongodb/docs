class SushiPlatter : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var fish: Fish? = null
}
