.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         List All Indexes for a Database
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

         To list all the collection indexes in a database, you can use the
         following operation in :binary:`~bin.mongosh`:

         .. code-block:: javascript

            db.getCollectionNames().forEach(function(collection) {
               indexes = db[collection].getIndexes();
               print("Indexes for " + collection + ":");
               printjson(indexes);
            });

         Starting in version 3.0, MongoDB deprecates direct access to
         the ``system.indexes`` collection, which had previously been
         used to list all indexes in a database.

         .. _list-specific-index-types:

         List Specific Type of Indexes
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

         To list all indexes of a certain type (e.g. :doc:`hashed
         </core/index-hashed>`, :doc:`text </core/index-text>`) for all
         collections in all database, you can use the following
         operation in :binary:`~bin.mongosh`:

         .. code-block:: javascript

            // The following finds all hashed indexes

            db.adminCommand("listDatabases").databases.forEach(function(d){
               let mdb = db.getSiblingDB(d.name);
               mdb.getCollectionInfos({ type: "collection" }).forEach(function(c){
                  let currentCollection = mdb.getCollection(c.name);
                  currentCollection.getIndexes().forEach(function(idx){
                    let idxValues = Object.values(Object.assign({}, idx.key));

                    if (idxValues.includes("hashed")) {
                      print("Hashed index: " + idx.name + " on " + d.name + "." + c.name);
                      printjson(idx);
                    };
                  }); 
               });
            });

