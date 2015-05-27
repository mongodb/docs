MongoDB 3.0 or later
````````````````````

.. code-block:: javascript

   db.getSiblingDB("$external").createUser(
       {
         user : "<username>",
         roles: [ { role: "backup", db: "admin" } ]
       }
   )

MongoDB 2.6
```````````

.. code-block:: javascript

   db.getSiblingDB("$external").createUser(
      {
        user: "<username>",
        roles: [ 
           "clusterAdmin",
           "readAnyDatabase",
           "userAdminAnyDatabase",
           { role: "readWrite", db: "admin" },
           { role: "readWrite", db: "local" },
        ]
      }
   )
