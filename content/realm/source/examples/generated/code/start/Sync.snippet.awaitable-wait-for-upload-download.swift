// Wait to download all pending changes from Atlas
try await realm.syncSession?.wait(for: .download)

// Add data locally
try realm.write {
    realm.create(Task.self, value: [
        "taskName": "Review proposal",
        "assignee": "Emma",
        "completed": false,
        "progressMinutes": 0,
        "dueDate": date
    ])
}

// Wait for local changes to be uploaded to Atlas
try await realm.syncSession?.wait(for: .upload)
