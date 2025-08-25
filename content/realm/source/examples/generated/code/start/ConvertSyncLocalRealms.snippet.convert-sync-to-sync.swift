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
