The ``auth`` object is optional and defines :manual:`authentication-related 
</core/authentication>` settings.

.. code-block:: json

   "auth" : {
       "autoUser": <string>,
       "autoPwd": <string>,
       "disabled": <Boolean>,
       "deploymentAuthMechanisms": [ <string>, <string>, ... ],
       "key" : <string>,
       "keyfile" : <string>,
       "usersDeleted" : [
           {
               "user" : <string>,
               "dbs" : [ <string>, ... ]
           }
       ],
       "usersWanted" : [
           {
               "db" : <string>,
               "user" : <string>,
               "roles" : [ <string>, ... ],
               "pwd" : <32-character hex string>,
               "initPwd" : <string>,
               "userSource" : <string>,
               "otherDBRoles" : {
                   <string> : [ <string>, ... ]
               }
               "authenticationRestrictions" : [
                  {
                     "clientSource": ["<IP>" | "<CIDR range>", ...],
                     "serverAddress": ["<IP>" | "<CIDR range>", ...]
                  }, ...
               ]    
           }
       ]
   }

.. list-table::
   :widths: 30 10 80
   :header-rows: 1
   :class: table-large

   * - Name
     - Type
     - Description

   * - ``auth``
     - object
     - *Optional*. Defines :manual:`authentication-related </core/authentication>` settings.

   * - ``auth.autoUser``
     - string
     - The username that the Automation agent uses when connecting to
       an instance.

   * - ``auth.autoPwd``
     - string
     - The password that the Automation agent uses when connecting to
       an instance.

   * - ``auth.disabled``
     - boolean
     - *Optional*. Indicates if auth is disabled. If not specified,
       ``disabled`` defaults to ``false``.

   * - ``auth.deploymentAuthMechanisms``
     - array
     - Lists the supported authentication mechanisms for the processes in the
       deployment. Specify:

       .. list-table::
          :widths: 30 70
          :header-rows: 1
      
          * - Value
            - Authentication Mechanism
          
          * - ``MONGODB-CR``
            - :manual:`MONGODB-CR </core/security-mongodb-cr>` / 
              :manual:`SCRAM-SHA-1 </core/security-scram-sha-1>`
          
          * - ``MONGODB-X509``
            - :manual:`x.509 Client Certificate </core/security-x.509>`
          
          * - ``PLAIN``
            - :ref:`LDAP <security-auth-ldap>`
          
          * - ``GSSAPI``
            - :ref:`Kerberos <security-auth-kerberos>`

   * - ``auth.key``
     - string
     - The contents of the key file that |mms| uses to authenticate to the
       MongoDB processes. The ``key`` is not required if ``auth.disabled`` is
       ``true``.

       .. note:: 
          If you change the ``auth.key`` value, you must change the
          ``auth.keyfile`` value.

   * - ``auth.keyfile``
     - string
     - The path and name of the key file that |mms| uses to authenticate to
       the MongoDB processes. The ``keyfile`` is not required if ``auth.disabled``
       is ``true``.

       .. note:: 
          If you change the ``auth.keyfile`` value, you must change the
          ``auth.key`` value.

   * - ``auth.usersDeleted``
     - array of objects
     - *Optional*. Objects that define the authenticated users to be
       deleted from specified databases or from all databases. This array
       must contain two fields: the ``auth.usersDeleted.user`` field
       and the ``auth.usersDeleted.dbs`` field.

   * - ``auth.usersDeleted[n].user``
     - string
     - The user's name.

   * - ``auth.usersDeleted[n].dbs``
     - array
     - String values that list the names of the databases from which the
       authenticated user is to be deleted.

   * - ``auth.usersWanted``
     - array of objects
     - *Optional*. Contains objects that define authenticated users to
       add to specified databases. Each object must have the
       ``auth.usersWanted.db``, ``auth.usersWanted.user``, and
       ``auth.usersWanted.roles`` fields, and then have exactly one
       of the following fields: ``auth.usersWanted.pwd``,
       ``auth.usersWanted.initPwd``, or
       ``auth.usersWanted.userSource``.

   * - ``auth.usersWanted[n].db``
     - string
     - The database to which to add the user.

   * - ``auth.usersWanted[n].user``
     - string
     - The name of the user.

   * - ``auth.usersWanted[n].roles``
     - array
     - String values that list the :term:`roles <role>` to be assigned the
       user from the user's database, which is specified in ``auth.usersWanted.db``.

   * - ``auth.usersWanted[n].pwd``
     - 32-character hex string
     - The :ref:`MONGODB-CR <mongodb-cr>` hash of the password
       assigned to the user. If you set this field, **do not** set the
       ``auth.usersWanted.initPwd`` or
       ``auth.usersWanted.userSource`` fields.

   * - ``auth.usersWanted[n].initPwd``
     - string
     - An initial cleartext password assigned to the user. If you set this
       field, **do not** set the ``auth.usersWanted.pwd`` or
       ``auth.usersWanted.userSource`` fields.

   * - ``auth.usersWanted[n].userSource``
     - string
     - No longer supported.

   * - ``auth.usersWanted[n].otherDBRoles``
     - object
     - *Optional*. If the ``auth.usersWanted.db`` field specifies
       ``admin`` as the user's database, then this object can assign to
       the user roles from other databases as well. The object contains
       key-value pairs where the key is the name of the database and the
       value is an array of string values that list the roles be assigned
       from that database.

   * - ``auth.usersWanted[n].authenticationRestrictions``
     - array of documents
     - *Optional*. The authentication restrictions that the server enforces
       on the user.

       .. only:: onprem

           *New in version 3.6.1.*

       .. include:: /includes/warning-inheriting-incompatible-auths.rst

   * - ``auth.usersWanted[n].
       authenticationRestrictions[k].clientSource``
     - array of IP addresses and/or CIDR ranges
     - If present, when authenticating a user, the server verifies that
       client's IP address is either in the given list or belongs to a 
       :abbr:`CIDR (Classless Inter-Domain Routing)` range in the list. 
       If the client's IP address is not present, the server does not
       authenticate the user.

   * - ``auth.usersWanted[n].
       authenticationRestrictions[k].serverAddress``
     - array of IP addresses and/or CIDR ranges
     - A comma-separated array of IP addresses to which the client can connect. If present,
       the server will verify that the client's connection was accepted
       from an IP address in the given array. If the connection was accepted
       from an unrecognized IP address, the server does not authenticate
       the user.
       
       
       
       
        
