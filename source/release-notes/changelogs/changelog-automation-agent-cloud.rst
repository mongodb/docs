.. _automation-4.9.0.2490:

Automation Agent 4.9.0.2490
---------------------------

*Released 2018-02-13*

- Support for upcoming improvements to real time performance monitoring

.. _automation-4.8.2.2491:

Automation Agent 4.8.2.2491
---------------------------

*Released 2018-02-10*

- When performing an automated restore, remove all elements in the
  config.mongos collection that are included in the restore files.
  
.. _automation-4.8.2.2459:

Automation Agent 4.8.2.2459
---------------------------

*Released 2018-01-31*

- When bringing up a new sharded cluster, ensure that the CSRS
  replica set is fully up before modifying balancer settings.

.. _automation-4.8.1.2451:

Automation Agent 4.8.1.2451
---------------------------

*Released 2018-01-30*

- Support sharding metadata changes on replica sets.

.. _automation-4.8.0.2438:

Automation Agent 4.8.0.2438
---------------------------

*Released 2018-01-23*

- Support MongoDB authentication for managed BI Connectors, without also
  requiring |tls-ssl|.



.. _automation-4.7.0.2418:

Automation Agent 4.7.0.2418
---------------------------

*Released 2018-01-08*

- Add support for sampleRefreshIntervalSecs and sampleSize when
  configuring a BI Connector.

- Support for MongoDB 3.6 User Authentication Restrictions.

.. _automation-4.5.9.2395:

Automation Agent 4.5.9.2395
---------------------------

*Released 2017-12-07*

Automation Agent on Windows should manage the firewall for the BI
Connector.

.. _automation-4.5.8.2390:

Automation Agent 4.5.8.2390
---------------------------

*Released 2017-12-06*

Fix race condition when upgrading MongoDB version and feature
compatibility version simultaneously.

.. _automation-4.5.7.2375:

Automation Agent 4.5.7.2375
---------------------------

*Released 2017-11-28*

**Fix:** Restore from a MongoDB 3.6 sharded cluster without
authorization enabled, to a sharded cluster with authorization
enabled.

.. _automation-4.5.4.2347:

Automation Agent 4.5.4.2347
---------------------------

*Released 2017-11-14*

Support for upcoming release of MongoDB 3.6.

.. _automation-4.5.3.2339:

Automation Agent 4.5.3.2339
---------------------------

*Released 2017-11-09*

- Support automated restore for MongoDB 3.6.

- **Fix:** When slow query log tailing is enabled for 
  Performance Advisor, start at the end of the current file.

.. _automation-4.5.1.2319:

Automation Agent 4.5.1.2319
---------------------------

*Released 2017-11-01*

Continued work for support for upcoming release of MongoDB 3.6.

.. _automation-4.5.0.2305:

Automation Agent 4.5.0.2305
---------------------------

*Released 2017-10-26*

Support for upcoming release of MongoDB 3.6.

.. _automation-4.4.2.2274:

Automation Agent 4.4.2.2274
---------------------------

*Released 2017-10-13*

**Fix:** Issue with spurious extra line in the Windows 
configuration file.

.. _automation-4.4.1.2267:

Automation Agent 4.4.1.2267
---------------------------

*Released 2017-10-10*

**Fix:** Issue parsing keyfiles that contain spaces.

.. _automation-4.4.0.2256:

Automation Agent 4.4.0.2256
---------------------------

*Released 2017-10-05*

**Fix:** When Automation creates a temporary Windows service in order to
perform maintenance operations on a ``mongod``, remove the service when
the maintenance is completed.

.. _automation-4.3.0.2225:

Automation Agent 4.3.0.2225
---------------------------

*Released 2017-09-13*

- Support for advanced replica set configuration fields.

- Support for cross-Project PIT restores.

.. _automation-4.2.0.2209:

Automation Agent 4.2.0.2209
---------------------------

*Released 2017-08-25*

- Allow oplogs for a point in time restore to be applied client-side.

- **Fix:** Do not try to set explicit permissions for the Monitoring
  Agent and Backup Agent config files on Windows.

.. _automation-4.1.0.2188:

Automation Agent 4.1.0.2188
---------------------------

*Released 2017-08-01*

- Support for optimized point in time restores.

.. _automation-4.0.0.2153:

Automation Agent 4.0.0.2153
---------------------------

*Released 2017-07-11*

- When performing a resync, leave the ``diagnostic.data`` directory 
  intact.

.. _automation-3.9.0.2131:

Automation Agent 3.9.0.2131
---------------------------
  
*Released 2017-06-15*

- During a restore, update the Automation Agent credentials. This allows
  restores between Projects that do not share the same Automation Agent
  credentials.

- **Fix:** During a conversion to config server replica sets, use a 
  separate log file for the temporary config server processes.

.. _automation-3.8.0.2108:

Automation Agent 3.8.0.2108
---------------------------

*Released 2017-05-17*

- Automated restores always configure the destination replica set's
  :rsconf:`protocol version <rsconf.protocolVersion>` to the default
  protocol version for the MongoDB version.

.. _automation-3.7.1.2094:

Automation Agent 3.7.1.2094
---------------------------

*Released 2017-05-02*

- **Fix:** Issue managing MongoDB users with no roles.

.. _automation-3.7.0.2059:

Automation Agent 3.7.0.2059
---------------------------

*Released 2017-04-19*

- Final removal of all support for MongoDB 2.4.

.. _automation-3.6.2.2060:

Automation Agent 3.6.2.2060
---------------------------

*Released 2017-04-18*

- Increase response header timeout for HTTP requests.

.. _automation-3.6.1.2041:

Automation Agent 3.6.1.2041
---------------------------

*Released 2017-04-11*

- **Fix:** Can restore a sharded cluster to a new sharded cluster with
  different shard names.

- **Fix:** Sorted index keys in Data Explorer.

.. _automation-3.6.0.2024:

Automation Agent 3.6.0.2024
---------------------------

*Released 2017-03-29*

- Substantial optimization for state monitoring of sharded clusters.
  Considerably fewer requests will be made by the Automation Agents to 
  the deployment.

- **Fix:** Process shutdown during a restore of a sharded cluster on 
  Windows.

.. _automation-3.5.0.2003:

Automation Agent 3.5.0.2003
---------------------------

*Released 2017-03-08*

- Add support for upcoming data explorer feature.

- Fix for deployments that use |tls-ssl| with a password-protected PEM
  file.

.. _automation-3.4.1.1996:

Automation Agent 3.4.1.1996
---------------------------

*Released 2017-02-01*

- Fixes bug in shard removal for MongoDB 3.4.

.. _automation-3.4.0.1986:

Automation Agent 3.4.0.1986
---------------------------

*Released 2017-01-23*

- Support for macOS Sierra.

- Compiled with Go 1.7.4.

.. _automation-3.3.1.1976:

Automation Agent 3.3.1.1976
---------------------------

*Released 2017-01-10*

- Support for upcoming real time performance monitoring feature for 
  MongoDB 3.0.

.. _automation-3.3.0.1963:

Automation Agent 3.3.0.1963
---------------------------

*Released 2017-01-05*

- Support for upcoming real time performance monitoring feature.

- **Fix:** Symlink to latest MongoDB version
  if a previous version was manually deleted from disk.

- **Fix:** support of configurations that require both ``SCRAM-SHA1`` 
  and LDAP authentication, with LDAP authorization.

.. _automation-3.2.7.1927:

Automation Agent 3.2.7.1927
---------------------------

*Released 2016-11-23*

- Final support for sharded cluster downgrades in MongoDB 3.4.

- Adds support for management of Monitoring/Backup Agents on
  PowerPC-based Linux systems for MongoDB 3.4 or later deployments
  only.

.. _automation-3.2.6.1916:

Automation Agent 3.2.6.1916
---------------------------

*Released 2016-11-14*

- Better handling of timeouts in a sharded cluster when all config
  servers are down.

.. _automation-3.2.5.1907:

Automation Agent 3.2.5.1907
---------------------------

*Released 2016-11-07*

- When restoring a replica set, delete data directories for
  arbiters to prevent ``protocolVersion`` mismatches.

.. _automation-3.2.4.1901:

Automation Agent 3.2.4.1901
---------------------------

*Released 2016-11-03*

- Fixed issue wiht upgrading from MongoDB 2.4 to 2.6 while staying
  on authSchemaVersion 1.

- Do not create Windows firewall rules for processes that are
  started on temporary ports where external access is not required.

.. _automation-3.2.3.1894:

Automation Agent 3.2.3.1894
---------------------------

*Released 2016-10-26*

- **Fix:** Downgrade order for sharded clusters from MongoDB 3.4 to 
  MongoDB 3.2.

- Support for MongoDB 3.4.0-RC1.

.. _automation-3.2.2.1890:

Automation Agent 3.2.2.1890
---------------------------

*Released 2016-10-25*

- Minor logging changes.

.. _automation-3.2.1.1884:

Automation Agent 3.2.1.1884
---------------------------

*Released 2016-10-11*

- **Fix:** When performing a rolling operation, do not wait for
  replication lag to catch-up on delayed secondaries.

.. _automation-3.1.2.1850:

Automation Agent 3.1.2.1850
---------------------------

*Released 2016-09-30*

- More generous time-out for shutting down a ``mongod`` process.

.. _automation-3.1.1.1845:

Automation Agent 3.1.1.1845
---------------------------

*Released 2016-09-28*

- **Fix:** Can verify PEMKey passwords.

.. _automation-3.1.0.1813:

Automation Agent 3.1.0.1813
---------------------------

*Released 2016-09-14*

- Change order of sharded cluster upgrades in prep for upcoming
  MongoDB 3.4.0. New order is: config servers, shards, ``mongos``.

.. _automation-3.0.0.1798:

Automation Agent 3.0.0.1798
---------------------------

*Released 2016-08-24*

- Support for management of Monitoring/Backup Agents on Power Linux.

- **Fix:** ``systemd`` Automation Agent packages should not shut down
  managed processes on agent shutdown.

.. _automation-2.9.0.1764:

Automation Agent 2.9.0.1764
---------------------------

*Released 2016-08-04*

- When performing a rolling operation in a replica set, wait for
  replication lag to catch-up before moving on to the next node.

- **Fix:** ability to enable clusterAuthMode in a sharded cluster.

.. _automation-2.8.1.1725:

Automation Agent 2.8.1.1725
---------------------------

*Released 2016-07-01*

- Supports high resolution monitoring of hardware metrics for Cloud
  Manager Premium.

- Fixes a bug in rolling index builds of text indexes.

.. _automation-2.8.0.1714:

Automation Agent 2.8.0.1714
---------------------------

*Released 2016-06-22*

- Now built using Go 1.6.

- When importing a process that uses a password for the ``PEMKeyFile``,
  import it without making the user re-enter it.

- Significant performance improves for state gathering, especially
  for larger sharded clusters.

- Add a configurable timeout.

- Always attempt to step down replica set member nodes before
  shutting down.

.. _automation-2.7.3.1679:

Automation Agent 2.7.3.1679
---------------------------

*Released 2016-06-03*

- Adjust timeout when creating oplog collections to 12 hours.

- Ensure that if first SCCC config server cannot be started, second
  and third config servers are restarted.

- Optimization - when a ``mongod`` process is down, query the
  deployment only for relevant information.

.. _automation-2.7.2.1649:

Automation Agent 2.7.2.1649
---------------------------

*Released 2016-05-16*

- Better logging for |tls-ssl| connection failures.

- Use absolute paths for determining which Monitoring and Backup
  Agents are managed.

- When restoring a backup, ensure that arbiter nodes never download 
  data.

.. _automation-2.7.1.1631:

Automation Agent 2.7.1.1631
---------------------------

*Released 2016-04-22*

- Always send hardware metrics in association with the FQDN of the
  server, rather than with any defined aliases.

.. _automation-2.7.0.1626:

Automation Agent 2.7.0.1626
---------------------------

*Released 2016-04-20*

- Send enhanced status messages to the server.

- Minor changes to hardware statistics the Auomation Agents gather.

.. _automation-2.6.4.1612:

Automation Agent 2.6.4.1612
---------------------------

*Released 2016-03-29*

- Fixed memory leak when querying for state on arbiters.

.. _automation-2.6.3.1603:

Automation Agent 2.6.3.1603
---------------------------

*Released 2016-03-22*

- Fix issue where config server replica set conversion is unable to
  complete.

- Allow users to specify a specific temporary port for use during
  conversion to config server replica sets.

.. _automation-2.6.1.1564:

Automation Agent 2.6.1.1564
---------------------------

*Released 2016-03-09*

- Support |tls-ssl| downgrades, i.e. changes from stricter to looser 
  |tls-ssl| settings (required -> preferred)

.. _automation-2.6.0.1551:

Automation Agent 2.6.0.1551
---------------------------

*Released 2016-02-18*

- Uses systemD management on RHEL7 and Ubuntu 16.04.

- Includes support for no-downtime conversions to config server
  replica sets, for MongoDB 3.2.4.

- **Fix:** Automation Agent will not fail
  validation for auth schema versions for arbiters.

- **Fix:** More accurate computation of current size of oplog.

.. _automation-2.5.15.1526:

Automation Agent 2.5.15.1526
----------------------------

*Released 2016-01-19*

- Added optimization to prioritize replica set reconfiguration 
  actions over index builds.

- Improved index building mechanism: index builds are no longer
  performed in a rolling fashion for 2-node replica sets, but instead
  are build in the background.

- Added optimization to not compare unsupported index options when
  determining whether or not an index already exists.

.. _automation-2.5.14.1514:

Automation Agent 2.5.14.1514
----------------------------

*Released 2016-01-07*

- Fixed issue with importing existing deployments that include
  :term:`arbiters <arbiter>` running with authentication.

- Fixed issue with rolling storage engine conversion for
  :term:`replica sets <replica set>` to ensure a super majority is 
  always up.

- Fixed issue with creating custom roles on :term:`sharded clusters
  <sharded cluster>` running MongoDB 3.2 with config server 
  replica sets.

- Added support for restores for sharded clusters running MongoDB 3.2
  with config server replica sets.

- Added support for floating point replica set priorities.

- General fixes to improve stability for restores.

.. _automation-2.5.11.1484:

Automation Agent 2.5.11.1484
----------------------------

*Released 2015-12-07*

- Fix race condition during replica set reconfiguration at the
  completion of an automated restore.


.. _automation-2.5.9.1477:

Automation Agent 2.5.9.1477
---------------------------

*Released 2015-12-03*

- Fix race condition in which a restored replica set member is left
  out of the replica set at the end of the restore process.

.. _automation-2.5.7.1471:

Automation Agent 2.5.7.1471
---------------------------

*Released 2015-11-30*

- **Fix:** Do not run ``mongos --upgrade`` when upgrading to the 
  MongoDB 3.2 series, it is not necessary.

.. _automation-2.5.6.1469:

Automation Agent 2.5.6.1469
---------------------------

*Released 2015-11-24*

- **Fix:** When building a rolling index on a single-node replica set,
  simply create the index with background:true

- **Fix:** If a MongoDB version is used, removed and then used again,
  ensure that it is re-downloaded.

.. _automation-2.5.4.1444:

Automation Agent 2.5.4.1444
---------------------------

*Released 2015-11-11*

- **Fix:** After starting a new Monitoring or Backup Agent, ensure that
  the process is running achieving Goal State.

.. _automation-2.5.2.1439:

Automation Agent 2.5.2.1439
---------------------------

*Released 2015-11-09*

- **Fix:** Do not overwrite the log file for the Monitoring and Backup
  Agents when starting a new instance.

.. _automation-2.5.0.1430:

Automation Agent 2.5.0.1430
---------------------------

*Released 2015-11-02*

- Support for rolling conversion to X.509 member auth.

- Fixes for rolling index builds.

.. _automation-2.4.1.1393:

Automation Agent 2.4.1.1393
---------------------------

*Released 2015-10-15*

- **Fix:** Keyfile paths for mixed Windows/OS clusters handled properly.

.. _automation-2.4.0.1384:

Automation Agent 2.4.0.1384
---------------------------

*Released 2015-10-08*

- Support for performing a restore via Automation Agents.

- Support for rolling index builds.

- Send error codes in log messages.

- Support for configuring WiredTiger encrypted storage for MongoDB
  3.2.0.

.. _automation-2.3.0.1335:

Automation Agent 2.3.0.1335
---------------------------

*Released 2015-09-16*

- Basic support for MongoDB 3.1.7 including the ability to build a
  3.1.7 cluster with a CSRS replica set, handling of new enterprise
  version format, ability to configure WT encrypted storage with
  local keys.

- Shut down the Automation Agent if the automatic update fails 100
  times in a row.

- **Fix:** Failed Automation Agent automatic updates can cause surge in
  configuration calls from the Automation Agent.

.. _automation-2.2.3.1337:

Automation Agent 2.2.3.1337
---------------------------

*Released 2015-09-11*

- Fixes ``glibc`` incompatibility issue on RHEL5 and RHEL6.

.. _automation-2.2.1.1322:

Automation Agent 2.2.1.1322
---------------------------

*Released 2015-09-03*

- Fixes issue in which the Automation Agent crashes when attempting
  to load an invalid certificate bundle.

.. _automation-2.2.0.1307:

Automation Agent 2.2.0.1307
---------------------------

*Released 2015-08-31*

- Improved handling of sharded clusters with members running on
  both Linux and Windows-based operating systems.

- **Fix:** Delays during the conversion to |tls-ssl| remediated.

.. _automation-2.1.0.1280:

Automation Agent 2.1.0.1280
---------------------------

*Released 2015-08-10*

- Added functionality to retrieve and send hardware stats to Cloud
  Manager servers.

.. _automation-2.0.12.1238:

Automation Agent 2.0.12.1238
----------------------------

*Released 2015-07-22*

- **Fix:** Rare issue encountered in automatic upgrade process, which
  would prevent the upgrade process from completing successfully.

.. _automation-2.0.11.1231:

Automation Agent 2.0.11.1231
----------------------------

*Released 2015-07-15*

- :issue:`MMS-2711`: Fixed an issue with rolling storage engine 
  upgrades for authenticated replica sets that include an arbiter.

- :issue:`MMS-2707`: Improved handling of rolling operations for 
  replica sets that contain more than one arbiter.

- :issue:`MMS-2759`: fixed an issue with importing ``SCRAM-SHA-1`` users
  into an existing deployment.

- Added optimization to ensure that the credentials used during
  an Import Existing job are not cached or reused.

.. _automation-2.0.9.1201:

Automation Agent 2.0.9.1201
---------------------------

*Released 2015-06-24*

- **Fix:** Rolling upgrades when one or more 
  :term:`secondaries <secondary>` has significant replication lag to 
  ensure that a secondary has always fully caught up before upgrading 
  the :term:`primary`.

- **Fix:** Creation of ``SCRAM-SHA-1`` users imported from one
  deployment item (:term:`standalone`, :term:`replica set`, or
  :term:`sharded cluster`) and then applied to a new sharded cluster.

- Added a small sleep time during the auto-upgrade process.

.. _automation-2.0.8.1184:

Automation Agent 2.0.8.1184
---------------------------

*Released 2015-06-17*

- **Fix:** Users can be deleted from the ``$external`` database.

- Added fix that prevents the Automation, Monitoring and Backup
  agents from sharing a Kerberos credentials cache.

- Reverted to an earlier version of a third-party library as the newer
  edition prevented JSON parsing from working correctly on Windows.

.. _automation-2.0.7.1158:

Automation Agent 2.0.7.1158
---------------------------

*Released 2015-06-12*

- Added fix for :issue:`MMS-2612`, where users imported from a
  MongoDB 3.0 deployment running with ``authSchemaVersion=5`` could
  not be applied to other deployment items.

.. _automation-2.0.6.1148:

Automation Agent 2.0.6.1148
---------------------------

*Released 2015-05-29*

- Fixed issue with importing existing deployments using |tls-ssl|
  but not ``MONGODB-X509`` authentication.

.. _automation-2.0.4.1140:

Automation Agent 2.0.4.1140
---------------------------

*Released 2015-05-22*

- Fixed issue determining the Kerberos keytab for a process on Ubuntu.

.. _automation-2.0.2.1138:

Automation Agent 2.0.2.1138
---------------------------

*Released 2015-05-21*

- Fixed issue with configuring the Windows firewall when the Windows
  firewall was disabled.

.. _automation-2.0.2.1136:

Automation Agent 2.0.2.1136
---------------------------

*Released 2015-05-20*

- Enabled storage engine conversions for single-node replica sets and
  standalones.

- Added optimization where |mms| assumes success when starting a forked
  MongoDB process, rather than waiting for EOF.

.. _automation-2.0.0.1120:

Automation Agent 2.0.0.1120
---------------------------

*Released 2015-05-13*

- Added functionality to delete MongoDB binaries on disk that are not
  used by an managed process.

- **Fix:** Management of the Monitoring and Backup Agents by
  the Automation Agent on Windows.

- Added up-front validation to ensure that MongoDB processes are
  running as the same user as the Automation Agent.

.. _automation-1.9.3.1109:

Automation Agent 1.9.3.1109
---------------------------

*Released 2015-05-08*

- Added fix for :issue:`MMS-2489`: fixed issue deriving the default
  port for config servers started with the
  :option:`--configsvr` option but with no port specified.

.. _automation-1.9.1.1100:

Automation Agent 1.9.1.1100
---------------------------

*Released 2015-05-01*

- Added support for importing an existing deployment to automation
  when the deployment contains authenticated arbiters on which the
  hostname does not resolve locally to the loopback interface.

.. _automation-1.9.1.1093:

Automation Agent 1.9.1.1093
---------------------------

*Released 2015-04-30*

- Fixed memory leak issue with the Automation Agent.

.. _automation-1.9.0.1073:

Automation Agent 1.9.0.1073
---------------------------

*Released 2015-04-21*

- Added ability to change the storage engine for replica sets with
  more than one data node.

- Added a RHEL7-specific Automation Agent build. The generic 
  builds will not work with RHEL7.
  
  If you run an earlier Automation Agent (prior to ``1.9.0``), the
  agent will fail to auto-upgrade on RHEL7: you will need to do the
  upgrade manually.

- Added more detailed logging of when MongoDB, Monitoring Agent,
  or Backup Agent log rotation.

- Added support for new distribution-specific MongoDB builds.

- The Kerberos credentials cache now uses a fixed name.

- When deleting directories, |mms| no longer deletes symlinks.

.. _automation-1.8.1.1042:

Automation Agent 1.8.1.1042
---------------------------

*Released 2015-04-06*

- **Fix:** Replica set tags stay set when reconfiguring an
  unrelated replica set.

.. _automation-1.8.0.1034:

Automation Agent 1.8.0.1034
---------------------------

*Released 2015-04-01*

- Added ability to upgrade ``authSchemaVersion`` when auth is not
  enabled.

- Added support to 
  :doc:`import an existing </tutorial/add-existing-mongodb-processes>` 
  :program:`mongos` running with a config file.

- Fixed issue where the Automation Agent interfered with
  manually-created replica set tags.

.. _automation-1.7.1.1023:

Automation Agent 1.7.1.1023
---------------------------

*Released 2015-03-27*

- Ensures that the Automation Agent fails gracefully in the
  case where an expected user does not exist during an initial import.

.. _automation-1.7.0.992:

Automation Agent 1.7.0.992
--------------------------

*Released: 2015-03-16*

- Improves algorithm for balancing :program:`mongod` processes across 
  cores.

- Fixed issue with configuring oplog sizes greater than 1 TB.

- Improvements that make auto-upgrades more reliable.

.. _automation-1.6.2.960:

Automation Agent 1.6.2.960
--------------------------

*Released 2015-02-23*

- Ability to import an existing deployment into Automation, which allows
  you to use Automation to manage the deployment. 
  See :doc:`/tutorial/add-monitored-deployment-to-automation`.

- The :guilabel:`Deployment` tab now displays all deployment
  information, for both servers and processes, on one page, with icons
  for selecting view options.

.. _automation-1.3.0.718:

Automation Agent 1.3.0.718
--------------------------

*Released 2014-11-12*

- Support for MongoDB 2.8.

- Fixed issues with upgrades for 2.6-series minor version with auth
  enabled.

.. _automation-0.4.0:

Automation Agent 0.4.0
----------------------

*Released 2014-05-08*

Initial release for Automation beta program.
