let realm = try await getRealmWithSingleSubscription()

// Opening a realm and accessing it must be done from the same thread.
// Marking this function as `@MainActor` avoids threading-related issues.
@MainActor
func getRealmWithSingleSubscription() async throws -> Realm {
    let realm = try await Realm(configuration: flexSyncConfig)
    let subscriptions = realm.subscriptions
    try await subscriptions.update {
       subscriptions.append(
          QuerySubscription<Team> {
             $0.teamName == "Developer Education"
          })
    }
    return realm
}
