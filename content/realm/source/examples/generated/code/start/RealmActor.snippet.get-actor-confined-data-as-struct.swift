@MainActor
func mainThreadFunction() async throws {
    // Create an object in an actor-isolated realm.
    let actor = try await RealmActor()
    try await actor.createTodo(name: "Leave the ring on the mantle", owner: "Bilbo", status: "In Progress")
    
    // Get information as a struct or other Sendable type.
    let todoAsStruct = await actor.getTodoAsStruct(forTodoNamed: "Leave the ring on the mantle")
}
