======================
Backup Agent Changelog
======================

.. default-domain:: mongodb

Backup Agent ``2.3.1.160``
--------------------------

*Released with MMS OnPrem 1.5.0*

- Backup Agent now sends oplog slices in batches.

- Improved stability around oplog tokens for environments with unstable networks.

- Support for a new API that allows MMS to ingest oplog entries before the entire
  payload has reached the MMS servers.

- Upgraded agent to use to Go 1.3.

- Added support for ``version`` and ``-version`` command line options.

- Added support for connecting to hosts using LDAP authentication.

- Agent now provides additional logging information when the Backup
  Agent manipulates the balancer.

- Agent now supports configuring HTTP proxies with the config file.

Backup Agent ``1.5.1.83-1``
---------------------------

*Released with MMS OnPrem 1.4.2*

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
