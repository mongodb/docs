.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         List all Indexes on a Database
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

         To list all indexes on all collections in a database, you
         can use the following operation in the :program:`mongo` shell:

         .. cssclass:: copyable-code

         .. code-block:: javascript

            db.getCollectionNames().forEach(function(collection) {
               indexes = db[collection].getIndexes();
               print("Indexes for " + collection + ":");
               printjson(indexes);
            });

         .. versionchanged:: 3.0

            MongoDB 3.0 deprecates direct access to the ``system.indexes``
            collection, which had previously been used to list all indexes
            in a database.

         .. include:: /includes/fact-wiredtiger-compatibility-with-old-shells.rst