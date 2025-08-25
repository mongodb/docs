// Opening a realm and accessing it must be done from the same thread.
// Marking this function as `@MainActor` avoids threading-related issues.
@MainActor
func openSyncedRealm(user: User) async {
    do {
        var config = user.flexibleSyncConfiguration()
        // Pass object types to the Flexible Sync configuration
        // as a temporary workaround for not being able to add a
        // complete schema for a Flexible Sync app.
        config.objectTypes = [Todo.self]
        let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
        // You must add at least one subscription to read and write from a Flexible Sync realm
        let subscriptions = realm.subscriptions
        try await subscriptions.update {
            subscriptions.append(
                QuerySubscription<Todo> {
                    $0.ownerId == user.id
                })
        }
        await useRealm(realm: realm, user: user)
    } catch {
        print("Error opening realm: \(error.localizedDescription)")
    }
}
