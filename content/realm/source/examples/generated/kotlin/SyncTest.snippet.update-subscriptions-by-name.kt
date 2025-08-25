// Create a subscription named "bob_smith_teams"
realm.subscriptions.update {
    add(
        realm.query<Team>("$0 IN members", "Bob Smith"),
        "bob_smith_teams"
    )
}

// Set `updateExisting` to true to replace the existing
// "bob_smith_teams" subscription
realm.subscriptions.update {
    add(
        realm.query<Team>("$0 IN members AND $1 IN members", "Bob Smith", "Jane Doe"),
        "bob_smith_teams", updateExisting = true
    )
}
