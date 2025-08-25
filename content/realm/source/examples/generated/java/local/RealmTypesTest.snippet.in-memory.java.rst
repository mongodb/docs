.. code-block:: java
   :emphasize-lines: 1, 2, 2

   RealmConfiguration config = new RealmConfiguration.Builder()
           .inMemory() 
           .name("java.transient.realm")
           .build();
   Realm realm = Realm.getInstance(config);
