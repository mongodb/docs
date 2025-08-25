let realm = try await getRealmAfterRemovingAllSubscriptions()

// Opening a realm and accessing it must be done from the same thread.
// Marking this function as `@MainActor` avoids threading-related issues.
@MainActor
func getRealmAfterRemovingAllSubscriptions() async throws -> Realm {
    let realm = try await Realm(configuration: flexSyncConfig)
    let subscriptions = realm.subscriptions
    try await subscriptions.update {
        subscriptions.removeAll()
    }
    return realm
}
