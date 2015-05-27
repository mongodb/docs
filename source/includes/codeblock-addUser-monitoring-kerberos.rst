.. code-block:: javascript

   use $external
   db.createUser(
      {
        user: "<Kerberos Principal>",
        roles: [ { role: "clusterMonitor", db: "admin" } ]
      }
   )