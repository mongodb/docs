.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field
     - Description

   * - ``user``
     - Username of the MongoDB user.

   * - ``db``
     - User's :manual:`authentication database 
       </core/security-users/#authentication-database>`.

   * - ``roles``
     - User's roles and the databases or collections on which the 
       roles apply.

   * - ``mechanisms``
     - The :cloudmgr:`authentication mechanisms </tutorial/nav/security-enable-authentication/>`
       in use by the specified cluster.

   * - ``scramSha256Creds``
     - The user's SCRAM-SHA-256 credentials. Only appears if the SCRAM-SHA-256
       authentication mechanism is in use. 

   * - ``scramSha1Creds``
     - The user's SCRAM-SHA-1 credentials. Only appears if the SCRAM-SHA-251
       authentication mechanism is in use. 

     