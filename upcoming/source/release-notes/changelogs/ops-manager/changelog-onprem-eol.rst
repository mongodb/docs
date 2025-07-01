|onprem| Server 2.0
-------------------

.. _opsmgr-server-2.0.10:

|onprem| Server 2.0.10
~~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-08-03*

- Update JDK to 8u144.

- **Fix:** Backup should compute size of incomplete snapshots.

.. _opsmgr-server-2.0.9:

|onprem| Server 2.0.9
~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-05-23*

- Agent Upgrades: :ref:`backup-3.9.1.382-2.0.9`

- Upgrade to JDK8u131

.. _opsmgr-server-2.0.8:

|onprem| Server 2.0.8
~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-01-19*

- Fixed minimum oplog check when starting backup from failing on
  ``RECOVERING`` members.

- Fixed restores on expired, but not yet deleted, snapshots.

- Upgrade to JDK8u121.

.. _opsmgr-server-2.0.7:

|onprem| Server 2.0.7
~~~~~~~~~~~~~~~~~~~~~

*Released on 2016-11-03*

- Agent Upgrades: :ref:`automation-2.5.22.1876`

- Improve filesystem backup performance by increasing disk buffer size.

- Fixed backup initial sync failures due to inefficient query on
  oplogs.

- Fixed starting backup when MongoDB was using Kerberos auth and
  Automation was not in use.

- Fixed old application settings appearing as overrides on the Ops
  Manager settings page

- Fixed publish failure due to ``weakCertificateValidation`` improperly
  being set based on the ``allowConnectionsWithoutCertificates`` setting.

- Support for Windows Server 2016 and Windows 10.

- Upgrade to JDK8u112. Unlimited strength encryption policy included
  by default.

.. _opsmgr-server-2.0.6:

|onprem| Server 2.0.6
~~~~~~~~~~~~~~~~~~~~~

*Released on 2016-08-18*

- Agent Upgrades: :ref:`automation-2.5.20.1755`
- Fixed case where acknowledged alerts could be opened again.

- Fixed issue where DNS failures on the hostname(s) of the |onprem|
  application database cause |onprem| to shutdown.

- File system snapshot stores can be used in group specific snapshot
  store filters.

- Fixed issue where an unconfigured Backup Daemon could be assigned a
  backup job.

- Upgrade to JDK8u102.

.. _opsmgr-server-2.0.5:

|onprem| Server 2.0.5
~~~~~~~~~~~~~~~~~~~~~

*Released on 2016-07-14*

- Agent Upgrades: :ref:`automation-2.5.19.1732`,
  :ref:`monitoring-3.9.1.326`

- Fixed credentialstool on Windows, which is used to encrypt passwords
  in the config file.

- Fixed Backup Daemon auto-download of RHEL platform specific builds.

- Added support for LDAP referrals for |onprem| user authentication.

- Added support for changing LDAP search attribute for |onprem| user
  authentication.

- Fixed index creation UI in Firefox and IE11.

.. _opsmgr-server-2.0.4:

|onprem| Server 2.0.4
~~~~~~~~~~~~~~~~~~~~~

*Released on 2016-05-20*

- Agent Upgrades: :ref:`automation-2.5.18.1647`, :ref:`backup-3.9.1.382`

- Fixed failure to generate diagnostics archive due to large amount of
  log data.

- Validate Automation sslMode changes at publish time instead of draft.

- Allow Automation to transition from sslMode disabled to not having a
  sslMode.

- Fixed false positive auth mechanism validation failures when starting
  backup.

- Fixed issue with processing some types of aggregation queries when
  calculating suggested indexes.

- Fixed exception during a backup restore if that data previously was
  on a blockstore that has since been deleted.

- Removed Ubuntu 14.04 enterprise builds for MongoDB 2.4.X that were
  erroneously in the version manifest.

- Ability to edit LDAP Projects for Automation Admin was accidentally
  hidden.

- Fixed javascript error on empty profiler view.

- Upgrade to JDK8u92.

.. _opsmgr-server-2.0.3:

|onprem| Server 2.0.3
~~~~~~~~~~~~~~~~~~~~~

*Released on 2016-03-24*

- Agent Upgrades: :ref:`automation-2.5.17.1604`

- Fixed critical bug in conversion to config server replica sets.
  Conversions to config server replica sets should be not performed
  with |onprem| 2.0.2.

- Fixed |onprem| not recording HTTP access logs.

- Fixed LDAP PEM settings from failing pre-flight checks even when LDAP
  wasn't in use.

- Fixed Automated Point-In-Time restores of Sharded Cluster with config
  server replica sets.

- Fixed removing SSL for a Deployment

- Email configuration changes no longer require a restart of the
  |onprem| service.

- Allow specifying a temporary port for use during conversion to config
  server replica sets.

- Added Automation support for ``net.ssl.disabledProtocols``.

- Allow control over the compression level of the File System Snapshot
  Store.

.. _opsmgr-server-2.0.2:

|onprem| Server 2.0.2
~~~~~~~~~~~~~~~~~~~~~

*Released on 2016-03-01*

- Agent Upgrades: :ref:`automation-2.5.16.1552`

- Added support rolling upgrades to config servers as a replica set
  (requires MongoDB 3.2.4+).

- Added support for running Agents, the |onprem| server, and MongoDB
  on SUSE12.

- Added support for Slack and Flowdock notifications as system alerts.

- Fixed Automation Admin Role missing from group LDAP configuration.

- Fixed charting problem on Chrome 48+.

- Fixed issue deleting processes that were part of a config server
  replica set.

- Fixed issue where deployment drafts could prevent |onprem| from
  starting in local mode.

- Fixed issue where disabling 2FA in |onprem| still required 2FA for
  users that had it configured.

- |onprem| upgrades on Windows require an uninstall of the previous
  version. This restriction was added to prevent issues that could
  occur on upgrade that are still unresolved without uninstall.

- Upgrade to JDK8u74.

.. _opsmgr-server-2.0.1:

|onprem| Server 2.0.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2016-01-21*

- Agent Upgrades: :ref:`automation-2.5.15.1526`.

- Stability and performance improvements for restores via automation.

- Support restores via automation for shared clusters with config
  server replica sets.

- Fixed editing of managed users not promoting to re-enter password
  (Relevant only to imported SCRAM-SHA1 users.)

- Fixed old errors from imports to automation impacting new imports.

- Automation now updates the location of the keyfile according to the
  defined downloadBase.

- Fixed cases where suggested indexes did not handle unexpected
  profiling data.

- Fixed issue with filesystem snapshots failing when trying to resume a
  snapshot after restart.

- Fixed LDAP form validation not allowing "ldaps".

- Fixed the Backup Daemon not recognizing Windows MongoDB Enterprise
  builds.

- Fixed cases where global diagnostic archive would fail if it was too
  large.

- Fixed importing into automation with SSL always requiring client
  certificates.

.. _opsmgr-server-2.0.0:

|onprem| Server 2.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2015-12-08*

General
```````

- Added support to monitor, back up, and automate MongoDB 3.2
  deployments.

- Single |onprem| Package: there is no longer a separate package for
  the Backup Daemon. The single |onprem| package installs both the
  |application| and the Backup Daemon. You can configure any server
  with |onprem| to handle backups through the Backup Admin interface.

- Configuration in the Database: the |onprem| application configuration
  is now stored in the application database rather than in configuration
  files. This allows for central configuration management.

  Each |onprem| instance, on each server, must be configured with
  information on how to connect to the Application Database. Local
  config files override the information in the database: as such,
  switching to configuration in the database is not required, but is
  recommended.

- Backup agent port change: |onprem| no longer requires a separate port
  for backup traffic. All HTTP traffic is now over a single port. By
  default, |onprem| uses port ``8080``.

- |onprem| 2.0 updates the admin interface to show the topology of
  |onprem| software, the application database, and any backup
  databases.

- Added support to convert to LDAP authentication for |onprem| users at
  any time, with no downtime.

- Upgraded to JDK8u66.

Automation
``````````

- Added support for X.509 member authentication.

- Improved handling of adding members to replica sets: to avoid
  disrupting majority writes, new members are now added to
  :manual:`replica sets </reference/glossary/#std-term-replica-set>` as ``priority=0``, ``votes=0``
  until they reach secondary state, after which |mms| automatically
  updates the configuration to match the :manual:`priority
  </reference/replica-configuration/#rsconf.members[n].priority>` and
  :manual:`votes </reference/replica-configuration/#rsconf.members[n].votes>`
  value specified in the deployment.

- Added the ability to manage indexes from the |onprem| UI.

- Improved index creation: indexes are now created in a rolling
  fashion.

- Added Automation support for Windows MongoDB instances.

Monitoring
``````````

- Added a new profiler with Suggested Indexes.

- Added support for maintenance windows during which time |onprem| does
  not send alert notifications.

Backup
``````

- Filesystem snapshot storage: added the ability to store snapshots
  on a plain shared file system instead of a MongoDB instance. With
  filesystem storage, |onprem| stores snapshots in a directory
  hierarchy and the data files themselves are compressed using gzip.

- Backup agent port change: |onprem| no longer requires a separate port
  for backup traffic. All HTTP traffic is now over a single port. By
  default, |onprem| uses port ``8080``

  |onprem| will automatically update any Backup Agents managed by
  Automation to use the new port. You will need to manually update any
  Backup Agents set up manually after upgrading |onprem|. The upgrade
  instructions describe how to configure the ``mothership`` field in
  the configuration files of non-automated Backup Agents.

- Sync store no longer required: a dedicated sync store is no longer
  required: Backup :term:`initial syncs <initial sync>` are "streamed"
  to the Backup Daemon and only use a small amount of temporary space
  in the :opsmgr:`oplog store  </reference/glossary/#std-term-Oplog-Store-Database>`.

- Automated restores: added a new option to automatically restore a
  backup to a running :manual:`replica set </reference/glossary/#std-term-replica-set>` or :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>`.

- Added support for namespace access listing, which allows you to back up
  only a subset of your data.

- Added the ability to manage HTTP restore link expiration from the
  |onprem| UI and through the API for each individual restore request.

- Added support for the Backup Daemon to download required MongoDB
  binaries from the |onprem| web server when they are not available
  locally.

Associated Agent Updates
````````````````````````

- :ref:`automation-2.5.11.1484`
- :ref:`monitoring-3.9.1.238`
- :ref:`backup-3.9.0.336`

Release Advisories for |onprem| 2.0
```````````````````````````````````

.. include:: /release-notes/release-advisories/advisories-v2.0.rst

See: :doc:`/tutorial/upgrade-ops-manager` for upgrade instructions
for your operating system.

.. _opsmgr-server-1.8:

|onprem| Server 1.8
-------------------

.. _opsmgr-server-1.8.3:

|onprem| Server 1.8.3
~~~~~~~~~~~~~~~~~~~~~

*Released 2015-12-15*

- Fixed issue where monitoring settings for existing servers were not
  always editable.

- Support for additional Amazon Simple Email Server regions. To specify
  regions other than the default US-EAST, see
  :setting:`aws.ses.endpoint`.

- Fixed SNMP notification mechanism for System Alerts.

- Fixed user privileges for MongoDB 3.0 missing from UI on
  :guilabel:`Users & Roles` page.

- Upgraded to JDK8u66.

.. _opsmgr-server-1.8.2:

|onprem| Server 1.8.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2015-10-20*

- Agent Updates: :ref:`automation-2.0.14.1398`,
  :ref:`monitoring-3.7.1.227`, and :ref:`backup-3.4.2.314`.

- MONGODB-X509 authentication mechanism no longer requires MongoDB
  Enterprise.

- Fixed system alerts failing to connect to Application Database and
  Backup Databases running with SSL.

- Fixed issue where Backup resync of a Config Server could cause the
  Backup Job to get stuck.

.. _opsmgr-server-1.8.1:

|onprem| Server 1.8.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2015-08-17*

- Agent Updates: :ref:`automation-2.0.12.1238`,
  :ref:`monitoring-3.7.0.212`

- Updated Backup ``seedSecondary`` script for MongoDB 3.0.

- Fixed adding users with ``GLOBAL`` roles to individual groups.

- Fixed Host Down alerts not firing correctly for arbiters.

- Fixed error when trying to enable X.509 authentication for Monitoring
  only (without Automation).

- Fixed error when trying to enable host log collection.

- Fixed case where an acknowledged Alert can be re-opened when Alert
  processing is behind.

- Fixed case where monitoring classified a Config Server as a
  Standalone when there were no :manual:`mongos </reference/program/mongos/#mongodb-binary-bin.mongos>` services.

.. _opsmgr-server-1.8.0:

|onprem| Server 1.8.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2015-06-23*

Security
````````

- Automation now supports
  :doc:`SSL </tutorial/enable-ssl-for-a-deployment>` and
  MongoDB Enterprise authentication mechanisms:
  :doc:`Kerberos </tutorial/enable-kerberos-authentication-for-group>`,
  :doc:`LDAP </tutorial/enable-ldap-authentication-for-group>`, and
  :doc:`X.509 </tutorial/enable-x509-authentication-for-group>`.

  |onprem| 1.8 can start new MongoDB instances using SSL and enterprise
  authentication mechanisms and import existing instances using SSL and
  enterprise authentication for management.

- Added the ability to :doc:`specify a proxy server
  </tutorial/use-with-http-proxy>` for |onprem| to use to
  access external services.

- Added :ref:`support for self-signed CAs and client certificates
  <ldap-over-ssl>` when using SSL LDAP for |onprem| user authentication.

Alerts
``````

- :doc:`System Alerts </core/system-alerts>`: system alerts allow an
  |onprem| Administrator to receive alerts when the state of the
  software itself is unhealthy.

- :doc:`Global Alerts </tutorial/manage-global-alerts>`: global alerts
  allow an |onprem| administrator to monitor any set of |onprem| groups
  without needing to configure the alerts on a group-by-group basis.

- Added the ability to :ref:`deliver Project, Global, and System alerts
  via an HTTP webhook <group-settings-page>`.

- Lowered the alerting check frequency from five minutes to one minute,
  allowing for more responsive alerts.

Automation
``````````

- Automation now uses distribution-specific builds for MongoDB
  Community Edition when one is available for the operating system and
  version in use. Previously, Automation used the generic MongoDB
  Community Edition build.

  Upgrading the Automation Agent and |onprem| to the new version will
  not automatically change your MongoDB deployments to a distribution-
  specific build: if you wish to use the distribution-specific build,
  you will need to
  :doc:`update the MongoDB version </tutorial/change-mongodb-version>`.

- Added support to :doc:`change the storage engine for a MongoDB
  deployment using Automation </tutorial/edit-deployment>`.

- **Beta**: Added Automation support for Windows MongoDB instances.
  This feature must be enabled for an |onprem| group for it to be
  available.

Monitoring
``````````

- Standby Monitoring Agents now check in with |onprem| more frequently.
  You can now configure the Monitoring Agent session timeout to allow
  for faster failover. See: :ref:`standby-monitoring-agent` for
  more information.

Backup
``````

- Added the ability to configure the Backup Database's block size.
  The :doc:`/tutorial/configure-block-size` tutorial describes
  how to configure the size of the blocks in the Backup Database's
  blockstore.

- Added the ability to initiate backup SCP restores through the
  Public API. See: :doc:`/reference/api/restore-jobs`.

Associated Agent Updates (v1.8)
```````````````````````````````

- :ref:`automation-2.0.9.1201`
- :ref:`monitoring-3.3.1.193`
- :ref:`backup-3.4.1.283`

Considerations for Upgrade (v1.8)
`````````````````````````````````

- |onprem| 1.8 requires that the :ref:`mms-application-database` and
  :ref:`backup-database` run MongoDB 2.6 or later.
  |onprem| will not start after upgrade if your backing databases are
  using an earlier version of MongoDB. The MongoDB Manual provides
  upgrade tutorials with each release.

- When you upgrade to |onprem| 1.8, |onprem| disables all Automation
  Agents until they are upgraded to :ref:`automation-2.0.9.1201`. You
  can upgrade the Automation Agents by clicking the link that appears in
  the :guilabel:`Please upgrade your agents` banner that will appear on
  the :guilabel:`Deployment` page in the |onprem| interface.

- Direct upgrade is only allowed from |onprem| 1.5 and |onprem| 1.6. To
  upgrade to |onprem| 1.8 from an earlier version of MongoDB, you must
  first upgrade to |onprem| 1.6, and then to 1.8.

- In |onprem| 1.8, :setting:`mms.multiFactorAuth.level` replaces the
  deprecated :setting:`mms.multiFactorAuth.require` setting.
  :setting:`mms.multiFactorAuth.level`
  supports more values than its predecessor.

  |onprem| will not start with :setting:`mms.multiFactorAuth.require`
  in the properties file, but will report an error indicating that the
  setting has been deprecated, and that you must update your
  configuration.

- |onprem| 1.8 does not include the Backup HTTP Service: its
  functionality is now part of :doc:`System Alerts</core/system-alerts>`
  and :doc:`Global Alerts </tutorial/manage-global-alerts>`.

- System Alerts give new insight into the health of |onprem| and may
  immediately trigger on upgrade if |onprem| is not in the expected
  state. For example, if your Application or Backup databases have
  startup warnings or if the connection strings to those databases point
  to any unreachable MongoDB instances, |onprem| will issue an alert.

- The |onprem| Deployment user interface has been streamlined such that
  the :guilabel:`View Mode` and :guilabel:`Edit Mode` dual views have
  been merged into a unified view.

.. _opsmgr-server-1.6:

|onprem| Server 1.6
-------------------

.. _opsmgr-server-1.6.4:

|onprem| Server 1.6.4
~~~~~~~~~~~~~~~~~~~~~

*Released 2015-08-17*

- |onprem| no longer shuts down if the :ref:`mms-application-database`
  is unreachable. (This issue was erroneously reported as resolved in
  |onprem| 1.6.3.)

.. _opsmgr-server-1.6.3:

|onprem| Server 1.6.3
~~~~~~~~~~~~~~~~~~~~~

*Released 2015-06-23*

- Agent updates: :ref:`automation-1.4.18.1199-1`

- Added full support for restores of WiredTiger backups. Previously,
  |onprem| only supported
  :ref:`SCP Individual File <delivery-methods-file-formats>` restores
  for WiredTiger backups.

- Added optimization to prevent some Backup Daemon background tasks
  from doing excessive logging when databases are down.

- Fixed a user interface issue when displaying an empty Automation
  diff.

.. _opsmgr-server-1.6.2:

|onprem| Server 1.6.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2015-04-28*

- Fixed issue with grooms on a WiredTiger backup blockstore.

- Fixed a possible connection leak with the SCP Individual File restore
  type.

- LDAP users are now periodically synced with the LDAP server to
  prevent communications after a user is removed from a group.

- Fixed an issue with backups of MongoDB 3.0 :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>`
  instances running with the ``--setParameter failIndexKeyTooLong=0``
  option.

.. _opsmgr-server-1.6.1:

|onprem| Server 1.6.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2015-03-26*

- Agent updates: :ref:`Automation Agent 1.4.15.999 <automation-1.4.15.999>`.

- **Security Update**: resolved an issue where users removed from LDAP
  groups were not always removed from corresponding |onprem|
  groups. This upgrade is **highly recommended** for anyone using LDAP
  authentication.

- Selecting wildcards in the Version Manager is no longer supported
  when ``automation.versions.source`` is set to ``local``.

- Added a 1 hour timeout to kill a Backup :opsmgr:`head database </reference/glossary/#std-term-head-database>` if
  it does not shutdown cleanly.
  You must perform a resync following a hard kill.

- Windows support for Backup Daemon using Windows 64-bit 2008 R2+
  MongoDB builds.

- Fix for Backups stored in
  :ref:`WiredTiger <considerations-backup-storage-engine>`
  format in which a single collection grows from under 8 GB to over
  8 GB in size.

- The time before an unreachable :manual:`mongos </reference/program/mongos/#mongodb-binary-bin.mongos>` process is
  deactivated is now configurable on a per group basis. See
  :ref:`admin-only-group-settings`.

- The time before a standby Monitoring Agent takes over after the
  primary Monitoring Agent stops responding is now configurable to a
  minimum of 90 seconds. See the
  ``mms.monitoring.agent.session.timeoutMillis`` setting in
  :doc:`/reference/configuration`.

- For Backup HTTP pull restore, the link expiration and the number of
  allowed uses of a link are now configurable.

.. _opsmgr-server-1.6.0:

|onprem| Server 1.6.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2015-03-02*

New Features
````````````

- Initial release of :ref:`Automation <automation>`. Automation manages
  many basic administrative tasks for MongoDB deployments, including
  version upgrades, adding replica set members, adding shards, and
  changing oplog size. You can both
  :doc:`import existing deployments </tutorial/add-existing-mongodb-processes>` into Automation
  and :doc:`create new deployments </tutorial/add-servers-automation>`
  on your provisioned hardware.

- Windows support (Monitoring and Backup only). You can
  :doc:`/tutorial/nav/install-application` on Microsoft Windows using 
  MSI files. |onprem| supports Windows Server 2008 R2 and above.

- Support for MongoDB 3.0, including support for backups that use the
  :ref:`WiredTiger <considerations-backup-storage-engine>` storage
  engine.

  To monitor or back up MongoDB 3.0 deployments, you must install
  |onprem| 1.6 or higher. To monitor a MongoDB 3.0 deployment, you must
  also run Monitoring Agent version 2.7.0 or higher.

- Support for using the SSL and MONGODB-X509 authentication mechanisms
  for the backing MongoDB databases. See
  :doc:`/tutorial/configure-ssl-connection-to-backing-mongodb`.

- Public API endpoints to manage Automation configuration. For more
  information, see :ref:`Automation <api-automation>` in the API
  documentation.

Improvements
````````````

- The |onprem|'s :doc:`Administration </admin-console>`
  interface provides more information to make it easier to monitor the
  health of the |onprem| installation.

- The |onprem| Deployment tab now displays all deployment information
  on one page, with icons for selecting view options. The new Topology
  View groups all hosts by the replica set or sharded cluster they are
  part of. The new Servers View shows information about MongoDB
  processes and |onprem| agents grouped by server.

- Fixed an issue
  (`MMS-2273 <https://jira.mongodb.org/browse/MMS-2273>`_)
  where, in certain situations, the Backup Agent was not reporting a
  cluster snapshot as potentially inconsistent.

- Improved handling of cursor timeouts by the Backup Agent. To use this
  improvement, upgrade to the latest Backup Agent, which is included
  with |onprem|. The improvement became available with
  :ref:`Backup Agent 2.3.3.209-1 <backup-2.3.3.209-1>`.

Considerations for Upgrade to 1.6
`````````````````````````````````

- |onprem| 1.8.0, when released, **will not** support MongoDB 2.4 for
  the :ref:`mms-application-database` and :ref:`backup-database`.
  |onprem| Server 1.8.0 *will* continue to support MongoDB 2.4 for your
  monitored and backed-up databases.

- |onprem| 1.6.0 supports direct upgrades only from MMS On Prem 1.3 and
  above.

- The procedure to configure |onprem| to run with HTTPS has changed and
  is greatly simplified. The previous procedure no longer works. For
  the new procedure, see :doc:`/tutorial/configure-ssl-connection-to-web-interface`.

- The connection string to the backup blockstore database is now
  configured through the Administration interface's
  :ref:`Blockstores page <blockstores-page>` and not through the
  ``mongo.backupdb.mongoUri`` field in the ``conf-daemon.properties``
  configuration file.

- |onprem| no longer requires you to supply the replica set name of the
  backing MongoDB instances. The ``mongo.replicaSet`` and
  ``mongo.backupdb.replicaSet`` properties have been removed from the
  configuration files. These properties had previously controlled
  whether |onprem| treated a connection to a backing instance as a
  standalone or replica set, for the purpose of setting the write
  concern. |onprem| now sets write concern based on how many hosts are
  supplied in the connection string.

- You can disable Automation for the entire |onprem| installation
  through the ``mms.featureFlag.automation`` setting in the
  ``conf-daemon.properties`` :doc:`configuration file </reference/configuration>`.

- Removed the :guilabel:`Dashboards` view from the |onprem| UI. You can
  view monitoring metrics from the :guilabel:`Deployment` tab.
  See: :doc:`/tutorial/view-diagnostics` for an overview
  of the available metrics and how to access them.

.. _opsmgr-server-1.5:

MMS Onprem Server 1.5
---------------------

.. _opsmgr-server-1.5.5:

MMS Onprem Server 1.5.5
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2015-03-26*

- **Security Update**: resolved issue where users removed from LDAP
  groups were not always removed from corresponding |onprem| groups.
  This upgrade is **highly recommended** for anyone using LDAP
  authentication.

.. _opsmgr-server-1.5.4:

MMS Onprem Server 1.5.4
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2015-03-18*

- Fixed race condition that could cause the Backup Daemon to hang when
  the MongoDB process for a :opsmgr:`head database </reference/glossary/#std-term-head-database>` fails to start.

- Fixed an issue where a rollback occurring shortly after a terminate
  could step on the terminate.

- The time before an unreachable :manual:`mongos </reference/program/mongos/#mongodb-binary-bin.mongos>` process is
  deactivated is now configurable on a per group basis. See
  :ref:`admin-only-group-settings`.

- The time before a standby Monitoring Agent takes over after the
  primary Monitoring Agent stops responding is now configurable to a
  minimum of 90 seconds. See the
  ``mms.monitoring.agent.session.timeoutMillis`` setting in
  :doc:`/reference/configuration`.

- For Backup HTTP pull restore, the link expiration and the number of
  allowed uses of a link are now configurable.

.. _opsmgr-server-1.5.3:

MMS OnPrem Server 1.5.3
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2014-12-17*

Significant improvements in performance for the processing of MMS OnPrem
Monitoring data for MMS OnPrem Projects with a large number of hosts

.. _opsmgr-server-1.5.2:

MMS OnPrem Server 1.5.2
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2014-11-18*

- Added Support for archive restores (``.tar.gz``) for databases whose
  filenames exceed 100 characters.

- API: Skip missed points in metrics data, instead of returning empty
  data.

- API: Return correct number of data points when querying metric data
  with the period option.

- Backup Agent update to ``2.3.3.209-1``

.. _opsmgr-server-1.5.1:

MMS OnPrem Server 1.5.1
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2014-09-26*

- Fix cases where replica set member alerts (e.g. no primary, number
  of healthy members) could send false positives.

- Skip ``backup-daemon`` ``rootDirectory`` and
  ``mongo.backupdb.mongoUri`` overlap check when the
  ``mongo.backupdb.mongoUri`` is on a different
  host.

- ``mms-gen-key`` script handles user's effective group being
  different than the username.

- Security enhancements.

.. _opsmgr-server-1.5.0:

MMS OnPrem Server 1.5.0
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2014-09-02*

Considerations for Upgrade
``````````````````````````

- MMS OnPrem *only* supports direct upgrades from 1.3 and 1.4.

- Change in configurations and policy for 2FA:  Two-factor
  authentication must now be explicitly enabled using the
  :setting:`mms.multiFactorAuth.require` setting.

- The default LDAP group separator became ``;;``. Previously the
  separator was ``,``. See the :ref:`LDAP configuration
  <default-ldap-separator>` documentation for more information.

- Suppressed hosts will only remain suppressed for 30 minutes.

  Previously, if after deleting a host, from MMS OnPrem Monitoring the
  hostname and port combination would be added to a suppression list
  with an infinite lifetime. The suppression list prevented a race
  condition where host in a cluster would be auto-discovered by another
  member of a deployment before the host could was fully removed. Now,
  hostname and port combinations remain on the suppression list for
  only 30 minutes.

- Set the :setting:`mms.remoteIp.header` in the
  ``conf-mms.properties`` file  if clients access the MMS OnPrem
  Application via a load balancer.

- ``mongo.backupdb.mongoUri`` is no longer in
  ``conf-mms.properties``. This was previously a required field in this
  file. It remains in the backup daemons's ``conf-daemon.properties``.

- Stored MongoDB profile data is not transferred between OnPrem 1.4
  and OnPrem 1.5 during the upgrade process.

Improvements
````````````

- When an MMS OnPrem Backup job fails to bind, the system periodically
  and automatically retries.

- All MMS OnPrem Backup jobs will retry indefinitely.

- Point in Time restores are now available with one second granularity.

New Features
````````````

- MMS OnPrem :doc:`Public API </reference/api>`.

- Explicit support for multiple MMS OnPrem backup blockstore databases
  and the ability to pin MMS OnPrem Projects to specific backup daemons
  and databases. See
  :doc:`/tutorial/assign-snapshot-stores-to-data-center`.

- MMS OnPrem can authenticate using LDAP to both the database backing
  MMS OnPrem and the monitored and backed up MongoDB deployments.
  See :ref:`security-ldap`.

- Enhanced auditing. See :doc:`/reference/audit-events` for more
  information.

- Ability to acknowledge alerts with comments.

- New cluster page that shows individual, sum or average metrics for
  all shards in a cluster.


.. _opsmgr-server-1.4:

MMS OnPrem Server 1.4
---------------------

.. _opsmgr-server-1.4.3:

MMS OnPrem Server 1.4.3
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2014-07-22*

- Addressed issues related to Backup Job assignment for 2.6.x clusters
  that used the :authrole:`clusterMonitor` role to support MMS OnPrem
  Monitoring.

- Fixed problem importing email addresses for users for deployments
  that use LDAP integration.

- Fixed rare race condition caused high CPU usage in the MMS OnPrem
  HTTP Service if the application cannot connect to one of the backing
  databases.

- Additional security enhancements.

.. _opsmgr-server-1.4.2:

MMS OnPrem Server 1.4.2
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2014-05-29*

- Critical bug fix for backing up MongoDB 2.6 deployments that include
  user or custom role definitions:

  - The ``system.version`` collection in the admin database will
    be included in all future snapshots.

  - The ``system.roles`` collection in the admin database will be
    included after a new initial sync is performed.

  Users capturing backups of MongoDB 2.6 replica sets or clusters with
  MMS OnPrem that include custom role definitions should perform a new
  initial sync. Taking a new initial sync will ensure that the role
  definitions are included in the backup.

- Disable MongoDB ``usePowerOf2Sizes`` for insert-only MMS
  OnPrem Backup collections.

- Speed optimization for MMS OnPrem Backup HTTP pull restores.

- Fix for LDAP integration, MMS OnPrem now passes full ``dn`` correctly
  when authenticating the user.

.. _opsmgr-server-1.4.1:

MMS OnPrem Server 1.4.1
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2014-04-28*

- Ability to Backup replica sets or clusters using Kerberos
  authentication.

- Ability to Backup replica sets or clusters running specific custom
  MongoDB builds provided by MongoDB, Inc.

- Fix validation issue preventing Backup of MongoDB 2.6.0 clusters.

- Reduced log noise from Monitoring Agent when monitoring MongoDB 2.0
  or unreachable ``mongod``\s.

.. _opsmgr-server-1.4.0:

MMS OnPrem Server 1.4.0
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2014-04-08*

- Includes MMS OnPrem Backup: continuous backup with point-in-time
  recovery of replica sets and cluster-wide snapshots of sharded
  clusters.

- Finer-grained roles and permissions.

- Improved user interface for alerts.

- Enhanced Activity Feed for auditing of all activity.

- Monitoring Agent distributed as OS-specific binary. Python dependency
  removed.

- LDAP integration for managing users and groups.

MMS OnPrem 1.4.0 requires MongoDB 2.4.9+ instances for :doc:`backing
storage </tutorial/prepare-backing-mongodb-instances>`.

.. _opsmgr-server-1.3:
.. _opsmgr-server-1.3.0:

MMS OnPrem Server 1.3
---------------------

*Released 2013-12-01*

- Packaging/support for Debian and SUSE Linux.

- Kerberos authentication support between MMS OnPrem server and backing
  MongoDBs, as well as between Monitoring Agent and the MongoDBs it
  monitors.

- OnPrem users can be overall site administrators. (MMS OnPrem Admins)

- New admin section where MMS OnPrem Admins can manage user roles and
  message banners.

- Tunable advanced password and session management configurations.

- Encryption key rotation, more specific CORS policy, auth tokens
  removed from chart URLs, and other security enhancements.

.. _opsmgr-server-1.2:
.. _opsmgr-server-1.2.0:

MMS OnPrem Server 1.2
---------------------

*Released 2013-07-24*

- Redesigned user interface and enhanced algorithm to auto-discover
  hosts and derive host topology.

- SNMP monitoring.

- Ability to export charts.

- Option to store encrypted authentication credentials in the ``mmsDb``
  property in the configuration file.

- Ability to classify users within an MMS OnPrem Project as group
  administrators or read-only users.
