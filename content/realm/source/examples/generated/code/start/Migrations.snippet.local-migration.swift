// In application(_:didFinishLaunchingWithOptions:)
let config = Realm.Configuration(
    schemaVersion: 2, // Set the new schema version.
    migrationBlock: { migration, oldSchemaVersion in
        if oldSchemaVersion < 2 {
            // The enumerateObjects(ofType:_:) method iterates over
            // every Person object stored in the Realm file to apply the migration
            migration.enumerateObjects(ofType: Person.className()) { oldObject, newObject in
                // combine name fields into a single field
                let firstName = oldObject!["firstName"] as? String
                let lastName = oldObject!["lastName"] as? String
                newObject!["fullName"] = "\(firstName!) \(lastName!)"
            }
        }
    }
)

// Tell Realm to use this new configuration object for the default Realm
Realm.Configuration.defaultConfiguration = config

// Now that we've told Realm how to handle the schema change, opening the file
// will automatically perform the migration
let realm = try! Realm()
