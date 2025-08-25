// :replace-start: {
//   "terms": {
//     "AddSyncExample_": ""
//   }
// }
// swiftlint:disable identifier_name

import XCTest
import RealmSwift

let FLEX_SYNC_APP_ID = "swift-flexible-vkljj"

// :snippet-start: model
class AddSyncExample_Todo: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name: String = ""
    @Persisted var ownerId: String
    @Persisted var status: String = ""

    convenience init(name: String, ownerId: String) {
        self.init()
        self.name = name
        self.ownerId = ownerId
    }
}
// :snippet-end:

// Entrypoint. Call this to run the example.
func runAddSyncExample() async {
    // Instantiate the app
    // :snippet-start: connect-to-backend
    let app = App(id: FLEX_SYNC_APP_ID) // Replace FLEX_SYNC_APP_ID with your Atlas App ID
    // :snippet-end:
    do {
        let user = try await login()
        await openSyncedRealm(user: user)
    } catch {
        print("Error logging in: \(error.localizedDescription)")
    }

    // :snippet-start: authenticate-user
    func login() async throws -> User {
        // Authenticate with the instance of the app that points
        // to your backend. Here, we're using anonymous login.
        let user = try await app.login(credentials: Credentials.anonymous)
        print("Successfully logged in user: \(user)")
        return user
    }
    // :snippet-end:
    // :snippet-start: open-synced-realm
    @MainActor
    func openSyncedRealm(user: User) async {
        do {
            var config = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
                subs.append(
                    QuerySubscription<AddSyncExample_Todo> {
                        $0.ownerId == user.id
                    })
            })
            // Pass object types to the Flexible Sync configuration
            // as a temporary workaround for not being able to add a
            // complete schema for a Flexible Sync app.
            config.objectTypes = [AddSyncExample_Todo.self]
            let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
            useRealm(realm, user)
        } catch {
            print("Error opening realm: \(error.localizedDescription)")
        }
    }
    // :snippet-end:
}

// :snippet-start: create-todo
@MainActor
func useRealm(_ realm: Realm, _ user: User) {
    // :remove-start:
    // Delete all from the realm
    try! realm.write {
        realm.deleteAll()
    }
    // :remove-end:
    // Add some tasks
    let todo = AddSyncExample_Todo(name: "Do laundry", ownerId: user.id)
    try! realm.write {
        realm.add(todo)
    }
    // :remove-start:
    XCTAssertEqual(realm.objects(AddSyncExample_Todo.self).count, 1)
    print("Successfully added an item to the realm: \(todo)")
    // :remove-end:
}
// :snippet-end:

class AddSyncExample: XCTestCase {
    func testRunExample() async {
        await runAddSyncExample()
    }
}
// :replace-end:
