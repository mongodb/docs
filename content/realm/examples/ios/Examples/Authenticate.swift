import XCTest
import RealmSwift
import GoogleSignIn
import FacebookLogin
import SwiftUI

class Authenticate: XCTestCase {
    func testGoogleSignInWithServerAuthCode() {
        let expectation = XCTestExpectation(description: "login completes")

        // :snippet-start: google-with-serverAuthCode
        func sign(_ signIn: GIDSignIn!, didSignInFor googleUser: GIDGoogleUser!, withError error: Error!) {
            if let error = error {
              print("\(error.localizedDescription)")
                return
            }
            // Upon first successful sign-in, forward serverAuthCode credentials to MongoDB Realm.
            // Upon subsequent sign-ins, this returns nil.
            let credentials = Credentials.google(serverAuthCode: googleUser.serverAuthCode!)

            app.login(credentials: credentials) { result in
                DispatchQueue.main.async {
                    switch result {
                    case .failure(let error):
                        print("Failed to log in to MongoDB Realm: \(error)")
                    case .success(let user):
                        print("Successfully logged in to MongoDB Realm using Google OAuth.")
                        // Now logged in, do something with user
                        // Remember to dispatch to main if you are doing anything on the UI thread
                    }
                }
            }
        }
        // :snippet-end:
        expectation.fulfill()
        wait(for: [expectation], timeout: 10)
    }

    func testGoogleSignInWithId() {
        let expectation = XCTestExpectation(description: "login completes")

        // :snippet-start: google-with-googleId
        func sign(_ signIn: GIDSignIn!, didSignInFor googleUser: GIDGoogleUser!, withError error: Error!) {
            if let error = error {
              print("\(error.localizedDescription)")
                return
            }

            // Get the ID token for the authenticated user so you can pass it to Realm
            let idToken = googleUser.authentication.idToken!

            let credentials = Credentials.googleId(token: idToken)

            app.login(credentials: credentials) { result in
                DispatchQueue.main.async {
                    switch result {
                    case .failure(let error):
                        print("Failed to log in to MongoDB Realm: \(error)")
                    case .success(let user):
                        print("Successfully logged in to MongoDB Realm using Google OAuth.")
                        // Now logged in, do something with user
                        // Remember to dispatch to main if you are doing anything on the UI thread
                    }
                }
            }
        }
        // :snippet-end:
        expectation.fulfill()
        wait(for: [expectation], timeout: 10)
    }

    func testAppleCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :snippet-start: apple
        // Fetch IDToken via the Apple SDK
        let credentials = Credentials.apple(idToken: "<token>")
        app.login(credentials: credentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testFacebookCredentials() {
        let expectation = XCTestExpectation(description: "login completes")
        // :snippet-start: facebook
        // This example demonstrates login logic for FBSDK version 13.x. If you're using
        // a different version of FBSDK, you'll need to adapt this example for your version.
        let loginManager = LoginManager()
        loginManager.logIn(permissions: [ .email ]) { loginResult in
            switch loginResult {
            case .success(let grantedPermissions, let declinedPermissions, let accessToken):
                let credentials = Credentials.facebook(accessToken: accessToken!.tokenString)
                app.login(credentials: credentials) { result in
                    DispatchQueue.main.async {
                        switch result {
                        case .failure(let error):
                            print("Failed to log in to MongoDB Realm: \(error)")
                        case .success(let user):
                            print("Successfully logged in to MongoDB Realm using Facebook OAuth.")
                            // Now logged in, do something with user
                            // Remember to dispatch to main if you are doing anything on the UI thread
                        }
                    }
                }
            case .failed(let error):
                print("Facebook login failed: \(error)")
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            case .cancelled:
                print("The user cancelled the login flow.")

            }
        }
        // :snippet-end:
        expectation.fulfill()
        wait(for: [expectation], timeout: 10)
    }

    func testJwtCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :snippet-start: jwt
        let credentials = Credentials.jwt(token: "<jwt>")
        app.login(credentials: credentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testCustomFunctionCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :snippet-start: function
        let params: Document = ["username": "bob"]

        app.login(credentials: Credentials.function(payload: params)) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
        // Delete this user so it doesn't interfere with the DeleteUsers tests
        app.currentUser?.delete()
    }

    func testApiKeyCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :snippet-start: api-key
        let credentials = Credentials.userAPIKey("<api-key>")
        app.login(credentials: credentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testEmailPasswordCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :snippet-start: email-password
        let email = "skroob@example.com"
        let password = "12345"
        app.login(credentials: Credentials.emailPassword(email: email, password: password)) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testAsyncAwaitLogin() async {
        let expectation = XCTestExpectation(description: "login completes")
        // :snippet-start: async-await
        func login() async {
            do {
                let app = App(id: YOUR_APP_SERVICES_APP_ID)
                // Authenticate with the instance of the app that points
                // to your backend. Here, we're using anonymous login.
                let user = try await app.login(credentials: Credentials.anonymous)
                print("Successfully logged in user: \(user)")
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            } catch {
                print("Failed to log in user: \(error.localizedDescription)")
            }
        }
        // :snippet-end:
        await login()
        wait(for: [expectation], timeout: 10)
    }

    func testAnonymousCredentials() {
        let expectation = XCTestExpectation(description: "login completes")

        // :snippet-start: anonymous
        let anonymousCredentials = Credentials.anonymous
        app.login(credentials: anonymousCredentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            }
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testReadUserMetadata() {
        let expectation = XCTestExpectation(description: "login completes")

        let anonymousCredentials = Credentials.anonymous
        app.login(credentials: anonymousCredentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
            case .success(let user):
                print("Successfully logged in as user \(user)")
                // :snippet-start: read-user-metadata
                // First, log in a user. Then, access user metadata
                print("The logged-in user's email is: \(user.profile.email)")
                // :snippet-end:
                expectation.fulfill()
            }
        }
        wait(for: [expectation], timeout: 10)
    }

    func testShowOfflineLogin() async throws {
        // :snippet-start: offline-login
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
        // :remove-start:
        configuration.objectTypes = [SyncExamples_Task.self]
        // :remove-end:
        // Open a Realm with this configuration.
        // If you do not require the app to download updates
        // before opening the realm, the realm just opens, even if
        // offline.
        let realm = try await Realm(configuration: configuration)
        print("Successfully opened realm: \(realm)")
        // :snippet-end:
    }
    
    func testGetUserAccessToken() async throws {
        // :snippet-start: refresh-user-access-token-function
        func getValidAccessToken(user: User) async throws -> String {
            // An already logged in user's access token might be stale. To
            // guarantee that the token is valid, refresh it if necessary.
            try await user.refreshCustomData()
            return user.accessToken!
        }
        // :snippet-end:
        
        do {
            // :snippet-start: get-user-access-token
            let app = App(id: YOUR_APP_SERVICES_APP_ID)
            let user = try await app.login(credentials: Credentials.anonymous)
            let accessToken = try await getValidAccessToken(user: user)
            // :snippet-end:
        } catch {
            print("Failed to authenticate user: \(error.localizedDescription)")
        }
    }

    override func tearDown() {
        guard app.currentUser != nil else {
            return
        }
        let expectation = XCTestExpectation(description: "logout completes")
        // :snippet-start: logout
        app.currentUser?.logOut { (error) in
            // user is logged out or there was an error
            // :remove-start:
            expectation.fulfill()
            // :remove-end:
        }
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }
}
