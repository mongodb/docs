For source replica sets running MongoDB {+c2c-version+} or later a MongoDB user must have
the :authrole:`readAnyDatabase` and :authrole:`backup` roles.

For source sharded {+clusters+} running MongoDB {+c2c-version+} or later a MongoDB user
must have the :authrole:`readAnyDatabase`, :authrole:`backup`, and
:authrole:`clusterMonitor` roles.

To verify that the database user who will run the live migration process
has these roles, run the :manual:`db.getUser() </reference/method/db.getUser/>`
command on the ``admin`` database. For example, for a replica set, run:

.. code-block:: javascript
   :emphasize-lines: 9, 13

   use admin
   db.getUser("admin")
   {
       "_id" : "admin.admin",
       "user" : "admin",
       "db" : "admin",
       "roles" : [
     {
       "role" : "backup",
       "db" : "admin"
     },
     {
       "role" : "readAnyDatabase",
       "db" : "admin"
     }
    ]
   } ...

