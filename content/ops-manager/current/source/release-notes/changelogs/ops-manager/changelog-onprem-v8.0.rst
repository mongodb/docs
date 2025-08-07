.. _opsmgr-server-8.0.11:

|onprem| Server 8.0.11
~~~~~~~~~~~~~~~~~~~~~~

*Released 2025-07-16*

Improvements
~~~~~~~~~~~~

- Updates the MongoDB Agent to :ref:`108.0.11.8830-1
  <mongodb-108.0.11.8830-1>`.
- Improves MongoDB Usage logic to represent licensing needs more 
  accurately and splits RAM Pool category into RAM Pool (Prod) and RAM 
  Pool (Test/QA).
- Optimizes queries by avoiding empty array queries on
  ``_id: {"$in": []}``.
- Adds S3 key/bucket information to log messages for slow S3 
  investigation.
- Starts shard/replset queryable with 
  wiredTigerSkipTableLoggingChecksOnStartup, improving startup 
  reliability and performance.
- Introduces an application setting to control S3 client chunked 
  encoding in AWS SDK v2, allowing compatibility with S3-compatible 
  vendors that do not support chunked uploads.

Bug Fixes
~~~~~~~~~

- Fixes cross-project validation for destination clusters and falls 
  back to showing all valid clusters when switching projects during a 
  point-in-time restore.
- During partial sharded cluster upgrades to 8.0, only 8.0 processes 
  now set security.javascriptEnabled to false, avoiding a rolling 
  restart to all shard nodes.
- Fixes the following CVE:
  
  - `CVE-2025-48976 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-48976>`__

.. _opsmgr-server-8.0.10:

|onprem| Server 8.0.10
~~~~~~~~~~~~~~~~~~~~~~

*Released 2025-07-03*

Improvements
~~~~~~~~~~~~

- Customizable webhooks – Adds webhook headers and body templating support to project and global alert webhooks.

- Adds validation and disables ongoing backups for S3 snapshot stores with slashes in the bucket name, as required by the AWS S3 SDK update. Existing backups remain accessible to prevent data loss.

- Updates {+mongosh+} to 2.5.3.

Bug fixes
~~~~~~~~~

- Adds validation to ensure the head directory path ends in a slash.

- Fixes an error that occurs when a shard is split out from a sharded cluster to run as a standalone replica set.

- Fixes a bug that causes S3 stores to ignore host machine environment variables for region configuration. Defaults to ``us-east-1`` if not defined.

- Fixes an issue causing DNS resolution failures for S3 endpoints using HTTP.

.. _opsmgr-server-8.0.9:

|onprem| Server 8.0.9
~~~~~~~~~~~~~~~~~~~~~

*Released 2025-06-24*

Improvements
~~~~~~~~~~~~

- Updates the MongoDB Agent to :ref:`108.0.9.8826-1 
  <mongodb-108.0.9.8826-1>`.
- Supports :dbtools:`MongoDB Database Tools 100.12.2 
  </release-notes/database-tools-changelog>`.
- Tests and releases :dbtools:`MongoDB Database Tools 100.12.2 
  </release-notes/database-tools-changelog>` in {+mdbagent+}, 
  |cloud-short|, and |onprem|.
- Release of cloud-automation-ops-manager-8.0 108.0.9.8826-1 and 
  108.0.9.8818-1 to Ops Manager 8.0.
- Adds a cap to the retryability of ``moveCollection`` for each 
  collection, returning an error code upon continual failure.
- MongoDB Agent now attempts to abort currently active 
  ``moveCollection`` commands via ``abortMoveCollection`` when a shard 
  removal is canceled.
- Auto extends the queryable restore job expiry to account for long 
  queryable mounting times.
- Improves agent job logging for better debugging.
- Improves TP oplog snapshotting to avoid removing the wrong oplog files
  in a gap.
- Improves agent discovery to avoid project-wide failures after config
  node is removed.
- Ops Manager now allows users to download logs for a specific time range 
  via UI, CLI, and API

Bug Fixes 
~~~~~~~~~

- Disallows KMIP key rotation via the OM UI when ``kmip.keyIdentifier``
  is specified. Users must clear the value or rotate manually.
- Ensures SSL socket factory is recomputed for new S3 store configs by
  using the current timestamp.
- Defaults S3 v2 client to ``us-east-1`` region when region is not 
  provided for bucket access with keys.
- Fixes a failure when connecting to S3 buckets via IAM roles and via 
  keys.
- Disallows key rotation when ``kmip.keyIdentifier`` is specified in the
  UI.
- Fixes issue with reporting failure status in the ``ADD_NODE`` job when
  a host cannot be reached.
- Ensures the abort snapshot logic sets ``lastSnapshotTimestamp`` 
  correctly when a shard snapshot is aborted.
- Fixes project-wide discovery failures after config node removal from a
  sharded cluster.
- Fixes ``minBlockSize`` stored as double, which could cause 
  ``ClassCastException``.
- Fixes the following CVEs:
  
  - `CVE-2025-48734 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-48734>`__
  - `CVE-2025-30360 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-30360>`__
  - `CVE-2025-30359 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-30359>`__
  - `CVE-2025-5889 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-5889>`__

.. _opsmgr-server-8.0.8:

|onprem| Server 8.0.8
~~~~~~~~~~~~~~~~~~~~~

*Released 2025-06-05*

Improvements
~~~~~~~~~~~~

- Updates the MongoDB Agent to :ref:`108.0.8.8817-1 
  <mongodb-108.0.8.8817-1>`.
- Supports :bic:`MongoDB Connector for BI </>` 2.14.23.
- Supports :dbtools:`MongoDB Database Tools 100.12.1 </release-notes/database-tools-changelog>`.
- Updates {+mongosh+} to 2.5.2.
- Ubuntu 24.04 Agent binaries are now included in Ops Manager 8.0.
- Improves indication and reporting when Feature Compatibility Version 
  (FCV) is undergoing a transition.
- Removes unsupported ``ctime`` option from the ``timeStampFormat`` 
  parameter in Advanced Configuration Options.
- When starting backup, if automation config is available, it is now 
  validated to ensure the ``hostCluster`` contains all shards.
- Updates ``lastTopology`` for third party backup if cluster topology 
  changes after management but before preferred nodes are set.
- Handles deduplication of third party backup oplog metadata.
- Switches S3 custom keystore creation logging from info to debug and 
  improves cache handling.
- Improves reliability of E2E test automation for local ATM deployments 
  and incremental backup tests.
- Sets ``readAndWriteBlocks`` as the default for file system snapshot 
  stores for higher reliability.
- Increases default ``queryableMongodStartTimeoutMs`` timeout to at 
  least 4 hours.
- Fixes excessive logging and logging errors for ``fileDiffs`` and null 
  ``StreamingOutput`` entities.

Bug Fixes
~~~~~~~~~

- The ``Connect to this instance`` shell command in the UI now 
  defaults to ``mongosh`` for MongoDB 6.0 and above deployments.
- Resolves failure when verifying TLS connections with stand-alone 
  deployments.
- Fixes a backup resource usage CSV download failure due to malformed 
  S3 blockstore JSON structures.
- Fixes an issue where user login would fail after resetting the 
  password post-upgrade, by ensuring password version consistency.
- Deprecated MongoDB version verification is now performed during 
  migration instead of at pre-flight, improving upgrade experience.
- Fixes the following CVEs:
 
  - `CVE-2025-27789 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-27789>`__
  - `CVE-2025-32996 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-32996>`__
  - `CVE-2025-32997 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-32997>`__

.. _opsmgr-server-8.0.7:

|onprem| Server 8.0.7
~~~~~~~~~~~~~~~~~~~~~

*Released 2025-05-03*

Improvements
`````````````

- Updates the {+mdbagent+} to :ref:`108.0.7.8810 
  <mongodb-108.0.7.8810>`.
- Supports MongoDB Database Tools 100.12.0.
- Updates JDK to ``jdk-21.0.7+6``. 
- Supports copying file blocks for incremental snapshot using the
  filesystem store. 
- Adds a validation on the cluster topology when starting backup for
  clusters that are managed by automation agent.

Bug Fixes 
`````````
 
- Updates ``automationConfig`` validations for ``lastErrorMode`` and
  ``lastErrorDefaults`` to eliminate false positives due to Map
  ordering.
- Fixes a bug to ensure that the indexes created on the oplog store
  metadata database exist and are properly functioning on |s3| oplog
  store. 
- Makes |kmip| proxy's ``custodian.Stop()`` command to wait until the server
  is fully stopped. 
- Fixes the following |cve|\s:

  - `CVE-2023-26159 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-26159>`__.
  - `CVE-2023-42282 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-42282>`__.
  - `CVE-2024-11831 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-11831>`__.
  - `CVE-2024-12905 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-12905>`__.
  - `CVE-2024-28849 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-28849>`__.
  - `CVE-2025-27789 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-27789>`__.

.. _opsmgr-server-8.0.6:

|onprem| Server 8.0.6
~~~~~~~~~~~~~~~~~~~~~

*Released 2025-04-03*

- Updates the {+mdbagent+} to :ref:`108.0.6.8796-1 
  <mongodb-108.0.6.8796-1>`.
- Upgrades Jetty library to 11.0.25.
- Reduces the maximum session length (:setting:`mms.session.maxHours`)
  from two months to one week to improve security.
- Adds a new ``mms.cookies.sameSite`` setting to configure cookie behavior:

  - ``Lax`` allows top-level navigation cookies.
  - ``Strict`` restricts cookies to same-site requests.
  - ``None`` permits all cross-site cookies over HTTPS.

  All cookies are now ``httpOnly`` and marked as secure when
  using HTTPS.

- Adds the ability to :ref:`transition between S3-compatible snapshot stores <transition-s3>`
  without terminating the previous backups.

- Adds ability to see any potential oplog gaps in Point in Time Restore 
  in the UI and API.

- Fixes the following issues:

  - Fixes possibly innacurate |fcv| change timestamp warnings.
  - Fixes incorrect redirection to an |idp-full|\s entity ID for 
    |idp-full|\s that don't have single logout (SLO) configured.

    After logging out of |mms|, users are now reminded to also log out of the
    |idp-full| to complete the logout process.

  - Fixes possibly inaccurate restore job statuses when cancelled.

  - Fixes an issue where the user interface passes incorrect values
    for ``pemFilePwd`` for the ``verifyTLSCertificate`` job.

  - Fixes an issue where the {+mdbagent+} ignores the Windows 
    {+mdbagent+} Certificate File information and uses the Linux path instead.

- Fixes the following |cve|\s:

  - `CVE-2021-32050 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2021-32050>`__.
  - `CVE-2023-26159 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-26159>`__.
  - `CVE-2023-42282 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-42282>`__.
  - `CVE-2024-11831 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-11831>`__.
  - `CVE-2024-12905 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-12905>`__.
  - `CVE-2024-21536 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-21536>`__.
  - `CVE-2024-21538 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-21538>`__.
  - `CVE-2024-28849 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-28849>`__.
  - `CVE-2024-29180 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-29180>`__.
  - `CVE-2024-37890 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-37890>`__.
  - `CVE-2024-47535 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-47535>`__.
  - `CVE-2025-22868 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-22868>`__.
  - `CVE-2025-22869 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-22869>`__.
  - `CVE-2025-22870 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-22870>`__.
  - `CVE-2025-24970 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-24970>`__.
  - `CVE-2025-27789 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-27789>`__.
  - `CVE-2025-30204 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-30204>`__.

.. _opsmgr-server-8.0.5:

|onprem| Server 8.0.5
~~~~~~~~~~~~~~~~~~~~~

*Released 2025-03-06*

Improvements
`````````````

- Adds support for |bic-full| 2.14.22.
  
- Compatible with :dbtools:`MongoDB Database Tools 100.11.0 </release-notes/database-tools-changelog>`.

- Releases {+mongosh+} 2.3.9, which addresses {+mongosh+} |cve|\s, to |onprem|. To learn more, see {+mongosh+} 
  Release Notes.

- Adds support for configuring multiple passwords in the :setting:`security.ldap.bind.queryPassword` 
  configuration file option so that users can ensure MongoDB doesn't disconnect from |ldap| 
  after a restart when performing an |ldap| credential rotation. To learn more, see :ref:`enable-ldap-auth`.

- Improves handling of misconfigured core and maximum connection pool sizes.

- Adds ability for |onprem| to recognize a dash (``-``) in the deployment name.

- Exports all stored telemetry data into the related files of the diagnostic logs.

- Improves error handling to avoid ``mongodb-mms stop`` crashing from ``Mongodb-mms-backup-daemon`` 
  errors when the PID file does not exist.

Bug Fixes
```````````

Fixes the following issues:

- Broken documentation link when adding an access list entry.

- Error when saving custom parameter settings due to ``mms.mail.transport``.

.. _opsmgr-server-8.0.4:

|onprem| Server 8.0.4
~~~~~~~~~~~~~~~~~~~~~

*Released 2025-02-06*

Improvements
`````````````

- Updates the {+mdbagent+} to :ref:`108.0.4.8770-1 <mongodb-108.0.4.8770-1>`.
  
- Updates JDK to ``jdk-21.0.6+7``.
  
- Adds support for |bic-full| 2.14.21.
  
- Improves error handling for the ``FileSystemSnapshotStore`` in the event the 
  job directory does not exist.

Bug Fixes
```````````

Fixes the following issues:

- Deployment IDs were not filtered out when multi-region backups were enabled.

- ``bytesReclaimed`` reported compressed size for filesystems
  instead of showing ``fileSize``.

- Downloading logs failed for systems using :term:`syslog` in some cases.

- Upgrades from MongoDB 6.0.x to 7.0.x with |oidc| configured 
  and a pinned FCV became stuck.

.. _opsmgr-server-8.0.3:

|onprem| Server 8.0.3
~~~~~~~~~~~~~~~~~~~~~

*Released 2025-01-10*

Improvements
`````````````

- Hardens the algorithm used for two-way encryption in AppDB. 

- Adds a trigger so that changes to the feature compatibility version (FCV) triggers
  a snapshot.

- Adds an AppDB health check to the |onprem| upgrade process to ensure a successful upgrade.

- Improves {+mdbagent+} connection handling during server overload.

- Adds ``clusterID`` to the |onprem| logs for each snapshot.

- Includes deleted groups in the diagnostic archive for better debugging.

- Adds 320 character limit for :guilabel:`Email Address` and :guilabel:`Mobile Phone Number` 
  fields in the user profile UI.

- Fixes `CVE-2024-52046 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-52046>`__. 

Bug Fixes
```````````

Fixes the following issues:

- Labels did not appear on the 
  :guilabel:`Backup Job Config` page in the Admin UI.

- Configuring or updating :guilabel:`Blockstore Max Capacity (GB)`
  in the UI caused an error.

- The {+mdbagent+} tried to set the |oidc| parameter ``supportHumanFlows`` on 
  MongoDB clusters with FCV 6.0.

- Unsupported mail transport protocol appeared as an option in the Admin UI.

- The Admin UI redirected back to the logs page after viewing.

- The link to the MongoDB Deployment Authentication Mechanism documentation in 
  the UI was incorrect.

.. _opsmgr-server-8.0.2:

|onprem| Server 8.0.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-12-05*

Improvements
`````````````

- Updates the {+mdbagent+} to :ref:`108.0.2.8729-1 <mongodb-108.0.2.8729-1>`.
- Adds support for |bic-full| 2.14.19.
- Adds {+mdbagent+} support for Ubuntu 24.04 on x86_64 architectures.
- Adds support for deploying |onprem| on Ubuntu 24.04 on x86_64 architectures.
- Updates the password hashing algorithm to ``pbkdf2``. Old passwords are migrated
  automatically without any user impact. New passwords cannot exceed 256
  characters. Users with passwords longer than 256 characters must migrate their passwords.
- Adds a new custom configuration :setting:`mms.user.passwordHashIterations`.
  to dynamically modify the number of iterations for the hashing algorithm.
- Adds the following fields to the :ref:`snapshot APIs <snapshots-api>`:
  ``machineId``, ``name``, ``completedTime``, ``fcv``, and ``replicaState``.
- Adds ability to cancel a failed queryable restore for sharded clusters.


Bug Fixes
```````````

Fixes the following issues:

- User invite API didn't respect the :setting:`mms.user.bypassInviteForExistingUsers` settings.
- Deployments from deleted groups caused MongoDB version validation to fail and prevented the |onprem| upgrade.
- Arbiter nodes caused the :guilabel:`Edit Namespace filter` option in the UI to not be visible.
- Topology change requests couldn't be processed when backup wasn't enabled.
- The {+mdbagent+} couldn't download the correct |bic-full| versions on certain platforms.
- When deploying |onprem| in hybrid mode, ``.tmp`` files could be left behind unintentionally.
- The {+mdbagent+} could incorrectly report that goal state was reached
  while encountering a transient error.

.. _opsmgr-server-8.0.1:

|onprem| Server 8.0.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-11-01*

- Updates JDK to ``jdk-21.0.5+11``.
- Supports :ref:`Workload Identity Federation <om-oidc-authentication-workload>` on top of the already existing Workforce Identity Federation. 
- Supports configuring separate SAML signature validation for responses and assertions so that only one is 
  required through the :setting:`mms.saml.signedAssertions` and :setting:`mms.saml.signedMessages` settings.
- Supports ability to set a custom idle session timeout using new app settings, :guilabel:`Idle Session Timeout Mode` and :guilabel:`Idle Session Timeout Max Minutes`.
- Removes the |onprem| version number from the login page.
- Updates the MongoDB Agent to :ref:`108.0.1.8718-1 <mongodb-108.0.1.8718-1>`.
- Adds support for |bic-full| 2.14.17.
- Upgrades Jetty library to 11.0.23.
- Fixes an issue where the {+mdbagent+} gets stuck because indexes are set to the ``CANCEL`` action.
- Fixes `CVE-2024-8184 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-8184>`__.
- Fixes broken ``rpm`` package for |onprem| version 8.0.0 
  containing incorrect version information that could cause standard 
  upgrades to fail. If upgrading from this version to 
  version 8.0.1 or greater, upgrade the package using the 
  ``--oldpackage`` flag:

  .. code-block:: sh

      sudo rpm -Uvh --oldpackage mongodb-mms-<version>.x86_64.rpm


.. _opsmgr-server-8.0.0:

|onprem| Server 8.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-9-30*

.. note::

   The following list contains features and improvements 
   that have been added since |onprem| 7.0.0, many of which 
   are also included in later minor releases of |onprem| 7.0.
   For details, see :ref:`Ops Manager 7.0 releases <opsmgr-server-7.0>`.

- Updates the {+mdbagent+} to :ref:`108.0.1
  <mongodb-108.0.1>`.

MongoDB Cluster Management
``````````````````````````

- Supports managing, monitoring, and backing up MongoDB 8.0 deployments.
- Supports MongoDB 8.0 as a deployment option.
- Supports deployments that use :manual:`config shards </core/sharded-cluster-config-servers/#config-shards>`.
  
  .. note::

     :ref:`Queryable backups <restore-from-queryable-backup>` 
     are not supported when you use config shards.

- Deprecates support for MongoDB 4.4 and MongoDB 5.0 deployments.
- Deprecates support for MongoDB Server 6.0 as a :ref:`backing database <om-install-backing-dbs>`.
- Removes support for MongoDB 4.2 deployments.

Backup
``````

- Supports performing :ref:`on-demand snapshots <on-demand-snapshots>` 
  in addition to scheduled snapshots.
- Supports enabling and configuring :ref:`regional backups <regional-backup>`.
- Supports parsing multiple certificates, or a chain, from PEM
  files for |s3| backup store configuration.
- Adds additional snapshot history metadata for block tracking,
  incremental updates for data and indexes, transfer speed, and duration in the
  :guilabel:`Admin` interface and :guilabel:`Diagnostic Archive`.
- Adds additional snapshot metrics to the snapshot summary table.
- Adds ability to track restore block download performance.
- Enhances logging for MongoDB blockstores groom progress and checks 
  that grooms have enough space to run before starting.

Automation
``````````

- Improves the redaction of sensitive fields.
- Supports ``net.tls.clusterAuthX509`` parameter in MongoDB 7.0 for
  ``clusterAuthMode`` set to ``x509``. 
- Adds ability to configure the :setting:`net.tls.clusterCAFile` parameter.
- Adds API support for project-level MongoDB log rotation settings.
- Adds automation support for :manual:`at-rest encryption
  </core/security-encryption-at-rest/#encryption-at-rest>` of
  :ref:`audit logs <deployment-advanced-options-audit-log>` in MongoDB
  6.0 and later versions.
  
|onprem| Platform Support
```````````````````````````

- Removes |onprem| support for RedHat Enterprise Linux 7.
- Removes |onprem| support for SUSE Linux Enterprise Server 12.
- Removes |onprem| support for Ubuntu 20.04 LTS.
- Deprecates |onprem| support for Amazon Linux v2 LTS.
- Deprecates |onprem| support for Debian 11.
