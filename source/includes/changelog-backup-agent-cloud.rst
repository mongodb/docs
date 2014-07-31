.. put cloud-only versions of the release notes in this file

======================
Backup Agent Changelog
======================

.. default-domain:: mongodb

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
  MMS.

- Fixes regression in the Agent's rollback handling.

Backup Agent ``2.1.0.106-1``
----------------------------

*Released 2014-06-17*

Support for a new API t hat allows MMS to ingest oplog entries before
the entire payload has reached the MMS servers.

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

The agent now sends oplog slices to MMS in batches to increase
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
points-in-time, in between scheduled snapshots, that MMS can use to
create restores. Configure checkpoints using the *Edit Snapshot
Schedule* link and interface.

This version marks a change in the numbering scheme of backup agents
to support improved packaging options for the backup agent.

Backup Agent ``v20131216.1``
----------------------------

- Added support for connecting to MongoDB instances running SSL. See
  the :ref:`Backup Agent Configuration <backup-ssl>` documentation for
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
(e.g. the list of databases, collections,and indexes,) to the MMS
API, the agent will not include any databases or collections in the
"excluded namespace" configuration.

Backup Agent ``v20130826.0``
----------------------------

Adds support for managing excluded namespaces: Backup Agent will no
longer send data for excluded collections or databases.

Backup Agent ``v20130812.1``
----------------------------

*Major stability update*

If the communication between the Backup Agent and the |backup| API
is interrupted, the Backup Agent can more reliably recover the
current state. This results in fewer "resync required" errors.
