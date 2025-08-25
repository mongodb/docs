realm.subscriptions.update {
    add(
        realm.query<Team>("$0 IN members", "Bob Smith"),
        "bob_smith_teams")
}

// Wait for synchronization to complete before updating subscriptions
realm.subscriptions.waitForSynchronization(Duration.parse("10s"))

// Remove all subscriptions to type Team
realm.subscriptions.update {
    removeAll(Team::class)
}
