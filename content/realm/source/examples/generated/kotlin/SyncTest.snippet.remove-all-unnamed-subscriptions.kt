// Remove all unnamed (anonymous) subscriptions
realm.subscriptions.update {
    removeAll(anonymousOnly = true)
}
