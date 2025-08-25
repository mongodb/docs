let averageTaskPriorityAbove5 = projects.where {
    $0.tasks.priority.avg > 5
}
print("Projects with average task priority above 5: \(averageTaskPriorityAbove5.count)")

let allTasksLowerPriority = projects.where {
    $0.tasks.priority.max < 5
}
print("Projects where all tasks are lower priority: \(allTasksLowerPriority.count)")

let allTasksHighPriority = projects.where {
    $0.tasks.priority.min > 5
}
print("Projects where all tasks are high priority: \(allTasksHighPriority.count)")

let moreThan5Tasks = projects.where {
    $0.tasks.count > 5
}
print("Projects with more than 5 tasks: \(moreThan5Tasks.count)")

let longRunningProjects = projects.where {
    $0.tasks.progressMinutes.sum > 100
}
print("Long running projects: \(longRunningProjects.count)")
