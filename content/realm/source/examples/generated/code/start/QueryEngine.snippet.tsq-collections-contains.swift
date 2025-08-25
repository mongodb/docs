let quickWinTasks = tasks.where {
    $0.labels.contains("quick win")
}
print("Tasks labeled 'quick win': \(quickWinTasks.count)")

let progressBetween30and60 = tasks.where {
    $0.progressMinutes.contains(30...60)
}
print("Tasks with progress between 30 and 60 minutes: \(progressBetween30and60.count)")
