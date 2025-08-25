class User: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var _partition: String = ""
    @objc dynamic var name: String = ""

    // A user can have many tasks.
    let tasks = List<Task>()

    override static func primaryKey() -> String? {
        return "_id"
    }
}

class Task: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var _partition: String = ""
    @objc dynamic var text: String = ""

    // Backlink to the user. This is automatically updated whenever
    // this task is added to or removed from a user's task list.
    let assignee = LinkingObjects(fromType: User.self, property: "tasks")

    override static func primaryKey() -> String? {
        return "_id"
    }
}
