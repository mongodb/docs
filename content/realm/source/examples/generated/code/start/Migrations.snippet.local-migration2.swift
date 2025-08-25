// In application(_:didFinishLaunchingWithOptions:)
let config = Realm.Configuration(
    schemaVersion: 3, // Set the new schema version.
    migrationBlock: { migration, oldSchemaVersion in
        if oldSchemaVersion < 2 {
            // Previous Migration.
            migration.enumerateObjects(ofType: Person.className()) { oldObject, newObject in
                let firstName = oldObject!["firstName"] as? String
                let lastName = oldObject!["lastName"] as? String
                newObject!["fullName"] = "\(firstName!) \(lastName!)"
            }
        }
        if oldSchemaVersion < 3 {
            // New Migration.
            migration.enumerateObjects(ofType: Person.className()) { oldObject, newObject in
                // Make age a String instead of an Int
                newObject!["age"] = "\(oldObject!["age"] ?? 0)"
            }
        }
    }
)

// Tell Realm to use this new configuration object for the default Realm
Realm.Configuration.defaultConfiguration = config

// Now that we've told Realm how to handle the schema change, opening the file
// will automatically perform the migration
let realm = try! Realm()
