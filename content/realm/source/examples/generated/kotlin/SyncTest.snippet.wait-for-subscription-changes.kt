// Update the list of subscriptions
realm.subscriptions.update {
    add(
        realm.query<Team>("$0 IN members", "Jane Doe"),
        "jane_doe_teams"
    )
}
// Wait for subscription to fully synchronize changes
realm.subscriptions.waitForSynchronization(Duration.parse("10s"))
