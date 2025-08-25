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
    
    
    /// Populate the local realm with some data that we'll use in the synced realm.
    func addExampleData(config: Realm.Configuration) -> Realm {
        // Prepare the configuration for the user whose local realm you
        // want to convert to a synced realm
        let localConfig = config
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
