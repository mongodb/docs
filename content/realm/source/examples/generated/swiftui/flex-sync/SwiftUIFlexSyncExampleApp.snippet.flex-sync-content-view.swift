/// This view observes the Realm app object.
/// Either direct the user to login, or open a realm
/// with a logged-in user.
struct SyncContentView: View {
    // Observe the Realm app object in order to react to login state changes.
    @ObservedObject var app: RealmSwift.App

    var body: some View {
        if let user = app.currentUser {
            // Create a `flexibleSyncConfiguration` with `initialSubscriptions`.
            // We'll inject this configuration as an environment value to use when opening the realm
            // in the next view, and the realm will open with these initial subscriptions.
            let config = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
                // Check whether the subscription already exists. Adding it more
                // than once causes an error.
                if let foundSubscriptions = subs.first(named: "user_groups") {
                    // Existing subscription found - do nothing
                    return
                } else {
                    // Add queries for any objects you want to use in the app
                    // Linked objects do not automatically get queried, so you
                    // must explicitly query for all linked objects you want to include
                    subs.append(QuerySubscription<ItemGroup>(name: "user_groups") {
                        // Query for objects where the ownerId is equal to the app's current user's id
                        // This means the app's current user can read and write their own data
                        $0.ownerId == user.id
                    })
                    subs.append(QuerySubscription<Item>(name: "user_items") {
                        $0.ownerId == user.id
                    })
                }
            })
            OpenSyncedRealmView()
                .environment(\.realmConfiguration, config)
        } else {
            // If there is no user logged in, show the login view.
            LoginView()
        }
    }
}
