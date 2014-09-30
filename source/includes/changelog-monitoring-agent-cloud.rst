==========================
Monitoring Agent Changelog
==========================

.. NOTE TO WRITERS:

       All entries should be in the past tense.

.. default-domain:: mongodb

Monitoring Agent ``2.6.0.123``
------------------------------

*Released 2014-09-30*

Now uses the :dbcommand:`listDatabases` to retrieve a list of databases.

Monitoring Agent ``2.5.0``
--------------------------

*Released 2014-09-10*

Added support for authentication using MongoDB 2.4 style client
certificates.

Monitoring Agent ``2.4.1.108``
------------------------------

*Released 2014-08-25*

The default value for :msetting:`sslTrustedServerCertificates` is now
``true``.  Users upgrading from 2.4.0 and using SSL will
need to set the value of :msetting:`sslTrustedServerCertificates` in their
configuration file.  See :msetting:`sslTrustedServerCertificates` for
more information.

Monitoring Agent ``2.4.0.101``
-------------------------------

*Released 2014-07-29*

- Upgraded agent to use Go 1.3.

- Updated ``mgo`` driver, which includes fix for :issue:`MGO-34`. All
  DNS lookups should now timeout appropriately.

- Added support for connecting to hosts using LDAP authentication.

- Added support for ``version`` and ``-version``.

 Agent now displays git commit hash of Monitoring Agent in the log file.

- Updates to the configuration file format.

Monitoring Agent ``2.3.1.89-1``
-------------------------------

*Released 2014-07-08*

- Fixes issues with connecting to replica set members that use auth
  with an updated Go client library.

- Added support for HTTP proxy configuration in the agent
  configuration file.

- Agent includes support for an Offline data collection mode.

Monitoring Agent ``2.2.0.70-1``
-------------------------------

*Released 2014-05-28*

Improved logging for MongoDB 2.6 config servers when connecting with a user
that has the built-in :authrole:`clusterMonitor` role.

Monitoring Agent ``2.1.4.51-1``
-------------------------------

*Released 2014-05-09*

- Reduce log spam when a :program:`mongod` connection attempt fails, or
  the when connecting to a 2.0 :program:`mongod`.

- Prevent high CPU use when monitoring unreachable :program:`mongod`.

Monitoring Agent ``2.1.2.43-1``
-------------------------------

*Released 2014-04-15*

Reduction in unnecessary log messages for unsupported operations on
monitored MongoDB 2.2 instances.

Monitoring Agent ``2.1.0``
--------------------------

*Released 2014-03-26*

- Added Kerberos support for the new 2.x Monitoring Agent.

- Windows click to install MSI agent installer.

- Fixed duplicated profiling data error.

Monitoring Agent ``2.0.1``
--------------------------

*Released 2014-03-18*

- Enhanced ability to stay connected when network connections become unstable
  due to firewalls and other factors.

- Included HTTP network proxy support for new 2.x Monitoring Agent with same
  environment variable mechanism available to the Python version of the
  Monitoring Agent.

Monitoring Agent ``2.0.0``
--------------------------

*Released 2014-03-11*

A new 2.x Monitoring Agent with no Python dependencies for deployments not
using Kerberos authentication or connecting to the internet via proxy.

Monitoring Agent ``1.6.8``
--------------------------

*Released 2014-01-06*

- Added a periodic diagnostic log message to the Agent that includes
  active host count.

- Removed deprecated agent auto-update.

Monitoring Agent ``1.6.7``
--------------------------

*Released 2013-12-16*

- Added optional support for validating MongoDB SSL certificates and custom CA
  certificate paths.

- Improved robustness of host IP address detection.

Monitoring Agent ``1.6.6``
--------------------------

*Released 2013-11-30*

- Added kerberos support for agents running on Python 2.4.x.

- Added logging when the ``dbstats`` command fails.

Monitoring Agent ``1.6.5``
--------------------------

*Internal release only, not released*.

Monitoring Agent ``1.6.4``
--------------------------

*Released 2013-11-18*

- Added support for the agent to connect to MongoDB deployments that
  use Kerberos.

- Allowed the Monitoring Agent to send data to the MMS server after
  detecting changes, such as adding a new host.

Monitoring Agent ``1.6.3``
--------------------------

*Internal Release Only - not published*

Monitoring Agent ``1.6.2``
--------------------------

*Released 2013-11-05*

- Fixed bug that led to high CPU service with log collection
  and the agent's connection to a :program:`mongod` instance failed.

Monitoring Agent ``1.6.1``
--------------------------

*Released 2013-10-21*

- Added options in the agent's '``settings.py`` to suppress database
  specific statics at the agent level.

- Improved error messages in agent logs.

Monitoring Agent ``1.6.0``
--------------------------

*Released 2013-10-07*

For monitored instances on MongoDB 2.4.x series, fixed
a bug that reported monitored :program:`mongod` instances as down
during foreground index builds.

Monitoring Agent ``1.5.9``
--------------------------

*Released 2013-08-12*

Agent now collects timestamps associated with hardware metrics, so
that MMS can display more accurate minute-level charts.

Monitoring Agent ``1.5.8``
--------------------------

*Released 2013-07-15*

Increased collection of data on shard names.

Monitoring Agent ``1.5.7``
--------------------------

*Released 2013-04-23*

Removed the ``writeBacksQueued`` queued call.

Monitoring Agent ``1.5.6``
--------------------------

*Released 2013-03-20*

Removed an error from the log if the agent is unable to collect
profiling stats.
