@MainActor
func mainThreadFunction() async throws {
    // Create an object in an actor-isolated realm.
    // Pass primitive data to the actor instead of
    // creating the object here and passing the object.
    let actor = try await RealmActor()
    try await actor.createTodo(name: "Prepare fireworks for birthday party", owner: "Gandalf", status: "In Progress")
    
    // Later, get information off the actor-confined realm
    let todoOwner = await actor.getTodoOwner(forTodoNamed: "Prepare fireworks for birthday party")
}
