val config = RealmConfiguration.Builder()
    .allowQueriesOnUiThread(true)
    .allowWritesOnUiThread(true)
    .build()

var realm: Realm
try {
    realm = Realm.getInstance(config)
    Log.v("EXAMPLE", "Successfully opened a realm at: ${realm.path}")
} catch(ex: RealmFileException) {
    Log.v("EXAMPLE", "Error opening the realm.")
    Log.v("EXAMPLE", ex.toString())
}
