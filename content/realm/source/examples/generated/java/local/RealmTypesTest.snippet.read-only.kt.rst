.. code-block:: kotlin
   :emphasize-lines: 3

   val config = RealmConfiguration.Builder()
       .assetFile("readonly.realm")
       .readOnly() 
       .modules(BundledRealmModule())
       .build()
