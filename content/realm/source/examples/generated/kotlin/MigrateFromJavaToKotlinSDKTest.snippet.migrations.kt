// A Realm migration that performs
// automatic schema migration
// and allows additional custom
// migration of data.
RealmConfiguration.Builder(
    schema = setOf(Sample::class))
    .migration(AutomaticSchemaMigration {
            context:
                AutomaticSchemaMigration.MigrationContext ->
        val oldRealm:
                DynamicRealm =
            context.oldRealm
        val newRealm:
                DynamicMutableRealm =
            context.newRealm
        // dynamic realm gives access
        // to realm data
        // through a generic string
        // based API
        context.enumerate("Sample") {
                oldObject:
                DynamicRealmObject,
                newObject:
                    DynamicMutableRealmObject? ->
            newObject?.set("longField",
                            42L)
        }
    })
    .build()
val realm = Realm.open(config)
