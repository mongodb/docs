The ``auth`` object is optional and defines :manual:`authentication-related
</core/authentication>` settings.

.. code-block:: cfg

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
           }
       ]
   }

.. list-table::
   :widths: 30 10 80
   :header-rows: 1

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
     - Boolean
     - Specifies whether authentication is enabled or disabled. Set to
       ``true`` to disable authentication, or ``false`` to enable
       authentication.

   * - ``auth.deploymentAuthMechanisms``
     - array
     - Lists the supported authentication mechanisms for the processes
       in the deployment. Specify ``MONGODB-CR`` for ``MONGODB-CR`` /
       ``SCRAM-SHA-1`` authentication, ``MONGODB-X509`` for x.509 Client
       Certificate authentication, ``PLAIN`` for LDAP authentication,
       and ``GSSAPI`` for authenticating with Kerberos.       

   * - ``auth.disabled``
     - boolean
     - *Optional*. Indicates if auth is disabled. If not specified,
       ``disabled`` defaults to ``false``.

   * - ``auth.key``
     - string
     - The contents of the key file that |mms| uses to authenticate to the
       MongoDB processes. The ``key`` is not required if ``disabled`` is ``true``.

   * - ``auth.keyfile``
     - string
     - The path and name of the key file that |mms| uses to authenticate
       to the MongoDB processes. The ``keyfile`` is not required if ``disabled`` is ``true``.

   * - ``auth.usersDeleted``
     - array of objects
     - *Optional*. Objects that define the authenticated users to be
       deleted from specified databases or from all databases. This array
       must contain two fields: the ``auth.usersDeleted.user`` field
       and the ``auth.usersDeleted.dbs`` field.

   * - ``auth.usersDeleted.user``
     - string
     - The user's name.

   * - ``auth.usersDeleted.dbs``
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

   * - ``auth.usersWanted.db``
     - string
     - The database to which to add the user.

   * - ``auth.usersWanted.user``
     - string
     - The name of the user.

   * - ``auth.usersWanted.roles``
     - array
     - String values that list the :term:`roles <role>` to be assigned the
       user from the user's database, which is specified in ``auth.usersWanted.db``.

   * - ``auth.usersWanted.pwd``
     - 32-character hex string
     - The :ref:`MONGODB-CR <mongodb-cr>` hash of the password
       assigned to the user. If you set this field, **do not** set the
       ``auth.usersWanted.initPwd`` or
       ``auth.usersWanted.userSource`` fields.

   * - ``auth.usersWanted.initPwd``
     - string
     - An initial cleartext password assigned to the user. If you set this
       field, **do not** set the ``auth.usersWanted.pwd`` or
       ``auth.usersWanted.userSource`` fields.

   * - ``auth.usersWanted.userSource``
     - string
     - No longer supported.

   * - ``auth.usersWanted.otherDBRoles``
     - object
     - *Optional*. If the ``auth.usersWanted.db`` field specifies
       ``admin`` as the user's database, then this object can assign to
       the user roles from other databases as well. The object contains
       key-value pairs where the key is the name of the database and the
       value is an array of string values that list the roles be assigned
       from that database.
