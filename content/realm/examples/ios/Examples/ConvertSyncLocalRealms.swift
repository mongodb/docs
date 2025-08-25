import XCTest
import RealmSwift

class ConvertSyncAndLocalRealms: XCTestCase {
    
    @MainActor
    override func setUp() async throws {
        // Populate data for synced realm examples
        // This applies to the two examples that start with synced realms;
        // the local to synced realm example populates its own data using
        // a different partition value
        let app = App(id: YOUR_APP_SERVICES_APP_ID)

        // Log in the user whose realm you want to open as a synced realm
        let syncUser = try await app.login(credentials: Credentials.anonymous)

        // Create a configuration to open the sync user's realm
        var syncConfig = syncUser.configuration(partitionValue: "Some Partition Value")
        syncConfig.objectTypes = [QsTask.self]

        let syncedRealm = try await Realm(configuration: syncConfig, downloadBeforeOpen: .always)

        try! syncedRealm.write {
            syncedRealm.delete(syncedRealm.objects(QsTask.self))
        }

        let task1 = QsTask(value: ["name": "Keep it secret", "owner": "Frodo"])
        let task2 = QsTask(value: ["name": "Keep it safe", "owner": "Frodo"])
        let task3 = QsTask(value: ["name": "Journey to Bree", "owner": "Frodo"])

        try! syncedRealm.write {
            syncedRealm.add([task1, task2, task3])
        }
    }

    func testConvertLocalToSync() async throws {
        // :snippet-start: convert-local-to-sync
        try await convertLocalRealmToSyncedRealm()
        
        // Opening a realm and accessing it must be done from the same thread.
        // Marking this function as `@MainActor` avoids threading-related issues.
        @MainActor
        func convertLocalRealmToSyncedRealm() async throws {
            let app = App(id: YOUR_APP_SERVICES_APP_ID)
            
            // Log in the user whose realm you want to open as a synced realm
            let syncUser = try await app.login(credentials: Credentials.anonymous)
            
            // Create a configuration to open the sync user's realm
            var syncConfig = syncUser.configuration(partitionValue: "Your Partition Value")
            syncConfig.objectTypes = [QsTask.self]
            // Prepare the configuration for the user whose local realm you
            // want to convert to a synced realm
            var localConfig = Realm.Configuration()
            localConfig.objectTypes = [QsTask.self]
            // :remove-start:
            // Set a custom fileURL to prevent other tests using
            // a default realm from causing this test to fail
            localConfig.fileURL!.deleteLastPathComponent()
            localConfig.fileURL!.appendPathComponent("nonSync")
            localConfig.fileURL!.appendPathExtension("realm")
            // :remove-end:
            
            // For this example, add some data to the local realm
            // before copying it. No need to do this if you're
            // copying a realm that already contains data.
            let localRealm = addExampleData(config: localConfig)
            
            // Create a copy of the local realm that uses the
            // sync configuration. All the data that is in the
            // local realm is available in the synced realm.
            try! localRealm.writeCopy(configuration: syncConfig)
            
            // Open the synced realm we just created from the local realm
            let syncedRealm = try await Realm(configuration: syncConfig)
            
            // Access the Task objects in the synced realm to see
            // that we have all the data we expect
            let syncedTasks = syncedRealm.objects(QsTask.self)
            var frodoSyncedTasks = syncedTasks.where { $0.owner == "Frodo" }
            XCTAssertEqual(frodoSyncedTasks.count, 3)
            print("Synced realm opens and contains this many tasks: \(frodoSyncedTasks.count)")
            
            // Add a new task to the synced realm, and see it in the task count
            let task4 = QsTask(value: ["name": "Send gift basket to Tom Bombadil", "owner": "Frodo"])
            
            try! syncedRealm.write {
                syncedRealm.add(task4)
            }
            
            frodoSyncedTasks = syncedTasks.where { $0.owner == "Frodo" }
            XCTAssertEqual(frodoSyncedTasks.count, 4)
            print("After adding a task, the synced realm contains this many tasks: \(frodoSyncedTasks.count)")
            
            // Open the local realm, and confirm that it still only contains 3 tasks
            let openedLocalRealm = try await Realm(configuration: localConfig)
            let localTasks = openedLocalRealm.objects(QsTask.self)
            let frodoLocalTasks = localTasks.where { $0.owner == "Frodo" }
            XCTAssertEqual(frodoLocalTasks.count, 3)
            print("Local realm opens and contains this many tasks: \(frodoLocalTasks.count)")
            
            XCTAssertNotEqual(frodoLocalTasks.count, frodoSyncedTasks.count)
            
            // :remove-start:
            // Delete the tasks we added to avoid messing with future test runs
            try! syncedRealm.write {
                syncedRealm.delete(frodoSyncedTasks)
            }
            // :remove-end:
            
            /// Populate the local realm with some data that we'll use in the synced realm.
            func addExampleData(config: Realm.Configuration) -> Realm {
                // Prepare the configuration for the user whose local realm you
                // want to convert to a synced realm
                let localConfig = config
                // :remove-start:
                // Delete a local realm that may already exist
                // avoid messing up future test runs.
                if Realm.fileExists(for: localConfig) {
                    try! Realm.deleteFiles(for: localConfig)
                    print("Successfully deleted local realm")
                } else {
                    print("No local realm currently exists")
                }
                // :remove-end:
                // Open the local realm, and populate it with some data before returning it
                let localRealm = try! Realm(configuration: localConfig)
                
                let task1 = QsTask(value: ["name": "Keep it secret", "owner": "Frodo"])
                let task2 = QsTask(value: ["name": "Keep it safe", "owner": "Frodo"])
                let task3 = QsTask(value: ["name": "Journey to Bree", "owner": "Frodo"])
                
                try! localRealm.write {
                    localRealm.add([task1, task2, task3])
                }
                return localRealm
            }
        }
        // :snippet-end:
    }

    func testConvertSyncToLocal() async throws {
        // :snippet-start: convert-sync-to-local
        try await convertSyncedRealmToLocalRealm()
        
        // Opening a realm and accessing it must be done from the same thread.
        // Marking this function as `@MainActor` avoids threading-related issues.
        @MainActor
        func convertSyncedRealmToLocalRealm() async throws {
            let app = App(id: YOUR_APP_SERVICES_APP_ID)
            
            // Log in the user whose realm you want to open as a local realm
            let syncUser = try await app.login(credentials: Credentials.anonymous)
            
            // Create a configuration to open the seed user's realm
            var syncConfig = syncUser.configuration(partitionValue: "Some Partition Value")
            syncConfig.objectTypes = [QsTask.self]
            
            // Open the realm with the Sync user's config, downloading
            // any remote changes before opening.
            let syncedRealm = try await Realm(configuration: syncConfig, downloadBeforeOpen: .always)
            print("Successfully opened realm: \(syncedRealm)")
            
            // Verify the data we expect in the realm
            // The synced realm we are copying contains 3 tasks whose owner is "Frodo"
            let syncedTasks = syncedRealm.objects(QsTask.self)
            var frodoSyncedTasks = syncedTasks.where { $0.owner == "Frodo" }
            XCTAssertEqual(frodoSyncedTasks.count, 3)
            print("Synced realm opens and contains this many tasks: \(frodoSyncedTasks.count)")
            
            // Construct an output file path for the local Realm
            guard let outputDir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else { return }
            
            // Append a file name to complete the path
            let localRealmFilePath = outputDir.appendingPathComponent("local.realm")
            
            // Construct a local realm configuration
            var localConfig = Realm.Configuration()
            localConfig.objectTypes = [QsTask.self]
            localConfig.fileURL = localRealmFilePath
            
            // `realm_id` will be removed in the local realm, so we need to bump
            // the schema version.
            localConfig.schemaVersion = 1
            
            // Check to see if there is already a realm at the local realm file path. If there
            // is already a realm there, delete it.
            if Realm.fileExists(for: localConfig) {
                try Realm.deleteFiles(for: localConfig)
                print("Successfully deleted existing realm at path: \(localRealmFilePath)")
            } else {
                print("No file currently exists at path")
            }
            // :remove-start:
            // Add a delay before writing to try to give Sync enough time to upload changes
            // This isn't an issue locally but is an intermittent issue during CI testing
            sleep(10)
            // :remove-end:
            
            // Make a copy of the synced realm that uses a local configuration
            try syncedRealm.writeCopy(configuration: localConfig)
            
            // Try opening the realm as a local realm
            let localRealm = try await Realm(configuration: localConfig)
            
            // Verify that the copied realm contains the data we expect
            let localTasks = localRealm.objects(QsTask.self)
            var frodoLocalTasks = localTasks.where { $0.owner == "Frodo" }
            XCTAssertEqual(frodoLocalTasks.count, 3)
            print("Local realm opens and contains this many tasks: \(frodoLocalTasks.count)")
            
            let task = QsTask(value: ["name": "Send gift basket to Tom Bombadil", "owner": "Frodo"])
            
            try! localRealm.write {
                localRealm.add(task)
            }
            
            frodoLocalTasks = localTasks.where { $0.owner == "Frodo" }
            XCTAssertEqual(frodoLocalTasks.count, 4)
            print("After adding a task, the local realm contains this many tasks: \(frodoLocalTasks.count)")
            
            frodoSyncedTasks = syncedTasks.where { $0.owner == "Frodo" }
            XCTAssertEqual(frodoSyncedTasks.count, 3)
            print("After writing to local realm, synced realm contains this many tasks: \(frodoSyncedTasks.count)")
            
            XCTAssertNotEqual(frodoLocalTasks.count, frodoSyncedTasks.count)
        }
        // :snippet-end:
    }

    func testConvertSyncToSync() async throws {
        // :snippet-start: convert-sync-to-sync
        try await convertSyncedRealmForAnotherUser()
        
        // Opening a realm and accessing it must be done from the same thread.
        // Marking this function as `@MainActor` avoids threading-related issues.
        @MainActor
        func convertSyncedRealmForAnotherUser() async throws {
            let app = App(id: YOUR_APP_SERVICES_APP_ID)
            
            // Log in the user whose realm you want to use with another sync user
            let frodoBaggins = try await app.login(credentials: Credentials.anonymous)
            var frodoConfig = frodoBaggins.configuration(partitionValue: "Some Partition Value")
            frodoConfig.objectTypes = [QsTask.self]
            
            // Open the synced realm, and confirm it contains the data we want
            // the other user to be able to access.
            let frodoRealm = try await Realm(configuration: frodoConfig, downloadBeforeOpen: .always)
            
            let frodoRealmTasks = frodoRealm.objects(QsTask.self)
            let frodoSyncedTasks = frodoRealmTasks.where { $0.owner == "Frodo" }
            XCTAssertEqual(frodoSyncedTasks.count, 3)
            print("Successfully opened frodo's realm and it contains this many tasks: \(frodoSyncedTasks.count)")
            
            // Log in as the user who will work with frodo's synced realm
            let samwiseGamgee = try await app.login(credentials: Credentials.anonymous)
            var samConfig = samwiseGamgee.configuration(partitionValue: "Some Partition Value")
            samConfig.objectTypes = [QsTask.self]
            
            // Specify an output directory for the copied realm
            // We're using FileManager here for tested code examples.
            guard let outputDir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else { return }
            
            // Append a file name to complete the path
            let copiedRealmFilePath = outputDir.appendingPathComponent("copied.realm")
            
            // Update the config file path to the path where you want to save the copied realm
            samConfig.fileURL = copiedRealmFilePath
            
            // :remove-start:
            // If there is already a realm at the copy realm file path, delete it
            // to avoid issues in future test runs.
            if Realm.fileExists(for: samConfig) {
                try Realm.deleteFiles(for: samConfig)
                print("Successfully deleted existing realm at path")
            } else {
                print("No file currently exists at path")
            }
            // :remove-end:
            
            // Make a copy of frodo's realm that uses sam's config
            try frodoRealm.writeCopy(configuration: samConfig)
            
            // Open sam's realm, and see that it contains the same data as frodo's realm
            let samRealm = try await Realm(configuration: samConfig)
            let samRealmTasks = samRealm.objects(QsTask.self)
            var samSyncedTasks = samRealmTasks.where { $0.owner == "Frodo" }
            print("Successfully opened sam's realm and it contains this many tasks: \(samSyncedTasks.count)")
            
            XCTAssertEqual(frodoSyncedTasks.count, samSyncedTasks.count)
            
            // Add a task to sam's realm
            let task = QsTask(value: ["name": "Keep an eye on that Gollum", "owner": "Sam"])
            
            try! samRealm.write {
                samRealm.add(task)
            }
            
            // See that the new task reflects in sam's realm, but not frodo's
            samSyncedTasks = samRealmTasks.where { $0.owner == "Sam" }
            XCTAssertEqual(samSyncedTasks.count, 1)
            
            let samTasksInFrodoRealm = frodoRealmTasks.where { $0.owner == "Sam" }
            XCTAssertEqual(samTasksInFrodoRealm.count, 0)
        }
        // :snippet-end:
    }
}
