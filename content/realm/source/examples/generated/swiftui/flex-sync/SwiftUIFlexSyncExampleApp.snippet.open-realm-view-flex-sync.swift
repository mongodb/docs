/// This view opens a synced realm.
struct OpenSyncedRealmView: View {
    // We've injected a `flexibleSyncConfiguration` as an environment value,
    // so `@AsyncOpen` here opens a realm using that configuration.
    @AsyncOpen(appId: YOUR_APP_SERVICES_APP_ID_HERE, timeout: 4000) var asyncOpen
    
    var body: some View {
        // Because we are setting the `ownerId` to the `user.id`, we need
        // access to the app's current user in this view.
        let user = app?.currentUser
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
            ItemsView(itemGroup: {
                if realm.objects(ItemGroup.self).count == 0 {
                    try! realm.write {
                        // Because we're using `ownerId` as the queryable field, we must
                        // set the `ownerId` to equal the `user.id` when creating the object
                        realm.add(ItemGroup(value: ["ownerId":user!.id]))
                    }
                }
                return realm.objects(ItemGroup.self).first!
            }(), leadingBarButton: AnyView(LogoutButton())).environment(\.realm, realm)
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
