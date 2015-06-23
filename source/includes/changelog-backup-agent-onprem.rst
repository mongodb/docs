Backup Agent ``3.3.1.193``
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
