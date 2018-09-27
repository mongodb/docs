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
       - :pipeline:`$out`

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
     - 

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
     - For ``upsert``, only when run against an existing collection.


   * - | :method:`db.collection.insertMany()`
       | :method:`db.collection.insertOne()`
       | :method:`db.collection.insert()`

     - :dbcommand:`insert`

     - Only when run against an existing collection.

   * - :method:`db.collection.save()`
     - 
     - If an insert, only when run against an existing collection.

   * - | :method:`db.collection.updateOne()`
       | :method:`db.collection.updateMany()`
       | :method:`db.collection.replaceOne()`
       | :method:`db.collection.update()`

     - :dbcommand:`update`
     - For ``upsert``, only when run against an existing collection.

   * - | :method:`db.collection.bulkWrite()`
       | Various :doc:`/reference/method/js-bulk`
     - 
     - | For insert operations, only when run against an existing collection.
       | For ``upsert``, only when run against an existing collection.
