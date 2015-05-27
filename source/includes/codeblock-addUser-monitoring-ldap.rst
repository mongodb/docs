.. code-block:: javascript

   db.getSiblingDB("$external").createUser(
       {
         user : "<username>",
         roles: [ { role: "clusterMonitor", db: "admin" } ]
       }
   )