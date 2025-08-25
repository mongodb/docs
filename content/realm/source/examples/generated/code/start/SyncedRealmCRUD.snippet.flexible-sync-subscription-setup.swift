let app = App(id: YOUR_APP_ID_HERE)

do {
    let user = try await app.login(credentials: Credentials.anonymous)
    do {
        var flexSyncConfig = user.flexibleSyncConfiguration()
        flexSyncConfig.objectTypes = [Item.self]
        let realm = try await Realm(configuration: flexSyncConfig)
        let subscriptions = realm.subscriptions
        try await subscriptions.update {
            subscriptions.append(
                QuerySubscription<Item>(name: "simple-items") {
                 $0.complexity <= 4
            })
        }
        print("Successfully opened realm: \(realm)")
    } catch {
        print("Failed to open realm: \(error.localizedDescription)")
        // handle error
    }
} catch {
    fatalError("Login failed: \(error.localizedDescription)")
}
