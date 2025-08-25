// Wait to download all pending changes from Atlas
realm.syncSession.downloadAllServerChanges(1.minutes)

// Add data locally
realm.write {
    this.copyToRealm(Task().apply {
        taskName = "Review proposal"
        assignee = "Emma"
        progressMinutes = 0
    })
}

// Wait for local changes to be uploaded to Atlas
realm.syncSession.uploadAllLocalChanges(1.minutes)
