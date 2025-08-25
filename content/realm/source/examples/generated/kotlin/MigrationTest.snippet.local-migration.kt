// Use the configuration builder to open the realm with the newer schema version
// and define the migration logic between your old and new realm objects
val config = RealmConfiguration.Builder(
    schema = setOf(Person::class)
)
    .schemaVersion(2) // Set the new schema version to 2
    .migration(AutomaticSchemaMigration {
        it.enumerate(className = "Person") { oldObject: DynamicRealmObject, newObject: DynamicMutableRealmObject? ->
            newObject?.run {
                // Change property type
                set(
                    "_id",
                    oldObject.getValue<ObjectId>(fieldName = "_id").toString()
                )

                // Merge properties
                set(
                    "fullName",
                    "${oldObject.getValue<String>(fieldName = "firstName")} ${oldObject.getValue<String>(fieldName = "lastName")}"
                )

                // Rename property
                set(
                    "yearsSinceBirth",
                    oldObject.getValue<String>(fieldName = "age")
                )
            }
        }
    })
    .build()
val realm = Realm.open(config)
