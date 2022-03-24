* Your data is currently in a MongoDB database.

  This guide focuses on migrating to Atlas from an existing MongoDB deployment
  on AWS. If you have data in other database systems, such as MySQL, PostgreSQL, or
  DynamoDB, please `contact us <https://mongodb.com/contact>`_
  for help with your migration.

* Update your `MongoDB drivers <https://mongodb.com/docs/drivers/>`_
  and make any necessary code changes at the application level to ensure
  compatibility.

* Your current deployment is a MongoDB replica set or sharded cluster.

  If your deployment is currently a standalone instance, you must first
  :manual:`convert it to a replica set </tutorial/convert-standalone-to-replica-set/>`.

* If you're migrating a replica set, it is running MongoDB 2.6 or
  higher.

  The Atlas Live Migration Service can move your data directly into a
  newer database version. For more information about the supported
  upgrade paths, see the :atlas:`Atlas documentation
  </import/live-import/#upgrade-path>`.

  If you're running a version older than 2.6, see
  `Upgrade MongoDB to 2.6
  <https://mongodb.com/docs/v2.6/release-notes/2.6-upgrade/index.html>`_
  for upgrade instructions.

* If you're migrating a sharded cluster, it is running MongoDB 4.0 or
  higher.

  The Atlas Live Migration Service can move your data directly the same database version. For more information about the supported
  upgrade paths, see the :atlas:`Atlas documentation
  </import/live-import-sharded/#migration-path>`.

  If you're running a version older than 4.0, see
  `Upgrade MongoDB to 4.0
  <https://mongodb.com/docs/v4.0/release-notes/4.0-upgrade-sharded-cluster/>`_
  for upgrade instructions.

* (Optional) Enabled authentication on your source deployment.

  The migration process requires that authentication is enabled on your
  source cluster in AWS. See :manual:`Enable Auth </tutorial/enable-authentication/>`
  for instructions on enabling authentication.
  You can verify that authentication is enabled on your source cluster
  using the :manual:`mongo </reference/program/mongo/>` command:

  .. code-block:: sh

     mongo <mongodb-connection-string> -u <mongodb-username> -p --authenticationDatabase admin

* The database user from your source cluster on AWS that you will use to perform the migration has the required MongoDB roles.

  The user must have the :authrole:`clusterMonitor` and :authrole:`backup` roles. To verify
  that the database user that you intend to use for migration has the appropriate
  roles, run the :manual:`db.getUser() </reference/method/db.getUser/>` command against the admin database.

  .. code-block:: javascript

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
       ]
     } ...
