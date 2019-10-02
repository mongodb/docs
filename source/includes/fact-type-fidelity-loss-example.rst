For example, the following insert operation in the :binary:`~bin.mongo`
shell uses the various :doc:`shell helpers </core/shell-types>` for the
BSON types :doc:`Date </reference/bson-types>` and :doc:`64-bit integer
</reference/bson-types>`:

.. code-block:: javascript

   use test
   db.traffic.insert( { _id: 1, volume: NumberLong('2980000'), date: new Date() } )

The argument to :doc:`64-bit integer </reference/bson-types>` must be quoted to avoid potential
loss of accuracy.

Use :binary:`~bin.mongoexport` to export the data:

.. code-block:: none

   mongoexport --db=test --collection=traffic --out=traffic.json

In version 4.2+, the exported data is in :doc:`Extended JSON v2.0
(Relaxed mode)</reference/mongodb-extended-json>`.

.. code-block:: javascript

   {"_id":1.0,"volume":2980000,"date":{"$date":"2019-08-05T16:18:29.559Z"}}

To output in :doc:`Extended JSON v2.0 (Canonical
mode)</reference/mongodb-extended-json>`, include the
:option:`--jsonFormat=canonical <mongoexport --jsonFormat>`:

.. code-block:: none

   mongoexport --db=test --collection=traffic --jsonFormat=canonical --out=traffic.json

The exported data is in :doc:`Extended JSON v2.0 (Canonical
mode)</reference/mongodb-extended-json>`:

.. code-block:: javascript

   {"_id":{"$numberDouble":"1.0"},"volume":{"$numberLong":"2980000"},"date":{"$date":{"$numberLong":"1565363188675"}}}

In version 4.0 and earlier, the exported data is in :doc:`Extended JSON v1.0 (Strict mode)
</reference/mongodb-extended-json-v1>`

.. code-block:: javascript

   {"_id":1.0,"volume":{"$numberLong":"2980000"},"date":{"$date":"2019-08-05T16:18:29.559Z"}}

