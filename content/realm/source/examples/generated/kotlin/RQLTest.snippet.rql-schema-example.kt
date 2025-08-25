class Item(): RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    @FullText
    var name: String = ""
    var isComplete: Boolean = false
    var assignee: String? = null
    var priority: Int = 0
    var progressMinutes: Int = 0
}

class Project(): RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var items: RealmList<Item> = realmListOf<Item>()
    var quota: Int? = null
}
