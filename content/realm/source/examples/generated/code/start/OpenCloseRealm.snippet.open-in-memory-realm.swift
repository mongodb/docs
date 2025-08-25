// Open the realm with a specific in-memory identifier.
let identifier = "MyRealm"
let config = Realm.Configuration(
    inMemoryIdentifier: identifier)
// Open the realm
let realm = try! Realm(configuration: config)
