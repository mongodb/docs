You must precede a :query:`$regex` query on an :term:`oplog` in
an ``M0`` {+Free-cluster+} or a {+Flex-cluster+} with a carat (``^``).
Otherwise, the following error occurs:

.. code-block:: sh
   
   MongoServerError: Oplog ns RegEx queries must begin with ^
