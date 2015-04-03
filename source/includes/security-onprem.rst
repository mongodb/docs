Overview
--------

|onprem| provides security options to ensure the security of your |onprem|
agents, |onprem| servers, and MongoDB deployments. |onprem| supports the
options described in the tables on this page.

Security Options
----------------

.. list-table::
   :header-rows: 1

   * - 
     - Connections with |onprem|
     - Connections with |onprem| :doc:`Backing Instances
       </tutorial/prepare-backing-mongodb-instances>`
     - Connections with MongoDB Deployments
   * - Ops Manager
     - *not applicable*
     - - :doc:`SSL </tutorial/configure-ssl-connection-to-backing-mongodb>`
       - :ref:`MONGODB-CR <mongodb-cr>`
       - :doc:`LDAP </tutorial/configure-for-ldap-authentication>`
       - :ref:`Kerberos <configuration-kerberos-settings>`
     - |onprem| connects to MongoDB through the Monitoring, Backup, and
       Automation agents.
   * - Monitoring Agent
     - - :doc:`SSL </tutorial/configure-ssl-connection-to-web-interface>`
     - *not applicable*
     - - :doc:`SSL </tutorial/configure-monitoring-agent-for-ssl>`
       - :doc:`MONGODB-CR </tutorial/configure-monitoring-agent-for-cr>`
       - :doc:`LDAP </tutorial/configure-monitoring-agent-for-ldap>`
       - :doc:`Kerberos </tutorial/configure-monitoring-agent-for-kerberos>`
   * - Backup Agent
     - - :doc:`SSL </tutorial/configure-ssl-connection-to-web-interface>`
     - *not applicable*
     - - :doc:`SSL </tutorial/configure-backup-agent-for-ssl>`
       - :doc:`MONGODB-CR </tutorial/configure-backup-agent-for-cr>`
       - :doc:`LDAP </tutorial/configure-backup-agent-for-ldap>`
       - :doc:`Kerberos </tutorial/configure-backup-agent-for-kerberos>`
   * - Automation Agent
     - - :doc:`SSL </tutorial/configure-ssl-connection-to-web-interface>`
     - *not applicable*
     - - :ref:`MONGODB-CR <mongodb-cr>`
   * - Ops Manager user
     - - :doc:`SSL </tutorial/configure-ssl-connection-to-web-interface>`
       - :doc:`Ops Manager access control </tutorial/manage-users>`
       - :doc:`LDAP </tutorial/configure-for-ldap-authentication>`
     - *not applicable*
     - For user access to MongoDB, see :manual:`Authentication
       </core/authentication>` in the MongoDB manual.

Supported User Authentication Per Release
-----------------------------------------

The following table shows the available user authentication mechanisms and
the release the mechanism became available.

.. list-table::
   :header-rows: 1

   * - Method
     - Available beginning with...
   * - Authentication against |application| database
     - OnPrem 1.0
   * - Authentication against LDAP
     - OnPrem 1.4

Supported MongoDB Security Features on Linux
--------------------------------------------

This section describes supported security options on Linux.

Security Between |onprem| Servers and Backing Replica Sets
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following table shows the authentication and SSL options available
between |onprem| and the :ref:`mms-application-database` and
:ref:`mms-backup-blockstore-database`. These options do not apply to the
HEAD databases that reside on the Backup Daemon:

.. list-table::
   :header-rows: 1

   * - Username/Password Authentication
     - MongoDB SSL Connections
     - Kerberos Authentication
     - MongoDB SSL Connections with Client Certificates
     - x509 Authentication
     - LDAP Authentication
   * - OnPrem 1.0+
     - |onprem| 1.6
     - OnPrem 1.3
     - |onprem| 1.6
     - |onprem| 1.6
     - OnPrem 1.5

Security Between Agents and MongoDB Deployments
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following table shows the authentication and SSL options available
between the |mms| agents and the MongoDB deployments they manage and back
up:

.. list-table::
   :header-rows: 1

   * - 
     - Username/Password Authentication
     - MongoDB SSL Connections
     - Kerberos Authentication
     - MongoDB SSL Connections with Client Certificates
     - x509 Authentication
     - LDAP Authentication
   * - Monitoring Agent
     - OnPrem 1.0
     - OnPrem 1.0
     - OnPrem 1.3
     - OnPrem 1.5
     - 
     - OnPrem 1.5
   * - Backup Agent
     - OnPrem 1.4
     - OnPrem 1.4
     - OnPrem 1.4.1
     - OnPrem 1.5
     - 
     - OnPrem 1.5
   * - Automation Agent
     - OnPrem 1.6
     - 
     - 
     - 
     - 
     - 

Supported MongoDB Security Features on Windows
----------------------------------------------

This section describes supported security options on Windows.

Authentication Between |onprem| Servers and Backing Replica Sets
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following table shows the authentication and SSL options available
between |onprem| and the :ref:`mms-application-database` and
:ref:`mms-backup-blockstore-database`. These options do not apply to the
HEAD databases that reside on the Backup Daemon:

.. list-table::
   :header-rows: 1

   * - Username/Password Authentication
     - MongoDB SSL Connections
     - Kerberos Authentication
     - MongoDB SSL Connections with Client Certificates
     - x509 Authentication
     - LDAP Authentication
   * - OnPrem 1.5
     - |onprem| 1.6
     - 
     - |onprem| 1.6
     - |onprem| 1.6
     - OnPrem 1.5

Security Between Agents and MongoDB Deployments
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following table shows the authentication and SSL options available
between the |mms| agents and the MongoDB deployments they manage and back
up:

.. list-table::
   :header-rows: 1

   * - 
     - Username/Password Authentication
     - MongoDB SSL Connections
     - Kerberos Authentication
     - MongoDB SSL Connections with Client Certificates
     - x509 Authentication
     - LDAP Authentication
   * - Monitoring Agent
     - OnPrem 1.5
     - OnPrem 1.5
     - 
     - OnPrem 1.5
     - 
     - OnPrem 1.5
   * - Backup Agent
     - OnPrem 1.5
     - OnPrem 1.5
     - 
     - OnPrem 1.5
     - 
     - OnPrem 1.5
   * - Automation Agent
     - OnPrem 1.6
     - 
     - 
     - 
     - 
     - 
