.. _backup-6.4.0.734:

Backup Agent 6.4.0.734
----------------------

*Released 2018-02-13*

- During a PIT restore, suppress errors when dropping non-existent
  namespaces.

- During a PIT restore, always apply oplogs with upsert=true.

.. _backup-6.3.0.728:

Backup Agent 6.3.0.728
----------------------

*Released 2018-01-23*

- **Fix:** Send compound index keys as ordered BSON.

- **Fix:** Send less detailed data in the initial summary payload at the
  start of an initial sync. Collect more detailed data for each
  collection individually.
  
.. _backup-6.2.0.714:

Backup Agent 6.2.0.714
----------------------

*Released 2018-01-08*

- **Fix:** Relax validation when ``krb5ConfigLocation`` parameter is 
  specified. This no longer implies that ``krb5Principal`` and 
  ``krb5Keytab`` are required.

- **Fix:**  Use correct format for point in time restore oplog seed 
  when no oplog are available.

.. _backup-6.1.1.693:

Backup Agent 6.1.1.693
----------------------

*Released 2017-11-19*

**Fix:** Upgrades of the Backup Agent performed by the Automation Agent 
were missing a parameter on Windows.

.. _backup-6.0.0.688:

Backup Agent 6.1.0.688
----------------------

*Released 2017-11-14*

Support for upcoming release of MongoDB 3.6.

.. _backup-6.0.0.680:

Backup Agent 6.0.0.680
----------------------

*Released 2017-10-26*

- Support for upcoming release of MongoDB 3.6.

.. _backup-6.0.0.676:

Backup Agent 6.0.0.676
----------------------

*Released 2017-10-25*

- Support for upcoming release of MongoDB 3.6.

.. _backup-5.9.0.662:

Backup Agent 5.9.0.662
----------------------

*Released 2017-09-13*

- Use BSON.d for missing docs.

.. _backup-5.8.0.655:

Backup Agent 5.8.0.655
----------------------

*Released 2017-08-25*

- Allow oplogs for a point in time restore to be applied client-side.

.. _backup-5.7.0.637:

Backup Agent 5.7.0.637
----------------------

*Released 2017-08-01*

- Support for optimized point in time restores.


.. _backup-5.6.0.61:

Backup Agent 5.6.0.61
---------------------

*Released 2017-07-11*

- During initial sync, add verification that shard name matches
  the expected shard name.

.. _backup-5.5.0.512:

Backup Agent 5.5.0.512
----------------------

*Released 2017-06-15*

- Use HTTP basic auth to authenticate HTTPS requests between the 
  Backup Agent and cloud.mongodb.com.

- Performance enhancement: Use ``bson.Raw`` for initial sync.

.. _backup-5.4.0.493:

Backup Agent 5.4.0.493
----------------------

*Released 2017-04-19*

- Reduce memory used during initial sync.

- Ensure messages printed to ``STDOUT`` and ``STDERR`` is also
  included in the Backup Agent log file.

.. _backup-5.3.0.484:

Backup Agent 5.3.0.484
----------------------

*Released 2017-03-29*

- Optimization for collection of data in the initial sync phase. 
  (Recompiled with the MGO-128 fix.)

.. _backup-5.2.0.473:

Backup Agent 5.2.0.473
----------------------

*Released 2017-01-23*

- Support for macOS Sierra.

- Compiled with Go 1.7.4.

- **Fix:** Can send logs to Cloud Manager for Backup Agents running on 
  Windows.

.. _backup-5.1.0.467:

Backup Agent 5.1.0.467
----------------------

*Released 2016-12-13*

- Handle capped collections that are capped using a floating point size.


.. _backup-5.0.3.465:

Backup Agent 5.0.3.465
----------------------

*Released 2016-11-21*

- Support for MongoDB 3.4 Views.

- Support for MongoDB 3.4 featureCompatiblityVersion.

.. _backup-5.0.1.453:

Backup Agent 5.0.1.453
----------------------

*Released 2016-11-07*

- Allow managed Backup Agents to be run as a service on Windows.

.. _backup-4.6.0.425:

Backup Agent 4.6.0.425
----------------------

*Released 2016-09-14*

- Update of underlying Go driver.

- Partial support for upcoming major release of MongoDB 3.4.0.

- Partial support for Kerberos on Windows.

.. _backup-4.5.0.412:

Backup Agent 4.5.0.412
----------------------

*Released 2016-08-24*

- Support for Power Linux.

.. _backup-4.4.0.396:

Backup Agent 4.4.0.396
----------------------

*Released 2016-07-12*

- Agent support for restarting incremental initial syncs.

.. _backup-4.3.0.384:

Backup Agent 4.3.0.384
----------------------

*Released 2016-05-16*

- Updated to use Go 1.6.

.. _backup-4.2.0.373:

Backup Agent 4.2.0.373
----------------------

*Released 2016-04-20*

- Added support for log rotation.

- Added a sticky header to log files.

.. _backup-4.1.0.347:

Backup Agent 4.1.0.347
----------------------

*Released 2016-02-18*

- Use systemD management on RHEL7 and Ubuntu 16.04.

- Set ``ulimits`` in the packaged builds.

.. _backup-4.0.0.343:

Backup Agent 4.0.0.343
----------------------

*Released 2016-01-07*

- Added the ability to customize the Kerberos configuration file
  location.

- Added support to tune the number of concurrent initial syncs.

- Added support to adjust the size of the :term:`oplog` and sync slice
  channels according to the size of the documents: this can lower memory
  consumption.

.. _backup-3.9.0.336:

Backup Agent 3.9.0.336
----------------------

*Released 2015-11-02*

- Support for streaming initial syncs.

- Support for MongoDB 3.2 clusters with config server replica sets.

.. _backup-3.8.1.320:

Backup Agent 3.8.1.320
----------------------

*Released 2015-10-14*

- Upgraded to Go 1.5.1.

.. _backup-3.8.0.315:

Backup Agent 3.8.0.315
----------------------

*Released 2015-09-16*

- Built with Go 1.5.0.

- **Fix:** Ignore collections deleted during an initial sync.

.. _backup-3.7.0.300:

Backup Agent 3.7.0.300
----------------------

*Released 2015-08-10*

- Added fix to not trim spaces from collection names.

- Upgraded to new version of snappy compression library.

.. _backup-3.6.0.292:

Backup Agent 3.6.0.292
----------------------

*Released 2015-07-15*

- Added minor optimization to explicitly set the ``Content-Type`` on
  HTTP requests.

Backup .. _bgent-5.0.286-1:

Backup Agent 3.5.0.286-1
------------------------

*Released 2015-06-24*

- Updated documentation and setting URLs to cloud.mongodb.com.

- Added support for backing up selected namespaces. This functionality
  is not yet exposed in the |mms| user interface.

.. _backup-3.4.0.273:

Backup Agent 3.4.0.273
----------------------

*Released 2015-04-22*

- Added an explicit timeout for SSL connections to :program:`mongod` 
  instances.

- Added an optimization for syncs of collections with lots of small 
  documents.

- The Kerberos credentials cache now uses a fixed name.

.. _backup-3.3.0.261:

Backup Agent 3.3.0.261
----------------------

*Released 2015-03-10*

Logging improvements.

.. _backup-3.2.0.262:

Backup Agent 3.2.0.262
----------------------

*Released 2015-02-23*

.. only:: cloud

   Ability to monitor and back up deployments without managing them
   through Automation. Specifically, you can 
   :doc:`import an existing deployment into Monitoring </tutorial/add-existing-mongodb-processes>` 
   and then use |mms| to back up the deployment.

   - Support for x.509 certificate authentication.

   - **Fix:** A race condition which could result in inconsistent
     clustershots for MongoDB 3.0+ sharded clusters using the
     :authrole:`backup` role no longer occurs.

.. only:: classic

   Ability to upgrade a project in Cloud |mms|, which provides 
   Automation and the Metrics API. For information about new Cloud 
   |mms| pricing, see 
   `the pricing page <https://cloud.mongodb.com/pricing>`_.

.. _backup-3.1.0.250:

Backup Agent 3.1.0.250
----------------------

*Released 2015-01-08*

Logging improvements for Windows.

.. _backup-3.0.0.246:

Backup Agent 3.0.0.246
----------------------

*Released 2015-01-08*

Enhancements to support backup of MongoDB 3.0.

.. _backup-9.1.235-1:

Backup Agent 2.9.1.235-1
------------------------

*Released 2014-12-17*

Agent now encodes all collection meta-data. Avoids edge-case issues
with unexpected characters in collection settings.

.. _backup-2.9.0.223:

Backup Agent 2.9.0.223
----------------------

*Released 2014-12-04*

Can now explicitly pass collections options for the WiredTiger storage
engine from the backed up :program:`mongod` to |mms|.

.. _backup-2.8.0.204:

Backup Agent 2.8.0.204
----------------------

*Released 2014-11-12*

The Backup Agent will now identify itself to the |mms| servers using the
fully qualified domain name (FQDN) of the server on which it is running.

.. _backup-2.7.1.206:

Backup Agent 2.7.1.206
----------------------

*Released 2014-11-06*

Use no-timeout cursors to work around :issue:`MGO-53`.

.. _backup-2.7.0.193:

Backup Agent 2.7.0.193
----------------------

*Released 2014-10-29*

- When tailing the oplog, the agent no longer pre-fetches the next batch
  of oplog entries before exhausting the current batch.

- Adds support for non-default Kerberos service names.

- Adds support for RHEL7.

.. _backup-2.6.0.176:

Backup Agent 2.6.0.176
----------------------

*Released 2014-09-30*

Minor logging change, clarifying when stopping the balancer if there
is no balancer settings document.

.. _backup-2.5.0:

Backup Agent 2.5.0
------------------

*Released 2014-09-10*

Added support for authentication using MongoDB 2.4 style client
certificates.

.. _backup-2.4.0.156:

Backup Agent 2.4.0.156
----------------------

*Released 2014-08-19*

The Backup Agent will now capture a checkpoint even if it is unable to
stop the balancer. These checkpoints are *not* guaranteed to be
consistent, because of in-progress chunk migrations.  The user
interface identifies these checkpoints.

.. _backup-2.3.0.149:

Backup Agent 2.3.0.149
----------------------

*Released 2014-07-29*

- Upgraded agent to use to Go 1.3.

- Added support for ``version`` and ``-version.``

- Added support for connecting to hosts using LDAP authentication.

- Agent now provides additional logging information when the Backup
  Agent manipulates the balancer.

- Agent now supports configuring HTTP with the config file.

.. _backup-2.2.2.125:

Backup Agent 2.2.2.125
----------------------

*Released 2014-07-09*

Fixes issue with agent on Windows using the ``MONGODB-CR``
authentication mechanism.

.. _backup-2.2.1.122:

Backup Agent 2.2.1.122
----------------------

*Released 2014-07-08*

- Fixes issues with connecting to replica set members that use auth
  with an updated Go client library.

- Agent is now able to send a stack trace of its current state to
  |mms|.

- Fixes regression in the Agent's rollback handling.

.. _backup-2.1.0.106-1:

Backup Agent 2.1.0.106-1
------------------------

*Released 2014-06-17*

Support for a new API t hat allows |mms| to ingest oplog entries before
the entire payload has reached the |mms| servers.

.. _backup-2.0.0.90-1:

Backup Agent 2.0.0.90-1
-----------------------

*Released 2014-05-28*

- Agent supports deployment architectures with multiple active
  (i.e. primary) Backup Agents.

- Improved stability around oplog tokens for environments with
  unstable networks.

.. _backup-1.6.1.87-1:

Backup Agent 1.6.1.87-1
-----------------------

*Released 2014-05-19*

- Critical update for users running the MongoDB 2.6 series that use
  authorization.

- The Backup Agent now includes :data:`system.version` and 
  :data:`system.role` collections from the ``admin`` database in the 
  initial sync.

.. _backup-1.6.0.55-1:

Backup Agent 1.6.0.55-1
-----------------------

*Released 2014-05-09*

The agent now sends oplog slices to |mms| in batches to increase
throughout and stability.

.. _backup-1.4.6.43-1:

Backup Agent 1.4.6.43-1
-----------------------

- Major stability update.

- Prevent a file descriptor leak.

- Correct handling of timeouts for connections hung in the |tls-ssl| 
  handshaking phase.

.. _backup-1.4.4.34-1:

Backup Agent 1.4.4.34-1
-----------------------

Support for using the Backup Agent via an HTTP proxy

.. _backup-1.4.3.28-1:

Backup Agent 1.4.3.28-1
-----------------------

- Allow upgrading the agent using the Windows MSI installer.

- Improved logging.

- Fix an open files leak on bad HTTP responses.

.. _backup-1.4.2.23-1:

Backup Agent 1.4.2.23-1
-----------------------

- Added support for Windows MSI installer.

- For sharded clusters, less aggressive polling to determine if 
  balancer has been stopped.

- Fail fast on connections to mongods that are not responding.

.. _backup-1.4.0.17:

Backup Agent 1.4.0.17
---------------------

Added support for sharded cluster checkpoints that add additional
points-in-time, in between scheduled snapshots, that |mms| can use to
create restores. Configure checkpoints using the *Edit Snapshot
Schedule* link and interface.

This version marks a change in the numbering scheme of Backup Agents
to support improved packaging options for the Backup Agent.

 .. _backup-v20131216.1:

Backup Agent v20131216.1
------------------------

- Added support for connecting to MongoDB instances running SSL. See
  the :doc:`/tutorial/configure-backup-agent-for-ssl` documentation for
  more information.

- The agent will try to use additional ``mongos`` instances to take a
  cluster snapshot if the first ``mongos`` is unavailable.

.. _backup-v20131118.0:

Backup Agent v20131118.0
------------------------

- Significantly reduced the amount of time needed by the agent to
  detect situations that require a resync.

- Allow automatic resync operations for config servers in sharded
  clusters. The agent can now resync automatically from these
  servers.

.. _backup-v20130923.0:

Backup Agent v20130923.0
------------------------

When the agent sends the initial meta-data about the data to back up
(e.g. the list of databases, collections,and indexes,) to the |mms|
API, the agent will not include any databases or collections in the
"excluded namespace" configuration.

.. _backup-v20130826.0:

Backup Agent v20130826.0
------------------------

Adds support for managing excluded namespaces: Backup Agent no
longer sends data for excluded collections or databases.

.. _backup-v20130812.1:

Backup Agent v20130812.1
------------------------

*Major stability update*

If the communication between the Backup Agent and the |mms| API
is interrupted, the Backup Agent can more reliably recover the
current state. This results in fewer "resync required" errors.
