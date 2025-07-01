.. _opsmgr-server-3.4.15:

|onprem| Server 3.4.15
~~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-08-02*

- Updates Ops Manager |jdk| (x86_64) to 8u181, which enables endpoint
  identification by default.

.. _opsmgr-server-3.4.14:

|onprem| Server 3.4.14
~~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-05-03*

- **Fix:** At the completion of an automated restore of a sharded
  cluster, |onprem| ensures that the balancer is enabled.

- **Fix:** Network charts now display physical bytes in/out instead of
  logical bytes in/out. That is, if network compression is enabled for
  MongoDB, the network charts shows the compressed bytes in/out.

- Upgrade: Bundled JDK to 8u172.

- Agent Upgrades: :ref:`automation-3.2.18.4938-1`

.. _opsmgr-server-3.4.13:

|onprem| Server 3.4.13
~~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-04-05*

- **Fix:** Avoid failures in alert processing when monitoring topology
  for disk partitions cannot be derived correctly.

- **Fix:** Public API returns correct value for journalingEnabled for
  MongoDB processes using the WiredTiger storage engine.

- Agent Upgrades: :ref:`automation-3.2.17.4936`, :ref:`monitoring-5.4.5.415`, :ref:`backup-5.0.12.840`


.. _opsmgr-server-3.4.12:

|onprem| Server 3.4.12
~~~~~~~~~~~~~~~~~~~~~~

*Released on 2018-02-01*

- Agent Upgrades: :ref:`automation-3.2.16.2444`, :ref:`backup-5.0.12.725`

.. automation-3.2.16.2444-1 ?

- The bundled JDK is version 8u162

- Upgrade jackson-databind to 2.9.3

.. _opsmgr-server-3.4.11:

|onprem| Server 3.4.11
~~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-12-20*

- **Fix:** Issue importing a process into Automation running on a
  custom build.

- **Fix:** Explicitly specify the collation ``{locale: simple}`` in
  createIndex during the initial sync of a backup.

- **Fix:** Allow ``clusterAuthMode`` to be configured when deployment
  does not use MONGODB-X509 authentication.

- **Fix:** Allow importing a process into Automation using the
  ``allowConnectionsWithoutCertificates`` parameter.

- Security enhancements.

.. _opsmgr-server-3.4.10:

|onprem| Server 3.4.10
~~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-11-02*

- Agent Upgrades: :ref:`automation-3.2.16.2263`

- **Fix:** ``credentialstool`` and ``encryptiontool``
  load dependencies correctly.

- **Fix:** Backup groom jobs no longer get stuck on
  partially-deleted snapshots.

- **Fix:** Some of the Cloud Manager interface no longer shown
  when creating groups.

- **Fix:** where sorting during deletion of backups could run out of
  memory.

- Reduce memory usage of backup snapshot deletion.

- Remove a restriction where a shard key range could not have an equal
  minimum and maximum.

- Update JDK to 8u152.

.. _opsmgr-server-3.4.9:

|onprem| Server 3.4.9
~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-10-05*


- Agent Upgrades: :ref:`automation-3.2.15.2257`, :ref:`backup-5.0.11.663`

- **Fix:** Allow the ``mongos`` ``autoSplit`` configuration parameter
  to be removed simultaneously with a major version upgrade from
  MongoDB 3.2 to 3.4.

- **Fix:** During the initial sync of a new backup, documents with a
  compound ``_id`` that are moved on disk at the source during the
  initial sync may be omitted from the backup under rare conditions.
  This issue affects only MMAPv1.

- Increase the expiration period for snapshots downloaded during an
  automated restore and make the expiration periods a configurable
  parameter.

- Reduce the amount of memory used when a backup is terminated.

.. _opsmgr-server-3.4.8:

|onprem| Server 3.4.8
~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-09-07*

- Allow session timeouts to be configured to a fraction of an hour.

- **Fix:** Downloading the global diagnostic archive could fail if more
  than 32 MB of agent logs were stored.

- **Fix:** :doc:`Inconsistent Backup Configuration alert
  </reference/alerts/inconsistent-backup/>` runs for config servers.

  .. important:: Special Advisory

     After upgrading to |onprem| 3.4.8, the :guilabel:`Inconsistent
     Backup Configuration` alert may be triggered for config servers.
     The backup for these config servers should be resynchonized.

     1. Click :guilabel:`Backup`.
     #. From the config server row, click on the :guilabel:`Option`
        menu [ :icon:`ellipsis-h` ].
     #. Click :guilabel:`Resync`.

     Do not resync the entire :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>` if a
     :manual:`config server </reference/glossary/#std-term-config-server>` triggers this alert. Resync the config
     server in question only.

- **Fix:** Changes to the storage engine for a config server backup are
  applied on resync.

- **Fix:** Validation for Backup Agent authentication mechanism failed
  if ``MONGODB-X509`` was implicitly enabled.

- **Fix:** In :doc:`Local Mode </tutorial/configure-local-mode>`,
  checks during |onprem| startup allow configurations of deleted
  Groups to require MongoDB versions which are not present.

- Security enhancements.

.. _opsmgr-server-3.4.7:

|onprem| Server 3.4.7
~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-08-03*

- Agent Upgrades: :ref:`automation-3.2.14.2187`,
  :ref:`backup-5.0.10.634`.

- Update JDK to 8u144.

- Additional logging for oplog extensions due to delayed backups.

- Additional logging for backup snapshots that retry due to unexpected
  file changes.

- **Fix:** Ability to restore SCCC sharded clusters without a healthy
  mongos.

- **Fix:** Race condition between snapshots and schedule update
  requests.

- **Fix:** Do not query arbiters when executing an administrative error
  retrieval task.

- Security improvements.

.. _opsmgr-server-3.4.6:

|onprem| Server 3.4.6
~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-07-06*

- Agent Upgrades: :ref:`automation-3.2.13.2141`,
  :ref:`backup-5.0.8.601`.

- **Fix:** Server Pool servers can get stuck in cleaning state if
  server is reimaged.

- **Fix:** Make Backup ingestion collection stats calls idempotent.

- **Fix:** Avoid skipping storage measurement rollups if customers have
  a database named ``hm``.

- **Fix:** Cause Discovery to update shard ID when shard is repurposed
  to arbiter.

- **Fix:** Following upgrade from 2.x to 3.4.x, show progress of
  monitoring data migration.

- **Fix:** Make all metrics available to cluster view.

- **Fix:** Delay in Metric alerts check when opening and closing alerts
  for oplog metrics.

- **Fix:** Metric alerts check may miss system measurements.

.. _opsmgr-server-3.4.5:

|onprem| Server 3.4.5
~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-05-18*

- Agent Upgrades: :ref:`automation-3.2.12.2107`,
  :ref:`monitoring-5.4.5.370`, :ref:`backup-5.0.7.494`.

- Ability to disable daily/weekly/monthly snapshots through the API.

- Fix validation error for automated restores where the source or
  target cluster uses the ``storage.wiredTiger.directoryForIndexes``
  parameter.

- Fix validation errors when using LDAP Authorization along with LDAP
  and SCRAM-SHA1 authentication.

- Various security enhancements.

.. _opsmgr-server-3.4.4:

|onprem| Server 3.4.4
~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-03-30*

- Agent Upgrades: :ref:`automation-3.2.11.2025`, :ref:`backup-5.0.6.486`

- Fix for premature forceful shutdown of the HEAD :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>`
  instances for |onprem| Backup Daemons running on Windows.

- Fix problem with shutdown of :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>` processes during an
  automated restores on Windows.

- Fix for issues using Automation in multi-server deployments using SSL
  and encrypted PEM key files.

- Fix for restores of backup snapshots stored unencrypted using file
  system storage.

- Expose newest AWS regions as a storage option for S3 blockstores.

- Optimization: Performance optimization for sending monitoring data to
  New Relic.

- Security enhancement: Set X-Frame-Options: DENY HTTP headers for all
  authenticated requests.

- Security enhancement: New option to allow enablement of HTTP Strict
  Transport Security (HSTS) with configurable maximum age.

- Security enhancement: New option to allow use of browser session
  cookies, rather than time-limited persistent cookies.

- Security enhancement: New option to disable all browser caching.

.. _opsmgr-server-3.4.3:

|onprem| Server 3.4.3
~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-02-17*

- Agent Upgrades: :ref:`automation-3.2.10.1997`,
  :ref:`backup-5.0.6.477`, :ref:`monitoring-5.4.4.366`

- Fix resource leak preventing successful backups when |onprem|
  Backup is running on Windows.

- Fix bug in removal of shards for sharded clusters on MongoDB 3.4.

- Various security enhancements.

- Support for running Automation, Backup and Monitoring Agents on MacOS
  Sierra.

- Support for MongoDB Enterprise builds for Debian 7.1.

- Fix import into Automation for deployments using LDAP authorization
  and SCRAM-SHA1 authentication.

- Automation will deploy SSL-capable Windows builds for MongoDB 3.2.12+
  and 3.4.2+.

- Fix possible stall in the oplog application phase of |onprem|
  Backups of MongoDB 3.4.

.. _opsmgr-server-3.4.2:

|onprem| Server 3.4.2
~~~~~~~~~~~~~~~~~~~~~

*Released on 2017-01-19*

- Agent Upgrades: :ref:`automation-3.2.9.1985`, :ref:`backup-5.0.5.472`

- Fixed PageDuty notifications failing to send for System Alerts.

- Fixed issue creating deployments with overlapping replica set / shard
  names of other deployments.

- Fixed Global Alert UI validation being incorrect for some roles.

- Fixed failure configuring MONGODB-CR + LDAP auth mechanisms + LDAP
  authz.

- Added option to disable checksums during restores.

- Upgrade to JDK8u121.

.. _opsmgr-server-3.4.1:

|onprem| Server 3.4.1
~~~~~~~~~~~~~~~~~~~~~

*Released on 2016-12-27*

- Agent Upgrades: :ref:`automation-3.2.8.1942`,
  :ref:`monitoring-5.4.3.361`, :ref:`backup-5.0.4.469`

- Support for |onprem| using Active Directory to authenticate to
  application databases.

- Fixed roles info being lost when editting a database user.

- Fixed issue starting backup when 'net.compression' is in use.

- Prevent |onprem| URLs from having a double forward slash when the
  URL configured by the user ends in a forward slash.

- Fixed editing LDAP group mappings.

- Fixed new OM 3.4.0 being unable to start for the first time without
  internet connectivity

.. _opsmgr-server-3.4.0:

|onprem| Server 3.4.0
~~~~~~~~~~~~~~~~~~~~~

*Released on 2016-11-29*

General
```````

- Added support to monitor, back up, and automate MongoDB 3.4
  deployments.

- Added support for deploying |onprem| on SUSE12.

- Added support for Automation Agents, Backup Agents and Monitoring
  Agents on Ubuntu 16.x Power (ppc64le) and RHEL 7 Power (ppc64le).

- Added support for mutual TLS/SSL between all Agents and |onprem|.

- Added the ability to assign tags to Projects and to filter global
  alerts by tags.

- Added the ability to change a the name of a Project.

Automation
``````````

- Includes more flexible handling of MongoDB User and Roles;
  specifically:

  - Ability to choose whether or not specific users and roles are
    managed, and

  - Ability to choose whether or not to allow MongoDB Users and Roles
    to be managed externally from |onprem|.

- Added the ability to manage sharded collections and zones.

- Added support for MongoDB 3.4 LDAP Authorization.

- Added support for Kerberos Authentication on Windows.

Backup
``````

- Added support for uncompressed WiredTiger snapshots on the
  filesystem.

- Added support for storing snapshots in S3.

- Added support for WiredTiger encryption at rest.

- Added the ability to control the reference time for the snapshot
  schedule; e.g., specify that snapshots are taken every 6 hours,
  starting at 12:00:00 AM.

- Added support for all data-format affecting MongoDB configuration
  options: directoryPerDB, smallfiles, etc.

Monitoring
``````````

- Provides high resolution monitoring: metrics are now captured every
  10 seconds.

- Supports flexible retention monitoring: metrics at each resolution
  can be retained for a configurable amount of time.

- Allows hardware metrics to be collected for any managed MongoDB
  process (i.e. any process that is managed by an Automation Agent).

- Provides new API endpoint to retrieve all metrics for a particular
  MongoDB process in one API call.

Provisioning
````````````

- Added support for maintaining a pool of provisioned servers from
  which users in a group can request servers to host new MongoDB
  deployments.

Associated Agent Updates (v3.4)
```````````````````````````````

- :ref:`automation-3.2.7.1927`
- :ref:`monitoring-5.4.2.354`
- :ref:`backup-5.0.3.465`

Release Advisories for |onprem| 3.4
```````````````````````````````````

.. include:: /release-notes/release-advisories/advisories-v3.4.rst

For procedures to upgrade to 3.4, see
:doc:`/tutorial/upgrade-ops-manager`.
