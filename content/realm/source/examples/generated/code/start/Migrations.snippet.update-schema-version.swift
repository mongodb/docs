// When you open the realm, specify that the schema
// is now using a newer version.
let config = Realm.Configuration(
    schemaVersion: 2)
// Use this configuration when opening realms
Realm.Configuration.defaultConfiguration = config
let realm = try! Realm()
