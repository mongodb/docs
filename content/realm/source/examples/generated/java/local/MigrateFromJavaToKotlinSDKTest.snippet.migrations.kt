val config =
    RealmConfiguration.Builder()
    .migration { realm: DynamicRealm,
                 oldVersion: Long,
                 newVersion: Long ->
        val schema: RealmSchema =
            realm.schema
        if (oldVersion == 0L) {
            // perform schema migration
            schema.get("Sample")
                ?.addField(
                    "new_field",
                    String::class.java
                )
        }

        // migrate data
        schema.get("Sample")
            ?.transform {
                    obj: DynamicRealmObject ->
                obj.set(
                    "longField",
                    42L
                )
            }
    }.build()
val realm: Realm =
    Realm.getInstance(config)
Log.v(
    "EXAMPLE",
    "Successfully opened a realm: "
            + realm.path
)
