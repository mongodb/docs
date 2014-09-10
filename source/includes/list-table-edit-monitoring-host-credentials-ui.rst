.. list-table::
   :widths: 35 65

   * - :guilabel:`Auth Mechanism`

     - The :manual:`authentication mechanism </core/authentication>` used
       by the host. Can specify :doc:`MONGODB-CR
       </tutorial/configure-monitoring-agent-for-cr>`, :doc:`LDAP (PLAIN)
       </tutorial/configure-monitoring-agent-for-ldap>`, or
       :doc:`Kerberos(GSSAPI)
       </tutorial/configure-monitoring-agent-for-kerberos>`.

   * - :guilabel:`Current DB Username`

     - If the authentication mechanism is MONGODB-CR or LDAP, the username
       used to authenticate the Monitoring Agent to the MongoDB
       deployment. See :doc:`/tutorial/configure-monitoring-agent-for-cr`,
       :doc:`/tutorial/configure-monitoring-agent-for-ldap`, or
       :doc:`/tutorial/configure-monitoring-agent-for-kerberos` for
       setting up user credentials.

   * - :guilabel:`Current DB Password`

     - If the authentication mechanism is MONGODB-CR or LDAP, the password
       used to authenticate the Monitoring Agent to the MongoDB
       deployment. See :doc:`/tutorial/configure-monitoring-agent-for-cr`,
       :doc:`/tutorial/configure-monitoring-agent-for-ldap`, or
       :doc:`/tutorial/configure-monitoring-agent-for-kerberos` for
       setting up user credentials.

   * - :guilabel:`Update other hosts in replica set/sharded cluster as well`

     - Only for cluster or replica set. If checked, apply the
       credentials to all other hosts in the cluster or replica set.
