@MainActor
func openSyncedRealm(user: User) async {
    do {
        var config = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
            subs.append(
                QuerySubscription<Todo> {
                    $0.ownerId == user.id
                })
        })
        // Pass object types to the Flexible Sync configuration
        // as a temporary workaround for not being able to add a
        // complete schema for a Flexible Sync app.
        config.objectTypes = [Todo.self]
        let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
        useRealm(realm, user)
    } catch {
        print("Error opening realm: \(error.localizedDescription)")
    }
}
