val config = RealmConfiguration.Builder(
    schema = setOf(Person::class)
)
    .schemaVersion(2)
    .migration(AutomaticSchemaMigration { migrationContext ->
        val oldRealm = migrationContext.oldRealm // old realm using the previous schema
        val newRealm = migrationContext.newRealm // new realm using the new schema

        // Dynamic query for all Persons in old realm
        val oldPersons = oldRealm.query(className = "Person").find()
        for (oldPerson in oldPersons) {
            // Get properties from old realm
            val firstName: String = oldPerson.getValue(
                propertyName = "firstName", String::class
            )
            // Get objects from old realm as dynamic realm objects
            val pet: DynamicRealmObject? = oldPerson.getObject(
                propertyName = "pets"
            )
        }

        // Get migrated objects from the new realm as mutable objects
        val oldPerson: DynamicMutableRealmObject? =
            newRealm.findLatest(oldPersons[0])
        oldPerson?.let {
            it.set("fullName", "Crow T. Robot")
        }

        // Create an object in the new realm and set property values
        val newPerson = newRealm.copyToRealm(
            DynamicMutableRealmObject.create(
                type = "Person",
                mapOf(
                    "_id" to "123456",
                    "fullName" to "Tom Servo",
                    "yearsSinceBirth" to 33,
                )
            )
        )
    })
    .build()
val realm = Realm.open(config)
