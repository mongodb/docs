.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field
     - Description

   * - ``databaseName``
     - User's :manual:`authentication database 
       </core/security-users/#authentication-database>`. For MongoDB 
       deployment in |service|, the :manual:`authentication database 
       </core/security-users/#authentication-database>` is always the 
       ``admin`` database.

   * - ``groupId``
     - Unique identifier of the |service| project to which the user 
       belongs. 

       .. note::

          Groups and projects are synonymous terms. Your {GROUP-ID} 
          is the same as your project ID.

   * - ``ldapAuthType``
     - Method by which the specified ``username`` is 
       authenticated. Valid values are:
       
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
              :atlas:`Set up User Authentication and Authorization with 
              LDAP </security-ldaps>`.
       
       The default value is ``NONE``.

   * - ``roles``
     - User's roles and the databases or collections on which the 
       roles apply.

   * - ``username``
     - Username for authentication.
     