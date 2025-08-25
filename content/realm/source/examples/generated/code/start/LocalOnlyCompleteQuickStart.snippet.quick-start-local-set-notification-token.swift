// Retain notificationToken as long as you want to observe
let notificationToken = todos.observe { (changes) in
    switch changes {
    case .initial: break
        // Results are now populated and can be accessed without blocking the UI
    case .update(_, let deletions, let insertions, let modifications):
        // Query results have changed.
        print("Deleted indices: ", deletions)
        print("Inserted indices: ", insertions)
        print("Modified modifications: ", modifications)
    case .error(let error):
        // An error occurred while opening the Realm file on the background worker thread
        fatalError("\(error)")
    }
}
