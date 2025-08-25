.. code-block:: kotlin
   :emphasize-lines: 1, 2, 2

   val config = RealmConfiguration.Builder()
       .inMemory() 
       .name("kt.transient.realm")
       .build()
   val realm = Realm.getInstance(config)
