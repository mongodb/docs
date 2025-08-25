.. code-block:: kotlin
   :emphasize-lines: 15, 16, 17

   val config = SyncConfiguration.Builder(app.currentUser(), PARTITION)
       .allowQueriesOnUiThread(true)
       .allowWritesOnUiThread(true)
       .build()

   Realm.getInstanceAsync(config, object : Realm.Callback() {
       override fun onSuccess(realm: Realm) {
           Log.v(
               "EXAMPLE",
               "Successfully opened a realm with reads and writes allowed on the UI thread."
           )


           realm.executeTransaction { transactionRealm ->
               val dog = transactionRealm.where<Dog>() 
                   .equalTo("owner.name", "dwayne").findFirst() 
               val owner = dog?.owner?.first() 
               Log.v("EXAMPLE", "Queried for dogs with owners named 'dwayne'. Found $dog, owned by $owner")
           }
           realm.close()
       }
   })
