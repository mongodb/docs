.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Name
     - Description

   * - ``databaseName``
     - The user's :ref:`authentication database
       <authentication-database>`. A user must provide both a username
       and authentication database to log into MongoDB. In |service|
       deployments of MongoDB, the authentication database is always
       the ``admin`` database.

   * - ``deleteAfterDate``
     - `ISO-8601 <https://en.wikipedia.org/wiki/ISO_8601>`_-
       formatted date after which |service| deletes the user. This
       field is only present if an expiration date was specified
       when creating the entry.

   * - ``groupId``
     - ID of the |service| project the user belongs to.

   * - ``links``
     - One or more :ref:`links <api-linking>` to sub-resources and/or
       related resources.

   * - ``roles``
     - .. include:: /includes/fact-database-user-role.rst

   * - ``roles.databaseName``
     - Database on which the user has the specified role. A role on the
       ``admin`` database can include privileges that apply to the
       other databases.

   * - ``roles.collectionName``
     - Collection on which the user has the specified role.

   * - ``roles.roleName``
     - Name of the role. The possible values are:

       - :atlasrole:`atlasAdmin <Atlas admin>`
       - :authrole:`readWriteAnyDatabase`
       - :authrole:`readAnyDatabase`
       - :authrole:`backup`
       - :authrole:`clusterMonitor`
       - :authrole:`dbAdmin`
       - :authrole:`dbAdminAnyDatabase`

       - ``enableSharding``

         This role is specific to MongoDB databases managed by |service|. The role
         allows the user to enable sharding on a database and to shard a collection.

       - :authrole:`read`
       - :authrole:`readWrite`
       - A name of a :ref:`custom MongoDB role <mongodb-roles>`

   * - ``username``
     - Username for authenticating to MongoDB.
