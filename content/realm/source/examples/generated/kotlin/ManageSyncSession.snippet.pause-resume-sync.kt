// Pause the sync session
// Data that you write while session is paused does not sync to Atlas
realm.syncSession.pause()

// Add data locally
realm.write {
    this.copyToRealm(Task().apply {
        taskName = "Submit expense report"
        assignee = "Kevin"
        progressMinutes = 0
    })
}

// Resume sync session
// Local changes now sync to Atlas
realm.syncSession.resume()
