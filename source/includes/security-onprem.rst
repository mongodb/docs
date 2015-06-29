Overview
--------

To ensure the security of your |onprem|
agents, |onprem| servers, and MongoDB deployments, |onprem| supports the
security options described on this page.

Security Options Available in the Current Version of |onprem|
-------------------------------------------------------------

The following table displays the security options available for the
different types of connections in your |onprem| environment and provides
links to setup instructions.

.. list-table::
   :header-rows: 1

   * - 
     - Connections with |onprem|
     - Connections with Backing Databases
     - Connections with MongoDB Deployments
   * - |onprem|
     - *Not applicable.*
     - - :doc:`SSL </tutorial/configure-ssl-connection-to-backing-mongodb>`
       - :ref:`MONGODB-CR <mongodb-cr>`
       - :doc:`LDAP </tutorial/configure-for-ldap-authentication>`
       - :ref:`Kerberos <configuration-kerberos-settings>`
     - *Connects through the Monitoring, Backup, and Automation agents.
       See the row for each agent in this table.*
   * - Monitoring Agent
     - - :doc:`SSL </tutorial/configure-ssl-connection-to-web-interface>`
     - *Not applicable.*
     - - :doc:`SSL </tutorial/configure-monitoring-agent-for-ssl>`
       - :doc:`MONGODB-CR </tutorial/configure-monitoring-agent-for-cr>`
       - :doc:`LDAP </tutorial/configure-monitoring-agent-for-ldap>`
       - :doc:`Kerberos </tutorial/configure-monitoring-agent-for-kerberos>`
       - :doc:`x.509 </tutorial/configure-monitoring-agent-for-x509>`
   * - Backup Agent
     - - :doc:`SSL </tutorial/configure-ssl-connection-to-web-interface>`
     - *Not applicable.*
     - - :doc:`SSL </tutorial/configure-backup-agent-for-ssl>`
       - :doc:`MONGODB-CR </tutorial/configure-backup-agent-for-cr>`
       - :doc:`LDAP </tutorial/configure-backup-agent-for-ldap>`
       - :doc:`Kerberos </tutorial/configure-backup-agent-for-kerberos>`
       - :doc:`x.509 </tutorial/configure-backup-agent-for-x509>`
   * - Automation Agent
     - - :doc:`SSL </tutorial/configure-ssl-connection-to-web-interface>`
     - *Not applicable.*
     - - :doc:`SSL </tutorial/enable-ssl-for-a-group>`
       - :doc:`MONGODB-CR </tutorial/enable-mongodbcr-authentication-for-group>`
       - :doc:`LDAP </tutorial/enable-ldap-authentication-for-group>`
       - :doc:`Kerberos </tutorial/enable-kerberos-authentication-for-group>`
       - :doc:`x.509 </tutorial/enable-x509-authentication-for-group>`
   * - |onprem| user
     - - :doc:`SSL </tutorial/configure-ssl-connection-to-web-interface>`
       - :doc:`Ops Manager Authentication </tutorial/manage-users>`
       - :doc:`LDAP </tutorial/configure-for-ldap-authentication>`
     - *Not applicable.*
     - *See* :manual:`Authentication </core/authentication>` *in the
       MongoDB manual.*

Supported User Authentication by |onprem| Version
-------------------------------------------------

The following table shows the available user authentication mechanisms and
the release the mechanism became available.

.. list-table::
   :header-rows: 1

   * - Method
     - |onprem| Versions
   * - Authentication against |application| database
     - 1.0+
   * - Authentication against LDAP
     - 1.4+

Supported MongoDB Security Features on Linux
--------------------------------------------

This section describes supported security options on Linux.

Connections Between |onprem| and the Backing Databases (Linux)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following table shows security options for connections between
|onprem| and backing databases when both run on Linux. The backing
databases are the :ref:`mms-application-database` and
:ref:`mms-backup-blockstore-database`.


.. list-table::
   :header-rows: 1

   * - 
     - Username/Password Authentication
     - MongoDB SSL Connections
     - Kerberos Authentication
     - MongoDB SSL Connections with Client Certificates
     - x509 Authentication
     - LDAP Authentication
   * - |onprem| Versions
     - 1.0+
     - 1.6+
     - 1.3+
     - 1.6+
     - 1.6+
     - 1.5+

Connections Between Agents and MongoDB Deployments (Linux)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following table shows the security options available for connections
between agents and the MongoDB deployments they manage when the
deployments run on Linux:

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
     - 1.0+
     - 1.0+
     - 1.3+
     - 1.5+
     - 1.8
     - 1.5+
   * - Backup Agent
     - 1.4+
     - 1.4+
     - 1.4.1+
     - 1.5+
     - 1.8
     - 1.5+
   * - Automation Agent
     - 1.6+
     - 1.8
     - 1.8
     - 1.8
     - 1.8
     - 1.8

Supported MongoDB Security Features on Windows
----------------------------------------------

This section describes supported security options on Windows.

Connections Between |onprem| and the Backing Databases (Windows)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following table shows security options for connections between
|onprem| and backing databases when both run on Windows. The backing
databases are the :ref:`mms-application-database` and
:ref:`mms-backup-blockstore-database`.

.. list-table::
   :header-rows: 1

   * - 
     - Username/Password Authentication
     - MongoDB SSL Connections
     - Kerberos Authentication
     - MongoDB SSL Connections with Client Certificates
     - x509 Authentication
     - LDAP Authentication
   * - |onprem| Versions
     - 1.5+
     - 1.6+
     - 
     - 1.6+
     - 1.6+
     - *Not applicable.*

Connections Between Agents and MongoDB Deployments (Windows)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following table shows the security options available for connections
between agents and the MongoDB deployments they manage when the
deployments run on Windows:

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
     - 1.5+
     - 1.5+
     - 
     - 1.5+
     - 1.8
     - *Not applicable.*
   * - Backup Agent
     - 1.5+
     - 1.5+
     - 
     - 1.5+
     - 1.8
     - *Not applicable.*
   * - Automation Agent
     - 1.8
     - 1.8
     - 
     - 1.8
     - 1.8
     - *Not applicable.*

.. note:: MongoDB for Windows does not support LDAP.
