// Execute some code on a specific actor - in this case, the MainActor
@MainActor
func mainThreadFunction() async throws {
    // Initialize an instance of another actor
    // where you want to do background work
    let backgroundActor = BackgroundActor()
    
    // Create a todo item so there is something to observe
    let realm = try! await Realm()
    let scourTheShire = try await realm.asyncWrite {
        return realm.create(Todo.self, value: [
            "_id": ObjectId.generate(),
            "name": "Scour the Shire",
            "owner": "Merry",
            "status": "In Progress"
        ])
    }
    
    // Register a notification token, providing the actor
    let token = await scourTheShire.observe(on: backgroundActor, { actor, change in
        print("A change occurred on actor: \(actor)")
        switch change {
        case .change(let object, let properties):
            for property in properties {
                print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'")
            }
        case .error(let error):
            print("An error occurred: \(error)")
        case .deleted:
            print("The object was deleted.")
        }
    })
    
    // Update the object to trigger the notification.
    // This triggers a notification that the object's `status` property has been changed.
    try await realm.asyncWrite {
        scourTheShire.status = "Complete"
    }
    
    // Invalidate the token when done observing
    token.invalidate()
}
