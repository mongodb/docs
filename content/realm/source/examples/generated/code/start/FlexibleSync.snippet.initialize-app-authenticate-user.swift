let app = App(id: APPID)

do {
    let credentials = emailPasswordCredentials(app: app)
    let user = try await app.login(credentials: credentials)
    var flexSyncConfig = user.flexibleSyncConfiguration()
    flexSyncConfig.objectTypes = [Task.self, Team.self]
    do {
        // Open the synced realm and manage Flexible Sync subscriptions
    } catch {
        print("Failed to open realm: \(error.localizedDescription)")
        // handle error
    }
} catch {
    fatalError("Login failed: \(error.localizedDescription)")
}
