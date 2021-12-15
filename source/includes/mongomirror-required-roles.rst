- For source clusters running MongoDB 3.6 or later a user must have
  the :authrole:`readAnyDatabase`, the :authrole:`clusterMonitor`, and
  the :authrole:`backup` roles.
  
  To verify that the database user that will run the Live Migration
  process has these roles, run the :manual:`db.getUser() </reference/method/db.getUser/>`
  command on the ``admin`` database.

  .. code-block:: javascript
     :emphasize-lines: 9, 13, 17

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
  
  In addition, the database user from your source cluster must have
  the role to read the oplog on your ``admin`` database. To learn more,
  see :ref:`Oplog Access <ref-atlas-oplog>`.

- For source clusters running MongoDB 3.4 a user must have,
  at a minimum, both :authrole:`clusterMonitor` and :authrole:`readAnyDatabase`
  roles. For example:

  .. code-block:: javascript
     :emphasize-lines: 6

      use admin
      db.createUser(
        {
          user: "mySourceUser",
          pwd: "mySourceP@$$word",
          roles: [ "clusterMonitor", "readAnyDatabase" ]
        }
      )
      
- For source clusters running MongoDB 3.2 a user must have,
  at a minimum, both :authrole:`clusterManager` and
  :authrole:`readAnyDatabase` roles, as well as read access on the
  ``local`` database. This requires a :manual:`custom role
  </core/security-user-defined-roles/>`, which you can create with
  the following commands:
    
  .. code-block:: javascript
     :emphasize-lines: 8
    
       use admin
       db.createRole(
            {
              role: "migrate",
              privileges: [
                { resource: { db: "local", collection: "" }, actions: [ "find" ] }
              ],
              roles: ["readAnyDatabase", "clusterManager"]
            }
          )
        db.createUser(
            {
              user: "mySourceUser",
              pwd: "mySourceP@$$word",
              roles: [ "migrate" ]
            }
          )

- For source clusters running MongoDB 2.6 or 3.0 a user must have,
  at a minimum, the :authrole:`readAnyDatabase` role. For example:
    
  .. code-block:: javascript
     :emphasize-lines: 6

       use admin
          db.createUser(
            {
              user: "mySourceUser",
              pwd: "mySourceP@$$word",
              roles: [ "readAnyDatabase" ]
            }
          )

