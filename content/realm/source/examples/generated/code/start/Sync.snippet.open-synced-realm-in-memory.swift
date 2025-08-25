// Instantiate the app and get a user.
let app = App(id: APPID)
let user = try await app.login(credentials: Credentials.anonymous)

// Create a configuration.
var configuration = user.flexibleSyncConfiguration()
configuration.objectTypes = [Task.self, Team.self]

// Specify an in-memory identifier for the configuration.
configuration.inMemoryIdentifier = "YOUR-IDENTIFIER-STRING"

// Open a Realm with this configuration.
let realm = try await Realm(configuration: configuration)
print("Successfully opened realm: \(realm)")
// Add subscriptions and work with the realm
