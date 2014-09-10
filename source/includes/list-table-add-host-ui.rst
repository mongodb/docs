.. list-table::
   :widths: 35 65

   * - :guilabel:`Host Type`

     - The type of MongoDB deployment.

   * - :guilabel:`Internal Hostname`

     - The hostname of the MongoDB instance as seen from the Monitoring
       Agent.

   * - :guilabel:`Port`

     - The port on which the MongoDB instance runs.

   * - :guilabel:`Auth Mechanism`

     - The :manual:`authentication mechanism </core/authentication>` used
       by the host. Can specify:
       
       - :doc:`MONGODB-CR
         </tutorial/configure-monitoring-agent-for-cr>`,
       
       - :doc:`LDAP (PLAIN)
         </tutorial/configure-monitoring-agent-for-ldap>`, or
         
       - :doc:`Kerberos(GSSAPI)
         </tutorial/configure-monitoring-agent-for-kerberos>`.

       See :doc:`/tutorial/configure-monitoring-agent-for-cr`,
       :doc:`/tutorial/configure-monitoring-agent-for-ldap`, or
       :doc:`/tutorial/configure-monitoring-agent-for-kerberos` for
       setting up user credentials.

   * - :guilabel:`DB Username`

     - If the authentication mechanism is MONGODB-CR or LDAP, the username
       used to authenticate the Monitoring Agent to the MongoDB
       deployment. 

   * - :guilabel:`DB Password`

     - If the authentication mechanism is MONGODB-CR or LDAP, the password
       used to authenticate the Monitoring Agent to the MongoDB
       deployment.

   * - :guilabel:`My deployment supports SSL for MongoDB connections`

     - If checked, the Monitoring Agent must have a trusted CA
       certificate in order to connect to the MongoDB instances. See
       :doc:`/tutorial/configure-monitoring-agent-for-ssl`.
