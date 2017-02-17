.. _backup-5.0.6.477:

Backup Agent 5.0.6.477
----------------------

*Released with Ops Manager 3.4.3 on 2017-02-17*

- Built with Go 1.7.

- Support for MacOS Sierra.

.. _backup-5.0.5.472:

Backup Agent ``5.0.5.472``
--------------------------

*Released with Ops Manager 3.4.2 on 2017-01-19*

- Fixed Backup Agent logs not getting sent to server on Windows.

.. _backup-5.0.4.469:

Backup Agent ``5.0.4.469``
--------------------------

*Released with Ops Manager 3.4.1 on 2016-12-27*

- Fix initial sync failures in MongoDB 3.4.0+.

- Fix crash causes by initial sync of a large capped collection.

- Added support for MongoDB 3.4 feature compatibility version and views.

.. _backup-5.0.3.465:

Backup Agent ``5.0.3.465``
--------------------------

*Released with Ops Manager 3.4.0 on 2016-11-29*

- Added support for uncompressed WiredTiger snapshots on the filesystem.

- Added support for storing snapshots in S3.

- Added support for WiredTiger encryption at rest.

- Added ability to control the reference time for the snapshot
  schedule. For example, can now specify that snapshots are taken every
  6 hours, starting at 12:00:00 AM.

- Added support for all data-format affecting MongoDB configuration
  options: ``directoryPerDB``, ``smallfiles``, etc.

.. _backup-3.9.1.382:

Backup Agent ``3.9.0.336``
--------------------------

*Released with Ops Manager 2.0.4 on 2016-05-20*

- Fixed crash that could occur if a collection was deleted during an
  initial sync.

.. _backup-3.9.0.336:

Backup Agent ``3.9.0.336``
--------------------------

*Released with Ops Manager 2.0.0 on 2015-12-08*

- Added support for streaming initial syncs.

- Added support for MongoDB 3.2.0 config servers as replica sets.

- Added the ability to only backup selected namespaces (whitelist).

- Fixed issue with initial sync failing due to collections being deleted
  during the sync.

- Fixed issue with collection names with trailing spaces.

.. _backup-3.4.2.314:

Backup Agent ``3.4.2.314``
--------------------------

*Released with Ops Manager 1.8.2 on 2015-10-20*

- Fixed issue where initial syncs would fail if a namespace was deleted
  during the sync.

.. _backup-3.3.1.193:

Backup Agent ``3.4.1.283``
--------------------------

*Released with Ops Manager 1.8 on 2015-06-23*

- Added support for x.509 Client Certificate authentication. For
  configuration details, see:
  :doc:`/tutorial/configure-backup-agent-for-x509`.

- The Kerberos credentials cache now uses a fixed name.

- Fixed a race condition which could result in inconsistent cluster
  snapshots for MongoDB 3.0+ sharded clusters using the
  :authrole:`backup` role.

Backup Agent ``3.1.2.274``
--------------------------

*Released 2015-04-28*

- Added an explicit timeout for SSL connections to MongoDB instances.

- Added an optimization for syncs of collections with lots of small documents.


Backup Agent ``3.1.1.263``
--------------------------

*Released 2015-03-02*

- Adds support for non-default Kerberos service names.

- Adds support for authentication using MongoDB 2.4-style client certificates.

- The Backup Agent now identifies itself to the |mms| servers using the
  fully qualified domain name (FQDN) of the server on which it is running.

- The Backup Agent now captures a checkpoint even if it is unable to stop
  the balancer. These checkpoints are not guaranteed to be consistent,
  because of in-progress chunk migrations. The user interface identifies
  these checkpoints.

Backup Agent ``2.3.3.209-1``
----------------------------

*Released with OnPrem 1.5.2*

Use no-timeout cursors to work around :issue:`MGO-53`.

Backup Agent ``2.3.1.160``
--------------------------

*Released with |mms| OnPrem 1.5.0*

- Backup Agent now sends oplog slices in batches.

- Improved stability around oplog tokens for environments with unstable networks.

- Support for a new API that allows |mms| to ingest oplog entries before the entire
  payload has reached the |mms| servers.

- Upgraded agent to use to Go 1.3.

- Added support for ``version`` and ``-version`` command line options.

- Added support for connecting to hosts using LDAP authentication.

- Agent now provides additional logging information when the Backup
  Agent manipulates the balancer.

- Agent now supports configuring HTTP proxies with the config file.

Backup Agent ``1.5.1.83-1``
---------------------------

*Released with |mms| OnPrem 1.4.2*

Critical update for users running the MongoDB 2.6 series that use
authorization.

The Backup Agent now includes :data:`system.version` and :data:`system.role`
collections from the admin database in the initial sync.

Backup Agent ``1.5.0.57-1``
---------------------------

*Released with OnPrem 1.4.1*

Support for backing up Kerberos-authenticated replica sets and clusters

Backup Agent ``1.4.6.42-1``
---------------------------

*Released with OnPrem 1.4.0*

- Major stability update.

- Prevent a file descriptor leak.

- Correct handling of timeouts for connections hung in the SSL
  handshaking phase.
