.. code-block:: swift

   // Get on-disk location of the default Realm
   let realm = try! Realm()
   print("Realm is located at:", realm.configuration.fileURL!)
   