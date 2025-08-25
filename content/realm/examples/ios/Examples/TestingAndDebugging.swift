// :replace-start: {
//   "terms": {
//     "Debugging_": "",
//     "realmURL": "realmPath",
//     "self.createOrUpdateUser(in: realm, with: data!)": "createOrUpdateUser(in: realm, with: data!)"
//   }
// }

import XCTest
import RealmSwift

class Debugging_User: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var email: String = ""
}

// :snippet-start: test-base-case
// A base class which each of your Realm-using tests should inherit from rather
// than directly from XCTestCase
class TestCaseBase: XCTestCase {
    override func setUp() {
        super.setUp()

        // Use an in-memory Realm identified by the name of the current test.
        // This ensures that each test can't accidentally access or modify the data
        // from other tests or the application itself, and because they're in-memory,
        // there's nothing that needs to be cleaned up.
        Realm.Configuration.defaultConfiguration.inMemoryIdentifier = self.name
    }
}
// :snippet-end:

class TestCaseInjectRealm: XCTestCase {
    // :snippet-start: test-inject-realm
    // Application Code
    func updateUserFromServer() {
        let url = URL(string: "http://myapi.example.com/user")
        URLSession.shared.dataTask(with: url!) { data, _, _ in
            let realm = try! Realm()
            self.createOrUpdateUser(in: realm, with: data!)
        }
    }

    public func createOrUpdateUser(in realm: Realm, with data: Data) {
        let object = try! JSONSerialization.jsonObject(with: data) as? [String: String]
        try! realm.write {
            realm.create(Debugging_User.self, value: object, update: .modified)
        }
    }

    // Test Code

    let realmPath = URL(fileURLWithPath: "...")

    func testThatUserIsUpdatedFromServer() {
        // :remove-start:
        let documentsPath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
        let realmURL = URL(fileURLWithPath: "\(documentsPath)/mongodb-realm-debugging")
        // :remove-end:
        let config = Realm.Configuration(fileURL: realmURL)
        let testRealm = try! Realm(configuration: config)
        let jsonData = "{\"email\": \"help@realm.io\"}".data(using: .utf8)!
        // In our test, we're passing in the testRealm. This is where we'd
        // pass in our "real" realm in the application code above.
        createOrUpdateUser(in: testRealm, with: jsonData)
        XCTAssertEqual(testRealm.objects(Debugging_User.self).first!.email, "help@realm.io",
                       "User was not properly updated from server.")
    }
    // :snippet-end:
}
// :replace-end:
