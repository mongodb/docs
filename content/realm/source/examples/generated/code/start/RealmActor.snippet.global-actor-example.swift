// A simple example of a custom global actor
@globalActor actor BackgroundActor: GlobalActor {
    static var shared = BackgroundActor()
}

@BackgroundActor
func backgroundThreadFunction() async throws {
    // Explicitly specifying the actor is required for anything that is not MainActor
    let realm = try await Realm(actor: BackgroundActor.shared)
    try await realm.asyncWrite {
        _ = realm.create(Todo.self, value: [
            "name": "Pledge fealty and service to Gondor",
            "owner": "Pippin",
            "status": "In Progress"
        ])
    }
    // Thread-confined Realms would sometimes throw an exception here, as we
    // may end up on a different thread after an `await`
    let todoCount = realm.objects(Todo.self).count
    print("The number of Realm objects is: \(todoCount)")
}

@MainActor
func mainThreadFunction() async throws {
    try await backgroundThreadFunction()
}
