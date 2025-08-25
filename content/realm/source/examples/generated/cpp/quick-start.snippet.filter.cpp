auto todosInProgress = todos.where(
    [](auto const& todo) { return todo.status == "In Progress"; });
