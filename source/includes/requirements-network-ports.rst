Accessible Ports
~~~~~~~~~~~~~~~~

The |mms| application must be able to connect to users and |mms| agents
over HTTP(S). |mms| agents must be able to connect to MongoDB client
databases.

Though |mms| only requires HTTP(S) and MongoDB network ports for these
two services, what ports are opened on a firewall depend upon what
capabilities are enabled: encryption, authentication and monitoring.

This page defines which system need to connect to which ports on other
systems.

.. important:: 
   To run |mms| without an Internet connection, see
   :doc:`/tutorial/configure-local-mode` to ensure you have all of the
   necessary binaries to run |mms| without an Internet connection.

Ports Required to Use |mms|
  * Both the |mms| application users and |mms| agents must be able to
    connect to |mms| over HTTP or Secure HTTP. 
    See :doc:`/tutorial/manage-ports` to set a non-default port for 
    |mms|.
  * For each |mms| group, |mms| and the |mms| agents must be able to
    connect to all MongoDB processes (``mongod`` or ``mongos``).
  * The |mms| application must also be able to send email to |mms|
    users.

  To use |mms|, open the following ports to the specified servers. 

  .. list-table::
     :header-rows: 1
     :widths: 15,10,10,15,35,15

     * - Service
       - Default Port
       - Transport
       - Direction
       - Purpose
       - Uses SSL?
       
     * - HTTP
       - 8080
       - TCP
       - Inbound
       - Web connection to |mms| from users and |mms| agents.
       - No

     * - HTTPS
       - 8443
       - TCP
       - Inbound
       - Web connection to |mms| from users and |mms| agents.
       - Yes

     * - HTTP(S)
       - 8090
       - TCP
       - Inbound
       - Web connection to |mms| for monitoring services.
       - Optional

     * - MongoDB
       - 27000 - 28000
       - TCP
       - Both
       - Connect to MongoDB backing, backup and client databases.
       - Optional

     * - SMTP
       - 25
       - TCP
       - Outbound
       - Send emails from |mms|.
       - No

     * - SMTPS
       - 465
       - TCP
       - Outbound
       - Send emails from |mms|.
       - Yes

Ports Needed to Administer |mms|
  Most |mms| administration can be performed through the user
  interface. Some procedures require access to the operating system. To
  permit your administrators to access your |mms| and MongoDB servers,
  open the following ports to those servers.

  .. list-table::
     :header-rows: 1
     :widths: 15,10,10,15,35,15

     * - Service
       - Default Port
       - Transport
       - Direction
       - Purpose
       - Uses SSL?
       
     * - Secure Shell (``ssh``)
       - 22
       - TCP
       - Inbound
       - Linux System administration.
       - Yes
       
     * - Remote Desktop Connection (RDP)
       - 3389
       - TCP
       - Inbound
       - Windows System administration.
       - No

Ports Needed to Integrate |mms| with SNMP
  To send and receive SNMP messages to and from your MongoDB
  deployments must open the following ports between |mms| and your SNMP
  Manager.

  .. list-table::
     :header-rows: 1
     :widths: 15,10,10,15,35,15

     * - Service
       - Default Port
       - Transport
       - Direction
       - Purpose
       - Uses SSL?
       
     * - SNMP
       - 162
       - UDP
       - Outbound
       - Send Traps to SNMP Manager.
       - No

     * - SNMP
       - 11611
       - UDP
       - Inbound
       - Receive requests from SNMP Manager.
       - No

  See :ref:`snmp-heartbeat-configure` to set SNMP to use non-standard
  ports.

Ports Needed to Authenticate with |mms|
  MongoDB Enterprise users 
  :doc:`can use LDAP </tutorial/configure-for-ldap-authentication>` 
  to authenticate |mms| users. To authenticate using LDAP, open the
  following ports on |mms| and your LDAP server.

  .. list-table::
     :header-rows: 1
     :widths: 15,10,10,15,35,15

     * - Service
       - Default Port
       - Transport
       - Direction
       - Purpose
       - Uses SSL?
       
     * - LDAP
       - 389
       - UDP
       - Both
       - Authenticate and/or authorize |mms| users against LDAP server.
       - No

     * - LDAPS
       - 636
       - UDP
       - Both
       - Authenticate and/or authorize |mms| users against LDAP server.
       - Yes

  See :ref:`ldap-settings` to configure LDAP URI strings including
  ports.

Ports Needed to Authenticate with MongoDB
  MongoDB Enterprise users can use Kerberos or LDAP to authenticate
  MongoDB users. To authenticate using LDAP or Kerberos, open the
  following ports between the MongoDB client databases, |mms| and the
  Kerberos or LDAP server(s).

  .. list-table::
     :header-rows: 1
     :widths: 15,10,10,15,35,15

     * - Service
       - Default Port
       - Transport
       - Direction
       - Purpose
       - Uses SSL?
       
     * - Kerberos
       - 88
       - TCP / UDP
       - Outbound
       - Request authentication for MongoDB users against Kerberos
         server.
       - No

     * - Kerberos
       - 88
       - UDP
       - Inbound
       - Receive authentication for MongoDB users against Kerberos
         server.
       - No

     * - LDAP
       - 389
       - UDP
       - Both
       - Authenticate and/or authorize MongoDB users against LDAP
         server.
       - No

     * - LDAPS
       - 636
       - UDP
       - Both
       - Authenticate and/or authorize MongoDB users against LDAP
         server.
       - Yes

  See :ref:`configuration-kerberos-settings` to configure Kerberos for
  authentication to the |mms| application database.
