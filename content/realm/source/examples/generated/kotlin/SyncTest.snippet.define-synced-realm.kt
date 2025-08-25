// Define the configuration for the synced realm
val config =
    // Pass the authenticated user and the set of
    // all objects types you want to be able to sync
    SyncConfiguration.Builder(
        user = myAuthenticatedUser,
        schema = setOf(List::class, Item::class)
    )
        // Define an initial subscription with queries that include
        // the user's lists with incomplete items
        .initialSubscriptions{ realm ->
            add(realm.query<List>("ownerId == $0", myAuthenticatedUser.id),
                name = "user-lists"
            )
            add(realm.query<Item>("complete = false"),
                name = "incomplete-items"
            )
        }
        .build()
