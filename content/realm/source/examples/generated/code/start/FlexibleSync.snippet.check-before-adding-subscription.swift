let realm = try await checkAndAddSubscription()

// Opening a realm and accessing it must be done from the same thread.
// Marking this function as `@MainActor` avoids threading-related issues.
@MainActor
func checkAndAddSubscription() async throws -> Realm {
    let realm = try await Realm(configuration: flexSyncConfig)
    let subscriptions = realm.subscriptions
    let foundSubscription = subscriptions.first(named: "user_team")
    try await subscriptions.update {
        if foundSubscription != nil {
            foundSubscription!.updateQuery(toType: Team.self, where: {
                 $0.teamName == "Developer Education"
            })
        } else {
            subscriptions.append(
                QuerySubscription<Team>(name: "user_team") {
                  $0.teamName == "Developer Education"
               })
        }
    }
    return realm
}
