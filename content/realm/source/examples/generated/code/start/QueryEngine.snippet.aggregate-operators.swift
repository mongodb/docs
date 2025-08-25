let averageTaskPriorityAbove5 = projects.filter("tasks.@avg.priority > 5")
print("Projects with average task priority above 5: \(averageTaskPriorityAbove5.count)")

let allTasksLowerPriority = projects.filter("tasks.@max.priority < 5")
print("Projects where all tasks are lower priority: \(allTasksLowerPriority.count)")

let allTasksHighPriority = projects.filter("tasks.@min.priority > 5")
print("Projects where all tasks are high priority: \(allTasksHighPriority.count)")

let moreThan5Tasks = projects.filter("tasks.@count > 5")
print("Projects with more than 5 tasks: \(moreThan5Tasks.count)")

let longRunningProjects = projects.filter("tasks.@sum.progressMinutes > 100")
print("Long running projects: \(longRunningProjects.count)")
