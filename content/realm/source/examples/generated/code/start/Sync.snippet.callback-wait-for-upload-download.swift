// Wait to download all pending changes from Atlas
realm.syncSession?.wait(for: .download, block: { _ in
    // You can provide a block to execute
    // after waiting for download to complete
})

// Add data locally
do {
    try realm.write {
        realm.create(Task.self, value: [
            "taskName": "Review proposal",
            "assignee": "Emma",
            "completed": false,
            "progressMinutes": 0,
            "dueDate": date
        ])
    }
} catch {
    print("There was an error writing to realm: \(error.localizedDescription)")
}
// Wait for local changes to be uploaded to Atlas
realm.syncSession?.wait(for: .upload, block: { _ in
    // You can provide a block to execute after
    // waiting for upload to complete
})
