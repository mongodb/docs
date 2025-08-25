// :replace-start: {
//   "terms": {
//     "FlexibleSync_": "",
//     "APPID_FS_OWNER_READ_WRITE": "YOUR_APP_ID_HERE"
//   }
// }
// swiftlint:disable identifier_name

import XCTest
import RealmSwift

let APPID_FS_OWNER_READ_WRITE = "swiftuiflexsyncexample-dtgeq"

// :snippet-start: flexible-sync-crud-model
class FlexibleSync_Item: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var ownerId: String
    @Persisted var itemName: String
    @Persisted var complexity: Int
}
// :snippet-end:

class SyncedRealmCRUDCase: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    @MainActor
    override func tearDown() async throws {
        let app = App(id: APPID_FS_OWNER_READ_WRITE)

        let user = try await app.login(credentials: Credentials.anonymous)
        var flexSyncConfig = user.flexibleSyncConfiguration()
        flexSyncConfig.objectTypes = [FlexibleSync_Item.self]

        let realm = try await Realm(configuration: flexSyncConfig)
        let subscriptions = realm.subscriptions
        try await subscriptions.update {
            subscriptions.removeAll()
        }
        XCTAssertEqual(subscriptions.count, 0)
    }

    @MainActor
    func testSyncedRealmWriteExamples() async {
        // :snippet-start: flexible-sync-subscription-setup
        let app = App(id: APPID_FS_OWNER_READ_WRITE)

        do {
            let user = try await app.login(credentials: Credentials.anonymous)
            do {
                var flexSyncConfig = user.flexibleSyncConfiguration()
                flexSyncConfig.objectTypes = [FlexibleSync_Item.self]
                let realm = try await Realm(configuration: flexSyncConfig)
                let subscriptions = realm.subscriptions
                try await subscriptions.update {
                    subscriptions.append(
                        QuerySubscription<FlexibleSync_Item>(name: "simple-items") {
                         $0.complexity <= 4
                    })
                }
                print("Successfully opened realm: \(realm)")
                await writeToSyncedRealm(realm: realm, user: user) // :remove:
            } catch {
                print("Failed to open realm: \(error.localizedDescription)")
                // handle error
            }
        } catch {
            fatalError("Login failed: \(error.localizedDescription)")
        }
        // :snippet-end:
    }
    
    @MainActor
    func writeToSyncedRealm(realm: Realm, user: User) async {
        // :snippet-start: successful-write
        // This write falls within the subscription query and complies
        // with the Device Sync permissions, so this write should succeed.
        do {
            let learnRealm = FlexibleSync_Item()
            learnRealm.ownerId = user.id
            learnRealm.itemName = "Learn Realm CRUD stuff"
            learnRealm.complexity = 3
            try realm.write {
                realm.add(learnRealm)
            }
            // :remove-start:
            XCTAssert(realm.objects(FlexibleSync_Item.self).count == 1)
            try realm.write {
                realm.deleteAll()
            }
            // :remove-end:
        } catch {
            print("Failed to write to realm: \(error.localizedDescription)")
        }
        // :snippet-end:
        
        // :snippet-start: write-outside-flexible-sync-query
        do {
            let fixTheBug = FlexibleSync_Item()
            fixTheBug.ownerId = user.id
            fixTheBug.itemName = "Fix the bug with the failing method"
            // The complexity of this item is `7`. This is outside the bounds
            // of the subscription query, so this write triggers a compensating write.
            fixTheBug.complexity = 7
            try realm.write {
                realm.add(fixTheBug)
            }
        } catch {
            print("Failed to write to realm: \(error.localizedDescription)")
        }
        // :snippet-end:
        
        // :snippet-start: write-outside-permissions
        do {
            let itemWithWrongOwner = FlexibleSync_Item()
            // The `ownerId` of this item does not match the `user.id` of the logged-in
            // user. The user does not have permissions to make this write, so
            // it triggers a compensating write.
            itemWithWrongOwner.ownerId = "This string does not match the user.id"
            itemWithWrongOwner.itemName = "Write code that generates a permission error"
            itemWithWrongOwner.complexity = 1
            try realm.write {
                realm.add(itemWithWrongOwner)
            }
        } catch {
            print("Failed to write to realm: \(error.localizedDescription)")
        }
        // :snippet-end:
    }
}
// :replace-end:
