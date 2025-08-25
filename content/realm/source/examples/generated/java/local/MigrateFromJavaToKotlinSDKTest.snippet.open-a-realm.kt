val config = RealmConfiguration.Builder()
    .build()
var realm: Realm
realm = Realm.getInstance(config)
Log.v(
    "EXAMPLE",
    "Successfully opened a realm: "
            + realm.path
)
