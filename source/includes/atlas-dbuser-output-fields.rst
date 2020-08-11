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
   
   * - ``roles``
     - User's roles and the databases or collections on which the 
       roles apply.

   * - ``username``
     - Username for authentication.

   * - ``ldapAuthType``
     - Method by which the specified ``username`` is 
       authenticated. Valid values are:
       
       .. list-table::
          :stub-columns: 1
          :widths: 20 80

          * - ``NONE``
            - This user does not use |ldap| authentication.
          * - ``USER``
            - |ldap| server authenticates this user through the user's
              |ldap| user.
          * - ``GROUP``
            - |ldap| server authenticates this user using their
              |ldap| user and authorizes this user using their |ldap|
              group. To learn more about |ldap| security, see
              :atlas:`Set up User Authentication and Authorization with 
              LDAP </security-ldaps>`.

   * - ``x509Type``
     - Method by which the specified ``username`` is 
       authenticated. Valid values are:
       
       .. list-table::
          :stub-columns: 1
          :widths: 20 80

          * - ``NONE``
            - This user does not use X.509 authentication.
          * - ``MANAGED``
            - This user authenticates with :atlas:`Atlas-managed X.509 certificates
              </security-add-mongodb-users/#database-user-authentication>`.
          * - ``CUSTOMER``
            - This user authenticates with :atlas:`Self-managed X.509 certificates
              </security-self-managed-x509/#self-managed-x509>`.

   * - ``awsIAMType``
     - Method by which the specified ``username`` is 
       authenticated. Valid values are:
       
       .. list-table::
          :stub-columns: 1
          :widths: 20 80

          * - ``NONE``
            - This user does not use AWS IAM authentication.
          * - ``USER``
            - This user authenticates with :atlas:`AWS IAM user credentials
              </security-add-mongodb-users/#database-user-authentication>`.
          * - ``ROLE``
            - This user authenticates with :atlas:`AWS IAM role credentials
              </security-add-mongodb-users/#database-user-authentication>`.
     
   * - ``deleteAfterDate``
     - |iso8601-time| after which |service| deletes the user. This 
       field is only present if an expiration date was specified when 
       creating the entry.
