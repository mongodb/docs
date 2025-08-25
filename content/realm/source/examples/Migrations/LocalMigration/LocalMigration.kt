val migration = object: RealmMigration {
    override fun migrate(realm: DynamicRealm, oldVersion: Long, newVersion: Long) {
        var version: Long = oldVersion

        // DynamicRealm exposes an editable schema
        val schema: RealmSchema = realm.schema

        // Changes from version 0 to 1: Adding lastName.
        // All properties will be initialized with the default value "".
        if (version == 0L) {
            schema.get("Person")!!
                    .addField("lastName", String::class.java, FieldAttribute.REQUIRED)
            version++
        }

        // Changes from version 1 to 2: Combining firstName/lastName into fullName
        if (version == 1L) {
            schema.get("Person")!!
                    .addField("fullName", String::class.java, FieldAttribute.REQUIRED)
                    .transform { obj: DynamicRealmObject ->
                        val name = "${obj.getString("firstName")} ${obj.getString("lastName")}"
                        obj.setString("fullName", name)
                    }
                    .removeField("firstName")
                    .removeField("lastName")
            version++
        }

        // Changes from version 2 to 3: Replace age with birthday
        if (version == 2L) {
            schema.get("Person")!!
                    .addField("birthday", Date::class.java, FieldAttribute.REQUIRED)
                    .transform { obj: DynamicRealmObject ->
                        var birthYear = Date().year - obj.getInt("age")
                        obj.setDate("birthday", Date(birthYear, 1, 1))
                    }
                    .removeField("age")
            version++
        }
    }
}

@RealmModule(classes = { Person::class.java })
class Module

val config = RealmConfiguration.Builder()
    .schemaVersion(3) // Must be bumped when the schema changes
    .migration(migration) // Migration to run instead of throwing an exception
    .build()