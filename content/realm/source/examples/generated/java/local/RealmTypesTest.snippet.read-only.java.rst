.. code-block:: java
   :emphasize-lines: 3

   RealmConfiguration config = new RealmConfiguration.Builder()
           .assetFile("bundled.realm")
           .readOnly() 
           .modules(new BundledRealmModule())
           .build();
