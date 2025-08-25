.. code-block:: kotlin

   config = SyncConfiguration.Builder(user, setOf(Item::class))
      .initialSubscriptions { realm ->
         add(
            realm.query<Item>(
               "owner_id == $0",
               realmApp.currentUser!!.identity
            ),
            "User's Items"
         )
      }
      .build()

   // Log on-disk location of the realm file
   Log.v("My Tag", "Realm Path: ${config.path}")
   