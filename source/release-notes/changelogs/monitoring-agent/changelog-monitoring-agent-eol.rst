.. _monitoring-3.9.1.326:

Monitoring Agent 3.9.1.326
--------------------------

:ref:`Released with Ops Manager 2.0.5 on 2016-07-14 <opsmgr-server-2.0.5>`

- Fixed expired code-signing certificate in MSI. This is a packaging
  change only, the agent version did not change.

.. _monitoring-3.9.1.238:

Monitoring Agent 3.9.1.238
--------------------------

:ref:`Released with Ops Manager 2.0.0 on 2015-12-08 <opsmgr-server-2.0.0>`

- Added support for MongoDB 3.2.0 config servers as replica sets.

.. _monitoring-3.7.1.227:

Monitoring Agent 3.7.1.227
--------------------------

:ref:`Released with Ops Manager 1.8.2 on 2015-10-20 <opsmgr-server-1.8.2>`

- Fixed potential memory leak when profiler is enabled.

.. _monitoring-3.7.0.212:

Monitoring Agent 3.7.0.212
--------------------------

:ref:`Released with Ops Manager 1.8.1 on 2015-08-17 <opsmgr-server-1.8.1>`

- Avoid harmless authentication in ``mongod`` log files when reading
  ``oplog`` stats using the ``clusterMonitor`` role.

.. _monitoring-3.3.1.193:

Monitoring Agent 3.3.1.193
--------------------------

:ref:`Released with Ops Manager 1.8.0 on 2015-06-23 <opsmgr-server-1.8.0>`

- Added support for x.509 Client Certificate authentication.

- The Kerberos credentials cache now uses a fixed name.

- Improved support for collecting database statistics from secondaries.

- Added an optimization to ensure the Monitoring Agent's database stats
  collection tasks do not synchronize.

.. _monitoring-2.9.2.184:

Monitoring Agent 2.9.2.184
--------------------------

*Released 2015-04-28*

- Added an explicit timeout for SSL connections to MongoDB instances.

- Upgraded the MongoDB Go driver (mgo) version, which fixed a rare
  deadlock issue that could occur when monitoring :program:`mongos`
  instances.

.. _monitoring-2.9.1.176:

Monitoring Agent 2.9.1.176
--------------------------

- Added support for non-default Kerberos service names.

- Added support for authentication using MongoDB 2.4 style client
  certificates.

- The Monitoring Agent now identifies itself to the MMS servers using
  the fully qualified domain name (FQDN) of the server on which it is
  running.

- |mms| now staggers the timing of DNS look-ups, to avoid triggering a
  rare issue in glibc 2.19 on Ubuntu 14.04.

- Added support for RHEL7.

- Improved error handling on Windows.

- Improved connection management for monitored MongoDB processes.

- Improve correctness of the database statics collection.

- Now uses the :dbcommand:`listDatabases` command to retrieve a list of
  databases.

- The default value for :msetting:`sslTrustedServerCertificates` is now
  ``true``. Users upgrading from 2.4.0 and using SSL will need to set
  the value of :msetting:`sslTrustedServerCertificates` in their
  configuration file. See :msetting:`sslTrustedServerCertificates` for
  more information.

.. _monitoring-2.4.2.113:

Monitoring Agent 2.4.2.113
--------------------------

:ref:`Released with OnPrem 1.5.0 <opsmgr-server-1.5.0>`

- Upgraded agent to use Go 1.3.

- Updated mgo driver, which includes fix for :issue:`MGO-34`. All DNS
  lookups should now timeout appropriately.

- Added support for connecting to hosts using LDAP authentication.

- Added support for ``version`` and ``-version`` command line options.

- Agent now displays git commit hash of Monitoring Agent in the log 
  file.

- Updates to the configuration file format.

.. _monitoring-2.3.1.89-1:

Monitoring Agent 2.3.1.89-1
---------------------------

:ref:`Released with OnPrem 1.4.3 <opsmgr-server-1.4.3>`

- Improved logging for MongoDB 2.6 config servers when connecting with
  a user that has the built-in clusterMonitor role.

- **Fix:** Issue with connecting to replica set members that use auth
  with an updated Go client library.

- Added support for HTTP proxy configuration in the agent
  configuration file.

- Agent includes support for an Offline data collection mode.

.. _monitoring-2.1.4.51-1:

Monitoring Agent 2.1.4.51-1
---------------------------

:ref:`Released with OnPrem 1.4.2 <opsmgr-server-1.4.2>`

Prevent high CPU use when monitoring unreachable :program:`mongod`.

.. _monitoring-2.1.3.48-1:

Monitoring Agent 2.1.3.48-1
---------------------------

:ref:`Released with OnPrem 1.4.1 <opsmgr-server-1.4.1>`

Reduction in unnecessary log messages for unsupported operations on
monitored MongoDB 2.2 instances.

.. _monitoring-2.1.1.41-1:

Monitoring Agent 2.1.1.41-1
---------------------------

:ref:`Released with OnPrem 1.4.0 <opsmgr-server-1.4.0>`

Ability to monitor hosts using Kerberos authentication.

.. _monitoring-1.6.6:

Monitoring Agent 1.6.6
----------------------

:ref:`Released with OnPrem 1.3.0 <opsmgr-server-1.3.0>`

- Added kerberos support for agents running on Python 2.4.x.

- Added logging when the ``dbstats`` command fails.
