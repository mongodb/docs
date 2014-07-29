- Return all write operations waiting for lock:

  .. code-block:: javascript

     db.currentOp({
             "waitingForLock" : true, 
             "op" : { "$in" : [ "insert", "update", "remove" ] }
          })

- Return all active running operation that have never yielded:

  .. code-block:: javascript

     db.currentOp({
             "active" : true, 
             "numYields" : 0, 
             "waitingForLock" : false
          })

- Return all active queries for database "db1" that have been running longer than 3 seconds:

  .. code-block:: javascript

     db.currentOp({
             "active" : true, 
             "secs_running" : { "$gt" : 3 }, 
             "ns" : /^db1./     
          })
