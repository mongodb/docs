- Return all pending write operations:

  .. code-block:: javascript

     db.currentOp().inprog.forEach(
        function(d){
          if(d.waitingForLock && d.lockType != "read")
             printjson(d)
          })

- Return the active write operation:

  .. code-block:: javascript

     db.currentOp().inprog.forEach(
        function(d){
          if(d.active && d.lockType == "write")
             printjson(d)
          })

- Return all active read operations:

  .. code-block:: javascript

     db.currentOp().inprog.forEach(
        function(d){
          if(d.active && d.lockType == "read")
             printjson(d)
          })
