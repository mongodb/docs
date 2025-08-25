let quickWinOrBugTasks = tasks.where {
    $0.labels.containsAny(in: ["quick win", "bug"])
}
print("Tasks labeled 'quick win' or 'bug': \(quickWinOrBugTasks.count)")
