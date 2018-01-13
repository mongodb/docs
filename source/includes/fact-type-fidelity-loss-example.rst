To preserve type information, :binary:`~bin.mongoexport` and :binary:`~bin.mongoimport`
uses the :doc:`strict mode representation </reference/mongodb-extended-json>`
for certain types.

For example, the following insert operation in the :binary:`~bin.mongo`
shell uses the :doc:`shell mode representation
</reference/mongodb-extended-json>` for the BSON types
:bsontype:`data_date` and :bsontype:`data_numberlong`:

.. code-block:: javascript

   use test
   db.traffic.insert( { _id: 1, volume: NumberLong('2980000'), date: new Date() } )

The argument to :bsontype:`data_numberlong` must be quoted to avoid potential
loss of accuracy.

Use :binary:`~bin.mongoexport` to export the data:

.. code-block:: none

   mongoexport --db test --collection traffic --out traffic.json

The exported data is in :doc:`strict mode representation
</reference/mongodb-extended-json>` to preserve type information:

.. code-block:: javascript

   { "_id" : 1, "volume" : { "$numberLong" : "2980000" }, "date" : { "$date" : "2014-03-13T13:47:42.483-0400" } }

See :doc:`/reference/mongodb-extended-json` for a complete list of
these types and the representations used.
