// Log the user into the backend app.
// The first time you login, the user must have a network connection.
func getUser() async throws -> User {
    // Check for an existing user.
    // If the user is offline but credentials are
    // cached, this returns the existing user.
    if let user = app.currentUser {
        return user
    } else {
        // If the device has no cached user
        // credentials, log them in.
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let loggedInUser = try await app.login(credentials: Credentials.anonymous)
        return loggedInUser
    }
}

let user = try await getUser()
var configuration = user.configuration(partitionValue: "Some Partition Value")
// Open a Realm with this configuration.
// If you do not require the app to download updates
// before opening the realm, the realm just opens, even if
// offline.
let realm = try await Realm(configuration: configuration)
print("Successfully opened realm: \(realm)")
