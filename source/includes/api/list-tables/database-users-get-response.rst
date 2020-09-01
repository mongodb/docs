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
       and authentication database to log into MongoDB. 

       Returned values include:

       - ``$external`` if the user is authenticated using X.509 
         certificates, |ldap|, or AWS IAM.
       - ``admin`` users authenticated using
         :manual:`SCRAM-SHA </core/security-scram>`.

         This is the default authentication scheme in |service|. 

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

       Returned values include:

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

   * - ``x509Type``
     - string
     - X.509 method by which the provided ``username`` is
       authenticated. If no value is given, |service| uses the default 
       value of ``NONE``.
       
       The possible types are:
       
       .. list-table::
          :stub-columns: 1
          :widths: 20 80

          * - ``NONE``
            - The user does not use X.509 authentication.

          * - ``MANAGED``
            - The user is being created for use with |service|-managed 
              X.509. 
              
              Externally authenticated users can only be created on the 
              ``$external`` database.

          * - ``CUSTOMER``
            - The user is being created for use with 
              :ref:`Self-Managed X.509 <self-managed-x509>`. Users 
              created with this ``x509Type`` require a 
              Common Name (CN) in the ``username`` field. To learn more,
              see `RFC 2253 <https://tools.ietf.org/html/rfc2253>`_.
              
              Externally authenticated users can only be created on the 
              ``$external`` database.

   * - ``awsIAMType``
     - string
     - If this value is set, the new database user :doc:`authenticates
       </security-add-mongodb-users>` with
       |aws| IAM credentials.

       Possible response values are:

       .. list-table::
          :stub-columns: 1
          :widths: 20 80
          
          * - ``NONE``
            - The user does not use AWS IAM credentials.

          * - ``USER``
            - New database user has AWS IAM user credentials.
          
          * - ``ROLE``
            - New database user has credentials associated with an AWS
              IAM role.

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
       - A name of a :ref:`custom role <mongodb-roles>`

   * - ``scopes``
     - array of documents
     - Array of clusters and {+data-lake+}\s that this user has 
       access to. Returns an empty array if the user has access to all 
       the clusters and {+data-lake+}\s in the project. Database users 
       are granted access to all resources by default.

   * - ``scopes.name``
     - string
     - Name of the cluster or {+data-lake+} that this user has 
       access to.

   * - ``scopes.type``
     - string
     - Type of resource that this user has access to. Valid values 
       are: 

       - ``CLUSTER``
       - ``DATA_LAKE``

   * - ``username``
     - string
     - Username for authenticating to MongoDB.

       A fully qualified distinguished name, as defined in 
       :rfc:`2253`, is returned if:

       - ``ldapAuthType`` is ``USER`` or ``GROUP``, or
       - ``x509Type`` is ``CUSTOMER``.

       An :abbr:`ARN (Amazon Resource Name)` is returned if:

       - ``awsIAMType`` is ``USER`` or ``ROLE``.
