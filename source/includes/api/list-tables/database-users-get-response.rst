.. list-table::
   :header-rows: 1
   :widths: 25 10 65

   * - Response Element
     - Type
     - Description

   * - ``databaseName``
     - string
     - The user's :ref:`authentication database
       <authentication-database>`. A user must provide both a username
       and authentication database to log into MongoDB. In |service|
       deployments of MongoDB, the authentication database is always
       the ``admin`` database.

   * - ``deleteAfterDate``
     - string
     - |iso8601-time| after which |service| deletes the user. This
       field is only present if an expiration date was specified
       when creating the entry.

   * - ``groupId``
     - string
     - Unique identifier of the |service| project to which the user
       belongs.

   * - ``labels``
     - array of documents
     - Array containing key-value pairs that tag and categorize the 
       database user.

   * - ``ldapAuthType``
     - string
     - Method by which the specified ``username`` is authenticated. If
       no value is given, |service| uses the default value of ``NONE``.

       Accepted values include:

       .. list-table::
          :stub-columns: 1
          :widths: 20 80

          * - ``NONE``
            - |service| authenticates this user through
              :manual:`SCRAM-SHA </core/security-scram>`, not |ldap|.
          * - ``USER``
            - |ldap| server authenticates this user through the user's
              |ldap| user.
          * - ``GROUP``
            - |ldap| server authenticates this user using their
              |ldap| user and authorizes this user using their |ldap|
              group. To learn more about |ldap| security, see
              :doc:`/security-ldaps`.

   * - ``links``
     - document array
     - One or more :ref:`links <api-linking>` to sub-resources and/or
       related resources.

   * - ``roles``
     - string array
     - .. include:: /includes/fact-database-user-role.rst

   * - | ``roles``
       | ``.collectionName``
     - string
     - Collection on which the user has the specified role.

   * - | ``roles``
       | ``.databaseName``
     - string
     - Database on which the user has the specified role. A role on the
       ``admin`` database can include privileges that apply to the
       other databases.

   * - | ``roles``
       | ``.roleName``
     - string
     - Name of the role. The accepted values are:

       - :atlasrole:`atlasAdmin <Atlas admin>`
       - :authrole:`readWriteAnyDatabase`
       - :authrole:`readAnyDatabase`
       - :authrole:`backup`
       - :authrole:`clusterMonitor`
       - :authrole:`dbAdmin`
       - :authrole:`dbAdminAnyDatabase`

       - ``enableSharding``

         This role is specific to MongoDB databases managed by
         |service|. The role allows the user to enable sharding on a
         database and to shard a collection.

       - ``read``
       - ``readWrite``
       - A name of a :ref:`custom MongoDB role <mongodb-roles>`

   * - ``username``
     - string
     - Username for authenticating to MongoDB.
