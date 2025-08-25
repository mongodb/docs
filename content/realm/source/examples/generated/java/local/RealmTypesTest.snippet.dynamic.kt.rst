.. code-block:: kotlin
   :emphasize-lines: 1, 1, 1, 6, 6

   val config = RealmConfiguration.Builder()
       .allowWritesOnUiThread(true)
       .allowQueriesOnUiThread(true)
       .name("kt.dynamic.realm")
       .build()
   val dynamicRealm = DynamicRealm.getInstance(config) 

   // all objects in a DynamicRealm are DynamicRealmObjects
   var frog: DynamicRealmObject? = null
   dynamicRealm.executeTransaction { transactionDynamicRealm: DynamicRealm ->
       // add type Frog to the schema with name and age fields
       dynamicRealm.schema
           .create("Frog")
           .addField("name", String::class.java)
           .addField("age", Integer::class.java)
       frog = transactionDynamicRealm.createObject("Frog")
       frog?.set("name", "Wirt Jr.")
       frog?.set("age", 42)
   }

   // access all fields in a DynamicRealm using strings
   val name = frog?.getString("name")
   val age = frog?.getInt("age")

   // because an underlying schema still exists,
   // accessing a field that does not exist throws an exception
   try {
       frog?.getString("doesn't exist")
   } catch (e: IllegalArgumentException) {
       Log.e("EXAMPLE", "That field doesn't exist.")
   }

   // Queries still work normally
   val frogs = dynamicRealm.where("Frog")
       .equalTo("name", "Wirt Jr.")
       .findAll()
