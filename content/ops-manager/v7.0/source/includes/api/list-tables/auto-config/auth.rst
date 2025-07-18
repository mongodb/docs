.. list-table::
   :widths: 20 14 12 54
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - auth
     - object
     - Optional
     - Defines :manual:`authentication-related </core/authentication>`
       settings.

       If you omit this parameter, skip the rest of this section.

   * - auth.authoritativeSet
     - boolean
     - Conditional
     - Sets whether or not |mms| enforces a consistent set of managed
       MongoDB users and roles in all managed deployments in the
       project.

       - If **"auth.authoritativeSet" : true**, then |mms|
         :ref:`enforces consistent users and roles <enforce-consistent-set-users-yes>`.

       - If **"auth.authoritativeSet" : false**, then |mms|
         :ref:`doesn't enforce consistent users and roles <enforce-consistent-set-users-no>`.

       **auth.authoritativeSet** defaults to **false**.

       **Required if you enable authentication.**

   * - auth.autoUser
     - string
     - Conditional
     - Username that the {+aagent+} uses when connecting to an
       instance.

       **Required if you enable authentication.**

   * - auth.autoPwd
     - string
     - Conditional
     - Password that the {+aagent+} uses when connecting to an
       instance.

       **Required if you enable authentication.**

   * - auth.disabled
     - boolean
     - Optional
     - Flag indicating if auth is disabled. If not specified,
       **disabled** defaults to **false**.

   * - auth.deploymentAuthMechanisms
     - array of strings
     - Conditional
     - Lists the supported authentication mechanisms for the processes
       in the deployment.

       **Required if you enable authentication.**

       Specify:

       .. list-table::
          :widths: 30 70
          :header-rows: 1

          * - Value
            - Authentication Mechanism

          * - MONGODB-CR
            - :manual:`SCRAM-SHA-1 </core/security-scram-sha-1>`

          * - SCRAM-SHA-256
            - :manual:`SCRAM-SHA-256 </core/security-scram>`

          * - MONGODB-X509
            - :manual:`x.509 Client Certificate </core/security-x.509>`

          * - PLAIN
            - :ref:`LDAP <security-auth-ldap>`

          * - GSSAPI
            - :ref:`Kerberos <security-auth-kerberos>`

   * - auth.autoAuthMechanisms
     - array of strings
     - Conditional
     - Sets the authentication mechanism used by the {+aagent+}. 
       If not specified, **disabled** defaults to **false**.

       **Required if you enable authentication.**

       This parameter contains more than one element only when 
       it's configured for both SCRAM-SHA-1 and SCRAM-SHA-256.

       Specify:

       .. list-table::
          :widths: 30 70
          :header-rows: 1

          * - Value
            - Authentication Mechanism

          * - MONGODB-CR
            - :manual:`SCRAM-SHA-1 </core/security-scram-sha-1>`

          * - SCRAM-SHA-256
            - :manual:`SCRAM-SHA-256 </core/security-scram>`

          * - MONGODB-X509
            - :manual:`x.509 Client Certificate </core/security-x.509>`

          * - PLAIN
            - :ref:`LDAP <security-auth-ldap>`

          * - GSSAPI
            - :ref:`Kerberos <security-auth-kerberos>`

   * - auth.key
     - string
     - Conditional
     - Contents of the key file that |mms| uses to authenticate to the
       MongoDB processes.

       Required if **you enable authentication** and **"auth.disabled" : false**.

       If you change the **auth.key** value, you must change the
       **auth.keyfile** value.

   * - auth.keyfile
     - string
     - Conditional
     - Path and name of the key file that |mms| uses to authenticate to
       the MongoDB processes.

       Required if **you enable authentication** and **"auth.disabled" : false**.

       If you change the **auth.keyfile** value, you must change the
       **auth.key** value.
  
   * - | auth
       | .newAutoPwd
     - string
     - Optional
     - New password that the {+aagent+} uses when connecting to an
       instance. To rotate passwords without losing the connection:

       .. include:: /includes/extract-new-auto-pwd.rst

   * - auth.newKey
     - string
     - Optional
     - Contents of a new key file that you want |mms| to use to 
       authenticate to the MongoDB processes. 

       When you set this option, |mms| rotates the key that the
       application uses to authenticate to the MongoDB processes in 
       your deployment. When all {+mdbagent+}s use the new key, |mms| 
       replaces the value of **auth.key** with the new key that you 
       provided in **auth.newKey** and removes **auth.newKey** from the
       automation configuration.

   * - auth.usersDeleted
     - array of objects
     - Optional
     - Objects that define the authenticated users to be deleted from
       specified databases or from all databases. This array must
       contain **auth.usersDeleted.user** and
       **auth.usersDeleted.dbs**.

   * - auth.usersDeleted[n].user
     - string
     - Optional
     - Username of user that |mms| should delete.

   * - auth.usersDeleted[n].dbs
     - array of strings
     - Optional
     - List the names of the databases from which |mms| should delete
       the authenticated user.

   * - auth.usersWanted
     - array of objects
     - Optional
     - Contains objects that define authenticated users to
       add to specified databases. Each object must have the
       **auth.usersWanted[n].db**, **auth.usersWanted[n].user**, and
       **auth.usersWanted[n].roles** parameters, and then have exactly one
       of the following parameters: **auth.usersWanted[n].pwd**,
       **auth.usersWanted[n].initPwd**, or
       **auth.usersWanted[n].userSource**.

   * - auth.usersWanted[n].db
     - string
     - Conditional
     - Database to which to add the user.

   * - auth.usersWanted[n].user
     - string
     - Conditional
     - Name of the user that |mms| should add.

   * - auth.usersWanted[n].roles
     - array
     - Conditional
     - List of the :manual:`roles </reference/glossary/#std-term-role>` to be assigned to the user
       from the user's database, which is specified in
       **auth.usersWanted[n].db**.

   * - auth.usersWanted[n].pwd
     - string
     - Conditional
     - 32-character hex **SCRAM-SHA-1** hash of the password
       currently assigned to the user.

       |mms| doesn't use this parameter to set or change a password.

       Required if:

       - You enable authentication
       - **"auth.deploymentAuthMechanisms" : "MONGODB-CR"**
       - **"auth.usersWanted[n].initPwd"** is unset

   * - auth.usersWanted[n].initPwd
     - string
     - Conditional
     - Cleartext password that you want to assign to the user.

       Required if:

       - You enable authentication
       - **"auth.deploymentAuthMechanisms" : "MONGODB-CR"**
       - **"auth.usersWanted[n].initPwd"** is unset

   * - auth.usersWanted[n].userSource
     - string
     - Deprecated
     - No longer supported.

   * - auth.usersWanted[n].otherDBRoles
     - object
     - Optional
     - If you assign the user's database **"auth.usersWanted[n].db" :
       "admin"**, then you can use this object to assign the user roles
       from other databases as well. The object contains key-value
       pairs where the key is the name of the database and the value is
       an array of string values that list the roles be assigned from
       that database.

   * - auth.usersWanted[n].authenticationRestrictions
     - array of documents
     - Optional
     - Authentication restrictions that the host enforces on the
       user.

       .. include:: /includes/warning-inheriting-incompatible-auths.rst

   * - auth.usersWanted[n].authenticationRestrictions[k].clientSource
     - array of strings
     - Conditional
     - If present when authenticating a user, the host verifies that
       the given list contains the client's IP address |cidr| range. If
       the client's IP address is not present, the host does not
       authenticate the user.

   * - auth.usersWanted[n].authenticationRestrictions[k].serverAddress
     - array of strings
     - Conditional
     - Comma-separated array of IP addresses to which the client can
       connect. If present, the host verifies that |mms| accepted the
       client's connection from an IP address in the given array. If
       the connection was accepted from an unrecognized IP address, the
       host doesn't authenticate the user.
