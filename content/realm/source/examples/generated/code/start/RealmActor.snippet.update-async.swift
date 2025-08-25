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
