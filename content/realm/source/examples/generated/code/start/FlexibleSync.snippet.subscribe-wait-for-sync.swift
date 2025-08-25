let realm = try await Realm(configuration: flexSyncConfig)
let results = try await realm.objects(Team.self)
    .where { $0.members.contains("Bob Smith") }
    .subscribe(
        name: "bob_smith_teams",
        waitForSync: .onCreation)
// After waiting for sync, the results set contains all the objects
// that match the query - in our case, 1
print("The number of teams that have Bob Smith as a member is \(results.count)")
