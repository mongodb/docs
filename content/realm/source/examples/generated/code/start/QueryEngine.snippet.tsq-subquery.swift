let subquery = projects.where {
            ($0.tasks.isComplete == false && $0.tasks.assignee == "Alex").count > 0
}
print("Projects with incomplete tasks assigned to Alex: \(subquery.count)")
