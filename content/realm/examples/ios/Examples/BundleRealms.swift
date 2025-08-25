// :replace-start: {
//   "terms": {
//     "QsTask": "Todo"
//   }
// }

import XCTest
import RealmSwift
import Foundation

 class BundleRealms: XCTestCase {

    func testCopyRealm() async throws {
        // :snippet-start: copy-synced-realm-for-bundling
        try await createBundledRealm()
        
        // Opening a realm and accessing it must be done from the same thread.
        // Marking this function as `@MainActor` avoids threading-related issues.
        @MainActor
        func createBundledRealm() async throws {
            let app = App(id: YOUR_APP_SERVICES_APP_ID)

            // Log in the user whose realm you want to copy for bundling
            let seedUser = try await app.login(credentials: Credentials.anonymous)

            // Create a configuration to open the seed user's realm
            var config = seedUser.configuration(partitionValue: "Partition You Want to Bundle")
            config.objectTypes = [QsTask.self]
            
            // Open the realm with the seed user's config
            let realm = try await Realm(configuration: config, downloadBeforeOpen: .always)
            print("Successfully opened realm: \(realm)")
            
            // Verify there is a todo object in the realm whose
            // owner's name is "Daenerys". When we open the bundled
            // realm later, we should see the same result.
            let todos = realm.objects(QsTask.self)
            let daenerysTodos = todos.where { $0.owner == "Daenerys" }
            XCTAssertEqual(daenerysTodos.count, 1)

            // Specify an output directory for the bundled realm
            // We're using FileManager here for tested code examples,
            // but this could be a static directory on your computer.
            guard let outputDir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else { return }

            // Append a file name to complete the path
            let bundleRealmFilePath = outputDir.appendingPathComponent("seed.realm")

            // Update the config file path to the path where you want to save the bundled realm
            config.fileURL = bundleRealmFilePath

            // Check to see if there is already a realm at the bundled realm file path. If there
            // is already a realm there, delete it.
            if Realm.fileExists(for: config) {
                try Realm.deleteFiles(for: config)
                print("Successfully deleted existing realm at path: \(bundleRealmFilePath)")
            } else {
                print("No file currently exists at path")
            }

            // Write a copy of the realm at the URL we specified
            try realm.writeCopy(configuration: config)

            // Verify that we successfully made a copy of the realm
            XCTAssert(FileManager.default.fileExists(atPath: bundleRealmFilePath.path))
            print("Successfully made a copy of the realm at path: \(bundleRealmFilePath)")
            
            // Verify that opening the realm at the new file URL works.
            // Don't download changes, because this can mask a copy
            // that does not contain the expected data.
            let copiedRealm = try await Realm(configuration: config, downloadBeforeOpen: .never)
            print("Successfully opened realm: \(realm)")

            // Verify that the copied realm contains the data we expect
            let copiedTodos = copiedRealm.objects(QsTask.self)
            let daenerysCopiedTodos = copiedTodos.where { $0.owner == "Daenerys" }
            XCTAssertEqual(daenerysCopiedTodos.count, 1)
            print("Copied realm opens and contains this many tasks: \(daenerysCopiedTodos.count)")
        }
        // :snippet-end:
    }

    func testOpenCopiedRealm() async throws {
        // :snippet-start: open-bundled-synced-realm
        try await openBundledSyncedRealm()
        
        // Opening a realm and accessing it must be done from the same thread.
        // Marking this function as `@MainActor` avoids threading-related issues.
        @MainActor
        func openBundledSyncedRealm() async throws {
            let app = App(id: YOUR_APP_SERVICES_APP_ID)

            // Log in an app user who will use the bundled realm
            let user = try await app.login(credentials: Credentials.anonymous)

            // Create a configuration for the app user's realm
            // This should use the same partition value as the bundled realm
            var newUserConfig = user.configuration(partitionValue: "Partition You Want to Bundle")
            newUserConfig.objectTypes = [QsTask.self]

            // Find the path of the seed.realm file in your project
            let realmURL = Bundle.main.url(forResource: "seed", withExtension: ".realm")
            print("The bundled realm URL is: \(realmURL)")

            // When you use the `seedFilePath` parameter, this copies the
            // realm at the specified path for use with the user's config
            newUserConfig.seedFilePath = realmURL

            // Open the synced realm, downloading any changes before opening it.
            // This starts with the existing data in the bundled realm, but checks
            // for any updates to the data before opening it in your application.
            let realm = try await Realm(configuration: newUserConfig, downloadBeforeOpen: .always)
            print("Successfully opened the bundled realm")

            // Read and write to the bundled realm as normal
            let todos = realm.objects(QsTask.self)

            // There should be one todo whose owner is Daenerys because that's
            // what was in the bundled realm.
            var daenerysTodos = todos.where { $0.owner == "Daenerys" }
            XCTAssertEqual(daenerysTodos.count, 1)
            print("The bundled realm has \(daenerysTodos.count) todos whose owner is Daenerys")

            // Write as usual to the realm, and see the object count increment
            let todo = QsTask(value: ["name": "Banish Ser Jorah", "owner": "Daenerys", "status": "In Progress"])
            try realm.write {
                realm.add(todo)
            }
            print("Successfully added a todo to the realm")

            daenerysTodos = todos.where { $0.owner == "Daenerys" }
            XCTAssertEqual(daenerysTodos.count, 2)
            // :remove-start:
            // Delete the todo we just added to avoid messing with XCTAsserts
            try realm.write {
                realm.delete(todo)
            }
            // :remove-end:
        }
        // :snippet-end:
    }
 }
// :replace-end:
