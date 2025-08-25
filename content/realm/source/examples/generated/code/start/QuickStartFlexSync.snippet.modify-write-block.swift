// All modifications to a realm must happen in a write block.
let todoToUpdate = todos[0]
try! realm.write {
    todoToUpdate.status = "InProgress"
}
