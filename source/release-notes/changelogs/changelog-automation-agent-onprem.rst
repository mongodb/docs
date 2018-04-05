.. _automation-4.5.13.5261:

Automation Agent 4.5.13.5261
----------------------------


:ref:`Released with Ops Manager 3.6.5 on 2018-04-05 <opsmgr-server-3.6.5>`

- Fix: Disable MongoDB's TTL monitor thread while applying oplogs
  during a point in time restore.

- When performing maintenance on a MongoDB 3.2 shard member for oplog
  resizing, start the node with ``--recoverShardingState`` false.

- When the Automation Agent performs a resize on a MongoDB 3.2 sharded
  cluster, disable sharding recovery while the node is started up as a
  standalone.


.. _automation-4.5.12.2514:

Automation Agent 4.5.12.2514
------------------------------

:ref:`Released with Ops Manager 3.6.4 on 2018-03-01 <opsmgr-server-3.6.4>`

- Changes made to any storage-affecting options in MongoDB will 
  automatically result in a rolling initial sync of the replica set. 
  
  For single node replica sets and standalones a 
  :binary:`mongodump <bin.mongodump>` / 
  :binary:`mongorestore <bin.mongorestore>`
  will be performed. These options include 
  ``security.enableEncryption``, 
  ``storage.smallfiles``, ``storage.directoryPerDb`` and 
  ``wiredTiger.directoryForIndexes``. (The ``storage.engine`` parameter 
  has always had this treatment.)

- **Fix:** Automation Agent correctly resizes the :term:`oplog` for 
  MongoDB clusters that use X-509 for cluster authentication.

.. admonition:: RELEASE ADVISORY
   :class: note

   :ref:`Ops Manager 3.6.4 <opsmgr-server-3.6.4>` fixes an issue in 
   which setting a value for a ``setParameter`` field using Automation 
   may not have resulted in appropriate restart of the MongoDB cluster. 
   As a consequence of this fix, clusters in which a ``setParameter`` 
   field is specifically set to the default value for the 
   ``setParameter`` may experience a rolling restart on upgrade to 
   :ref:`Ops Manager 3.6.4 <opsmgr-server-3.6.4>`.

   When configuring a ``setParameter`` field in the MongoDB 
   configuration via Automation, always perform a rolling restart.


.. _automation-4.5.11.2453:

Automation Agent 4.5.11.2453
------------------------------

:ref:`Released with Ops Manager 3.6.3 on 2018-02-01 <opsmgr-server-3.6.3>`

- **Fix:** Automation Agent determination of Goal State was incorrect
  for multi-server deployments using the ``ldap.bind.queryPassword``
  parameter. This is now resolved and rolling changes will proceed
  correctly on these deployments.

- **Fix:** Rotation of :bic:`BI Connector </>` logs by the Automation 
  Agent for timezones with positive GMT offsets.

.. _automation-4.5.10.2429:

Automation Agent 4.5.10.2429
------------------------------

*Released with Ops Manager 3.6.2 on 2018-01-11*

- Allow user to specify sampleRefreshIntervalSecs and sampleSize BI
  Connector flags

- **Fix:** Relax validation when ``krb5ConfigLocation parameter`` is 
  specified. This no longer implies that ``krb5Principal`` and 
  ``krb5Keytab`` are required.

- **Fix:** BI Connector Log Rotation config now respects timestamps 
  from :abbr:`UTC (Coordinated Universal Time)` hosts.

- **Fix:** Improve logic controlling when the Backup Agent uses the 
  Primary as a sync source.

.. _automation-4.5.9.2403:

Automation Agent 4.5.9.2403
---------------------------

*Released with Ops Manager 3.6.1 on 2017-12-19*

- **Fix:** Prevent race condition when MongoDB version and FCV are
  updated at the same time.

- Manage Windows Firewall rules for the BI Connector.

.. _automation-4.5.7.2375:

Automation Agent 4.5.7.2375
---------------------------

*Released with Ops Manager 3.6.0 on 2017-12-05*

- Support for MongoDB 3.6.

- Support for advanced replica set configuration fields.

- Support for new Agent API Key model.

.. _automation-3.2.17.4936-1:

Automation Agent ``3.2.17.4936-1``
----------------------------------

*Released with Ops Manager 3.4.13 on 2018-04-05*

- Fix: Automation Agent determination of Goal State was incorrect
  for multi-server deployments using the ldap.bind.queryPassword
  parameter. This is now resolved and rolling changes will proceed
  correctly on these deployments.
     
.. _automation-3.2.16.2444-1:

Automation Agent 3.2.16.2444-1
------------------------------

*Released with Ops Manager 3.4.12 on 2018-02-01*

- Logging enhancements

.. _automation-3.2.16.2263-1:

Automation Agent 3.2.16.2263-1
------------------------------

*Released with Ops Manager 3.4.10 on 2017-11-02*

.. _automation-3.2.15.2257-1:

Automation Agent 3.2.15.2257-1
------------------------------

*Released with Ops Manager 3.4.9 on 2017-10-05*

- Fix failure to collect disk-related hardware statistics on some
  hardware configurations.

- When Automation creates a temporary Windows service in order to
  perform maintenance operations on a ``mongod``, remove the service
  when the maintenance is completed.

.. _automation-3.2.14.2187-1:

Automation Agent 3.2.14.2187-1
------------------------------

*Released with Ops Manager 3.4.7 on 2017-08-03*

- Optimization to reduce the number of checks to see if a process is
  running.

- Improve state detection during conversions to config server
  replica sets.

.. _automation-3.2.13.2141-1:

Automation Agent 3.2.13.2141-1
------------------------------

*Released with Ops Manager 3.4.6 on 2017-07-06*

- **Fix:** During CSRS conversion, use differently named log files for
  temporary config servers.

- **Fix:** During CSRS conversion, only shut down a member when it is in
  secondary state.

- **Fix:** Config file parsing code on Windows did not parse all
  possible options.

.. _automation-3.2.12.2107:

Automation Agent 3.2.12.2107
----------------------------

*Released with Ops Manager 3.4.5 on 2017-05-18*

- When performing an automated restore to a sharded cluster with
  different shard names, update the shard identity document.

- When performing an automated restore, ensure that shard metadata
  is always updated in the right order.

- When performing an automated restore, always restore to the default 
  protocol version.

- **Fix:** RHEL7 packaging so that Automation Agent starts on server 
  boot.

- Reduce frequency at which Automation Agent checks managed log files 
  to reduce CPU overhead.

- Ignore get_mempolicy errors and assume numa not enabled.

.. _automation-3.2.11.2025:

Automation Agent 3.2.11.2025
----------------------------

*Released with Ops Manager 3.4.4 on 2017-03-30*

- Fix problem with shutdown of ``mongod`` processes during an automated
  restores on Windows.

- Fix for issues using Automation in multi-server deployments using
  SSL and encrypted PEM key files.

- Optimization for goal state maintenance of sharded clusters.
  Automation Agents will execute far fewer commands in steady state.

.. _automation-3.2.10.1997:

Automation Agent 3.2.10.1997
----------------------------

*Released with Ops Manager 3.4.3 on 2017-02-17*

- Fix bug in removal of shards for sharded clusters on MongoDB 3.4.

- Built with Go 1.7.

- Support for MacOS Sierra.

.. _automation-3.2.9.1985:

Automation Agent 3.2.9.1985
---------------------------

*Released with Ops Manager 3.4.2 on 2017-01-19*

- **Fix:** Can install Agent on Windows if the Windows Firewall was 
  disabled.

- **Fix:** Can use MONGODB-CR for Agent authentication when LDAP
  was being used for User authentication.

- **Fix:** Issue where Agent would stop sending status after MongoDB
  reaches its connection limit.

.. _automation-3.2.8.1942:

Automation Agent 3.2.8.1942
---------------------------

*Released with Ops Manager 3.4.1 on 2016-12-27*

- **Fix:** Can install MongoDB on Power Linux when using Ops Manager in
  'Local Mode'.

.. _automation-3.2.7.1927:

Automation Agent 3.2.7.1927
---------------------------

*Released with OpsManager 3.4.0 on 2016-11-29*

- Adds support for automation of MongoDB 3.4 deployments.

- Adds support for management of Monitoring/Backup Agents on
  PowerPC-based Linux systems for MongoDB 3.4 or later deployments
  only.

- Built using Go 1.6.

- Adds support for gathering of hardware metrics.

- When importing a process that uses a password for the PEMKeyFile,
  no longer requires user to re-enter the PEMKeyFile password.

- **Fix:** Can upgrade from MongoDB 2.4 to 2.6 while staying
  on authSchemaVersion 1.

- Does not create Windows firewall rules for processes that are
  started on temporary ports where external access is not required.

- Uses ``systemd`` management on RHEL7 and Ubuntu 16.04.

.. _automation-2.5.22.1876:

Automation Agent 2.5.22.1876
----------------------------

*Released with Ops Manager 2.0.7 on 2016-11-03*

- MongoDB data and log files will have a ``umask`` of ``027``.
  Requires new package install.

.. _automation-2.5.20.1755:

Automation Agent 2.5.20.1755
----------------------------

*Released with Ops Manager 2.0.6 on 2016-08-18*

- Improve logging on authentication failures.

- **Fix:** Can set ``clusterAuthMode`` on sharded clusters.

.. _automation-2.5.19.1732:

Automation Agent 2.5.19.1732
----------------------------

*Released with Ops Manager 2.0.5 on 2016-07-14*

- Substantial optimization in state-gathering.

- Configurable timeout for connections to MongoDB processes.

- **Fix:** Problem verifying success when creating text indexes in
  rolling index builds.

.. _automation-2.5.18.1647:

Automation Agent 2.5.18.1647
----------------------------

*Released with Ops Manager 2.0.4 on 2016-05-20*

- Agent no longer downloads restore data for arbiters.

- **Fix:** Some cases where CSRS conversion could get stuck.

- **Fix:** Agent can restart a config server if all config servers are 
  down.

- **Fix:** validating MongoDB versions when a cluster was on
  mixed operating systems.

.. _automation-2.5.17.1604:

Automation Agent 2.5.17.1604
----------------------------

*Released with Ops Manager 2.0.3 on 2016-03-24*

- **Fix:** Can import of arbiter using a different keyfile then existing
  configuration.

- Allow specifying a temporary port for use during a CRSR upgrade.

.. _automation-2.5.16.1552:

Automation Agent 2.5.16.1552
----------------------------

*Released with Ops Manager 2.0.2 on 2016-03-01*

- Added support for managing MongoDB on SUSE12.

- Added support for rolling upgrades to config servers as a replica
  set. See :doc:`/tutorial/convert-config-servers-to-replica-set`.

.. _automation-2.5.15.1526:

Automation Agent 2.5.15.1526
----------------------------

*Released with Ops Manager 2.0.1 on 2016-01-21*

- Stability and performance improvements for restores via automation.

- Added optimization to prioritize replica set reconfiguration
  actions over index builds.

- Improved index building mechanism: index builds are no longer
  performed in a rolling fashion for 2-node replica sets, but
  instead are built in the background.

- Added optimization to not compare unsupported index options when
  determining whether or not an index already exists.

- **Fix:** Can import existing deployments that include
  arbiters running with authentication.

- **Fix:** Rolling storage engine conversion for replica
  sets to ensure a super majority is always up.

- **Fix:** Can create custom roles on sharded clusters running
  MongoDB 3.2 with config server replica sets.

.. _automation-2.5.11.1484:

Automation Agent 2.5.11.1484
----------------------------

*Released with Ops Manager 2.0.0 on 2015-12-08*

- Added aupport for MongoDB 3.2.0 clusters with config servers as
  replica sets.

- Added aupport for automated restores via the Automation Agent.

- Added aupport for rolling index builds.

- Added aupport for configuring WiredTiger encrypted storage for
  MongoDB 3.2.

- Added aupport for rolling conversion to X-509 member authentication.

- Improved handling of sharded clusters with members running on both
  Linux and Windows-based operating systems.

- Added optimization when starting a new Monitoring or Backup Agent
  to ensure that the process is running before achieving Goal State.

- **Fix:** ``glibc`` compatibility issue on RHEL5 and RHEL6.

- **Fix:** Automation Agent automatic update failures could cause
  surge in configuration calls from the Automation Agent.

.. _automation-2.0.14.1398:

Automation Agent 2.0.14.1398
----------------------------

*Released with Ops Manager 1.8.2 on 2015-10-20*

- **Fix:** Agent from not recognizing RHEL Workstations as RHEL.

.. _automation-2.0.12.1238:

Automation Agent 2.0.12.1238
----------------------------

*Released with Ops Manager 1.8.1 on 2015-08-17*

- **Fix:** Can manage an existing deploy with user that has "root"
  privileges.

- **Fix:** Storage engine conversions do not get stuck if
  replica set contained an arbiter.

- **Fix:** Can update credentials after failed attempt to manage an
  existing deployment.

.. _automation-2.0.9.1201:

Automation Agent 2.0.9.1201
---------------------------

*Released with Ops Manager 1.8 on 2015-06-23*

- Added support for managing SSL-enabled deployments.

- Added support for managing deployment using Kerberos, LDAP, and
  x.509 Client Certificate authentication.

- Added support to import an existing :program:`mongos` with a config 
  file.

- Added support for importing an existing deployment that contains
  authenticated :term:`arbiters <arbiter>` on which the hostname does
  not resolve locally to the loopback interface.

- Added the ability to upgrade the ``authSchemaVersion`` when auth is
  not enabled.

- Added support to change the storage engine for :term:`replica sets
  <replica set>` with more than one data node.

- Enabled storage engine conversions for single-node replica sets
  and :term:`standalones <standalone>`.

- Added more detailed logging of when MongoDB, the Monitoring Agent,
  or the Backup Agent rotate their logs.

- Added support for distribution-specific MongoDB Community Edition 
  builds.

- Added up-front validation to ensure that MongoDB processes are
  running as the same user as the Automation Agent.

- Added functionality to delete MongoDB binaries on disk that are
  not used by a managed process.

- Added optimization where |mms| assumes success when starting a forked
  MongoDB process, rather than waiting for EOF.

- Improved algorithm for balancing :program:`mongod` processes across
  cores.

- When deleting directories, symlinks are no longer deleted.

- **Fix:** Can import credentials for ``MONGODB-CR`` users from
  ``SCRAM-SHA-1`` deployments. See: :issue:`MMS-2612` for more
  details.

- **Fix:** Can derive the default port for config servers
  started with the :option:`--configsvr` option but with no port
  specified. See: :issue:`MMS-2489`.

- **Fix:** Can configure :term:`oplog` sizes greater than 1TB.

- **Fix:** Automation Agent does not interfere with
  manually-created replica set tags.

- Ensured that the Automation Agent fails gracefully when an expected
  user does not exist during an initial import.

.. _automation-1.4.18.1199-1:

Automation Agent 1.4.18.1199-1
------------------------------

*Released with Ops Manager 1.6.3 on 2015-06-23*

- Added support for importing an existing deployment that contains
  authenticated :term:`arbiters <arbiter>` on which the hostname does
  not resolve locally to the loopback interface.

- **Fix:** Logic used for performing a rolling restart.

- **Fix:** with deriving the default port for config servers started
  with the :option:`--configsvr` option but with no port specified. See
  :issue:`MMS-2489`.

.. _automation-1.4.16.1075:

Automation Agent 1.4.16.1075
----------------------------

*Released 2015-04-28*

- **Fix:** Can update users created on MongoDB 2.4.

- **Fix:** No longer have :term:`config server` repair occur if the
  third config server was out of sync.

.. _automation-1.4.15.999:

Automation Agent 1.4.15.999
---------------------------

*Released 2015-03-26*

- **Fix:** a rare edge-case that prevented the Automation Agent from
  successfully enabling authentication.

.. _automation-1.4.14.983:

Automation Agent 1.4.14.983
---------------------------

*Released 2015-03-02*

Initial release.
