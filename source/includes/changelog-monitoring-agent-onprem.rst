==========================
Monitoring Agent Changelog
==========================

.. default-domain:: mongodb

Monitoring Agent ``2.1.4.51-1``
-------------------------------

*Released with MMS OnPrem 1.4.2*

Fix for race condition which can cause high CPU load when connecting
to a replica set member which is unreachable.

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
