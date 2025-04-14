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

   * - 
     - :dbcommand:`geoSearch`
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

     - For :ref:`feature compatibility version (fcv) <view-fcv>`
       ``"4.4"`` or greater, if the update/replace operation is run
       with ``upsert: true`` against a non-existing collection, the
       collection is implicitly created.

       For fcv ``"4.2"`` or less, if ``upsert: true``, the operation
       must be run against an existing collection.
       
       .. seealso::

          :ref:`transactions-operations-ddl`

   * - | :method:`db.collection.insertMany()`
       | :method:`db.collection.insertOne()`
       | :method:`db.collection.insert()`

     - :dbcommand:`insert`

     - For :ref:`feature compatibility version (fcv) <view-fcv>`
       ``"4.4"`` or greater, when run against a non-existing
       collection, the collection is implicitly created.
       
       For fcv ``"4.2"`` or less, can only be run against an existing
       collection.
       
       .. seealso::

          :ref:`transactions-operations-ddl`

   * - :method:`db.collection.save()`
     - 
     - For :ref:`feature compatibility version (fcv) <view-fcv>`
       ``"4.4"`` or greater, if an insert against a non-existing
       collection, the collection is implicitly created.
       
       With fcv ``"4.2"`` or less, if an insert, can only be run against an
       existing collection.

       .. seealso::

          :ref:`transactions-operations-ddl`

   * - | :method:`db.collection.updateOne()`
       | :method:`db.collection.updateMany()`
       | :method:`db.collection.replaceOne()`
       | :method:`db.collection.update()`

     - :dbcommand:`update`

     - For :ref:`feature compatibility version (fcv) <view-fcv>`
       ``"4.4"`` or greater, if run with ``upsert: true`` against a
       non-existing collection, the collection is implicitly created.

       For fcv ``"4.2"`` or less, if ``upsert: true``, the operation must be
       run against an existing collection.

       .. seealso::

          :ref:`transactions-operations-ddl`

   * - | :method:`db.collection.bulkWrite()`
       | Various :doc:`/reference/method/js-bulk`
     - 
     - For :ref:`feature compatibility version (fcv) <view-fcv>` ``"4.4"``
       and greater, if an insert operation or update operation with
       ``upsert: true`` is run in a transaction against a non-existing
       collection, the collection is implicitly created.

       For fcv ``"4.2"`` or less, the collection must already exist for
       insert and ``upsert: true`` operations.
       
       .. seealso::

          :ref:`transactions-operations-ddl`
