let highPriorityTasks = tasks.where {
    $0.priority > 5
}
print("High-priority tasks: \(highPriorityTasks.count)")

let longRunningTasks = tasks.where {
    $0.progressMinutes >= 120
}
print("Long running tasks: \(longRunningTasks.count)")

let unassignedTasks = tasks.where {
    $0.assignee == nil
}
print("Unassigned tasks: \(unassignedTasks.count)")
