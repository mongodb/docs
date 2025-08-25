@MainActor
func mainThreadFunction() async throws {
    // Initialize the app client and authenticate a user
    let app = App(id: APPID)
    let user = try await app.login(credentials: Credentials.anonymous)
    
    // Configure the synced realm
    var flexSyncConfig = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
        subs.append(QuerySubscription<Todo>(name: "all_todos"))})
    flexSyncConfig.objectTypes = [Todo.self]
    
    // Open and use the synced realm
    let realm = try await Realm(configuration: flexSyncConfig, actor: MainActor.shared, downloadBeforeOpen: .always)
    try await useTheSyncedRealm(realm: realm)
}
