.. _opsmgr-server-9.0.2:

|onprem| Server 9.0.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2026-11-12*

Improvements
~~~~~~~~~~~~

- Introduces license keys for MongoDB Enterprise Advanced orders. A
  license key is a signed file that MongoDB issues to confirm that
  your order is active. |onprem| shows your license key status and
  renewal timeline on the License Key Manager page and notifies you
  through banners, system alerts, and email before your order end
  date. To learn more, see :ref:`license-keys`.
- Updates the {+mdbagent+} to
  :ref:`109.0.2.9380-1 <mongodb-109.0.2.9380-1>`.
- Supports :dbtools:`MongoDB Database Tools 100.20.1
  </release-notes/dbtools-100.20.0-changelog>`.
- Updates the bundled {+mongosh+} version to 2.14.0.
- Adds public APIs to shut down, start, restart, and resync a
  process. Resync operations require ``votes: 0``.
- Adds v2.0 versions of the Get Host endpoints, which report
  replica set member replication health through the ``tooStale``
  and ``lastReplError`` fields.
- Stores and rolls up per-index ``mongot`` metrics, which lets you
  monitor the rebuild progress of individual Atlas Search indexes.
- Makes the following improvements to snapshot and oplog stores that
  use |s3|:

  - Reads the Object Lock settings (whether you enabled Object Lock,
    the retention mode, and the retention period) from the S3 bucket
    when you create or update a store, which removes the need to
    enter these values in |onprem|.
  - Runs a periodic job that compares each store with its bucket and
    updates the stored Object Lock settings if they differ. The job
    also updates stores that existed before this change.
  - Stages objects that fail to delete during a groom for a later
    retry, so a failed delete no longer fails the entire groom job.
  - Retries groom delete failures on S3 block uploads that transient
    errors cause, such as ``503 SlowDown``, instead of aborting the
    snapshot.
  - Uses a version-aware S3 ``HEAD`` request to classify staged
    delete failures. |onprem| retries at the retain-until date of
    the object and distinguishes permission denials from retention
    waits.
  - Pins oplog slice reads under Object Lock to the recorded S3
    ``versionId`` and removes the
    ``brs.oplogStoreFallBackToLatestVersion`` setting.
  - Rejects S3 endpoints that have invalid DNS syntax in the
    hostname with a validation error instead of a 500 Internal
    Server Error.
  - Returns a warning instead of an error when the Object Lock
    settings in a create or update request don't match the bucket.
    |onprem| treats the bucket settings as authoritative.
  - Clarifies that the :guilabel:`Encrypted Credentials` checkbox in
    the S3 blockstore configuration applies only to the AWS access
    key and secret key.

- Makes the following improvements to third-party backup:

  - Supports backing up deployments that |onprem| Automation doesn't
    manage. |onprem| disables Backup without Automation by default. To
    enable it, set ``brs.thirdparty.backup.allowWithoutAutomation``.
    Restores for these deployments still require the Automation
    Agent.
  - Handles cluster topology changes, such as adding or removing a
    shard or replica set member, that occur during a backup.
  - Displays authentication credential fields in the manage dialog
    when you enable authentication.
  - Requires ``dbPath`` in the API request when the hosts aren't
    managed by Automation. Previously, |onprem| used a default path
    if you didn't specify one. If you already use third-party backup
    on these hosts, update your integration to specify ``dbPath``.

- Makes the following improvements to restores:

  - Marks expired automated restores as completed and clears their
    restore directives from the automation configuration, which
    removes the need for manual AppDB changes.
  - Marks manual pull restores as expired after the download link
    expires, instead of leaving them in the "waiting for customer"
    state.
  - Returns HTTP 410 Gone instead of 404 Not Found for revoked
    restores.
  - Blocks deletion of an imported snapshot while restore jobs are
    in progress. To override this check, use ``force=true``.

- Makes the following improvements to the |onprem| UI:

  - Displays results on page load, so users no longer need to click
    :guilabel:`Search`, on the :guilabel:`Jobs`, :guilabel:`Job
    Timeline`, and :guilabel:`Snapshots` pages under
    :guilabel:`Admin` > :guilabel:`Backup`.
  - Aborts superseded or unmounted search requests on the
    :guilabel:`Jobs`, :guilabel:`Job Timeline`, and
    :guilabel:`Snapshots` pages so that stale results don't
    overwrite newer ones.
  - Removes the delete and expiry actions for imported snapshots
    from the project-level :guilabel:`Continuous Backup` page.
    Deletion remains available on the :guilabel:`Imported
    Snapshots` page under :guilabel:`Admin` > :guilabel:`Backup`.
  - Renames the ``BACKUP_D2S3`` beta feature to "Backup Direct To
    S3" on the :guilabel:`Project Beta Features` page.
  - Fixes broken documentation links under :guilabel:`Deployment` >
    :guilabel:`Modify` > :guilabel:`Advanced Configuration Options`.

- |onprem| collects product usage telemetry, which sends configuration
  and health metadata about your installation and its deployments to
  MongoDB. MongoDB uses this information to understand how you
  configure and use |onprem| and to prioritize product improvements.
  You can turn off product usage telemetry only if your license key
  includes a telemetry exemption. The :guilabel:`Learn more` link in
  the telemetry banner points to the troubleshooting documentation.

- Makes the following improvements to performance and stability for
  large sharded clusters:

  - Reduces database queries when you view cluster pages and status
    charts, which speeds up page and chart loads.
  - Streamlines discovery ping processing to lower memory and CPU
    usage and to avoid multi-gigabyte memory spikes.
  - Fixes a memory allocation bug that could cause out-of-memory
    errors under heavy load.

- Rejects requests to enable ``disableCertificateRevocationCheck``
  through the backup configuration API when backup agents don't
  verify server certificates. This prevents agent connection
  failures that return unclear error messages.
- Resolves the update list for the D2S3 cluster-wide toggle from the
  backup jobs of the cluster instead of cluster status model IDs,
  which prevents silent skips when the IDs differ.
- Applies optimistic concurrency to automation configuration
  updates. The ``version`` field in the root of the request body is
  the precondition. A stale version returns ``409 Conflict`` instead
  of overwriting a newer configuration.
- Builds the backup restore utility binaries (``pit-restore`` and
  ``backup-tunnel``) on actively supported base distributions
  instead of Amazon Linux 2 and RHEL 7, which have reached end of
  life.
- Improves backup logging:

  - Logs a stalled or failed staged-deletion drain of the backup
    daemon at ``INFO`` or ``WARN`` level at the default log level.
  - Logs the groom-late alert suppression reason at ``INFO`` level.
  - Logs transient MongoDB exceptions during backup metadata pruning
    at ``WARN`` level instead of ``ERROR`` level.
  - Reports the actual pool state and per-request demand as separate
    numbers in the ``WTCheckpoint`` 429 backpressure log message.

- Updates the trust store of the bundled JDK.
- Upgrades the following components to address security
  vulnerabilities:

  - MongoDB Java driver to ``5.11.1``, which includes fixes for
    failures that could occur after an out-of-memory error
  - Snappy compression library to ``1.1.10.11``
  - Jetty to ``12.0.40``, which addresses a chunked-request HTTP
    request smuggling vulnerability
  - jsoup to ``1.23.2``, which addresses an uncontrolled resource
    consumption vulnerability in XML parsing
  - ``handlebars`` to ``4.7.10``, which addresses JavaScript
    injection and unsafe template embedding vulnerabilities
  - Jackson (``jackson-core`` and ``jackson-databind``) to
    ``2.22.3``, FreeMarker to ``2.3.35``, and ``moment`` to
    ``2.31.0``
  - npm dependencies ``qs`` to ``6.16.0``, ``decode-uri-component``
    to ``0.5.0``, and ``@humanfs/node`` to ``0.16.8``
  - Go toolchain to ``1.26.10``, which addresses a vulnerability in
    the ``crypto/x509`` package
  - netty, logback, OpenTelemetry, Guava, Apache Directory LDAP API,
    and ``ip-address`` as part of a Q4 2026 security dependency
    update

Bug Fixes
~~~~~~~~~

- Fixes a security issue where restore job secrets were exposed to
  read-only project users through the parallel download parameters
  in public restore job ``GET`` routes.
- Fixes a security issue where you could create test alert
  configurations that reference the configuration of a different
  project.
- Fixes a stored cross-site scripting (XSS) vulnerability in the
  legacy host view where |onprem| rendered hostnames that contain
  markup without escaping.
- Hardens agent-driven reconciliation configuration writes to
  prevent privilege escalation through the reconciliation flow.
- Fixes a cross-tenant metadata exposure where the restore
  destination endpoint looked up a cluster snapshot by ID without
  an ownership check.
- Removes the deprecated, unauthenticated backup rollback endpoint,
  which could cause unbounded request body buffering and exhaust the
  memory of the shared |onprem| |jvm|.
- Requires authentication and a shared secret header for the backup
  test utility S3 blockstore endpoints.
- Fixes a path traversal issue in the diagnostics archive where
  unencoded replica set names could place files outside the
  extraction directory.
- Fixes a data race on the ``ThirdPartyOplogPruneTimes`` map that
  could crash the agent during third-party oplog pruning.
- Fixes a data race in third-party restore request creation that
  could make a restore job unfindable after creation.
- Fixes a backup daemon crash at startup when the head directory
  path has no trailing slash.
- Enforces the backup daemon head directory identity in a single
  canonical form (with a trailing slash), and migrates existing data
  on upgrade, which prevents silent job pickup failures that
  spelling mismatches cause.
- Fixes an issue where staged deletion of object-locked snapshots
  delayed the deletion time by up to 7 days beyond the Object Lock
  expiry.
- Prevents removal of an S3 oplog store while staged file slices
  are pending deletion, which matches the existing behavior for S3
  snapshot stores.
- Adds the ``x-amz-object-lock-retain-until-date`` header to oplog
  metadata files at ``PUT`` time, which prevents premature prune
  attempts that fail with ``AccessDenied``.
- Stages superseded object-locked metadata versions for later
  deletion during S3 groom metadata re-upload, instead of attempting
  an immediate deletion that fails with ``AccessDenied``.
- Tolerates version-less delete failures during Object Lock
  validation cleanup on S3-compatible stores that don't support soft
  delete on object-locked buckets.
- Restores the ``validateObjectRetentionProperty`` check in the S3
  store creation checks, which verifies that the error code regular
  expression matches the retention shortening refusal of the
  provider.
- Fixes an issue where creating an S3 store without
  ``portableBackupEnabled`` against an object-locked bucket silently
  enabled portable backup.
- Fixes an SDK v2 regression where S3 region resolution contacted
  EC2 IMDS on non-EC2 hosts, which caused delays of approximately 15
  seconds for each S3 operation in on-premises deployments.
- Fails a third-party snapshot when the targeted node leaves the
  monitoring topology, instead of causing a null-pointer exception
  that blocks all targeting for the project.
- Sends chunk downloads for parallel sharded cluster restores to the
  regional Restore Endpoint of each shard instead of the
  project-level address, which fixes S3 403 errors in multi-region
  backup configurations.
- Sends oplog requests for sharded cluster point-in-time restores to
  the regional Restore Endpoint of each shard instead of the
  project-level address.
- Fixes an issue where third-party restore jobs hung indefinitely
  when agents reported |fqdn| hostnames but the automation
  configuration used short hostnames. The restore now resolves
  hostnames through the canonical host mapping.
- Applies snapshot protection to restores that you start through the
  public API. Previously, the unset ``isAutomatedRestore`` field
  caused the retention guard to skip these jobs.
- Validates the fetched binary in the queryable restore tunnel
  download endpoint before serving it, which prevents corrupt
  tarballs when the artifact store returns an error payload.
- Fixes an issue where abandoning the :guilabel:`Confirm & Deploy`
  step during a restore left a :guilabel:`Review & Deploy` banner
  that led to a blank page.
- Fixes an issue where the public API ignored the ``completed``
  filter when listing snapshots for sharded clusters.
- Fixes an issue where ping ingestion pruned cluster members that
  were absent from a partial discovery batch, which caused
  intermittent backup start 400 errors on sharded clusters.
- Fixes an issue where the agent didn't enforce the backup cursor
  namespace filter, which caused the agent to include entries that
  the server over-reports on ``mongod`` 9.0. The agent now drops
  those entries.
- Specifies read concern for every operation of the restore agent
  instead of using the cluster default, which prevents restores from
  blocking when the cluster has ``defaultReadConcern: majority``.
- Specifies a fresh ephemeral port with retry logic when ``mongod``
  fails to start during a restore because the selected port is
  already in use.
- Fixes an issue where config shard clusters showed an
  ``UNAVAILABLE`` status because ``host.shardId`` alternated between
  ``config`` and null on every other ping.
- Colors nodes of the same search service with a shared color on the
  :guilabel:`Servers` tab instead of coloring each ``mongot`` node
  individually.
- Fixes an issue where third-party backup oplog processing emitted
  an |fcv| change event when the |fcv| value hadn't changed.
- Fixes the following CVEs:

  - `CVE-2026-111943 <https://nvd.nist.gov/vuln/detail/CVE-2026-111943>`__
  - `CVE-2024-6485 <https://nvd.nist.gov/vuln/detail/CVE-2024-6485>`__
  - `CVE-2025-1647 <https://nvd.nist.gov/vuln/detail/CVE-2025-1647>`__
  - `CVE-2026-89407 <https://nvd.nist.gov/vuln/detail/CVE-2026-89407>`__
  - `CVE-2026-89425 <https://nvd.nist.gov/vuln/detail/CVE-2026-89425>`__
  - `CVE-2026-68497 <https://nvd.nist.gov/vuln/detail/CVE-2026-68497>`__
  - `CVE-2026-83557 <https://nvd.nist.gov/vuln/detail/CVE-2026-83557>`__
  - `CVE-2026-19032 <https://nvd.nist.gov/vuln/detail/CVE-2026-19032>`__
  - `CVE-2026-84939 <https://nvd.nist.gov/vuln/detail/CVE-2026-84939>`__
  - `CVE-2026-75140 <https://nvd.nist.gov/vuln/detail/CVE-2026-75140>`__
  - `CVE-2026-17495 <https://nvd.nist.gov/vuln/detail/CVE-2026-17495>`__
  - `CVE-2026-106444 <https://nvd.nist.gov/vuln/detail/CVE-2026-106444>`__
  - `CVE-2026-106445 <https://nvd.nist.gov/vuln/detail/CVE-2026-106445>`__
  - `CVE-2026-106446 <https://nvd.nist.gov/vuln/detail/CVE-2026-106446>`__
  - `CVE-2026-82417 <https://nvd.nist.gov/vuln/detail/CVE-2026-82417>`__
  - `CVE-2026-82562 <https://nvd.nist.gov/vuln/detail/CVE-2026-82562>`__
  - `CVE-2026-45822 <https://nvd.nist.gov/vuln/detail/CVE-2026-45822>`__
  - `CVE-2026-19203 <https://nvd.nist.gov/vuln/detail/CVE-2026-19203>`__
  - `CVE-2026-118259 <https://nvd.nist.gov/vuln/detail/CVE-2026-118259>`__
  - `CVE-2026-102554 <https://nvd.nist.gov/vuln/detail/CVE-2026-102554>`__
  - `CVE-2026-19880 <https://nvd.nist.gov/vuln/detail/CVE-2026-19880>`__
  - `CVE-2026-101913 <https://nvd.nist.gov/vuln/detail/CVE-2026-101913>`__
  - `CVE-2026-104721 <https://nvd.nist.gov/vuln/detail/CVE-2026-104721>`__
  - `CVE-2026-93492 <https://nvd.nist.gov/vuln/detail/CVE-2026-93492>`__
  - `CVE-2026-93565 <https://nvd.nist.gov/vuln/detail/CVE-2026-93565>`__
  - `CVE-2026-93566 <https://nvd.nist.gov/vuln/detail/CVE-2026-93566>`__
  - `CVE-2026-108106 <https://nvd.nist.gov/vuln/detail/CVE-2026-108106>`__
  - `CVE-2026-108104 <https://nvd.nist.gov/vuln/detail/CVE-2026-108104>`__
  - `GHSA-p498-v437-472g <https://github.com/advisories/GHSA-p498-v437-472g>`__

.. _opsmgr-server-9.0.1:

|onprem| Server 9.0.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2026-10-05*

Improvements
~~~~~~~~~~~~

- Updates the {+mdbagent+} to
  :ref:`109.0.1.9309-1 <mongodb-109.0.1.9309-1>`.
- Updates JDK to jdk-25.0.4.1+1.

Bug Fixes
~~~~~~~~~

- Fixes an unbounded backup-agent session tag vulnerability where a
  caller could create unlimited persistent session documents per
  group, potentially exhausting the heap of the |onprem| web or
  alert-processing JVM. |onprem| now adds a per-group session cap, a
  read limit, and input validation for the ``tag``, ``ah``, and
  ``sk`` parameters.

.. _opsmgr-server-9.0.0:

|onprem| Server 9.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2026-09-29*

Improvements
~~~~~~~~~~~~

- Updates the {+mdbagent+} to
  :ref:`109.0.0.9285-1 <mongodb-109.0.0.9285-1>`.
- Enables opt-in OpenTelemetry-compatible collection that exports
  {+mdbagent+} metrics to a customer-configured observability
  platform. Configure the collector endpoint through Automation
  Config. To learn more, see :ref:`otel-integration-mms`.
- Enables backup agents to upload snapshot blocks directly to
  |s3| using presigned URLs, bypassing the |onprem| server data
  path. To learn more, see :ref:`om-direct-s3-backup`.
- Extends |s3| Object Lock immutability to oplog slices, enabling
  immutability for the entire point-in-time recovery chain. To
  learn more, see :ref:`om-immutable-s3-snapshots`.
- Adds public APIs to trigger replica-set re-elections by
  stepping down the primary or promoting a specified secondary.
  To learn more, see :ref:`api-re-election-jobs`.
- Adds |onprem| and {+mdbagent+} platform support for RHEL 10,
  Debian 13, and SUSE Linux Enterprise Server 16. To learn more,
  see :ref:`ops-manager-os-compatibility`.
- Updates JDK to Java 25.0.3+9.0.LTS.
- Ends support for the |bic-short-no-link|, which reached end of life
  on September 30, 2026. The binary is no longer available from the
  MongoDB Download Center.

  - |onprem| no longer supports adding new |bic-short-no-link|
    instances.
  - Your existing |bic-short-no-link| instances remain available and
    manageable.

  MongoDB recommends using the :ref:`SQL Interface
  <connect-with-sql-overview>` instead. To learn more, see
  :ref:`manage-bi-connector`.
