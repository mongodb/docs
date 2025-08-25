.. code-block:: swift
   :emphasize-lines: 11-25

   struct FlexSyncContentView: View {
       // Observe the Realm App object in order to react to login state changes.
       @ObservedObject var app: RealmSwift.App
       // Use the error handler that you've injected into the environment
       // to react to Device Sync errors.
       @EnvironmentObject var errorHandler: ErrorHandler
       
       var body: some View {
           if let user = app.currentUser {
               let config = user.flexibleSyncConfiguration(
                   clientResetMode: .recoverUnsyncedChanges(
                       beforeReset: { realm in
                           // A block called after a client reset error is detected, but before the
                           // client recovery process is executed.
                           // This block could be used for any custom logic, reporting, debugging etc.
                           // For more information, refer to: https://www.mongodb.com/docs/realm/sdk/swift/sync/handle-sync-errors/
                           print("Before client reset block")
                       }, afterReset: { before,after in
                           // A block called after the client recovery process has executed.
                           // This block could be used for custom recovery, reporting, debugging etc.
                           // For SwiftUI, you might modify a @State variable to trigger views to reload
                           // or advise the user to restart the app.
                           // For more information, refer to: https://www.mongodb.com/docs/realm/sdk/swift/sync/handle-sync-errors/
                           print("After client reset block")
                   }),
                   initialSubscriptions: { subs in
                       let peopleSubscriptionExists = subs.first(named: "people")
                       let dogSubscriptionExists = subs.first(named: "dogs")
                       // Check whether the subscription already exists. Adding it more
                       // than once causes an error.
                       if (peopleSubscriptionExists != nil) && (dogSubscriptionExists != nil) {
                           // Existing subscriptions found - do nothing
                           return
                       } else {
                           // Add queries for any objects you want to use in the app.
                           // Linked objects do not automatically get queried, so you
                           // must explicitly query for all linked objects you want to include.
                           subs.append(QuerySubscription<Person>(name: "people"))
                           subs.append(QuerySubscription<Dog>(name: "dogs"))
                       }
                   }
               )
               OpenFlexibleSyncRealmView()
                   .environment(\.realmConfiguration, config)
           } else {
               LoginView()
           }
       }
   }
