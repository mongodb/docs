@MainActor
func mainThreadFunction() async throws {
    let username = "Galadriel"
    
    // Customize the default realm config
    var config = Realm.Configuration.defaultConfiguration
    config.fileURL!.deleteLastPathComponent()
    config.fileURL!.appendPathComponent(username)
    config.fileURL!.appendPathExtension("realm")
    
    // Open an actor-isolated realm with a specific configuration
    let realm = try await Realm(configuration: config, actor: MainActor.shared)
    
    try await useTheRealm(realm: realm)
}
