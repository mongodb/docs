For source replica set {+clusters+}, a MongoDB user must have the
:authrole:`readAnyDatabase`, :authrole:`backup` roles and the :authaction:`bypassWriteBlockingMode` action.

For source sharded {+clusters+} a MongoDB user must have the :authrole:`readAnyDatabase`,
:authrole:`backup`, :authrole:`clusterMonitor` roles and the :authaction:`bypassWriteBlockingMode` 
action.

You must add the :authaction:`bypassWriteBlockingMode` action to a custom role and assign it to the user who will do the migration. You can add the role
on :ref:`Atlas <add-mongodb-roles>` or :ref:`self-managed clusters <create-user-defined-role>`.

The custom role must include the :authaction:`setUserWriteBlockMode`
and :authaction:`bypassWriteBlockingMode` actions on the ``cluster``
resource. For a self-managed source {+cluster+}, run the following
commands in :binary:`~bin.mongosh` to create the custom role and
assign it to the migration user:

.. code-block:: javascript

   use admin
   db.createRole({
     role: "LiveMigrateWriteBlockingCustomRole",
     privileges: [
       {
         resource: { cluster: true },
         actions: [ "setUserWriteBlockMode", "bypassWriteBlockingMode" ]
       }
     ],
     roles: []
   })
   db.grantRolesToUser("admin", [
     { role: "LiveMigrateWriteBlockingCustomRole", db: "admin" }
   ])

For an |service| source {+cluster+}, create the custom role with the
{+atlas-cli+} or the {+atlas-ui+}, and then assign it to the database
user:

.. code-block:: shell

   atlas customDbRoles create LiveMigrateWriteBlockingCustomRole \
     --privilege SET_USER_WRITE_BLOCK,BYPASS_USER_WRITE_BLOCK

In the {+atlas-ui+}, select the ``setUserWriteBlockMode`` and
``bypassWriteBlockingMode`` actions in the :guilabel:`Action or Role`
field. To learn more, see :ref:`add-mongodb-roles`.

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

