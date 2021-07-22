- For source clusters running MongoDB version 3.4 or later a user must
  have, at a minimum, both :authrole:`clusterMonitor` and
  :authrole:`readAnyDatabase` roles. For example:

  .. code-block:: javascript

      use admin
      db.createUser(
        {
          user: "mySourceUser",
          pwd: "mySourceP@$$word",
          roles: [ "clusterMonitor", "readAnyDatabase" ]
        }
      )
      
- For source clusters running MongoDB version 3.2 a user must have,
  at a minimum, both :authrole:`clusterManager` and
  :authrole:`readAnyDatabase` roles, as well as read access on the
  ``local`` database. This requires a :manual:`custom role
  </core/security-user-defined-roles/>`, which you can create with
  the following commands:
    
  .. code-block:: javascript
    
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

- For source clusters running MongoDB version 2.6 or 3.0 a user must
  have, at a minimum, the :authrole:`readAnyDatabase` role. For example:
    
  .. code-block:: javascript

       use admin
          db.createUser(
            {
              user: "mySourceUser",
              pwd: "mySourceP@$$word",
              roles: [ "readAnyDatabase" ]
            }
          )

