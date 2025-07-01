.. _backup-3.9.1.382-2.0.9:

Backup Agent 3.9.1.382
----------------------

:ref:`Released with Ops Manager 2.0.9 on 2017-05-23 <opsmgr-server-2.0.9>`

- **Fix:** Add a flush method to DigestOutputStream to avoid timeouts.

- **Fix:** Some ``deleteIndex`` oplog entries not supported during 
  initial sync.

- **Fix:** FileSystemStorejobRunner thread gets killed if exception is
  thrown while getting the Job.

- **Fix:** Failure to create collection if the mongod being backed up
  is configured with encryption.

.. _backup-3.9.1.382:

Backup Agent 3.9.1.382
----------------------

:ref:`Released with Ops Manager 2.0.4 on 2016-05-20 <opsmgr-server-2.0.4>`

- **Fix:** If a collection was deleted during an initial sync, no 
  crash results.

.. _backup-3.9.0.336:

Backup Agent 3.9.0.336
----------------------

:ref:`Released with Ops Manager 2.0.0 on 2015-12-08 <opsmgr-server-2.0.0>`

- Added support for streaming initial syncs.

- Added support for MongoDB 3.2.0 config servers as replica sets.

- Added the ability to only backup selected namespaces (access list).

- Fixed issue with initial sync failing due to collections being
  deleted during the sync.

- Fixed issue with collection names with trailing spaces.

.. _backup-3.4.2.314:

Backup Agent 3.4.2.314
----------------------

:ref:`Released with Ops Manager 1.8.2 on 2015-10-20 <opsmgr-server-1.8.2>`

- **Fix:** Initial syncs do not fail if a namespace was deleted
  during the sync.

.. _backup-3.3.1.283:
.. _backup-3.4.1.283:

Backup Agent 3.4.1.283
----------------------

:ref:`Released with Ops Manager 1.8 on 2015-06-23 <opsmgr-server-1.8.0>`

- Added support for x.509 Client Certificate authentication.

- The Kerberos credentials cache now uses a fixed name.

- **Fix:** Race condition which could result in inconsistent cluster
  snapshots for MongoDB 3.0+ sharded clusters using the
  :authrole:`backup` role.

.. _backup-3.1.2.274:

Backup Agent 3.1.2.274
----------------------

*Released 2015-04-28*

- Added an explicit timeout for SSL connections to MongoDB instances.

- Added an optimization for syncs of collections with lots of small 
  documents.

.. _backup-3.1.1.263:

Backup Agent 3.1.1.263
----------------------

*Released 2015-03-02*

- Adds support for non-default Kerberos service names.

- Adds support for authentication using MongoDB 2.4-style client 
  certificates.

- The Backup Agent now identifies itself to the |mms| servers using the
  fully qualified domain name (FQDN) of the server on which it is 
  running.

- The Backup Agent now captures a checkpoint even if it is unable to 
  stop the balancer. These checkpoints are not guaranteed to be 
  consistent, because of in-progress chunk migrations. The user 
  interface identifies these checkpoints.

.. _backup-2.3.3.209-1:

Backup Agent 2.3.3.209-1
------------------------

:ref:`Released with OnPrem 1.5.2 <opsmgr-server-1.5.2>`

Use no-timeout cursors to work around :issue:`MGO-53`.

.. _backup-2.3.1.160:

Backup Agent 2.3.1.160
----------------------

*Released with |mms| OnPrem 1.5.0*

- Backup Agent now sends oplog slices in batches.

- Improved stability around oplog tokens for environments with
  unstable networks.

- Support for a new API that allows |mms| to ingest oplog entries 
  before the entire payload has reached the |mms| servers.

- Upgraded agent to use to Go 1.3.

- Added support for ``version`` and ``-version`` command line options.

- Added support for connecting to hosts using LDAP authentication.

- Agent now provides additional logging information when the Backup
  Agent manipulates the balancer.

- Agent now supports configuring HTTP proxies with the config file.

.. _backup-1.5.1.83-1:

Backup Agent 1.5.1.83-1
-----------------------

:ref:`Released with OnPrem 1.4.2 <opsmgr-server-1.4.2>`

- Critical update for users running the MongoDB 2.6 series that use
  authorization.

- Backup Agent now includes ``system.version`` and 
  ``system.role`` collections from the admin database in the
  initial sync.

.. _backup-1.5.0.57-1:

Backup Agent 1.5.0.57-1
-----------------------

:ref:`Released with OnPrem 1.4.1 <opsmgr-server-1.4.1>`

Support for backing up Kerberos-authenticated replica sets and clusters

.. _backup-1.4.6.42-1:

Backup Agent 1.4.6.42-1
-----------------------

:ref:`Released with OnPrem 1.4.0 <opsmgr-server-1.4.0>`

- Major stability update.

- Prevent a file descriptor leak.

- Correct handling of timeouts for connections hung in the SSL
  handshaking phase.
