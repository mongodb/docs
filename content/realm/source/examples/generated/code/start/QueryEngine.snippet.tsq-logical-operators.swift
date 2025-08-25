let aliComplete = tasks.where {
    ($0.assignee == "Ali") && ($0.isComplete == true)
}
print("Ali's complete tasks: \(aliComplete.count)")
