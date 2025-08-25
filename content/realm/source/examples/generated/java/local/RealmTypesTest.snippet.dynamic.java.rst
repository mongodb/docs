.. code-block:: java
   :emphasize-lines: 1, 1, 1, 6, 6

   RealmConfiguration config = new RealmConfiguration.Builder()
           .allowWritesOnUiThread(true)
           .allowQueriesOnUiThread(true)
           .name("java.dynamic.realm")
           .build();
   DynamicRealm dynamicRealm = DynamicRealm.getInstance(config); 

   // all objects in a DynamicRealm are DynamicRealmObjects
   AtomicReference<DynamicRealmObject> frog = new AtomicReference<>();
   dynamicRealm.executeTransaction(transactionDynamicRealm -> {
       // add type Frog to the schema with name and age fields
       dynamicRealm.getSchema()
               .create("Frog")
               .addField("name", String.class)
               .addField("age", int.class);
        frog.set(transactionDynamicRealm.createObject("Frog"));
        frog.get().set("name", "Wirt Jr.");
        frog.get().set("age", 42);
   });

   // access all fields in a DynamicRealm using strings
   String name = frog.get().getString("name");
   int age = frog.get().getInt("age");

   // because an underlying schema still exists,
   // accessing a field that does not exist throws an exception
   try {
       frog.get().getString("doesn't exist");
   } catch (IllegalArgumentException e) {
       Log.e("EXAMPLE", "That field doesn't exist.");
   }

   // Queries still work normally
   RealmResults<DynamicRealmObject> frogs = dynamicRealm.where("Frog")
           .equalTo("name", "Wirt Jr.")
           .findAll();
