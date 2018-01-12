Given documents of the following shape in the collection ``abc`` in the
database ``test``:

.. code-block:: javascript

   {
       "_id": ObjectId("....")
       "close": 7.45,
       "detail": { "a": 2, "b": 3 }
   }

You can use :binary:`~bin.mongodrdl` to generate a schema based on this collection
by running the following command:

.. code-block:: sh

   mongodrdl -d test -c abc -o schema.drdl

The generated schema file ``schema.drdl`` will look similar to the following:

.. code-block:: yaml

   schema:
   - db: test
     tables:
     - table: abc
       collection: abc
       pipeline: []
       columns:
       - name: _id
         mongotype: float64
         sqltype: numeric
       - name: close
         mongotype: float64
         sqltype: numeric
       - name: detail.a
         mongotype: float64
         sqltype: numeric
       - name: detail.b
         mongotype: float64
         sqltype: numeric
