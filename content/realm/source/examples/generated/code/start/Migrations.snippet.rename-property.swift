let config = Realm.Configuration(
    schemaVersion: 2,
    migrationBlock: { migration, oldSchemaVersion in
        if oldSchemaVersion < 2 {
            // Rename the "age" property to "yearsSinceBirth".
            // The renaming operation should be done outside of calls to `enumerateObjects(ofType: _:)`.
            migration.renameProperty(onType: Person.className(), from: "age", to: "yearsSinceBirth")
        }
    })
