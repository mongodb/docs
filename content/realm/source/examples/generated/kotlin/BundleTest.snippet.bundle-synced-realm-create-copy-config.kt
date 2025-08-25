// Create a SyncConfiguration for the bundled copy.
// The initialRealmFile value is the `name` property of the asset realm you're bundling.
val copyConfig = SyncConfiguration.Builder(user, setOf(Item::class))
    .initialRealmFile("asset.realm")
    .build()
