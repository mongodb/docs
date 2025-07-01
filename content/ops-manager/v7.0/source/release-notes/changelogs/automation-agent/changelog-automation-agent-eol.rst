.. _automation-2.5.22.1876:

Automation Agent 2.5.22.1876
----------------------------

:ref:`Released with Ops Manager 2.0.7 on 2016-11-03 <opsmgr-server-2.0.7>`

- MongoDB data and log files will have a ``umask`` of ``027``.
  Requires new package install.

.. _automation-2.5.20.1755:

Automation Agent 2.5.20.1755
----------------------------

:ref:`Released with Ops Manager 2.0.6 on 2016-08-18 <opsmgr-server-2.0.6>`

- Improve logging on authentication failures.

- **Fix:** Can set ``clusterAuthMode`` on sharded clusters.

.. _automation-2.5.19.1732:

Automation Agent 2.5.19.1732
----------------------------

:ref:`Released with Ops Manager 2.0.5 on 2016-07-14 <opsmgr-server-2.0.5>`

- Substantial optimization in state-gathering.

- Configurable timeout for connections to MongoDB processes.

- **Fix:** Problem verifying success when creating text indexes in
  rolling index builds.

.. _automation-2.5.18.1647:

Automation Agent 2.5.18.1647
----------------------------

:ref:`Released with Ops Manager 2.0.4 on 2016-05-20 <opsmgr-server-2.0.4>`

- Agent no longer downloads restore data for arbiters.

- **Fix:** Some cases where CSRS conversion could get stuck.

- **Fix:** Agent can restart a config server if all config servers are 
  down.

- **Fix:** validating MongoDB versions when a cluster was on
  mixed operating systems.

.. _automation-2.5.17.1604:

Automation Agent 2.5.17.1604
----------------------------

:ref:`Released with Ops Manager 2.0.3 on 2016-03-24 <opsmgr-server-2.0.3>`

- **Fix:** Can import of arbiter using a different keyfile then
  existing configuration.

- Allow specifying a temporary port for use during a CRSR upgrade.

.. _automation-2.5.16.1552:

Automation Agent 2.5.16.1552
----------------------------

:ref:`Released with Ops Manager 2.0.2 on 2016-03-01 <opsmgr-server-2.0.2>`

- Added support for managing MongoDB on SUSE12.

- Added support for rolling upgrades to config servers as a replica
  set. See :doc:`/tutorial/convert-config-servers-to-replica-set`.

.. _automation-2.5.15.1526:

Automation Agent 2.5.15.1526
----------------------------

:ref:`Released with Ops Manager 2.0.1 on 2016-01-21 <opsmgr-server-2.0.1>`

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

:ref:`Released with Ops Manager 2.0.0 on 2015-12-08 <opsmgr-server-2.0.0>`

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

:ref:`Released with Ops Manager 1.8.2 on 2015-10-20 <opsmgr-server-1.8.2>`

- **Fix:** Agent from not recognizing RHEL Workstations as RHEL.

.. _automation-2.0.12.1238:

Automation Agent 2.0.12.1238
----------------------------

:ref:`Released with Ops Manager 1.8.1 on 2015-08-17 <opsmgr-server-1.8.1>`

- **Fix:** Can manage an existing deploy with user that has "root"
  privileges.

- **Fix:** Storage engine conversions do not get stuck if
  replica set contained an arbiter.

- **Fix:** Can update credentials after failed attempt to manage an
  existing deployment.

.. _automation-2.0.9.1201:

Automation Agent 2.0.9.1201
---------------------------

:ref:`Released with Ops Manager 1.8 on 2015-06-23 <opsmgr-server-1.8.0>`

- Added support for managing SSL-enabled deployments.

- Added support for managing deployment using Kerberos, LDAP, and
  x.509 Client Certificate authentication.

- Added support to import an existing :manual:`mongos </reference/program/mongos/#mongodb-binary-bin.mongos>` with a config 
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

- Improved algorithm for balancing :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>` processes across
  cores.

- When deleting directories, symlinks are no longer deleted.

- **Fix:** Can import credentials for ``MONGODB-CR`` users from
  ``SCRAM-SHA-1`` deployments. See: :issue:`MMS-2612` for more
  details.

- **Fix:** Can derive the default port for config servers
  started with the :option:`--configsvr <mongod.--configsvr>` option but
  with no port specified. See: :issue:`MMS-2489`.

- **Fix:** Can configure :manual:`oplog </reference/glossary/#std-term-oplog>` sizes greater than 1TB.

- **Fix:** Automation Agent does not interfere with
  manually-created replica set tags.

- Ensured that the Automation Agent fails gracefully when an expected
  user does not exist during an initial import.

.. _automation-1.4.18.1199-1:

Automation Agent 1.4.18.1199-1
------------------------------

:ref:`Released with Ops Manager 1.6.3 on 2015-06-23 <opsmgr-server-1.6.3>`

- Added support for importing an existing deployment that contains
  authenticated :term:`arbiters <arbiter>` on which the hostname does
  not resolve locally to the loopback interface.

- **Fix:** Logic used for performing a rolling restart.

- **Fix:** with deriving the default port for config servers started
  with the :option:`--configsvr <mongod.--configsvr>` option but with no port specified. See
  :issue:`MMS-2489`.

.. _automation-1.4.16.1075:

Automation Agent 1.4.16.1075
----------------------------

*Released 2015-04-28*

- **Fix:** Can update users created on MongoDB 2.4.

- **Fix:** No longer have :manual:`config server </reference/glossary/#std-term-config-server>` repair occur if the
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
