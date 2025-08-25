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
    newUserConfig.objectTypes = [Todo.self]

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
    let todos = realm.objects(Todo.self)

    // There should be one todo whose owner is Daenerys because that's
    // what was in the bundled realm.
    var daenerysTodos = todos.where { $0.owner == "Daenerys" }
    XCTAssertEqual(daenerysTodos.count, 1)
    print("The bundled realm has \(daenerysTodos.count) todos whose owner is Daenerys")

    // Write as usual to the realm, and see the object count increment
    let todo = Todo(value: ["name": "Banish Ser Jorah", "owner": "Daenerys", "status": "In Progress"])
    try realm.write {
        realm.add(todo)
    }
    print("Successfully added a todo to the realm")

    daenerysTodos = todos.where { $0.owner == "Daenerys" }
    XCTAssertEqual(daenerysTodos.count, 2)
}
