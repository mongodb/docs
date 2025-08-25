let todo = Todo(name: "Do laundry", ownerId: user.id)
try! realm.write {
    realm.add(todo)
}
