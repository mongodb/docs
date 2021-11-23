.. important::

   If you have SSL enabled on your Compose deployment, you will need
   access to your SSL certificate to complete the Live Migration
   process.

   In some Compose deployments, you can no longer view your SSL
   certificate in the Compose UI. If this is the case for your
   deployment, you have two options:

   - Contact Compose directly to request your SSL certificate.
   - Use :atlas:`MongoMirror </import/mongomirror/>` to migrate
     your data to Atlas.

   See the `Compose documentation
   <https://help.compose.com/docs/lets-encrypt-certificates>`__ for more
   information about SSL certificates.

* Your data is currently in a MongoDB database.

  This guide focuses on migrating to Atlas from an existing MongoDB deployment
  on Compose.

* Your current MongoDB database is running MongoDB 2.6 or higher.

  Atlas supports the latest versions of MongoDB: 3.6, 4.0, and 4.2.
  If you're running MongoDB version 2.6 or greater, the Atlas Live Migration
  Service can move your data directly into a newer database version.
  Update your `MongoDB drivers <https://docs.mongodb.com/ecosystem/drivers>`_
  and make any necessary code changes at the application level to ensure
  compatibility. If you're running a version older than 2.6, see 
  `Upgrade MongoDB to 2.6 <https://docs.mongodb.com/v2.6/release-notes/2.6-upgrade/index.html>`_
  for upgrade instructions.

* Your current deployment is a MongoDB replica set or sharded cluster.

  If your deployment is currently a standalone instance, you must first
  :manual:`convert it to a replica set </tutorial/convert-standalone-to-replica-set/>`.
  
  Live migration of data from sharded clusters is not supported. Your destination
  cluster may be sharded, but your source cluster must be an unsharded replica
  set.

* (Optional) Enabled authentication on your source deployment.

  The migration process requires that authentication is enabled on your
  source cluster. See :manual:`Enable Auth </tutorial/enable-authentication/>`
  for instructions on enabling authentication.
  You can verify that authentication is enabled on your source cluster
  using the :manual:`mongo </reference/program/mongo/>` command:

  .. code-block:: sh

     mongo <mongodb-connection-string> -u <mongodb-username> -p --authenticationDatabase admin

* The database user from your source cluster that you will use to perform
  the migration has the required MongoDB roles.
   
  - The :authrole:`readAnyDatabase` role.
  - The :authrole:`clusterMonitor` role.
  - The :authrole:`backup` role.
  
  To verify that the database user that will run the Live Migration
  process has these roles, run the :manual:`db.getUser()
  </reference/method/db.getUser/>` command on the ``admin`` database.

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
         {
           "role" : "readAnyDatabase",
           "db" : "admin"
         }
       ]
     } ...
  
  In addition, the database user from your source cluster in Compose
  must have the role to read the oplog on your ``admin`` database. See
  :atlas:`Oplog Access </reference/atlas-oplog/>`. You obtain access to
  this role when you add the oplog user in Compose in the following
  procedure.
  If you can't grant all of these permissions to the database user from
  your source cluster in Compose, the Live Migration process will not work.
  In this case, use :atlas:`mongodump and mongorestore </import/mongorestore/>`
  to migrate your data to Atlas.

