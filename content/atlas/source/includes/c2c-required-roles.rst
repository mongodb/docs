For source replica set {+clusters+}, a MongoDB user must have the
:authrole:`readAnyDatabase`, :authrole:`backup` roles and the :authaction:`bypassWriteBlockingMode` action.

For source sharded {+clusters+} a MongoDB user must have the :authrole:`readAnyDatabase`,
:authrole:`backup`, :authrole:`clusterMonitor` roles and the :authaction:`bypassWriteBlockingMode` 
action.

The :authaction:`bypassWriteBlockingMode` should be added to a custom role that
you can apply to the MongoDB user being used for the migration. This can be added
on :ref:`Atlas <add-mongodb-roles>` or :ref:`self-managed clusters <create-user-defined-role>`.

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
     ,
     {
       "role" : "LiveMigrateWriteBlockingCustomRole",
       "db" : "admin"
     }
    ]
   } ...

