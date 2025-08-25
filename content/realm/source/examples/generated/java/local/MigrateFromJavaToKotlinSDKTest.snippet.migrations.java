RealmConfiguration config =
    new RealmConfiguration.Builder()
            .migration((realm,
                        oldVersion,
                        newVersion) -> {
        RealmSchema schema =
                realm.getSchema();

        if (oldVersion == 0L) {
            // perform schema migration
            schema.get("Sample")
                .addField("new_field",
                        String.class);
        }

        // migrate data
        schema.get("Sample")
            .transform(obj ->
                obj.set("longField",
                        42L));
    }).build();

Realm realm;
realm = Realm.getInstance(config);
Log.v("EXAMPLE",
"Successfully opened a realm: "
        + realm.getPath());
