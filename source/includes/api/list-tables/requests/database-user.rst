.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 11 55

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - databaseName
     - string
     - Required
     - :ref:`Database <authentication-database>` against which the
       database user authenticates. Database users must provide both a
       username and authentication database to log into MongoDB.

       You may set this parameter value as:

       .. include:: /includes/api/tabsets/db-name.rst

   * - deleteAfterDate
     - string
     - Optional
     - |iso8601-time| after which |service| deletes the database user.
       The specified date must be in the future and within one week of
       the time you make the |api| request.

       .. note::

          You may include an |iso8601| time zone designator to ensure
          that the expiration date occurs with respect to the local
          time in the specified time zone.

   * - labels
     - array
     - Optional
     - List that contains key-value pairs that tag and categorize the
       database user.

       Each key and value has a maximum length of 255 characters.

       .. literalinclude:: /includes/cluster-settings/example-labels.json

       .. note::

          The **labels** you define are not visible in the |service|
          console. They are returned in the response body when you use
          the {+atlas-admin-api+} to
          :doc:`get one </reference/api/database-users-get-single-user/>`,
          :doc:`get all </reference/api/database-users-get-all-users/>`, or
          :doc:`update </reference/api/database-users-update-a-user/>`
          one database user.

   * - groupId
     - string
     - Required
     - Unique 24-hexadecimal string that identifies the
       :ref:`project <group-id>` to which the database user belongs.

   * - roles
     - array
     - Required
     - .. include:: /includes/fact-database-user-role.rst

       .. include:: /includes/fact-subset-privilege-actions.rst

   * - roles.collectionName
     - string
     - Optional
     - Collection on which the database user has the specified role.

       You can specify a collection for the ``read`` and ``readWrite``
       roles. If you do not specify a collection for ``read`` and
       ``readWrite``, the role applies to all collections in the
       database (excluding some collections in the ``system.``
       database).

       .. note::

          .. include:: /includes/fact-read-read-write-actions.rst

   * - roles.databaseName
     - string
     - Optional
     - Database on which the database user has the specified role. A
       role on the ``admin`` database can include privileges that apply
       to the other databases.

   * - roles.roleName
     - string
     - Required
     - .. include:: /includes/api/facts/db-user-role-list.rst

   * - scopes
     - array
     - Optional
     - List of clusters and {+data-lake+}\s that this user can access.
       Returns an empty array if the database user has access to all
       the clusters and {+data-lake+}\s in the project. |service|
       grants database users access to all resources by default.

       .. include:: /includes/fact-dbuser-scopes-format.rst

   * - scopes.name
     - string
     - Required
     - Name of the cluster or {+data-lake+} that the database user can
       access.

   * - scopes.type
     - string
     - Required
     - Type of resource that the database user can access. This
       parameter returns one of the following values:

       - ``CLUSTER``
       - ``DATA_LAKE``

   * - username
     - string
     - Required
     - Username needed to authenticate to the MongoDB database or
       collection.

       .. include:: /includes/api/tabsets/db-username.rst

.. tabs::
   :hidden:

   .. tab:: SCRAM-SHA
      :tabid: scram

      .. list-table::
         :stub-columns: 1
         :widths: 20 14 11 55

         * - password
           - string
           - Conditional
           - Alphanumeric string that authenticates the database user
             against the database specified in **databaseName**.


   .. tab:: X.509
      :tabid: x509

      .. list-table::
         :stub-columns: 1
         :widths: 20 14 11 55

         * - x509Type
           - string
           - Optional
           - X.509 method by which the database authenticates the
             provided **username**. If no value is given, |service|
             uses the default value of ``NONE``.

             This parameter accepts:

             .. list-table::
                :stub-columns: 1
                :widths: 20 80

                * - NONE
                  - User doesn't use X.509 authentication.

                * - MANAGED
                  - User to be used with |service|-managed
                    X.509.

                    Externally authenticated users must be created on
                    the **$external** database.

                * - CUSTOMER
                  - User is being created for use with
                    :ref:`Self-Managed X.509 <self-managed-x509>`.
                    Users created with this **x509Type** require a
                    Common Name (CN) in the **username** field. To
                    learn more, see :rfc:`RFC 2253 <2253>`.

                    Externally authenticated users must be created on
                    the **$external** database.

   .. tab:: LDAP
      :tabid: ldap

      .. list-table::
         :stub-columns: 1
         :widths: 20 14 11 55

         * - ldapAuthType
           - string
           - Optional
           - |ldap| method by which the database authenticates the
             provided **username**. **username** must also be a fully
             qualified distinguished name, as defined in :rfc:`RFC 2253
             <2253>`. If no value is given, |service| uses the default
             value of ``NONE``.

             This parameter accepts:

             .. list-table::
                :stub-columns: 1
                :widths: 20 80

                * - NONE
                  - |service| authenticates this user through
                    :manual:`SCRAM-SHA </core/security-scram>`, not |ldap|.
                * - USER
                  - |ldap| server authenticates this user through the
                    database user's |ldap| user.

                * - GROUP
                  - |ldap| server authenticates this user using their
                    |ldap| user and authorizes this user using their
                    |ldap| group.

             To learn more about |ldap| security, see
             :doc:`/security-ldaps`.

   .. tab:: AWS IAM
      :tabid: aws-iam

      .. list-table::
         :stub-columns: 1
         :widths: 20 14 11 55

         * - awsIAMType
           - string
           - Optional
           - |aws| |iam| method by which the database applies |iam|
             credentials to
             :doc:`authenticates </security-add-mongodb-users>` the
             database user. |service| defaults to ``NONE``.

             This parameter accepts:

             .. list-table::
                :stub-columns: 1
                :widths: 20 80

                * - NONE
                  - The user does not use |aws| |iam| credentials.

                * - USER
                  - New database user has |aws| |iam| user credentials.

                * - ROLE
                  - New database user has credentials associated with
                    an |aws| |iam| role.
