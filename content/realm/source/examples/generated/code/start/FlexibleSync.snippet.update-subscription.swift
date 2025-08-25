let realm = try await getRealmWithUpdatedSubscriptions()

// Opening a realm and accessing it must be done from the same thread.
// Marking this function as `@MainActor` avoids threading-related issues.
@MainActor
func getRealmWithUpdatedSubscriptions() async throws -> Realm {
    let realm = try await Realm(configuration: flexSyncConfig)
    let subscriptions = realm.subscriptions
    try await subscriptions.update {
        if let foundSubscription = subscriptions.first(ofType: Team.self, where: {
            $0.teamName == "Developer Education"
        }) {
            foundSubscription.updateQuery(toType: Team.self, where: {
                $0.teamName == "Documentation"
            })
        }
    }
    return realm
}
