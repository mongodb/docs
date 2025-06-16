Given documents of the following shape in the collection ``abc`` in the
database ``test``:

.. code-block:: javascript

   {
       "_id": ObjectId(),
       "close": 7.45,
       "detail": { "a": 2, "b": 3 }
   }

Run :binary:`~bin.mongodrdl` to generate a schema based on this collection:


.. code-block:: sh

   mongodrdl -d test -c abc -o schema.drdl

The generated schema file (``schema.drdl``) looks similar to the following:

.. code-block:: yaml

   schema:
   - db: test
     tables:
     - table: abc
       collection: abc
       pipeline: []
       columns:
       - Name: _id
         MongoType: bson.ObjectId
         SqlName: _id
         SqlType: varchar
       - Name: close
         MongoType: float64
         SqlName: close
         SqlType: numeric
       - Name: detail.a
         MongoType: float64
         SqlName: detail.a
         SqlType: numeric
       - Name: detail.b
         MongoType: float64
         SqlName: detail.b
         SqlType: numeric
