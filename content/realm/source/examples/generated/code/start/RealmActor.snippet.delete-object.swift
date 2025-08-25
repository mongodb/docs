let actor = try await RealmActor()
let todoId = await actor.getObjectId(forTodoNamed: "Keep Mr. Frodo safe from that Gollum")

try await actor.deleteTodo(id: todoId)
let updatedTodoCount = await actor.count
if updatedTodoCount == todoCount - 1 {
    print("Successfully deleted the todo")
}
