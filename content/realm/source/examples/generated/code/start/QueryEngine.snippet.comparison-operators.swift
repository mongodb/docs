let highPriorityTasks = tasks.filter("priority > 5")
print("High priority tasks: \(highPriorityTasks.count)")

let longRunningTasks = tasks.filter("progressMinutes > 120")
print("Long running tasks: \(longRunningTasks.count)")

let unassignedTasks = tasks.filter("assignee == nil")
print("Unassigned tasks: \(unassignedTasks.count)")

let aliOrJamiesTasks = tasks.filter("assignee IN {'Ali', 'Jamie'}")
print("Ali or Jamie's tasks: \(aliOrJamiesTasks.count)")

let progressBetween30and60 = tasks.filter("progressMinutes BETWEEN {30, 60}")
print("Tasks with progress between 30 and 60 minutes: \(progressBetween30and60.count)")
