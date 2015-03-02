.. REVIEWERS: Is the version number below correct???

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

.. REVIEWERS: The remaining bullets are NOT from Cory's writeup in DOCS-4772
     but from the Cloud releases since the last "Onprem" release. Are the correct
     to include here???

- Logging improvements for Windows.

- Enhancements to support backup of MongoDB 2.8 and 3.0.

- Agent now encodes all collection metadata. Avoids edge-case issues with
  unexpected characters in collection settings.

- Can now explicitly pass collections options for the WiredTiger storage
  engine from the backed-up :program:`mongod` to |mms|.

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
