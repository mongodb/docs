// :replace-start: {
//   "terms": {
//     "ObjectModelsExamples_": ""
//   }
// }

import XCTest
import RealmSwift

class OpenCloseRealm: XCTestCase {
    func testOpenLocalRealm() {
        // :snippet-start: open-local-realm
        // Open the default realm
        let defaultRealm = try! Realm()

        // Open the realm with a specific file URL, for example a username
        let username = "GordonCole"
        var config = Realm.Configuration.defaultConfiguration
        config.fileURL!.deleteLastPathComponent()
        config.fileURL!.appendPathComponent(username)
        config.fileURL!.appendPathExtension("realm")
        let realm = try! Realm(configuration: config)
        // :snippet-end:
    }

    func testOpenInMemoryRealm() {
        // :snippet-start: open-in-memory-realm
        // Open the realm with a specific in-memory identifier.
        let identifier = "MyRealm"
        let config = Realm.Configuration(
            inMemoryIdentifier: identifier)
        // Open the realm
        let realm = try! Realm(configuration: config)
        // :snippet-end:
    }

    func testConfigureObjectTypes() {
        // :snippet-start: configure-object-types
        var config = Realm.Configuration.defaultConfiguration
        // :remove-start:
        config.inMemoryIdentifier = "test"
        // :remove-end:

        // Given: `class ObjectModelsExamples_Dog: Object`
        // Limit the realm to only the ObjectModelsExamples_Dog object. All other
        // Object- and EmbeddedObject-derived classes are not added.
        config.objectTypes = [ObjectModelsExamples_Dog.self]

        let realm = try! Realm(configuration: config)
        // :snippet-end:
    }

    func testTvOs() {
        // :snippet-start: tvos-share-path
        let fileUrl = FileManager.default
            .containerURL(forSecurityApplicationGroupIdentifier: "group.com.mongodb.realm.examples.extension")!
            .appendingPathComponent("Library/Caches/default.realm")
        // :snippet-end:
        print(fileUrl)
    }

    func testHandleError() {
        // :snippet-start: handle-error
        do {
            let realm = try Realm()
            // Use realm
        } catch let error as NSError {
            // Handle error
        }
        // :snippet-end:
    }
}
// :replace-end:
