class Task: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var taskName: String
    @Persisted var assignee: String?
    @Persisted var completed: Bool
    @Persisted var progressMinutes: Int
    @Persisted var dueDate: Date
}

class Team: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var teamName: String
    @Persisted var tasks: List<Task>
    @Persisted var members: List<String>
}
