// Open the default realm.
let realm = try! Realm()

// Prepare to handle exceptions.
do {
    // Open a thread-safe transaction.
    try realm.write {
        // Make any writes within this code block.
        // Realm automatically cancels the transaction
        // if this code throws an exception. Otherwise,
        // Realm automatically commits the transaction
        // after the end of this code block.
    }
} catch let error as NSError {
    // Failed to write to realm.
    // ... Handle error ...
}
