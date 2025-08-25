// Create a subscription named "bob_smith_teams"
val results = realm.query<Team>("$0 IN members", "Bob Smith")
    .subscribe("bob_smith_teams")

// Add another subscription with the same name with `updateExisting` set to true
// to replace the existing subscription
val updateResults =
        realm.query<Team>("$0 IN members AND teamName == $1", "Bob Smith", "QA")
            .subscribe("bob_smith_teams", updateExisting = true)
