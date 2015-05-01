.. list-table::
   :widths: 35 65

   * - :guilabel:`Auth Mechanism`

     - The :manual:`authentication mechanism </core/authentication>` used
       by the host. The available options are:

       - :doc:`Username/Password </tutorial/configure-backup-agent-for-cr>`
       - :doc:`Kerberos </tutorial/configure-backup-agent-for-kerberos>`
       - :doc:`LDAP </tutorial/configure-backup-agent-for-ldap>`
       - X.509 Client Certificate

   * - :guilabel:`DB Username`

     - For ``Username/Password`` or ``LDAP`` authentication, the username
       used to authenticate the Backup Agent to the MongoDB deployment.
       For information on setting up credentials, see:
       :doc:`/tutorial/configure-backup-agent-for-cr` or
       :doc:`/tutorial/configure-backup-agent-for-ldap`.

   * - :guilabel:`DB Password`

     - For ``Username/Password`` or ``LDAP`` authentication, the password
       used to authenticate the Backup Agent to the MongoDB deployment.

   * - :guilabel:`Replica set allows SSL for connections`, or
       :guilabel:`Cluster allows SSL for connections`

     - If checked, the Backup Agent uses SSL to connect to MongoDB. The
       agent must have a trusted CA certificate to connect. See
       :doc:`/tutorial/configure-backup-agent-for-ssl`.
