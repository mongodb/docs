// All modifications to a realm must happen in a write block.
let todoToDelete = todos[0]
try! realm.write {
    // Delete the Todo.
    realm.delete(todoToDelete)
}
