.. _opsmgr-server-3.6.12:

|onprem| Server 3.6.12
~~~~~~~~~~~~~~~~~~~~~~

*Released on 2019-05-02*

- Logging improvements.

- Updated JDK to version 8u212. On Windows, Ops Manager now requires
  the `Visual C++ Redistributable Packages for Visual Studio 2013
  <https://www.microsoft.com/en-us/download/details.aspx?id=40784>`__.

- **EOL:** Ops Manager support for Ubuntu 14.04 has ended. Ops Manager
  3.6.12 is not supported on Ubuntu 14.04.

.. _opsmgr-server-3.6.11:

|onprem| Server 3.6.11
~~~~~~~~~~~~~~~~~~~~~~

*Released on 2019-02-07*

- Updated |jdk| to `AdoptOpenJDK 8u202 <https://github.com/AdoptOpenJDK/openjdk8-binaries/releases/tag/jdk8u202-b08>`__.

- **Fix:** For queryable restores, the configurable expiration value
  (:setting:`brs.queryable.expiration <Expiration>`) now also applies to
  MongoDB authentication requests.

- **Fix:** Resolve transient inability to restore a snapshot if a
  backup data pruning job (garbage collection) is running during the
  restore.

- **Fix:** Improve password verification for sensitive actions within
  |onprem|, for |onprem| installations using |ldap| for user
  authentication, and ActiveDirectory as the |ldap| server.

.. _opsmgr-server-3.6.10:

|onprem| Server 3.6.10
~~~~~~~~~~~~~~~~~~~~~~

*Released on 2019-01-10*

- Updated |jdk| to `AdoptOpenJDK 8u192 <https://github.com/AdoptOpenJDK/openjdk8-binaries/releases/tag/jdk8u192-b12>`__.

- Agent Upgrades: :ref:`automation-4.5.17.5289-1`.

.. _opsmgr-server-3.6.9:

|onprem| Server 3.6.9
~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-11-01*

- **Critical Fix:** Backup initial syncs may fail with an error during
  the oplog application phase, if retryable writes are executed on the
  source cluster during the backup initial sync.

- **Fix:** Log Collection was unable to complete if one of the
  requested files was an empty file.

- |ldap| connections will now use a connection pool. This should reduce
  load on |ldap| servers.

- Update |jdk| to 8u192.

- Agent Upgrades: :ref:`automation-4.5.16.5284-1`.

.. _opsmgr-server-3.6.8:

|onprem| Server 3.6.8
~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-08-02*

- **Critical Fix:** Avoid failures to upgrade from Ops Manager 3.4
  when using local mode for MongoDB version management.

- Improve support for global diagnostic download for large deployments.

- Updates Ops Manager |jdk| (x86_64) to 8u181, which enables endpoint
  identification by default.
  
- When configuring MongoDB |ldap| authentication, allow setting the
  User to Distinguished Name Mapping without setting the Authorization
  Query Template.

- Agent Upgrades: :ref:`automation-5.4.9.5483`, :ref:`backup-6.0.10.976`

- **Critical Fix:** Set ``TasksMax=infinity`` and 
  ``TasksAccounting=false`` in ``systemd`` scripts for
  SUSE 12 versions of |mms|.
  

.. _opsmgr-server-3.6.7:

|onprem| Server 3.6.7
~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-06-06*

- Ends support for SLES 11 and Ubuntu 12.04.

- Allow compound text indexes.

- **Fix:** Ops Manager holds file handles open on rotated logfiles.

- **Fix:** Error editing some System Alerts.

- Agent Upgrades: :ref:`automation-4.5.15.5279-1`,  :ref:`backup-6.0.10.972-1`, :ref:`monitoring-6.1.4.442-1`

.. _opsmgr-server-3.6.6:

|onprem| Server 3.6.6
~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-05-03*

- At the completion of an automated restore of a sharded cluster,
  ensure that the balancer is enabled.

- Improved handling of MongoDB Server Parameters with boolean values.
  Accept all of true, "true" and 1 as the boolean value true.

- Network charts now display physical bytes in/out instead of logical
  bytes in/out. That is, if network compression is enabled for MongoDB,
  the network charts will now show the compressed bytes in/out.

- Ops Manager now properly handles LDAP names which contain special
  characters.

- Fix: Performance Advisor now supports ingesting MongoDB logs using
  ISO8601-UTC timestamps.

- Fix: Include the script needed to seed a secondary when creating a
  TAR.GZ restore for a config server replica set.

- Fix: Retrieving logs via the Ops Manager UI succeeds when the Server
  Pools feature is also in use.

- Upgrade the bundled JDK to 8u172.

- Agent Upgrades: :ref:`automation-4.5.14.5266`,  :ref:`backup-6.0.9.969`

.. _opsmgr-server-3.6.5:

|onprem| Server 3.6.5
~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-04-05*

- Allow Projects to be deleted from the admin pages, and from Project
  settings.

- Allow queryable restores for compressed snapshots stored in MongoDB
  blockstore snapshot storage.

- Automation support for the new security.ldap.validateLDAPServerConfig
  (MongoDB 3.4.14+)

- Enable log rotation for Backup HEAD dbs.

- Never save localhost/127.0.0.1 as a host mapping.

- Show agent out of date warnings for manually managed Monitoring and
  Backup Agents.

- Support for the MongoDB Connector for BI, version 2.4.1.

- When importing replica sets into Automation, include information on
  replica set tags.

- Agent Upgrades: :ref:`automation-4.5.13.5261`, :ref:`monitoring-6.1.3.436`, :ref:`backup-6.0.8.960`

.. _opsmgr-server-3.6.4:

|onprem| Server 3.6.4
~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-03-01*

- **Fix:** Avoid failures in alert processing when monitoring topology
  for disk partitions cannot be derived correctly.
- **Fix:** Changes to the ``admin.system.version`` collection on
  documents other than the ``featureCompatibilityVersion`` document
  should not abort an initial sync of a backup.
- **Fix:** Prevent the deletion of the last :authrole:`Global Owner` of
  an |onprem| installation.
- **Fix:** :doc:`Suggested Indexes </tutorial/performance-advisor>` for
  nested predicate and sort should not ignore the predicate.
- Support for version 2.4.0 of the
  :bic:`MongoDB Business Intelligence Connector </>`.

- Agent Upgrades: :ref:`automation-4.5.12.2514`, :ref:`backup-6.0.8.752`

.. _opsmgr-server-3.6.3:

|onprem| Server 3.6.3
~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-02-01*

- **Fix:** Email delivery of System Alerts was suppressed and is now
  enabled.

- Security improvements.

- Add new API for administrators to :doc:`configure Backup infrastructure </reference/api/nav/administration-backup>`

- The bundled JDK is version 8u162.

- Add new property (mms.ignoreInitialUiSetup) that allows full
  automation of |onprem| installation and configuration.

- Agent Upgrades: :ref:`automation-4.5.11.2453`, :ref:`backup-6.0.6.724`

.. _opsmgr-server-3.6.2:

|onprem| Server 3.6.2
~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-01-11*

- Add support for MongoDB 3.6.1.

- Add BI Connector information to the Diagnostic Archive.

- Allow Project User Admin to set team roles and remove teams from
  projects.

- Allow user to specify ``sampleRefreshIntervalSecs`` BI Connector
  flag.

- Avoid "Inconsistent backup configuration" message when Monitoring
  Agent fails to communicate with MongoDB.

- Improve parsing of queries by Performance Advisor.

- Log Collection now collects log files from mongos instances.

- Log the list of TLS ciphers in use and any disabled by config.

- MongoDB Enterprise 3.6.2+ is needed on daemons to perform
  queryable restores of 3.6 sharded clusters.

- **Fix:** Bug that prevented backups on an S3-compatible snapshot
  store from being terminated.

- Restrict downgrading clusterAuthMode in the Automation Agent UI.

- Upgrade ``jackson-databind`` to 2.9.3.

- When doing an automated restore, only allow restoring to clusters
  that have a higher FCV than the snapshot and where all mongod
  versions support the snapshots FCV.

- Expand access for the Automation Agent user by adding the
  ``restore@admin`` role.

Fixes
`````

- **Fix:** Bug where Performance Advisor could display "A server error
  has occurred".

- **Fix:** PIT restores of inactive replica sets.

- **Fix:** Add timeouts to Queryable Restores.

- **Fix:** Always set the correct :guilabel:`From` and
  :guilabel:`Reply-To` fields in System Alert emails.

- **Fix:** Extra System Alerts are no longer created.

- **Fix:** Version Manifest no longer reverts to the on-disk version.

- **Fix:** MongoDB 3.6 sharded cluster import no longer blocked.

- **Fix:** Set correct :guilabel:`Maximum Number of Connections` for
  MongoDB 3.6 for Alerting.

.. _opsmgr-server-3.6.1:

|onprem| Server 3.6.1
~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-12-19*

- Agent Upgrades: :ref:`automation-4.5.9.2403`

- **Fix:** Point in time automated restores now downloads the correct
  utility.

- **Fix:** When |onprem| is configured to use LDAP for user
  authentication, do not allow users to be invited.

- **Fix:** Allow MongoDB Advanced Options to be edited for an entire
  sharded cluster.

- **Fix:** Allow clusterAuthMode independently of X509 auth.

- **Fix:** Allow import of deployments using the
  net.ssl.allowConnectionsWithoutCertificates parameter.

- **Fix:** Explicitly specify the collation {locale: "simple"} in
  createIndex during initial sync.

- **Fix:** Users should be able to convert from LDAP native to saslauthd
  using the UI.

- Performance improvements for queryable restores.

- Security enhancements.

.. _opsmgr-server-3.6.0:

|onprem| Server 3.6.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2017-12-05*

- Added support for a new :doc:`organizations and projects hierarchy
  </organizations-projects>` to facilitate the management of your Ops
  Manager deployments. Groups are now known as Projects. You can put
  multiple Projects under an Organization.

- Added support for nested LDAP groups via the ``member`` field when
  configuring |onprem| to use LDAP for |onprem| authentication.

  Although |onprem| 3.6 supports the use of either ``member`` or
  ``memberOf`` for configuration, support for LDAP via the ``memberOf``
  field will be removed in a future version of |onprem|. When
  possible, use ``member`` instead.
  
- Added support for a new :doc:`Agent API Key model
  </tutorial/manage-agent-api-key>`. Multiple Agent API Keys can now be
  associated with a project. This gives users the ability to perform
  Agent key rotation.

- The bundled |jdk| is version 8u152.

Automation
``````````

- Added support for management of the :doc:`MongoDB Connector for
  Business Intelligence </tutorial/deploy-bi-connector>`. The MongoDB
  Connector for Business Intelligence allows you to query a MongoDB
  database using SQL commands to aid in data analysis. It translates
  SQL queries from data analysis tools to MongoDB aggregation pipelines
  on MongoDB database.

- Added the ability to :doc:`retrieve the on-disk logs
  </tutorial/view-logs>` for all MongoDB and |onprem| Agent
  processes. The logs are sent to the |onprem| server and available
  for download by |onprem| administrators.

- Ended support for the ``seedSecondary.sh`` script. You cannot run the
  ``seedSecondary.sh`` script on any MongoDB database running MongoDB
  3.6 or later. To learn more about restoring a snapshot, see
  :doc:`Restore a Completed Snapshot </tutorial/restore-full-snapshot-http>`.

- Agent Upgrade: :ref:`automation-4.5.7.2375`

Backup
``````

- Added support for :doc:`queryable backups </tutorial/query-backup>`.
  This functionality allows you to query specific backup snapshot. You
  can use the queryable backups to:

  - Restore a subset of data within the MongoDB deployment.

  - Compare previous versions of data against the current data.

  - Identify the best point in time to restore a system by comparing
    data from multiple snapshots.

  .. important::
  
     On Windows, :doc:`queryable restores </tutorial/query-backup/>`
     work on MongoDB 3.2, 3.4, and 3.6 snapshots once the |onprem|
     :term:`Backup Daemon` can access
     :ref:`MongoDB 3.4.11 <3.4.11-changelog>` or later.

- Added support for IBM Cloud Object Storage and DellEMC Elastic Cloud
  Storage for S3 blockstore snapshot storage

- Added support for performing
  :doc:`automated restores from one Project to another Project</tutorial/nav/backup-restore-deployments>`.

- Added the ability to reschedule the expiration time of a snapshot.

- Added support for automated restores via the Public API.

- Agent Upgrade: :ref:`backup-6.0.3.689`.

Monitoring
``````````

- Added :ref:`Real-Time Metrics <real-time-metrics-status-tab>`.

- Added the :doc:`Performance Advisor </tutorial/performance-advisor>`.
  The Performance Advisor monitors any operation with a query predicate
  that MongoDB considers slow and suggests new indexes to improve query
  performance.

- Added the :doc:`Data Explorer </data-explorer>`. This feature
  provides the ability to introspect collections in your managed
  MongoDB deployments via the Data Explorer view.

- Agent Upgrade: :ref:`monitoring-6.1.1.395`.

Release Advisories for |onprem| 3.6
```````````````````````````````````

.. include:: /release-notes/release-advisories/advisories-v3.6.rst

Deprecation
```````````

- MongoDB 2.4 is no longer supported for Automation and Backups:

  - All MongoDB 2.4 processes in Automation will be unmanaged.

  - All MongoDB 2.4 backups will be stopped.

- MongoDB 3.0 is no longer supported as a backing store for |onprem|.

Upcoming Incompatibilities
``````````````````````````

- Support for MongoDB 3.2 as a backing store for |onprem| will be
  removed in |onprem| 4.0.

- Support for restores delivered by SCP will be removed in |onprem|
  4.0.

- Support for LDAP via the ``memberOf`` field will be removed in Ops
  Manager 4.0. Use ``member`` instead. In |onprem| 3.6, you may use
  either ``member`` or ``memberOf``.

- Support for the older Agent API Key model will be removed in Ops
  Manager 4.0. Instead, use the new-style keys. In |onprem| 3.6, the
  new-style keys are preferred, the but the older keys will still work.
