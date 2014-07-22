==========================
Monitoring Agent Changelog
==========================

.. default-domain:: mongodb

Monitoring Agent ``2.3.1.89-1``
-------------------------------

*Released with OnPrem 1.4.3*

- Improved logging for MongoDB 2.6 config servers when connecting with
  a user that has the built-in clusterMonitor role.

- Fixes issues with connecting to replica set members that use auth
  with an updated Go client library.

- Added support for HTTP proxy configuration in the agent
  configuration file.

- Agent includes support for an Offline data collection mode.


Monitoring Agent ``2.1.4.51-1``
-------------------------------

*Released with MMS OnPrem 1.4.2*

Prevent high CPU use when monitoring unreachable :program:`mongod`.

Monitoring Agent ``2.1.3.48-1``
-------------------------------

*Released with OnPrem 1.4.1*

Reduction in unnecessary log messages for unsupported operations on
monitored MongoDB 2.2 instances.

Monitoring Agent ``2.1.1.41-1``
-------------------------------

*Released with OnPrem 1.4.0*

Ability to monitor hosts using Kerberos authentication.

Monitoring Agent ``1.6.6``
--------------------------

*Released with OnPrem1.3*

- Added kerberos support for agents running on Python 2.4.x.

- Added logging when the ``dbstats`` command fails.
