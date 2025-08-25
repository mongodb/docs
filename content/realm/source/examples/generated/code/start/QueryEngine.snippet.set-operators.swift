let noCompleteTasks = projects.filter("NONE tasks.isComplete == true")
print("Projects with no complete tasks: \(noCompleteTasks.count)")

let anyTopPriorityTasks = projects.filter("ANY tasks.priority == 10")
print("Projects with any top priority tasks: \(anyTopPriorityTasks.count)")
