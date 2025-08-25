func createObject() async throws {
    // Because this function is not isolated to this actor,
    // you must await operations completed on the actor
    try await actor.createTodo(name: "Take the ring to Mount Doom", owner: "Frodo", status: "In Progress")
    let taskCount = await actor.count
    print("The actor currently has \(taskCount) tasks")
}

let actor = try await RealmActor()

try await createObject()
