.. list-table::
   :widths: 35 65

   * - :guilabel:`Auth Mechanism`

     - The :manual:`authentication mechanism </core/authentication>` used
       by the host. Can specify :doc:`MONGODB-CR
       </tutorial/configure-backup-agent-for-cr>`, :doc:`LDAP (PLAIN)
       </tutorial/configure-backup-agent-for-ldap>`, or
       :doc:`Kerberos(GSSAPI)
       </tutorial/configure-backup-agent-for-kerberos>`.

   * - :guilabel:`Current DB Username`

     - If the authentication mechanism is MONGODB-CR or LDAP, the username
       used to authenticate the Monitoring Agent to the MongoDB
       deployment. See :doc:`/tutorial/configure-backup-agent-for-cr`,
       :doc:`/tutorial/configure-backup-agent-for-ldap`, or
       :doc:`/tutorial/configure-backup-agent-for-kerberos` for
       setting up user credentials.

   * - :guilabel:`Current DB Password`

     - If the authentication mechanism is MONGODB-CR or LDAP, the password
       used to authenticate the Monitoring Agent to the MongoDB
       deployment. See :doc:`/tutorial/configure-backup-agent-for-cr`,
       :doc:`/tutorial/configure-backup-agent-for-ldap`, or
       :doc:`/tutorial/configure-backup-agent-for-kerberos` for
       setting up user credentials.

   * - :guilabel:`My deployment supports SSL for MongoDB connections`

     - If checked, the Monitoring Agent must have a trusted CA
       certificate in order to connect to the MongoDB instances. See
       :doc:`/tutorial/configure-monitoring-agent-for-ssl`.
