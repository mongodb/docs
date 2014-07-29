- Return all write operations waiting for a lock:

  .. code-block:: javascript

     db.currentOp(
        {
          "waitingForLock" : true, 
          $or: [ 
             { "op" : { "$in" : [ "insert", "update", "remove" ] } },
             { "query.update": { $exists: true } },
             { "query.insert": { $exists: true } },
             { "query.remove": { $exists: true } }
          ] 
        }
     )

- Return all active running operations that have never yielded:

  .. code-block:: javascript

     db.currentOp(
        {
          "active" : true, 
          "numYields" : 0, 
          "waitingForLock" : false
        }
     )

- Return all active queries for database ``db1`` that have been running
  longer than 3 seconds:

  .. code-block:: javascript

     db.currentOp(
        {
          "active" : true,
          "secs_running" : { "$gt" : 3 },
          "ns" : /^db1./
        }
     )
