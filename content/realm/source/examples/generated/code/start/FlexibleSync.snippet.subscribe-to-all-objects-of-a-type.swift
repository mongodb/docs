let realm = try await subscribeToObjectsOfAType()

// Opening a realm and accessing it must be done from the same thread.
// Marking this function as `@MainActor` avoids threading-related issues.
@MainActor
func subscribeToObjectsOfAType() async throws -> Realm {
    let realm = try await Realm(configuration: flexSyncConfig)
    let subscriptions = realm.subscriptions
    try await subscriptions.update {
        subscriptions.append(QuerySubscription<Team>(name: "all_teams"))
    }
    XCTAssertEqual(subscriptions.count, 1) // :remove
    return realm
}
