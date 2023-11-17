.. _13.7.0.8514:

MongoDB Agent 13.7.0.8514
=========================

*Released* 2023-10-18

- Fixes an issue where |mms| reported an invalid configuration when 
  upgrading a managed deployment with multiple tags.
- Upgrades the ``mongosh`` used by |mms| to version 
  `2.0.2 <https://www.mongodb.com/docs/mongodb-shell/changelog/#v2.0.2>`__.
- Adds support for automating deployments on Ubuntu 22.04 for both x86_64
  and ARM64/aarch64 architectures.

.. _13.6.0.8483-1:

MongoDB Agent 13.6.0.8483-1
===========================

*Released* 2023-10-04

.. _13.5.0.8451-1:

MongoDB Agent 13.5.0.8451-1
===========================

*Released* 2023-09-13

.. _13.4.01.8413-1:

MongoDB Agent 13.4.01.8413-1
============================

*Released* 2023-08-23

- Flushes the |mongos| cache when you upgrade from MongoDB 5.0 to MongoDB 6.0.
- Ensures that the {+mdbagent+} always runs a shutdown on request, even when the MongoDB process is unresponsive.

.. _13.3.1.8376-1:

MongoDB Agent 13.3.1.8376-1
===========================

*Released* 2023-08-02

.. _13.3.0.8373-1:

MongoDB Agent 13.3.0.8373-1
===========================

*Released* 2023-08-02

- Adds the following improvements for backup snapshots: 
  
  - Ensures that the backup cursor stops if the {+mdbagent+} is not the session winner.
  - Increases the socket timeout length when the backup cursor opens.

.. _13.2.0.8337-1:

MongoDB Agent 13.2.0.8337-1
===========================

*Released* 2023-07-12

- Adds support for the upcoming release of MongoDB 7.0.

.. _13.1.0.8282-1:

MongoDB Agent 13.1.0.8282-1
===========================

*Released* 2023-06-14

.. _12.17.0.8238-1:

MongoDB Agent 12.17.0.8238-1
============================

*Released* 2023-05-24

- Uses aggregation operators instead of ``currentOp`` and ``collStats`` commands.
- Adds support for the ``security.kmip.useLegacyProtocol`` MongoDB configuration
  file option.

.. _12.16.0.8175-1:

MongoDB Agent 12.16.0.8175-1
============================

*Released* 2023-05-03

- Fixes an issue where restores could be interrupted by transient issues
  when retrieving a replication status.
- Improves |tls| certificate validation when configuring |tls| for 
  MongoDB deployments in the UI.


.. _12.15.0.8092:

MongoDB Agent 12.15.0.8092
==========================

*Released* 2023-04-12

- The MongoDB Agent now properly supports the simultaneous change of the
  Agent's authentication mechanism, deployment authentication mechanism,
  and the MongoDB version.
- Adds support for Ubuntu 20, 22.


.. _12.14.0.8069:

MongoDB Agent 12.14.0.8069
==========================

*Released* 2023-03-21

Fixes a formatting issue that could prevent the |k8s-op-short| from
successfully passing a localhost override to the monitoring module.

.. _12.13.0.8043:

MongoDB Agent 12.13.0.8043
==========================

*Released* 2023-03-01

Improves logging.

.. _12.12.0.8018-1:

MongoDB Agent 12.12.0.8018-1
============================

*Released* 2023-02-15

- Fixes an issue with managing the default read/write concerns when converting a replica set to a sharded cluster.
- Fixes the calculation of the number of available mongos during a rolling restart change when some mongos are explicitly disabled.
- Fixes the race condition when resetting an expired DNS cache.

.. _12.11.2.7970-1:

MongoDB Agent 12.11.2.7970-1 
============================

*Released* 2023-02-07

- Fixes ``collStats`` and ``db.currentOp()`` errors that caused missing data from the :guilabel:`Slowest Operations` chart in the Real-Time Performance Panel. 

.. _12.11.0.7961:

MongoDB Agent 12.11.0.7961
===========================

*Released* 2023-01-25

- Uses Go 1.19.
- Sets the correct topology time on a MongoDB 6.0+ target sharded cluster
  during a push live migration to |service|.
- Supports changing runtime-settable MongoDB Server parameters without
  requiring a restart.
- Fixes the processing of the :dbcommand:`collStats` and
  :manual:`db.currentOp() </reference/method/db.currentOp>` commands
  so that they use corresponding aggregation stages. To learn more,
  see :ref:`Database Commands Used by {+magent+} <db-commands-used-by-agent>`
  and :ref:`Real Time Metrics <real-time-metrics-status-tab>`.
- Improves logging.

.. _12.10.2.7935-1:

MongoDB Agent 12.10.2.7935-1
============================

*Released* 2023-01-05

.. _12.10.0.7929:

MongoDB Agent 12.10.0.7929
============================
  
*Released* 2023-01-05

- Improves memory management when collecting information on chunks in sharded collections.
- Improves logging.

.. _12.9.0.7902-1:

MongoDB Agent 12.9.0.7902-1
===========================

*Released* 2022-12-14

- Removes old {+mongosh+} versions automatically.

.. _12.8.0.7876-1:

MongoDB Agent 12.8.0.7876-1
===========================

*Released* 2022-11-16

- {+mdbagent+} now compresses rotated log files.
- Adds support for rotating the ``automation-agent-fatal.log`` file.
- Improves logging.

.. _12.7.0.7844-1:

MongoDB Agent 12.7.0.7844-1
===========================

*Released* 2022-10-27

- Adds support for new methods of retrieving sharded data distribution
  on MongoDB 6.0.
- :ref:`Adds support for the rotation of the log file used for system
  start-up errors <update-agent-fatal-log-rotation>`. 
- Fixes an issue that caused log errors in ``systemd`` services on
  ``mkdir`` if the directory already existed.

.. _12.6.0.7792:

MongoDB Agent 12.6.0.7792
=========================

*Released* 2022-10-05

- Fixes an issue that race detector identified.
- Fixes a float64 issue that occurred when |mms| collected hardware 
  metrics.

.. _12.5.0.7738-1:

MongoDB Agent 12.5.0.7738-1
===========================

*Released* 2022-09-15

- Fixes an issue where new indexes created with the Rolling Index Build
  feature are vulnerable to index key inconsistencies during subsequent
  replication rollback or server crash.

.. _12.4.0.7703:

MongoDB Agent 12.4.0.7703
-------------------------

*Released* 2022-08-24

- Adds support for an upcoming feature that allows you to set 
  cluster-wide parameters.
- Fixes a bug that could cause the {+mdbagent+} self-update to stall if 
  it encountered an issue downloading new binaries.
- Fixes an issue with rotating MongoDB audit log files.

.. _12.3.0.7658-1:

MongoDB Agent 12.3.0.7658-1
---------------------------

*Released* 2022-08-04

.. include:: /includes/extracts/cloud-warning-server-68925.rst

- Improves automatic race detection and fixes detected race conditions.
- Improves audit log rotation by tightening regex for determining which 
  files are audit logs.

.. _12.2.0.7631:

MongoDB Agent 12.2.0.7631
-------------------------

*Released* 2022-07-13

.. include:: /includes/extracts/cloud-warning-server-68925.rst

- Fixes a bug for {+mdbagent+} versions 12.1.1 and later where rolling 
  index builds ignored the ``hidden`` property when built on Data 
  Explorer.
- Improves logging.
- Adds support for the upcoming release of MongoDB 6.0.

.. _12.1.0.7593:

MongoDB Agent 12.1.0.7593
--------------------------

*Released* 2022-06-22

.. include:: /includes/extracts/cloud-warning-server-68925.rst

- Adds support for the upcoming release of MongoDB 6.0.

.. _12.0.4.7554:

MongoDB Agent 12.0.4.7554
-------------------------

*Released* 2022-06-01

.. include:: /includes/extracts/cloud-warning-server-68925.rst

- Adds support for the upcoming release of MongoDB 6.0.0.

.. _12.0.0.7536:

MongoDB Agent 12.0.0.7536
-------------------------

*Released* 2022-05-10

.. include:: /includes/extracts/cloud-warning-server-68925.rst

- Adds support for the upcoming release of MongoDB 6.0.0.

.. _11.15.0.7497:

MongoDB Agent 11.15.0.7497
--------------------------

*Released* 2022-04-20

.. include:: /includes/extracts/cloud-warning-server-68925.rst

- Adds support for the upcoming release of MongoDB 6.0.

.. _11.14.0.7475:

MongoDB Agent 11.14.0.7475
--------------------------

*Released* 2022-03-31

.. include:: /includes/extracts/cloud-warning-server-68925.rst

- Removes support for managing MongoDB 3.4 clusters, but still 
  supports monitoring and backup.
- Includes additional optimization for DNS lookups that the MongoDB 
  Agent performs.
- Improves error handling for parallel restores.

.. _11.13.0.7438:

MongoDB Agent 11.13.0.7438
--------------------------

*Released* 2022-03-09

.. include:: /includes/extracts/cloud-warning-server-68925.rst

- Reduces the rate of DNS lookups performed by the {+mdbagent+}.

.. _11.12.0.7401:

MongoDB Agent 11.12.0.7401
--------------------------

*Released* 2022-02-16

- Fixes an issue where the {+mdbagent+} erroneously determined that 
  processes were down before they were completely shut down.
- Updates the {+aagent+} ``systemd`` configuration script to send the
  correct termination signal.

.. _11.11.0.7355:

MongoDB Agent 11.11.0.7355
--------------------------

*Released* 2022-01-25

- Improves memory management during backup snapshots.

.. _11.10.0.7307:

MongoDB Agent 11.10.0.7307
--------------------------

*Released* 2022-01-05

- Fixes problem when removing a shard in a sharded cluster using a
  non-default value for cluster-wide read or write concern.

.. _11.9.0.7253-1:

MongoDB Agent 11.9.0.7253-1
---------------------------

*Released* 2021-12-02

- Removes support for macOS.
- Improves detection of NUMA-enabled hardware.
- Improves logging.


.. _11.8.0.7223-1:

MongoDB Agent 11.8.0.7223-1
---------------------------

*Released* 2021-11-17

- Adds support for the release of MongoDB 5.1.
- Improves management of database users additions and removals.

.. _11.7.0.7181-1:

MongoDB Agent 11.7.0.7181-1
---------------------------

*Released* 2021-10-27

- Improves hardware metrics collection for Windows.
- Improves logging during download of software components.

.. _11.6.0.7119:

MongoDB Agent 11.6.0.7119
-------------------------

*Released* 2021-10-06

- Removes support for RHEL/CentOS 6.

- Improves handling during restores for MongoDB processes with very  
  long start-up times.

.. _11.5.0.7078-1:

MongoDB Agent 11.5.0.7078-1
---------------------------

*Released* 2021-09-15

- Improves support for the recently released MongoDB 5.0.

.. _11.4.0.7057-1:

MongoDB Agent 11.4.0.7057-1
---------------------------

*Released* 2021-08-25

- Improves support for the recently released MongoDB 5.0.

.. _11.3.0.7029-1:

MongoDB Agent 11.3.0.7029-1
---------------------------

*Released* 2021-08-03

- Improves support for the recently released MongoDB 5.0.

.. _11.2.0.6985:

MongoDB Agent 11.2.0.6985
-------------------------

*Released* 2021-07-07

- Improves support for the upcoming release of MongoDB 5.0.

.. _11.1.0.6961:

MongoDB Agent 11.1.0.6961
-------------------------

*Released* 2021-06-23

- Improves support for the upcoming release of MongoDB 5.0.
- Improves logging for RHEL, CentOS, and SUSE hosts that use
  `systemd <https://freedesktop.org/wiki/Software/systemd>`__.

.. _11.0.0.6919:

MongoDB Agent 11.0.0.6919
-------------------------

*Released* 2021-06-02

- Adds support for the upcoming release of MongoDB 5.0.

.. _10.30.0.6882-1:

MongoDB Agent 10.30.0.6882-1
----------------------------

*Released* 2021-05-11

- Improves logging when removing a shard.
- Fixes problems rotating the |kmip| master key for MongoDB deployments 
  running on Windows.

.. _10.29.0.6856-1:

MongoDB Agent 10.29.0.6856-1 
----------------------------

*Released* 2021-04-21 

- Uses Go 1.15 to build the {+mdbagent+}. Before upgrading to this version,
  ensure that all |tls| certificates used in your MongoDB deployment
  contain a Subject Alternative Name. For more information, see 
  :ref:`Troubleshooting <tls-cert-no-san>`.
- Improves logging.

.. _10.28.0.6828-1:

MongoDB Agent 10.28.0.6828-1
----------------------------

*Released* :ref:`2021-03-30 <cloudmanager_20210330>`

- Improves support for the upcoming MongoDB 5.0 release.

.. _10.27.0.6799:

MongoDB Agent 10.27.0.6799
--------------------------

*Released* :ref:`2021-03-09 <cloudmanager_20210309>`

- Improves handling of |tls| state transitions if a process 
  unexpectedly crashes.

.. _10.26.0.6757:

MongoDB Agent 10.26.0.6757
----------------------------

*Released* 2021-02-17

- Fixes a bug that ensures fixed ordering of index options for all nodes
  in a rolling index build.


.. _10.25.0.6735-1:

MongoDB Agent 10.25.0.6735-1
----------------------------

*Released* 2021-01-26

- Improves memory management while taking snapshots of clusters running
  MongoDB 4.2+.

.. _10.24.0.6714-1:

MongoDB Agent 10.24.0.6714-1
----------------------------

*Released* 2021-01-06

- Stops adding MongoDB binaries (such as |mongod|, |mongos|, etc.)
  to the Linux path when installing from RPM and DEB packages. 

.. _10.23.0.6688-1:

MongoDB Agent 10.23.0.6688-1
----------------------------

*Released* 2020-12-15

- Improves resiliency during the snapshot phase for MongoDB 4.2+
  backups.
- Ensures that |mms| uses a healthy |mongos| when querying to determine
  the current state of a sharded cluster.

.. _10.21.0.6634:

MongoDB Agent 10.21.0.6634
--------------------------

*Released* :ref:`2020-11-04 <cloudmanager_20201103>`

- Ensures backup functions are shut down cleanly and promptly upon   
  MongoDB Agent shutdown.

.. _10.20.0.6609-1:

MongoDB Agent 10.20.0.6609-1
----------------------------

*Released* 2020-10-14

- Improves resiliency of incremental backup snapshots.

.. _10.19.0.6585-1:

MongoDB Agent 10.19.0.6585-1
----------------------------

*Released* 2020-09-23

- Fixes an issue when configuring tags for a sharded cluster with 
  ``FCV=4.4``. Ensures that ObjectIds are properly handled as the value 
  for the ``_id`` field.

- Fixes an issue where, in rare cases, an error during a backup initial 
  sync could lead to a MongoDB Agent crash.

.. _10.19.0.6566-1:

MongoDB Agent 10.19.0.6566-1
----------------------------

*Released* 2020-09-01

- Improves logging: only log to ``stdout/sterr`` if no other log
  mechanism is available.

- Adds additional retries if certain error conditions are encountered when
  taking a snapshot.

.. _10.17.0.6529-1:

MongoDB Agent 10.17.0.6529-1
----------------------------

*Released* :ref:`2020-08-12 <cloudmanager_20200811>`

- Improves logging when a MongoDB process fails to start.

.. _10.16.0.6499-1:

*Released* 2020-07-21

- Improves support for the upcoming release of MongoDB 4.4.

.. _10.15.0.6463:

MongoDB Agent 10.15.0.6463
--------------------------

*Released* :ref:`2020-06-24 <cloudmanager_20200624>`

- Support for the upcoming release of MongoDB 4.4.
- Signature verification for all MongoDB binary downloads.

.. _10.14.0.6306-1:

MongoDB Agent 10.14.0.6306-1
----------------------------

*Released* :ref:`2020-04-21 <cloudmanager_20200421>`

- Supports the upcoming release of MongoDB 4.4.
- Includes optimizations to reduce the number of simultaneous connections
  from the {+mdbagent+} to |mongos|.

.. _10.13.0.6247:

MongoDB Agent 10.13.0.6247
--------------------------

*Released* :ref:`2020-03-31 <cloudmanager_20200331>`

- Support for upcoming MongoDB 4.4 release.
- Fixes an issue that caused monitoring module discovery to stall if 
  the first contact with an unauthenticated ``mongod`` resulted in an 
  error.
- Ensures that integer values for ``setParameter`` are always correctly 
  formatted as integers.
- Ensures that the MongoDB Agent never interprets network errors as 
  authentication errors, leading to spurious attempts to rotate the 
  keyfile.

.. _10.12.0.6196-1:

MongoDB Agent 10.12.0.6196-1
----------------------------

*Released* 2020-03-10

- If a cluster has unhealthy nodes prior to initiating a
  storage-affecting rolling change, the {+mdbagent+} ensures that a
  majority of healthy nodes remain up at all times.

.. _10.11.0.6161:

MongoDB Agent 10.11.0.6161
--------------------------

*Released* 2020-02-18

- Fixes log rotation issue. Ensures that an error rotating one category
  of log file does not interfere with rotations for another category of
  log file.
- Improves logging.

.. _10.10.0.6122-1:

MongoDB Agent 10.10.0.6122-1
----------------------------

*Released* 2020-01-28

- Upgrades to MongoDB Go Driver 1.1.4.

- Reduces memory allocations for buffers used for HTTPS communication
  with cloud services, increasing the operational efficiency of the
  :doc:`Real Time Performance Panel </tutorial/view-diagnostics>`.

- Adds a timezone to MongoDB Agent
  :doc:`log lines </tutorial/view-logs>`.

- Supports concurrent
  :manual:`draining </tutorial/remove-shards-from-cluster>`
  of multiple shards for MongoDB 4.2.1+.

- Allows automated restores to proceed if the target processes are
  corrupt before the restore begins.

- Fixes indexing issue. During a rolling index build for an unsharded
  collection on a sharded collection, only index the collection on the
  shard on which it already exists.

.. _10.9.0.6088-1:

MongoDB Agent 10.9.0.6088-1
---------------------------

*Released* 2020-01-07

- Improves performance when applying changes to sharded clusters with
  many shards.

- Significant memory management improvements for sharded clusters with
  very large tag sets for
  :manual:`zoned sharding </core/zone-sharding>`.

- Fixes issue with automated restores. They can proceed successfully if
  the target process is unresponsive before the restore begins.

.. _mongodb-10.7.0.6016:

MongoDB Agent 10.7.0.6016
-------------------------

*Released* :ref:`2019-11-18 <cloudmanager-v20191112>`

- Removes support for MongoDB 3.2.

- MongoDB Agent is now built on Go 1.13.

- Removes the ``shardIdentity`` document during an automated restore if the 
  replica set member is not part of a sharded cluster. This ensures that a 
  shard from the sharded cluster is restored as its own replica set.

- When connecting to MongoDB, recognizes "connection reset by peer" as MongoDB 
  possibly not supporting TLS and connects appropriately.

- Restarts the restore operation if the oplog recovery phase fails. This 
  improves resilience for MongoDB 4.2 restores.

.. _mongodb-10.6.0.5959-1:

MongoDB Agent 10.6.0.5959-1
---------------------------

*Released* 2019-10-23

- Adds support for managing deployments using :doc:`externally sourced 
  configuration file values </reference/mongodb-agent-external-configuration/>`.

- Prefers connecting to MongoDB as the specified user instead of the 
  system user.

- Includes the inherited roles in the privileges check when importing 
  MongoDB users.

.. _mongodb-10.4.1.5917:

MongoDB Agent 10.4.1.5917
-------------------------

*Released* 2019-09-13

- Fix encoding issue for keyfiles containing newlines.

.. _mongodb-10.4.0.5913:

MongoDB Agent 10.4.0.5913
-------------------------

*Released* :ref:`2019-09-10 <cloudmanager-v20190910>`

- Support for :doc:`rolling keyfile changes </tutorial/rotate-keyfile>` in MongoDB 4.2.

.. _mongodb-10.3.1.5880:

MongoDB Agent 10.3.1.5880
-------------------------

*Released* 2019-08-05

- Fixes issue with health check for integration with Kubernetes Operator.

.. _mongodb-10.3.0.5877:

MongoDB Agent 10.3.0.5877
-------------------------

*Released* 2019-08-01

- Further work to support upcoming release of MongoDB Server 4.2.

.. _mongodb-10.1.2.5805:

MongoDB Agent 10.1.2.5805
-------------------------

*Released* 2019-06-11

- Monitoring function converted to use the new MongoDB Go Driver.

.. _mongodb-10.1.0.5785:

MongoDB Agent 10.1.0.5785
-------------------------

*Released* :ref:`2019-05-29 <cloudmanager-v20190528>`

- Monitoring module updated to MongoDB's new Go driver.
- Incremental work to support the upcoming MongoDB Server 4.2 release.

.. _mongodb-10.0.1.5755-1:

MongoDB Agent 10.0.1.5755-1
---------------------------

*Released* 2019-05-13

- Fix builds for deployments using GSSAPI authentication.

.. _mongodb-10.0.0.5753:

MongoDB Agent 10.0.0.5753
-------------------------

*Released* :ref:`2019-05-13 <cloudmanager-v20190507>`

- Incorporate the Monitoring and Backup Agents into a single process,
  which will now be known as the MongoDB Agent.
  :doc:`Learn more </reference/faq/faq-mongodb-agent>` about this
  change.
