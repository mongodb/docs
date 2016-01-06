.. list-table::
   :widths: 20 80

   * - :guilabel:`Auth Mechanism`

     - The :manual:`authentication mechanism </core/authentication>` the host uses. 
       
       The options are:

       - :doc:`Username/Password </tutorial/configure-backup-agent-for-cr>`
       - :doc:`Kerberos </tutorial/configure-backup-agent-for-kerberos>` (Enterprise Only)
       - :doc:`LDAP </tutorial/configure-backup-agent-for-ldap>` (Enterprise Only)
       - :doc:`X.509 Client Certificate <configure-backup-agent-for-x509>`

   * - :guilabel:`DB Username`

     - For ``Username/Password`` or ``LDAP`` authentication, the username
       used to authenticate the Backup Agent to the MongoDB deployment.
       
       See 
       :doc:`/tutorial/configure-backup-agent-for-cr` or
       :doc:`/tutorial/configure-backup-agent-for-ldap`.

   * - :guilabel:`DB Password`

     - For ``Username/Password`` or ``LDAP`` authentication, the password
       used to authenticate the Backup Agent to the MongoDB deployment.

   * - :guilabel:`Allows SSL for connections`

     - If checked, the Backup Agent uses SSL to connect to MongoDB. 

       See :doc:`/tutorial/configure-backup-agent-for-ssl`.
