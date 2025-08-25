func deleteTodo(id: ObjectId) async throws {
    try await realm.asyncWrite {
        let todoToDelete = realm.object(ofType: Todo.self, forPrimaryKey: id)
        realm.delete(todoToDelete!)
    }
}
