// The config should list the bundled asset realm as the initialRealmFile
val bundledRealmConfig = RealmConfiguration.Builder(schema = setOf(Item::class))
    .initialRealmFile("asset.realm")
    .build()

// After moving the bundled realm to the appropriate location for your app's platform,
// open and use the bundled realm as usual.
val bundledRealm = Realm.open(bundledRealmConfig)
val bundledItems: RealmResults<Item> = bundledRealm.query<Item>().find()
for(item in bundledItems) {
    Log.v("Item in the bundledRealm: ${item.summary}")
}
bundledRealm.close()
