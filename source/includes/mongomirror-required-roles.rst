For source {+clusters+} a user must have the :authrole:`readAnyDatabase`,
:authrole:`clusterMonitor`, and :authrole:`backup` roles.
  
To verify that the database user who will run the live migration process
has these roles, run the :manual:`db.getUser() </reference/method/db.getUser/>`
command on the ``admin`` database.

.. code-block:: javascript
   :emphasize-lines: 10, 14, 15

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
           "role" : "clusterMonitor",
           "db" : "admin"
         }
         {
           "role" : "readAnyDatabase",
           "db" : "admin"
         }
       ]
   } ...

In addition, the database user from your source {+cluster+} must have
the role to read the oplog on your ``admin`` database. To learn more,
see :ref:`Oplog Access <ref-atlas-oplog>`.
