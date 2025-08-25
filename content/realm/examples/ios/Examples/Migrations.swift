// :replace-start: {
//   "terms": {
//     "MigrationExampleV1_": "",
//     "MigrationExampleV2_": "",
//     "MigrationExampleV3_": "",
//     "MigrationExampleV1Update1_": "",
//     "MigrationExampleV1Update2_": ""
//   }
// }
import XCTest
import RealmSwift

// Note about testing:
// Because we set this up to show multiple schema versions in one file, it is hard to test
// the migrations in here directly. The tests in this file mostly test that the syntax is 
// correct but the functionality was manually verified in a realm app.

// :snippet-start: model-v1
// In the first version of the app, the Person model
// has separate fields for first and last names,
// and an age property.
class MigrationExampleV1_Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    @Persisted var age = 0
}
// :snippet-end:

// :snippet-start: model-v1-update1
// In a new version, you add a property
// on the Person model.
class MigrationExampleV1Update1_Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    // Add a new "email" property.
    @Persisted var email: String?
    // New properties can be migrated
    // automatically, but must update the schema version.
    @Persisted var age = 0

}
// :snippet-end:

// :snippet-start: model-v1-update2
// In a new version, you remove a property
// on the Person model.
class MigrationExampleV1Update2_Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    // Remove the "age" property.
    // @Persisted var age = 0
    // Removed properties can be migrated
    // automatically, but must update the schema version.

}
// :snippet-end:

// :snippet-start: model-v2
// In version 2, the Person model has one
// combined field for the full name and age as a Int. 
// A manual migration will be required to convert from 
// version 1 to this version.
class MigrationExampleV2_Person: Object {
    @Persisted var fullName = ""
    @Persisted var age = 0
}
// :snippet-end:

// :snippet-start: model-v3
// In version 3, the Person model has one
// combined field for the full name and age as a String. 
// A manual migration will be required to convert from 
// version 2 to this version.
 class MigrationExampleV3_Person: Object {
    @Persisted var fullName = ""
    @Persisted var age = "0"
 }
// :snippet-end:

class Migrations: XCTestCase {
    override func tearDown() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration()
    }

    func testRenameProperty() {
        // :snippet-start: rename-property
        let config = Realm.Configuration(
            // :remove-start:
            // Prevent schema version from affecting other unit tests
            inMemoryIdentifier: "testRenameProperty",
            // :remove-end:
            schemaVersion: 2,
            migrationBlock: { migration, oldSchemaVersion in
                if oldSchemaVersion < 2 {
                    // Rename the "age" property to "yearsSinceBirth".
                    // The renaming operation should be done outside of calls to `enumerateObjects(ofType: _:)`.
                    migration.renameProperty(onType: MigrationExampleV1_Person.className(), from: "age", to: "yearsSinceBirth")
                }
            })
        // :snippet-end: rename-property
        print(config)
    }

    func testLocalMigration() {
        // :snippet-start: local-migration
        // In application(_:didFinishLaunchingWithOptions:)
        let config = Realm.Configuration(
            // :remove-start:
            // Prevent schema version from affecting other unit tests
            inMemoryIdentifier: "testLocalMigration",
            // :remove-end:
            schemaVersion: 2, // Set the new schema version.
            migrationBlock: { migration, oldSchemaVersion in
                if oldSchemaVersion < 2 {
                    // The enumerateObjects(ofType:_:) method iterates over
                    // every Person object stored in the Realm file to apply the migration
                    migration.enumerateObjects(ofType: MigrationExampleV2_Person.className()) { oldObject, newObject in
                        // combine name fields into a single field
                        let firstName = oldObject!["firstName"] as? String
                        let lastName = oldObject!["lastName"] as? String
                        newObject!["fullName"] = "\(firstName!) \(lastName!)"
                    }
                }
            }
        )

        // Tell Realm to use this new configuration object for the default Realm
        Realm.Configuration.defaultConfiguration = config

        // Now that we've told Realm how to handle the schema change, opening the file
        // will automatically perform the migration
        let realm = try! Realm()
        // :snippet-end:
        // Quash unused variable warning
        XCTAssert(realm.isEmpty)
    }

    func testLocalMigration2() {
        // :snippet-start: local-migration2
        // In application(_:didFinishLaunchingWithOptions:)
        let config = Realm.Configuration(
            // :remove-start:
            // Prevent schema version from affecting other unit tests
            inMemoryIdentifier: "testLocalMigration2",
            // :remove-end:
            schemaVersion: 3, // Set the new schema version.
            migrationBlock: { migration, oldSchemaVersion in
                if oldSchemaVersion < 2 {
                    // Previous Migration.
                    migration.enumerateObjects(ofType: MigrationExampleV2_Person.className()) { oldObject, newObject in
                        let firstName = oldObject!["firstName"] as? String
                        let lastName = oldObject!["lastName"] as? String
                        newObject!["fullName"] = "\(firstName!) \(lastName!)"
                    }
                }
                if oldSchemaVersion < 3 {
                    // New Migration.
                    migration.enumerateObjects(ofType: MigrationExampleV3_Person.className()) { oldObject, newObject in
                        // Make age a String instead of an Int
                        newObject!["age"] = "\(oldObject!["age"] ?? 0)"
                    }
                }
            }
        )

        // Tell Realm to use this new configuration object for the default Realm
        Realm.Configuration.defaultConfiguration = config

        // Now that we've told Realm how to handle the schema change, opening the file
        // will automatically perform the migration
        let realm = try! Realm()
        // :snippet-end:
        // Quash unused variable warning
        XCTAssert(realm.isEmpty)
    }

    func testUpdateSchemaVersionSyntax() {
        // :snippet-start: update-schema-version
        // When you open the realm, specify that the schema
        // is now using a newer version.
        let config = Realm.Configuration(
            // :remove-start:
            // Prevent schema version from affecting other unit tests
            inMemoryIdentifier: "LocalMigrationExample",
            // :remove-end:
            schemaVersion: 2)
        // Use this configuration when opening realms
        Realm.Configuration.defaultConfiguration = config
        let realm = try! Realm()
        // :snippet-end:
        print(config)
    }

}
// :replace-end:
