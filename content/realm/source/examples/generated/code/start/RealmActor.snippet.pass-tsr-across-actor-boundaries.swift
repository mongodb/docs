// We can pass a thread-safe reference to an object to update it on a different actor.
let todo = todoCollection.where {
    $0.name == "Arrive safely in Bree"
}.first!
let threadSafeReferenceToTodo = ThreadSafeReference(to: todo)
try await backgroundActor.deleteTodo(tsrToTodo: threadSafeReferenceToTodo)
