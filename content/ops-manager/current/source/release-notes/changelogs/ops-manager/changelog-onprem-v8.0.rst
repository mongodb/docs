.. _opsmgr-server-8.0.17:

|onprem| Server 8.0.17
~~~~~~~~~~~~~~~~~~~~~~

*Released 2025-12-08*

Improvements
~~~~~~~~~~~~

- Implement APIs for organization and project role mappings.
- Implements a :ref:`Telemetry <om-telemetry-overview>` report to collect and send 
  |onprem| usage data to MongoDB, with controls to enable or disable telemetry 
  through the |onprem| UI or API.
- Adds |oidc| support for |onprem| user authentication.
- Addresses `CVE-2025-12383 <https://www.cve.org/CVERecord?id=CVE-2025-12383>`__ by updating the Jersey libraries to 3.1.10.

Bug Fixes
~~~~~~~~~

- Fixes an issue where tooltips were not displayed in |onprem|.
- Fixes an issue in the Agent where disabling |ldap| authorization did not cause 
  a rolling restart.
- Fixes an issue where destination targets did not load when restoring an 
  imported snapshot from the snapshot list.
- Fixes an issue where snapshots were duplicated in the snapshots list.
- Resolves blocked automation configuration changes when ``mms.mail.transport`` 
  is present.
- Accounts for deleted but retained snapshots when performing dead bytes calculation.

.. _opsmgr-server-8.0.16:

|onprem| Server 8.0.16
~~~~~~~~~~~~~~~~~~~~~~

*Released 2025-11-06*

Improvements
~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`108.0.16.8895-1 <mongodb-108.0.16.8895-1>`.
- Adds support for |bic-full| 2.14.25.
- Updates JDK to `jdk-21.0.9+10 <https://adoptium.net/temurin/release-notes/?version=jdk-21.0.9+10>`__.
- Upgrades the Jetty library to 11.0.26.
- Introduces an app setting to bypass on-demand snapshots triggered by FCV change detection.
- Updates the power build process to use rhel8 and removes rhel7 support in Ops Manager versions 8.0 and later.
- Updates ``golangci-lint`` to 2.5.0.
- Ensures correct collection of CPU metrics when using host mapping aliases in deployments.
- Implements a general-purpose admin settings API that supports programmatic authentication setup.
- Adds ``restartRequired`` flags for appropriate admin settings exposed through the public API.

Bug Fixes
~~~~~~~~~

- Fixes intermittent failures in ``GetProcessConfigJobSuite.TestGetProcessConfigJob``.
- Fixes the time range filter functionality in the Ops Manager :guilabel:`Activity Feed` tab.
- Fixes a race condition that occurred during clustershot startup and shutdown.
- Fixes failures in unsupported MongoDB version checks caused by missing or invalid host versions.
- Suppresses alerts and exceptions for invalid host versions in unsupported checks.
- Makes server-side admin settings validation identical to UI validation, enforcing comprehensive validation and pre-flight checks.
- Removes app setting validation for ``mms.mongoDbUsage.defaultUsageType`` to prevent breaking existing customer setups.
- Addresses `CVE-2025-5115 <https://www.cve.org/CVERecord?id=CVE-2025-5115>`__ by updating Jetty to 11.0.26.

.. _opsmgr-server-8.0.15:

|onprem| Server 8.0.15
~~~~~~~~~~~~~~~~~~~~~~

*Released 2025-10-19*

Improvements
~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`108.0.15.8882-1 <mongodb-108.0.15.8882-1>`.
- Supports :dbtools:`MongoDB Database Tools 100.13.0 </release-notes/database-tools-changelog/#100.13.0-changelog>`.

- Makes the following improvements to the |onprem| UI:

  - Removes the :guilabel:`Preview` tag from :ref:`OIDC <enable-oidc-auth>` 
    options in the UI and documentation.
  - Adds an :guilabel:`Options` menu to the :ref:`Logs <mongodb-logs>` page
    for ``mongos`` instances in sharded clusters.
  - Adds server list to the :guilabel:`Shutdown` dialog for replica sets to 
    show all affected servers.
  - Adds alerts for detecting stale workloads through :guilabel:`OpCounter` 
    in :ref:`Available Metrics <review-available-metrics>`.

- Makes the following improvements to the {+admin-api+}:

  - Supports updating :ref:`project settings <manage-group-settings>` in the 
    {+admin-api+}.
  - Adds LDAP configuration validation support to the Admin Settings API.
    To learn more, see :ref:`Manage LDAP Authentication <enable-ldap-auth>`.

- Makes the following improvements to |s3| blockstore backups:

  - Adds support for conditional writes on |s3| blockstore objects.
  - Improves log handling in :ref:`groom jobs <grooms-page>`. Verifies block
    existence before logging exceptions, checks the destination cluster's |s3|
    blockstore to reduce failed-to-copy-block log noise, and skips
    ``NoSuchKey`` errors when the |s3| blockstore exists.

Bug Fixes
~~~~~~~~~

- Fixes an issue where upgrading |onprem| to version 8.0.12+ couldn't complete
  due to failed or incomplete upgrade steps. |onprem| now re-applies
  migration steps as needed to complete the upgrade.
- Adds information logging for ``RollingRestartArgs`` to aid 
  troubleshooting.
- Fixes an issue where the :guilabel:`Copy` button in the Prometheus integration 
  interface was misaligned.
- Fixes an issue where invalid metric types prevented the |onprem| global alert 
  configuration from rendering.
- Fixes an issue where backups couldn't start for unmanaged clusters.

.. _opsmgr-server-8.0.14:

|onprem| Server 8.0.14
~~~~~~~~~~~~~~~~~~~~~~

*Released 2025-09-17*

Improvements
~~~~~~~~~~~~

- Prevents the clean-up of the database path after restore operations, 
  improving backup and restore reliability.
- Enables MongoDB Server 8.2 for production use for MongoDB deployments
  managed by Ops Manager 8.0. MongoDB 8.2 is not supported for Ops
  Manager 8.0 backing databases, including AppDB.

  This minor release provides early access to new features and
  improvements before the next Long-Term Support (LTS) version.
  
  - Minor releases like 8.2 are not LTS and follow a 6-month release
    cadence. To receive ongoing bug and security fixes, you must stay on the
    LTS version or upgrade to the latest available minor release.
    Patches are not backported to previous minor versions (for example,
    once 8.3 is released, 8.2 no longer receives patches).
  - Choosing the minor release path requires a commitment to perform
    sequential upgrades through each subsequent release. Skipping
    minor versions is not supported when upgrading.
  - Upgrading to a new minor version requires updating the Feature
    Compatibility Version (FCV). This step is critical in the upgrade
    process and follows the same logic as a :doc:`major version upgrade </tutorial/change-mongodb-version>`.
  - You have a 2-month grace period after the next release becomes
    available to complete your upgrade and remain supported.

Bug Fixes
~~~~~~~~~

- Fixes potential confusion caused by a hardcoded slow query threshold message 
  by updating the UI to display either the configured threshold or a generic 
  non-misleading message.
- Migrates deprecated ``eslint-plugin-class-property`` to ``eslint-plugin-babel`` 
  to eliminate dependency deprecation warnings and improve maintainability.
- Fixes failures in the grouped ``MonitoringTest`` tasks for |onprem| automation 
  by updating relevant build variants and automation logic.

.. _opsmgr-server-8.0.13:

|onprem| Server 8.0.13
~~~~~~~~~~~~~~~~~~~~~~

*Released 2025-09-10*

Improvements
~~~~~~~~~~~~

- Adds support for API import of existing deployments into automation 
  management by |mms|. For more information, see 
  :doc:`Import Deployments </reference/api/import-deployments>`.
- Adds MongoDB 8.2 deployment support as a preview, not for production use.
  Full support will be available in |onprem| 8.0.14
- Updates the {+mdbagent+} to :ref:`108.0.13.8870-1 <mongodb-108.0.13.8870-1>`
- Supports MongoDB Database Tools 100.13.0
- Logs ``mongod.lock`` contents in unexpected cases for improved diagnostics
- Removes the ``oplogEnd`` field from the {+mdbagent+} backup cursor parsing to 
  simplify backup logic
- The {+mdbagent+} detects the absence of the AVX instruction set and logs a warning 
  to improve supportability for MongoDB 5+
- Updates shard metadata in the config server for ``config.system.sharding_ddl_coordinators`` 
  on restores for MongoDB 8.2+
- Allows specifying the maximum supported automation version for "special LTS" version filtering
- Shows restore job IDs in the ``CONCURRENT_RESTORES_JOB_IDS`` error code
- Specifies button type for table paginator buttons to prevent unintended form submissions
- Makes additional SAML fields (Service Provider Base URL, Entity ID, and SLS/logout redirect) 
  configurable on the Admin Configuration page
- Adds a ``New Server`` option in the ``Hostname`` dropdown for Standalone deployments; 
  includes search
- Improves logic for third-party restore targeting for replica sets that were previously 
  configured as shards

Bug fixes
~~~~~~~~~

- Resolves an issue where MMS automation config failed validation if ``enableMajorityReadConcern`` 
  was set in MongoDB 8.2+
- ``AdjustRoles`` now accounts for role dependencies when creating roles, ensuring 
  proper ordering
- The {+mdbagent+} no longer attempts to take down two data-bearing nodes at once 
  for PSSSA replica set configurations during global update operations
- Fixes a memory spike when iterating the logs directory by using chunked, non-blocking 
  iteration and improved logging
- Fixes ``GetProcessConfigJob`` failing on arbiters when using a non-localhost build command; 
  now respects the localhost exception
- Upgrades deprecated ``@babel/plugin-proposal-*`` dependencies to recommended packages
- Removes deprecated ``@types/react-select`` and ``@types/classnames`` dependencies
- Improves Javadoc for the ``CanonicalHost`` class
- Updates checkpoint targeting logic to execute when an on-demand snapshot is initialized, 
  ensuring snapshots proceed after {+mdbagent+} session renewals
- Fixes imported deployments with LDAP and x509 that were stuck waiting for goal state 
  by reverting to ``AuthAndTlsSettingsSvc``
- Upgrades deprecated ``puppeteer`` dependency to a supported version
- Upgrades deprecated ``sinon`` package to the latest minor version
- Diagnostics archive per group now includes disabled hosts
- Fixes generation of outdated Java dependencies reporting
- Bell icon in navigation now links to the Project Alerts page
- Tidies optime data endpoint arithmetic logic and variable naming
- Disables TRACE requests for the embedded Prometheus server
- Fixes NetSPI 2024 Phase 2 Issue 4 and Issue 6 for sensitive information disclosure in 
  server responses, eliminating exposure of secrets in API responses
- Fixes the following |cve|\s:

  - `CVE-2025-5115 <https://nvd.nist.gov/vuln/detail/CVE-2025-5115>`__
  - `CVE-2025-55163 <https://nvd.nist.gov/vuln/detail/CVE-2025-55163>`__

.. _opsmgr-server-8.0.12:

|onprem| Server 8.0.12
~~~~~~~~~~~~~~~~~~~~~~

*Released 2025-08-07*

Improvements
~~~~~~~~~~~~
- Adds MongoDB 8.2 deployment support as a preview, not for production use. 
  Full support available in Ops Manager 8.0.13.
- Updates the MongoDB Agent to :ref:`108.0.12.8846-1
  <mongodb-108.0.12.8846-1>`.
- Supports |bic-full| 2.14.24.
- Updates JDK to ``jdk-21.0.8+9``.
- Updates {+mongosh+} to 2.5.6.
- Updates PACKAGE_OPS_MANAGER to stub out ``sign_artifact`` when
  Garasign credentials aren't available, allowing patch builds without
  Garasign.
- Adds ``pendingRangeDeletion`` state to shard removal Automation Status
  logs.
- Adds {+mdbagent+}, Automation, and UI support for MongoDB on RHEL 9
  (s390x).
- Implements skip migration logic when |onprem| version is not changing.
- Allows custom/development/quarterly server builds for easier
  integration of new features like Live Restore, behind config params.
- Removes ``AutomationConfigDeploymentView`` and
  ``AutomationConfigDeploymentMapper`` as part of code clean-up.
- Updates and generates new certificates for KMIP server and re-enables
  related tests.
- Documents and provides clear messages when ``OplogSnapshot`` fails due
  to missing oplogs.
- Adds a retry loop around deletion operations in the filesystem groom,
  improving success on async/lazy filesystems.
- Adds timeout handling to SMTP connections, preventing hung job threads
  and easier diagnostics.

Bug Fixes
~~~~~~~~~

- Fixes a bug where ``auditLog.auditEncryptionKeyIdentifier`` could not
  be set through the UI.
- Fixes a bug where the Miscellaneous |onprem| Config tab always showed
  a "Changes you made may not be saved" warning, even when no changes
  were made.
- Fixes an Agent bug that caused crashes when modifying a process's
  storage fields. Now includes ENCRYPTION_CIPHER_MODE  in removed fields
  for ephemeral standalone instances to prevent crashes.
- Adds a retry loop when setting group config to inactive during
  terminate job operations to enhance reliability.
- Fixes the following |cve|\s:

  - `CVE-2025-48924 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-48924>`__
  - `CVE-2025-7783 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2025-7783>`__

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
- Introduces |aws| SDK v2 as default |aws| SDK version. |aws| SDK v1 is
  still available, but must be set manually in the |onprem|
  configuration.

  .. note ::

    .. include:: /includes/backup/aws-sdkv2-s3-compatibility-note.rst

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
