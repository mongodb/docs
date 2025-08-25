import XCTest
import RealmSwift

class DeleteRealmFiles: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testDeleteRealmIfMigrationNeeded() {
        // :snippet-start: delete-if-migration-needed
        do {
            // Delete the realm if a migration would be required, instead of migrating it.
            // While it's useful during development, do not leave this set to `true` in a production app!
            let configuration = Realm.Configuration(deleteRealmIfMigrationNeeded: true)
            let realm = try Realm(configuration: configuration)
        } catch {
            print("Error opening realm: \(error.localizedDescription)")
        }
        // :snippet-end:
    }

    func testDeleteNonSyncedClientRealmFile() {

    }

    func testDeleteSyncedClientRealmFile() async {
        // :snippet-start: delete-client-realm-file
        autoreleasepool {
            // all Realm usage here -- explicitly guarantee
            // that all realm objects are deallocated
            // before deleting the files
        }
        do {
            let app = App(id: APPID)
            let user = try await app.login(credentials: Credentials.anonymous)
            var configuration = user.flexibleSyncConfiguration()
            // :remove-start:
            configuration.objectTypes = [FlexibleSync_Task.self]
            // :remove-end:
            _ = try Realm.deleteFiles(for: configuration)
        } catch {
            // handle error
        }
        // :snippet-end:
    }
}
