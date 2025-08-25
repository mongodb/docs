// Execute code on a specific actor - in this case, the @MainActor
@MainActor
func mainThreadFunction() async throws {
    // Create an object off the main actor
    func createObject(in actor: isolated BackgroundActor) async throws -> ObjectId {
        let realm = try await Realm(actor: actor)
        let newTodo = try await realm.asyncWrite {
            return realm.create(Todo.self, value: [
                "name": "Pledge fealty and service to Gondor",
                "owner": "Pippin",
                "status": "In Progress"
            ])
        }
        
        // Share the todo's primary key so we can easily query for it on another actor
        return newTodo._id
    }

    // Initialize an actor where you want to perform background work
    let actor = BackgroundActor()
    let newTodoId = try await createObject(in: actor)
    let realm = try await Realm()
    let todoOnMainActor = realm.object(ofType: Todo.self, forPrimaryKey: newTodoId)
}
