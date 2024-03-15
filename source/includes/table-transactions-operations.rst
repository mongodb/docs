.. list-table::
   :header-rows: 1
   :widths: 50 20 30

   * - Method
     - Command
     - Note

   * - :method:`db.collection.aggregate()` 
     - :dbcommand:`aggregate`
     - Excluding the following stages:

       - :pipeline:`$collStats`
       - :pipeline:`$currentOp`
       - :pipeline:`$indexStats`
       - :pipeline:`$listLocalSessions`
       - :pipeline:`$listSessions`
       - :pipeline:`$merge`
       - :pipeline:`$out`
       - :pipeline:`$planCacheStats`
       - :pipeline:`$unionWith`

   * - :method:`db.collection.countDocuments()` 
     -

     - Excluding the following query operator expressions:
     
       - :query:`$where`
       - :query:`$near`
       - :query:`$nearSphere`

       The method uses the :pipeline:`$match` aggregation stage for the
       query and :pipeline:`$group` aggregation stage with a
       :group:`$sum` expression to perform the count.

   * - :method:`db.collection.distinct()`
     - :dbcommand:`distinct`
     - Available on unsharded collections.
       
       | For sharded collections, use the aggregation pipeline with the
         :pipeline:`$group` stage. See :ref:`transactions-operations-distinct`.
       

   * - :method:`db.collection.find()`
     - :dbcommand:`find`
     - 

   * - | :method:`db.collection.deleteMany()`
       | :method:`db.collection.deleteOne()`
       | :method:`db.collection.remove()`

     - :dbcommand:`delete`
     - 

   * - | :method:`db.collection.findOneAndDelete()`
       | :method:`db.collection.findOneAndReplace()`
       | :method:`db.collection.findOneAndUpdate()`

     - :dbcommand:`findAndModify`

     - If the update or replace operation is run with ``upsert: true`` on a 
       non-existing collection, the collection is implicitly created.

       In MongoDB 4.2 and earlier, if ``upsert: true``, the operation
       must be run on an existing collection.
       
       .. seealso::

          :ref:`transactions-operations-ddl`

   * - | :method:`db.collection.insertMany()`
       | :method:`db.collection.insertOne()`

     - :dbcommand:`insert`

     - If run on a non-existing collection, the collection is implicitly 
       created.
       
       In MongoDB 4.2 and earlier, the operation must be run on an
       existing collection.
       
       .. seealso::

          :ref:`transactions-operations-ddl`

   * - | :method:`db.collection.updateOne()`
       | :method:`db.collection.updateMany()`
       | :method:`db.collection.replaceOne()`

     - :dbcommand:`update`

     - If run on a non-existing collection, the collection is implicitly 
       created.
       
       In MongoDB 4.2 and earlier, the operation must be run on an
       existing collection.

       .. seealso::

          :ref:`transactions-operations-ddl`

   * - | :method:`db.collection.bulkWrite()`
       | Various :doc:`/reference/method/js-bulk`
     - 
     - If run on a non-existing collection, the collection is implicitly 
       created.
       
       In MongoDB 4.2 and earlier, the operation must be run on an
       existing collection.
       
       .. seealso::

          :ref:`transactions-operations-ddl`
