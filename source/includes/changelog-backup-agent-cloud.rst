Backup Agent ``5.1.0.467``
--------------------------

*Released 2016-12-13*

- Handle capped collections that are capped using a floating point size


Backup Agent ``5.0.3.465``
--------------------------

*Released 2016-11-21*

- Support for MongoDB 3.4 Views.

- Support for MongoDB 3.4 featureCompatiblityVersion.

Backup Agent ``5.0.1.453``
--------------------------

*Released 2016-11-07*

- Allow managed Backup Agents to be run as a service on Windows.

Backup Agent ``4.6.0.425``
--------------------------

*Released 2016-09-14*

- Update of underlying Go driver.

- Partial support for upcoming major release of MongoDB 3.4.0.

- Partial support for Kerberos on Windows.

Backup Agent ``4.5.0.412``
--------------------------

*Released 2016-08-24*

- Support for Power Linux.

Backup Agent ``4.4.0.396``
--------------------------

*Released 2016-07-12*

- Agent support for restarting incremental initial syncs.

Backup Agent ``4.3.0.384``
--------------------------

*Released 2016-05-16*

- Updated to use Go 1.6.

Backup Agent ``4.2.0.373``
--------------------------

*Released 2016-04-20*

- Added support for log rotation.

- Added a sticky header to log files.

Backup Agent ``4.1.0.347``
--------------------------

*Released 2016-02-18*

- Use systemD management on RHEL7 and Ubuntu 16.04

- Set ``ulimits`` in the packaged builds

Backup Agent ``4.0.0.343``
--------------------------

*Released 2016-01-07*

- Added the ability to customize the Kerberos configuration file
  location.

- Added support to tune the number of concurrent initial syncs.

- Added support to adjust the size of the :term:`oplog` and sync slice
  channels according to the size of the documents: this can lower memory
  consumption.

Backup Agent ``3.9.0.336``
--------------------------

*Released 2015-11-02*

- Support for streaming initial syncs.

- Support for MongoDB 3.2 clusters with config server replica sets.

Backup Agent ``3.8.1.320``
--------------------------

*Released 2015-10-14*

- Upgraded to Go 1.5.1.

Backup Agent ``3.8.0.315``
--------------------------

*Released 2015-09-16*

- Built with Go 1.5.0.

- Fix: Ignore collections deleted during an initial sync.

Backup Agent ``3.7.0.300``
--------------------------

*Released 2015-08-10*

- Added fix to not trim spaces from collection names.

- Upgraded to new version of snappy compression library.

Backup Agent ``3.6.0.292``
--------------------------

*Released 2015-07-15*

- Added minor optimization to explicitly set the ``Content-Type`` on
  HTTP requests.

Backup Agent ``3.5.0.286-1``
------------------------------

*Released 2015-06-24*

- Updated documentation and setting URLs to cloud.mongodb.com

- Added support for backing up selected namespaces. This functionality
  is not yet exposed in the |mms| user interface.

Backup Agent ``3.4.0.273``
--------------------------

*Released 2015-04-22*

- Added an explicit timeout for SSL connections to :program:`mongod` instances
- Added an optimization for syncs of collections with lots of small documents
- The Kerberos credentials cache now uses a fixed name.

Backup Agent ``3.3.0.261``
--------------------------

*Released 2015-03-10*

Logging improvements.

Backup Agent ``3.2.0.262``
--------------------------

*Released 2015-02-23*

.. only:: cloud

   Ability to monitor and back up deployments without managing them
   through Automation. Specifically, you can :doc:`import an existing
   deployment into Monitoring </tutorial/add-existing-mongodb-processes>` and
   then use |mms| to back up the deployment.

   - Support for x.509 certificate authentication.

   - Fixes a race condition which could result in inconsistent
     clustershots for MongoDB 3.0+ sharded clusters using the 
     :authrole:`backup` role.

.. only:: classic

   Ability to upgrade a group in Cloud |mms|, which provides Automation
   and the Metrics API. For information about new Cloud |mms| pricing, please
   see `the pricing page <https://cloud.mongodb.com/pricing>`_.

Backup Agent ``3.1.0.250``
--------------------------

*Released 2015-01-08*

Logging improvements for Windows.

Backup Agent ``3.0.0.246``
--------------------------

*Released 2015-01-08*

Enhancements to support backup of MongoDB 3.0.

Backup Agent ``2.9.1.235-1``
----------------------------

*Released 2014-12-17*

Agent now encodes all collection meta-data. Avoids edge-case issues
with unexpected characters in collection settings.

Backup Agent ``2.9.0.223``
--------------------------

*Released 2014-12-04*

Can now explicitly pass collections options for the WiredTiger storage
engine from the backed up :program:`mongod` to |mms|.

Backup Agent ``2.8.0.204``
--------------------------

*Released 2014-11-12*

The Backup Agent will now identify itself to the |mms| servers using the
fully qualified domain name (FQDN) of the server on which it is running.

Backup Agent ``2.7.1.206``
--------------------------

*Released 2014-11-06*

Use no-timeout cursors to work around :issue:`MGO-53`.

Backup Agent ``2.7.0.193``
----------------------------

*Released 2014-10-29*

- When tailing the oplog, the agent no longer pre-fetches the next batch
  of oplog entries before exhausting the current batch.

- Adds support for non-default Kerberos service names.

- Adds support for RHEL7.

Backup Agent ``2.6.0.176``
--------------------------

*Released 2014-09-30*

Minor logging change, clarifying when stopping the balancer if there
is no balancer settings document.

Backup Agent ``2.5.0``
----------------------

*Released 2014-09-10*

Added support for authentication using MongoDB 2.4 style client
certificates.

Backup Agent ``2.4.0.156``
--------------------------

*Released 2014-08-19*

The Backup Agent will now capture a checkpoint even if it is unable to
stop the balancer. These checkpoints are *not* guaranteed to be
consistent, because of in-progress chunk migrations.  The user
interface identifies these checkpoints.

Backup Agent ``2.3.0.149``
--------------------------

*Released 2014-07-29*

- Upgraded agent to use to Go 1.3

- Added support for ``version`` and ``-version.``

- Added support for connecting to hosts using LDAP authentication.

- Agent now provides additional logging information when the Backup
  Agent manipulates the balancer.

- Agent now supports configuring HTTP with the config file.

Backup Agent ``2.2.2.125``
--------------------------

*Released 2014-07-09*

Fixes issue with agent on Windows using the ``MONGODB-CR``
authentication mechanism.

Backup Agent ``2.2.1.122``
--------------------------

*Released 2014-07-08*

- Fixes issues with connecting to replica set members that use auth
  with an updated Go client library.

- Agent is now able to send a stack trace of its current state to
  |mms|.

- Fixes regression in the Agent's rollback handling.

Backup Agent ``2.1.0.106-1``
----------------------------

*Released 2014-06-17*

Support for a new API t hat allows |mms| to ingest oplog entries before
the entire payload has reached the |mms| servers.

Backup Agent ``2.0.0.90-1``
---------------------------

*Released 2014-05-28*

- Agent supports deployment architectures with multiple active
  (i.e. primary) Backup Agents.

- Improved stability around oplog tokens for environments with
  unstable networks.

Backup Agent ``1.6.1.87-1``
---------------------------

*Released 2014-05-19*

Critical update for users running the MongoDB 2.6 series that use
authorization.

The Backup Agent now includes :data:`system.version` and :data:`system.role`
collections from the admin database in the initial sync.

Backup Agent ``1.6.0.55-1``
---------------------------

*Released 2014-05-09*

The agent now sends oplog slices to |mms| in batches to increase
throughout and stability.

Backup Agent ``1.4.6.43-1``
---------------------------

- Major stability update.

- Prevent a file descriptor leak.

- Correct handling of timeouts for connections hung in the SSL handshaking phase.

Backup Agent ``1.4.4.34-1``
---------------------------

Support for using the Backup Agent via an HTTP proxy

Backup Agent ``1.4.3.28-1``
---------------------------

- Allow upgrading the agent using the Windows MSI installer

- Improved logging

- Fix an open files leak on bad HTTP responses

Backup Agent ``1.4.2.23-1``
---------------------------

- Added support for Windows MSI installer

- For sharded clusters, less aggressive polling to determine if balancer has been stopped

- Fail fast on connections to mongods that are not responding

Backup Agent ``1.4.0.17``
-------------------------

Added support for sharded cluster checkpoints that add additional
points-in-time, in between scheduled snapshots, that |mms| can use to
create restores. Configure checkpoints using the *Edit Snapshot
Schedule* link and interface.

This version marks a change in the numbering scheme of Backup Agents
to support improved packaging options for the Backup Agent.

Backup Agent ``v20131216.1``
----------------------------

- Added support for connecting to MongoDB instances running SSL. See
  the :doc:`/tutorial/configure-backup-agent-for-ssl` documentation for
  more information.

- The agent will try to use additional MongoS instances to take a
  cluster snapshot if the first MongoS is unavailable.

Backup Agent ``v20131118.0``
----------------------------

- Significantly reduced the amount of time needed by the agent to
  detect situations that require a resync.

- Allow automatic resync operations for config servers in sharded
  clusters. The agent can now resync automatically from these
  servers.

Backup Agent ``v20130923.0``
----------------------------

When the agent sends the initial meta-data about the data to back up
(e.g. the list of databases, collections,and indexes,) to the |mms|
API, the agent will not include any databases or collections in the
"excluded namespace" configuration.

Backup Agent ``v20130826.0``
----------------------------

Adds support for managing excluded namespaces: Backup Agent will no
longer send data for excluded collections or databases.

Backup Agent ``v20130812.1``
----------------------------

*Major stability update*

If the communication between the Backup Agent and the |mms| API
is interrupted, the Backup Agent can more reliably recover the
current state. This results in fewer "resync required" errors.
