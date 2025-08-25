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
