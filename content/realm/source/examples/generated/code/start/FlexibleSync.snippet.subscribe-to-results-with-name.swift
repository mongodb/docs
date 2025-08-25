let realm = try await Realm(configuration: flexSyncConfig)
let results = try await realm.objects(Team.self)
    .where { $0.teamName == "Developer Education" }
    .subscribe(name: "team_developer_education")
// Go on to work with subscribed results
