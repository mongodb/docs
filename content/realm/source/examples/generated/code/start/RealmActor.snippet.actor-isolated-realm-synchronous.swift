func createObject(in actor: isolated RealmActor) async throws {
    // Because this function is isolated to this actor, you can use
    // realm synchronously in this context without async/await keywords
    try actor.realm.write {
        actor.realm.create(Todo.self, value: [
            "name": "Keep it secret",
            "owner": "Frodo",
            "status": "In Progress"
        ])
    }
    let taskCount = actor.count
    print("The actor currently has \(taskCount) tasks")
}

let actor = try await RealmActor()

try await createObject(in: actor)
