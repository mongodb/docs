class Task : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var taskName: String = ""
    var assignee: String? = null
    var completed: Boolean = false
    var progressMinutes: Int = 0
    var dueDate: RealmInstant? = null
}

class Team : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var teamName: String = ""
    var tasks: RealmList<Task>? = realmListOf()
    var members: RealmList<String> = realmListOf()
}
