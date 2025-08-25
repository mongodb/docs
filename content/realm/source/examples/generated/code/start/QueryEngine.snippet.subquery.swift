let predicate = NSPredicate(
    format: "SUBQUERY(tasks, $task, $task.isComplete == false AND $task.assignee == %@).@count > 0", "Alex")
print("Projects with incomplete tasks assigned to Alex: \(projects.filter(predicate).count)")
