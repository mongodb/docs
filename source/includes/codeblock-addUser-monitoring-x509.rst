.. code-block:: javascript

   use $external
   db.createUser(
      {
         user: "<x.509 subject>"
         roles: [ { role: "clusterMonitor", db: "admin" } ]
      }
   )