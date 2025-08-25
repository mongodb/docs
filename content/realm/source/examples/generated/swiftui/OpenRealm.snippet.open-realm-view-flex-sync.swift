/// This view opens a synced realm.
struct OpenFlexibleSyncRealmView: View {
    // We've injected a `flexibleSyncConfiguration` as an environment value,
    // so `@AsyncOpen` here opens a realm using that configuration.
    @AsyncOpen(appId: flexibleSyncAppId, timeout: 4000) var asyncOpen
    
    var body: some View {
        switch asyncOpen {
        // Starting the Realm.asyncOpen process.
        // Show a progress view.
        case .connecting:
            ProgressView()
        // Waiting for a user to be logged in before executing
        // Realm.asyncOpen.
        case .waitingForUser:
            ProgressView("Waiting for user to log in...")
        // The realm has been opened and is ready for use.
        // Show the content view.
        case .open(let realm):
            // Do something with the realm
            UseRealmView(realm: realm)
        // The realm is currently being downloaded from the server.
        // Show a progress view.
        case .progress(let progress):
            ProgressView(progress)
        // Opening the Realm failed.
        // Show an error view.
        case .error(let error):
            ErrorView(error: error)
        }
    }
}
