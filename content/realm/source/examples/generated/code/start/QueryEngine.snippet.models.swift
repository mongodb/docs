class Task: Object {
    @Persisted var name = ""
    @Persisted var isComplete = false
    @Persisted var assignee: String?
    @Persisted var priority = 0
    @Persisted var progressMinutes = 0
    @Persisted var labels: MutableSet<String>
    @Persisted var ratings: MutableSet<Int>
}

class Project: Object {
    @Persisted var name = ""
    @Persisted var tasks: List<Task>
}
