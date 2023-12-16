.. list-table::
   :widths: 20 80

   * - :guilabel:`Auth Mechanism`

     - The :manual:`authentication mechanism </core/authentication>`
       that the MongoDB host uses.

       MongoDB Community options include:

       - :doc:`Username/Password </tutorial/configure-mongodb-agent-for-scram>`

       - X.509 Client Certificate

       MongoDB Enterprise options also include:

       - :doc:`Kerberos </tutorial/configure-mongodb-agent-for-kerberos>`
       - :doc:`LDAP </tutorial/configure-mongodb-agent-for-ldap>`

   * - :guilabel:`DB Username`

     - For ``Username/Password`` or ``LDAP`` authentication, the
       username used to authenticate the {+mdbagent+} with the MongoDB
       deployment.

       See
       :doc:`/tutorial/configure-mongodb-agent-for-scram` or
       :doc:`/tutorial/configure-mongodb-agent-for-ldap`.

   * - :guilabel:`DB Password`

     - For ``Username/Password`` or ``LDAP`` authentication, the
       password used to authenticate the {+mdbagent+} with the MongoDB
       deployment.

   * - :guilabel:`Allows TLS for connections`

     - If checked, Backup uses |tls| to connect to MongoDB.

       See :doc:`/tutorial/configure-mongodb-agent-for-tls`.
