/// This view opens a synced realm.
struct OpenPartitionBasedSyncRealm: View {
    // @AsyncOpen attempts to connect to the server and download remote changes
    // before the realm opens. If there is no network connection,
    // AsyncOpen cannot load changes and the realm does not open.

    // We can use an empty string as the partitionValue here because we're
    // injecting the user.id as an environment value from the LoginView.

    @AsyncOpen(appId: YOUR_APP_SERVICES_APP_ID_HERE, partitionValue: "", timeout: 4000) var asyncOpen
    
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
