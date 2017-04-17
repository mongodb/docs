Monitoring Agent ``5.7.0.368``
------------------------------

*Released 2017-04-19*

- Do not print an error message when monitoring a newly created sharded
  cluster for which the config.settings document does not yet exist.

Monitoring Agent ``5.6.0.364``
------------------------------

*Released 2017-01-23*

- Support for macOS Sierra.

- Compiled with Go 1.7.4.

Monitoring Agent ``5.5.0.358``
------------------------------

*Released 2016-12-13*

- Ensure that replica set members in STARTUP2 can be monitored
  successfully.

Monitoring Agent ``5.4.2.354``
------------------------------

*Released 2016-11-21*

- Fix: Prevent slow collection of database-specific stats from
  affecting main metrics collection loop.

Monitoring Agent ``5.4.1.350``
------------------------------

*Released 2016-11-07*

- Allow managed Monitoring Agents to be run as a service on Windows.

Monitoring Agent ``5.2.0.331``
------------------------------

*Released 2016-09-14*

- Update of underlying Go driver.

- Partial support for upcoming major release of MongoDB 3.4.0.

- Partial support for Kerberos on Windows.

Monitoring Agent ``5.2.0.331``
------------------------------

*Released 2016-08-24*

- Support for Power Linux.

Monitoring Agent ``5.1.0.323``
------------------------------

*Released 2016-07-12*

- Support for automatically backing off of monitoring interval for
  auto-scaled mongos deployments.


Monitoring Agent ``5.0.0.309``
------------------------------

*Released 2016-06-22*

- Support for high resolution monitoring for Cloud Manager Premium Plans.

- Support for multiple active monitoring agents.

- Explicit monitoring of arbiters.

Monitoring Agent ``4.3.0.265``
------------------------------

*Released 2016-05-16*

- Retrieve information on mongos in a cluster by querying the config
  servers.

Monitoring Agnet ``4.2.0.263``
------------------------------

*Released 2016-04-20*

- Added support for log rotation.

- Added a sticky header to log files.

Monitoring Agent ``4.1.0.251``
------------------------------

*Released 2016-02-18*

- Use systemD management on RHEL7 and Ubuntu 16.04.

- Set ``ulimits`` in the packaged builds.

Monitoring Agent ``4.0.0.242``
------------------------------

*Released 2016-01-07*

- Added the ability to customize the Kerberos configuration file
  location.

Monitoring Agent ``3.9.1.238``
------------------------------

*Released 2015-10-14*

- Upgraded build to Go 1.5.1.

Monitoring Agent ``3.9.0.233``
------------------------------

*Released 2015-10-08*

- Support for MongoDB 3.2.0 config servers as replica sets

Monitoring Agent ``3.8.0.222-1``
--------------------------------

*Released 2015-09-16*

- Built with Go 1.5.0.

Monitoring Agent ``3.7.0.212``
------------------------------

*Released 2015-08-10*

- Updated retrieval logic for oplog information to retrieve from either
  ``serverStatus`` or the ``oplog`` collection as determined by the
  roles of Monitoring Agent user to avoid authentication errors related
  to oplog information retrieval in MongoDB logs.

Monitoring Agent ``3.6.0.201``
------------------------------

*Released 2015-07-15*

- Added optimization to ensure that profile data collection is
  not impacted by clock skew.
- Stopped collecting data-base specific ``recordStats`` information.


Monitoring Agent ``3.5.0.197``
------------------------------

*Released 2015-06-24*

- Updated documentation and setting URLs to cloud.mongodb.com

Monitoring Agent ``3.4.0.190``
------------------------------

*Released 2015-06-03*

- Adds an optimization to ensure the Monitoring Agent's database stats
  collection tasks do not synchronize.

Monitoring Agent ``3.3.0.183``
------------------------------

*Released 2015-04-22*

- Added an explicit timeout for SSL connections to :program:`mongod` instances
- The Kerberos credentials cache now uses a fixed name.

Monitoring Agent ``3.2.0.177``
------------------------------

*Released 2015-03-31*

Upgraded the version of the MongoDB Go driver (mgo), which fixes a rare
deadlock while monitoring :program:`mongos` processes.

Monitoring Agent ``3.1.0.173``
------------------------------

*Released 2015-02-23*

.. only:: cloud

   - Ability to monitor and back up deployments without managing them
     through Automation. Specifically, you can import an existing
     deployment into Monitoring, which allows you to use |mms| to monitor
     and optionally back up the deployment. See
     :doc:`/tutorial/add-existing-mongodb-processes`.

   - Support for x.509 certificate authentication.

   - Improved support for collecting database statistics from secondaries
     as well as primaries.

.. only:: classic

   - Ability to upgrade a group to Cloud |mms|, which provides Automation
     and the Metrics API. For information about Cloud |mms| pricing,
     please see `the pricing page <https://cloud.mongodb.com/pricing>`_.

- The :guilabel:`Deployment` tab now displays all deployment information,
  for both servers and processes, on one page, with icons for selecting
  view options.

Monitoring Agent ``3.0.0.167``
------------------------------

*Released 2015-01-28*

Stagger the timing of DNS look-ups, to avoid triggering a rare issue
in glibc 2.19 on Ubuntu 14.04.

Monitoring Agent ``2.9.0.164``
------------------------------

*Released 2015-01-08*

Improved error handling on Windows.

Monitoring Agent ``2.8.0.143``
------------------------------

*Released 2014-11-12*

- The Monitoring Agent will now identify itself to the |mms| servers using the
  fully qualified domain name (FQDN) of the server on which it is running.

- Improved connection management for monitored MongoDB processes.

Monitoring Agent ``2.7.0.136``
------------------------------

*Released 2014-10-29*

- Improve correctness of database statics collection by moving data
  collection into separate internal thread.

- Adds support for non-default Kerberos service names.

- Adds support for RHEL7.

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

- Agent now displays git commit hash of Monitoring Agent in the log file.

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

- Allowed the Monitoring Agent to send data to the |mms| server after
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
that |mms| can display more accurate minute-level charts.

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
