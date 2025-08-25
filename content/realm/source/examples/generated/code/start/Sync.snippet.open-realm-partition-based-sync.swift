let app = App(id: YOUR_APP_SERVICES_APP_ID)

// Store a configuration that consists of the current user,
// authenticated to this instance of your app. If there is no
// user, your code should log one in.
let user = app.currentUser
let partitionValue = "some partition value"
var configuration = user!.configuration(partitionValue: partitionValue)

// Open the database with the user's configuration.
let syncedRealm = try! Realm(configuration: configuration)
print("Successfully opened the synced realm: \(syncedRealm)")
