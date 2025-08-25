let realmSwiftQuery = projects.where {
    ($0.tasks.progressMinutes > 1) && ($0.tasks.assignee == "Ali")
}
