You must precede a :query:`$regex` query on an :term:`oplog` in
an ``M0``{+Free-cluster+}, {+Flex-cluster+}, or
``M2/M5`` {+Shared-cluster+} (deprecated) with a caret (``^``).
Otherwise, the following error occurs:

.. code-block:: sh
   
   MongoServerError: Oplog ns RegEx queries must begin with ^
