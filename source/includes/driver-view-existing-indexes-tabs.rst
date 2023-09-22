.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         The following sections provide methods for viewing existing indexes
         on a collection or an entire database.

         .. _index-list-indexes-for-collection:

         List All Indexes on a Collection
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

         To return a list of all indexes on a collection, use the
         :method:`db.collection.getIndexes()` method or a similar :api:`method
         for your driver <>`.

         For example, to view all indexes on the ``people`` collection, run the
         following command:

         .. code-block:: javascript

            db.people.getIndexes()

         .. _index-list-indexes-for-database:

         List All Indexes for a Database
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

         To list all the collection indexes in a database, run the following
         command in :binary:`~bin.mongosh`:

         .. code-block:: javascript

            db.getCollectionNames().forEach(function(collection) {
                indexes = db[collection].getIndexes();
                print("Indexes for " + collection + ":");
                printjson(indexes);
            });

         .. _list-specific-index-types:

         List Specific Type of Indexes
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

         To list all indexes of a certain type (such as :ref:`hashed
         <index-type-hashed>` or :ref:`text <index-type-text>`) for 
         all collections in all database, run the following command in
         :binary:`~bin.mongosh`:

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

     - id: compass
       content: |
         To view a list of all indexes on a collection in |compass|,
         click on the target collection in the left-hand pane and
         select the :guilabel:`Indexes` tab.

         .. figure:: /images/compass-index-tab-2.png
            :alt: View indexes on a collection in Compass


         For details on the information displayed in this tab, refer to
         the :ref:`Compass documentation <indexes-tab>`.
