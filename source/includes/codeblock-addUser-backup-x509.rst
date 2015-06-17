MongoDB 3.0 or Later
````````````````````
.. code-block:: javascript

   use $external
   db.createUser(
      {
        user: "<x.509 subject>",
        roles: [
           { role: "backup", db: "admin" }
        ]
      }
   )

MongoDB 2.6
```````````

.. code-block:: javascript

   use $external
   db.createUser(
      {
        user: "<x.509 subject>",
        roles: [ 
           "clusterAdmin",
           "readAnyDatabase",
           "userAdminAnyDatabase",
           { role: "readWrite", db: "admin" },
           { role: "readWrite", db: "local" },
        ]
      }
   )
