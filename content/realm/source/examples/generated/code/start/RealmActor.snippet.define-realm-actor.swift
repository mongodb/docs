actor RealmActor {
    // An implicitly-unwrapped optional is used here to let us pass `self` to
    // `Realm(actor:)` within `init`
    var realm: Realm!
    init() async throws {
        realm = try await Realm(actor: self)
    }

    var count: Int {
        realm.objects(Todo.self).count
    }
    
    func createTodo(name: String, owner: String, status: String) async throws {
        try await realm.asyncWrite {
            realm.create(Todo.self, value: [
                "_id": ObjectId.generate(),
                "name": name,
                "owner": owner,
                "status": status
            ])
        }
    }
    
    func getTodoOwner(forTodoNamed name: String) -> String {
        let todo = realm.objects(Todo.self).where {
            $0.name == name
        }.first!
        return todo.owner
    }
    
    struct TodoStruct {
        var id: ObjectId
        var name, owner, status: String
    }
    
    func getTodoAsStruct(forTodoNamed name: String) -> TodoStruct {
        let todo = realm.objects(Todo.self).where {
            $0.name == name
        }.first!
        return TodoStruct(id: todo._id, name: todo.name, owner: todo.owner, status: todo.status)
    }
    
    func updateTodo(_id: ObjectId, name: String, owner: String, status: String) async throws {
        try await realm.asyncWrite {
            realm.create(Todo.self, value: [
                "_id": _id,
                "name": name,
                "owner": owner,
                "status": status
            ], update: .modified)
        }
    }
    
    func deleteTodo(id: ObjectId) async throws {
        try await realm.asyncWrite {
            let todoToDelete = realm.object(ofType: Todo.self, forPrimaryKey: id)
            realm.delete(todoToDelete!)
        }
    }
    
    func close() {
        realm = nil
    }
    
}
