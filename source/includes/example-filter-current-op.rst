Write Operations Waiting for a Lock
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example returns information on all write operations that
are waiting for a lock:

.. code-block:: javascript

   db.currentOp(
      {
        "waitingForLock" : true,
        $or: [
           { "op" : { "$in" : [ "insert", "update", "remove" ] } },
           { "query.findandmodify": { $exists: true } }
       ]  
      }
   )

Active Operations with no Yields
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example returns information on all active running
operations that have never yielded:

.. code-block:: javascript

   db.currentOp(
      {
        "active" : true,
        "numYields" : 0,
        "waitingForLock" : false
      }
   )

Active Operations on a Specific Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example returns information on all active operations for
database ``db1`` that have been running longer than 3 seconds:

.. code-block:: javascript

  db.currentOp(
     {
       "active" : true,
       "secs_running" : { "$gt" : 3 },
       "ns" : /^db1\./
     }
  )

.. _currentOp-index-creation:

Active Indexing Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example returns information on index creation operations:

.. code-block:: javascript

   db.currentOp(
       {
         $or: [
           { op: "query", "query.createIndexes": { $exists: true } },
           { op: "insert", ns: /\.system\.indexes\b/ }
         ]
       }
   )
