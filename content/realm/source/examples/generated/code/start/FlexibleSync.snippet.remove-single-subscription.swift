let realm = try await getRealmAfterRemovingSubscription()

// Opening a realm and accessing it must be done from the same thread.
// Marking this function as `@MainActor` avoids threading-related issues.
@MainActor
func getRealmAfterRemovingSubscription() async throws -> Realm {
    let realm = try await Realm(configuration: flexSyncConfig)
    let subscriptions = realm.subscriptions
    // Look for a specific subscription, and then remove it
    let foundSubscription = subscriptions.first(named: "docs-team")
    try await subscriptions.update {
        subscriptions.remove(foundSubscription!)
    }
    // Or remove a subscription that you know exists without querying for it
    try await subscriptions.update {
        subscriptions.remove(named: "existing-subscription")
    }
    return realm
}
