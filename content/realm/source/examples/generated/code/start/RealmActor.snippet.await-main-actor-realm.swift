@MainActor
func mainThreadFunction() async throws {
    // These are identical: the async init produces a
    // MainActor-isolated Realm if no actor is supplied
    let realm1 = try await Realm()
    let realm2 = try await Realm(actor: MainActor.shared)
    
    try await useTheRealm(realm: realm1)
}
