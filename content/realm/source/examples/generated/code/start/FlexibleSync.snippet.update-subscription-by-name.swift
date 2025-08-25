let realm = try await getRealmWithUpdatedSubscriptionName()

// Opening a realm and accessing it must be done from the same thread.
// Marking this function as `@MainActor` avoids threading-related issues.
@MainActor
func getRealmWithUpdatedSubscriptionName() async throws -> Realm {
    let realm = try await Realm(configuration: flexSyncConfig)
    let subscriptions = realm.subscriptions
    let foundSubscription = subscriptions.first(named: "user-team")
    try await subscriptions.update {
        foundSubscription?.updateQuery(toType: Team.self, where: {
             $0.teamName == "Documentation"
        })
    }
    return realm
}
