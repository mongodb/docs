let realm = try await openFlexibleSyncRealm()

// Opening a realm and accessing it must be done from the same thread.
// Marking this function as `@MainActor` avoids threading-related issues.
@MainActor
func openFlexibleSyncRealm() async throws -> Realm {
    let app = App(id: APPID)
    let credentials = emailPasswordCredentials(app: app)
    let user = try await app.login(credentials: credentials)
    var config = user.flexibleSyncConfiguration()
    // Pass object types to the Flexible Sync configuration
    // as a temporary workaround for not being able to add complete schema
    // for a Flexible Sync app
    config.objectTypes = [Task.self, Team.self]
    let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
    print("Successfully opened realm: \(realm)")
    return realm
}
