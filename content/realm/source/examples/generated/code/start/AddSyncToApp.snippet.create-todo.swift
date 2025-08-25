@MainActor
func useRealm(_ realm: Realm, _ user: User) {
    // Add some tasks
    let todo = Todo(name: "Do laundry", ownerId: user.id)
    try! realm.write {
        realm.add(todo)
    }
}
