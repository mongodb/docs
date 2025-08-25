let realm = try await getRealmWithMultipleSubscriptions()

// Opening a realm and accessing it must be done from the same thread.
// Marking this function as `@MainActor` avoids threading-related issues.
@MainActor
func getRealmWithMultipleSubscriptions() async throws -> Realm {
    let realm = try await Realm(configuration: flexSyncConfig)
    let subscriptions = realm.subscriptions
    try await subscriptions.update {
        subscriptions.append(
            QuerySubscription<Task>(name: "completed-tasks") {
                 $0.completed == true
        })
        subscriptions.append(
            QuerySubscription<Team> {
              $0.teamName == "Developer Education"
        })
    }
    return realm
}
