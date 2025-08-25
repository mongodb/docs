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
