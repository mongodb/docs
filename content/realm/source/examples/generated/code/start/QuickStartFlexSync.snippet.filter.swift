let todosInProgress = todos.where {
    $0.status == "InProgress"
}
print("A list of all todos in progress: \(todosInProgress)")
