val results = realm.query<Team>("$0 IN members", "Bob Smith")
    .subscribe("bob_smith_teams", updateExisting = false, WaitForSync.ALWAYS)

// After waiting for sync, the results set contains all the objects
// that match the query - in our case, 1
println("The number of teams that have Bob Smith as a member is ${results.size}")
