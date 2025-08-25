// Open a local realm to use as the asset realm
val config = RealmConfiguration.Builder(schema = setOf(Item::class))
    .name("asset.realm")
    .build()
val assetRealm = Realm.open(config)

assetRealm.writeBlocking {
    // Add seed data to the asset realm
    copyToRealm(Item().apply {
        summary = "Write an awesome app"
        isComplete = false
    })
}

// Verify the data in the existing realm
// (this data should also be in the bundled realm we open later)
val originalItems: RealmResults<Item> = assetRealm.query<Item>().find()
for(item in originalItems) {
    Log.v("Item in the assetRealm: ${item.summary}")
}

// Get the path to the realm
Log.v("Realm location: ${config.path}")

assetRealm.close()
