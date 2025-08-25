// Create a simple actor
actor BackgroundActor {
    public func deleteTodo(tsrToTodo tsr: ThreadSafeReference<Todo>) throws {
        let realm = try! Realm()
        try realm.write {
            // Resolve the thread safe reference on the Actor where you want to use it.
            // Then, do something with the object.
            let todoOnActor = realm.resolve(tsr)
            realm.delete(todoOnActor!)
        }
    }
}

// Execute some code on a different actor - in this case, the MainActor
@MainActor
func mainThreadFunction() async throws {
    let backgroundActor = BackgroundActor()
    let realm = try! await Realm()
    
    // Create a todo item so there is something to observe
    try await realm.asyncWrite {
        realm.create(Todo.self, value: [
            "_id": ObjectId.generate(),
            "name": "Arrive safely in Bree",
            "owner": "Merry",
            "status": "In Progress"
        ])
    }
    
    // Get the collection of todos on the current actor
    let todoCollection = realm.objects(Todo.self)
    
    // Register a notification token, providing the actor where you want to observe changes.
    // This is only required if you want to observe on a different actor.
    let token = await todoCollection.observe(on: backgroundActor, { actor, changes in
        print("A change occurred on actor: \(actor)")
        switch changes {
        case .initial:
            print("The initial value of the changed object was: \(changes)")
        case .update(_, let deletions, let insertions, let modifications):
            if !deletions.isEmpty {
                print("An object was deleted: \(changes)")
            } else if !insertions.isEmpty {
                print("An object was inserted: \(changes)")
            } else if !modifications.isEmpty {
                print("An object was modified: \(changes)")
            }
        case .error(let error):
            print("An error occurred: \(error.localizedDescription)")
        }
    })
    
    // Update an object to trigger the notification.
    // This example triggers a notification that the object is deleted.
    // We can pass a thread-safe reference to an object to update it on a different actor.
    let todo = todoCollection.where {
        $0.name == "Arrive safely in Bree"
    }.first!
    let threadSafeReferenceToTodo = ThreadSafeReference(to: todo)
    try await backgroundActor.deleteTodo(tsrToTodo: threadSafeReferenceToTodo)

    // Invalidate the token when done observing
    token.invalidate()
}
