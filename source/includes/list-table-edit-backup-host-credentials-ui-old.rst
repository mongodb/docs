.. list-table::
   :widths: 35 65

   * - :guilabel:`Auth Mechanism`

     - The :manual:`authentication mechanism </core/authentication>` used
       by the host. The available options are:

       - :doc:`MONGODB-CR </tutorial/configure-backup-agent-for-cr>`
       - :doc:`LDAP </tutorial/configure-backup-agent-for-ldap>`
       - :doc:`Kerberos </tutorial/configure-backup-agent-for-kerberos>`.

   * - :guilabel:`Current DB Username`

     - If the authentication mechanism is MONGODB-CR or LDAP, the username
       used to authenticate the agent to the MongoDB deployment. To set up
       user credentials, see
       :doc:`/tutorial/configure-backup-agent-for-cr` or
       :doc:`/tutorial/configure-backup-agent-for-ldap`.

   * - :guilabel:`Current DB Password`

     - If the authentication mechanism is MONGODB-CR or LDAP, the password
       used to authenticate the agent to the MongoDB deployment.

   * - :guilabel:`My deployment supports SSL for MongoDB connections`

     - If checked, the agent must have a trusted CA
       certificate in order to connect to the MongoDB instances. See
       :doc:`/tutorial/configure-backup-agent-for-ssl`.
