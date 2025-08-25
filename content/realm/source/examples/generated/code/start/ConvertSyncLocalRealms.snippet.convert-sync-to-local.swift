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
