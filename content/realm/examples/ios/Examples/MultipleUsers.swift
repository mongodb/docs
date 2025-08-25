import XCTest
import RealmSwift

class MultipleUsers: XCTestCase {

    override func tearDown() {
        guard app.currentUser != nil else {
            return
        }
        let expectation = XCTestExpectation(description: "Remove anonymous user from device")
        app.currentUser!.remove { (error) in
            expectation.fulfill()
        }
        wait(for: [expectation], timeout: 3)
    }

    func testAddUser() {
        let joeExpectation = XCTestExpectation(description: "joe log in completes")
        let emmaExpectation = XCTestExpectation(description: "emma log in completes")
        // :snippet-start: add-user
        let app = App(id: YOUR_APP_SERVICES_APP_ID)

        let joeCredentials = Credentials.emailPassword(email: "joe@example.com", password: "passw0rd")
        app.login(credentials: joeCredentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
                // :remove-start:
                joeExpectation.fulfill()
                // :remove-end:
            case .success(let joe):
                // The active user is now Joe
                assert(joe == app.currentUser)
            }
        }

        let emmaCredentials = Credentials.emailPassword(email: "emma@example.com", password: "pa55word")
        app.login(credentials: emmaCredentials) { (result) in
            switch result {
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
                // :remove-start:
                emmaExpectation.fulfill()
                // :remove-end:
            case .success(let emma):
                // The active user is now Joe
                assert(emma == app.currentUser)
            }
        }
        // :snippet-end:
        wait(for: [joeExpectation, emmaExpectation], timeout: 10)
    }

    func testListUsers() {
        // :snippet-start: list-users
        let app = App(id: YOUR_APP_SERVICES_APP_ID)
        let users = app.allUsers
        users.forEach({ (key, user) in
            print("User: \(key) \(user)")
        })
        // :snippet-end:
    }

    func testSwitchUsers() {
        // :snippet-start: switch-user
        let app = App(id: YOUR_APP_SERVICES_APP_ID)

        // ... log in ...
        // :remove-start:
        func getSomeOtherUser() -> User {
            var someOtherUser: User?
            let expectation = XCTestExpectation(description: "it logs in")
            app.login(credentials: Credentials.anonymous) { (result) in
                switch result {
                case .failure:
                    XCTAssert(false)
                case .success(let user):
                    someOtherUser = user
                    user.logOut { (error) in
                        expectation.fulfill()
                    }

                }
            }
            wait(for: [expectation], timeout: 20)
            return someOtherUser!
        }
        // :remove-end:
        // Get another user on the device, for example with `app.allUsers`
        let secondUser: User = getSomeOtherUser()

        XCTAssertNotEqual(app.currentUser, secondUser)
        // assert(app.currentUser != secondUser)

        // Switch to another user
        // app.switch(to: secondUser)

        // The switch-to user becomes the app.currentUser
        // XCTAssertEqual(app.currentUser, secondUser)
        // assert(app.currentUser == secondUser)
        // :snippet-end:
    }

    func testLinkIdentities() {
        let expectation = XCTestExpectation(description: "Link user completes")

        // :snippet-start: link-identity
        let app = App(id: YOUR_APP_SERVICES_APP_ID)

        func logInAnonymously() {
            app.login(credentials: Credentials.anonymous) { (result) in
                switch result {
                case .failure(let error):
                    print("Failed to log in: \(error.localizedDescription)")
                    // :remove-start:
                    XCTAssert(false, "Failed to log in: \(error.localizedDescription)")
                    // :remove-end:
                case .success(let user):
                    // User uses app, then later registers an account
                    registerNewAccount(anonymousUser: user)
                }
            }
        }

        func registerNewAccount(anonymousUser: User) {
            let email = "swift-link@example.com"
            let password = "ganondorf"
            app.emailPasswordAuth.registerUser(email: email, password: password) { (error) in
                guard error == nil else {
                    print("Failed to register new account: \(error!.localizedDescription)")
                    // :remove-start:
                    XCTAssert(false, "Failed to register new account: \(error!.localizedDescription)")
                    // :remove-end:
                    return
                }

                // Successfully created account, now link it
                // with the existing anon user
                link(user: anonymousUser, with: Credentials.emailPassword(email: email, password: password))
            }
        }

        func link(user: User, with credentials: Credentials) {
            user.linkUser(credentials: credentials) { (result) in
                switch result {
                case .failure(let error):
                    print("Failed to link user: \(error.localizedDescription)")
                    // :remove-start:
                    XCTAssert(false, "Failed to link user: \(error.localizedDescription)")
                    // :remove-end:
                case .success(let user):
                    print("Successfully linked user: \(user)")
                    // :remove-start:
                    expectation.fulfill()
                    // :remove-end:
                }
            }
        }

        logInAnonymously()
        // :snippet-end:
        wait(for: [expectation], timeout: 10)
    }

    func testAsyncLinkIdentities() async {
        // :snippet-start: async-link-identity
        let app = App(id: YOUR_APP_SERVICES_APP_ID)

        func logInAnonymously() async throws -> User {
            let anonymousUser = try await app.login(credentials: Credentials.anonymous)
            // User uses app, then later registers an account
            let newAccountLinkedUser = try await registerNewAccount(anonymousUser: anonymousUser)
            return newAccountLinkedUser
        }

        func registerNewAccount(anonymousUser: User) async throws -> User {
            let email = "swift-async-link@example.com"
            let password = "ganondorf"

            try await app.emailPasswordAuth.registerUser(email: email, password: password)
            // Successfully created account, now link it
            // with the existing anon user
            let linkedUser = try await link(user: anonymousUser, with: Credentials.emailPassword(email: email, password: password))
            return linkedUser
        }

        func link(user: User, with credentials: Credentials) async throws -> User {
            try await user.linkUser(credentials: credentials)
        }

        do {
            let linkedUser = try await logInAnonymously()
            print("Successfully linked user async: \(linkedUser)")
            // :remove-start:
            XCTAssertNotNil(linkedUser)
            // :remove-end:
        } catch {
            print("Failed to link user: \(error.localizedDescription)")
        }
        // :snippet-end:
    }
}
