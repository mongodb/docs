- For source clusters running MongoDB version 3.4+ a user must have,
  at a minimum, both :authrole:`clusterMonitor` and
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
  :authrole:`readAnyDatabase` roles. For example:

  .. code-block:: javascript

      use admin
      db.createUser(
        {
          user: "mySourceUser",
          pwd: "mySourceP@$$word",
          roles: [ "clusterManager", "readAnyDatabase" ]
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