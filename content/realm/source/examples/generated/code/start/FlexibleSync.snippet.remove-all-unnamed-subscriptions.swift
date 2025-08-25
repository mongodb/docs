let realm = try await Realm(configuration: flexSyncConfig)
// Add 2 subscriptions, one named and one unnamed.
let results = try await realm.objects(Team.self).where { $0.teamName == "Developer Education" }.subscribe(name: "team_developer_education")
let results2 = try await realm.objects(Task.self).where { $0.completed == false }.subscribe()
// Later, remove only the unnamed one
let subscriptions = realm.subscriptions
try await subscriptions.update {
    subscriptions.removeAll(unnamedOnly: true)
}
