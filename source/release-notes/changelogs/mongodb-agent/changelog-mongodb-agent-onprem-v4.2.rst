.. _mongodb-10.2.19.5989:

MongoDB Agent 10.2.19.5989
--------------------------

:ref:`Released with Ops Manager 4.2.15 on 2020-07-02 <opsmgr-server-4.2.15>`

- Reduces number of connections per second.

- Improves the Backup Module :term:`oplog` tail performance.

.. _mongodb-10.2.18.5978:

MongoDB Agent 10.2.18.5978
--------------------------

:ref:`Released with Ops Manager 4.2.14 on 2020-06-04 <opsmgr-server-4.2.14>`

- Allows {+aagent+} for managed deployments to start |mongos| processes
  if only the |csrs| primary is available, instead of requiring all
  |csrs| members to be available.

- Fixes a rare issue with managed deployments where the {+mdbagent+} is
  unable to start MongoDB processes.

- Fixes an issue where the {+mdbagent+} ignores other agent
  authentication mechanisms if ``clusterAuth`` is set to ``x509``.

.. _mongodb-10.2.17.5970:

MongoDB Agent 10.2.17.5970
--------------------------

:ref:`Released with Ops Manager 4.2.13 on 2020-05-14 <opsmgr-server-4.2.13>`

- Fixes an issue with managed deployments that can occur when a sharded
  cluster has a shard added and an index built at the same time.

- Supports SUSE 15.

.. _mongodb-10.2.16.5960:

MongoDB Agent 10.2.16.5960
--------------------------

:ref:`Released with Ops Manager 4.2.12 on 2020-04-09 <opsmgr-server-4.2.12>`

- Fixes an issue that resulted in failures creating snapshots when 
  handling sessions between the MongoDB Agent and MongoDB 4.2 clusters.

.. _mongodb-10.2.15.5958:

MongoDB Agent 10.2.15.5958
--------------------------

:ref:`Released with Ops Manager 4.2.11 on 2020-04-06 <opsmgr-server-4.2.11>`

- Ensures that the MongoDB Agent never interprets network errors as 
  authentication configuration errors, leading to illegitimate attempts 
  to rotate the keyfile.

.. _mongodb-10.2.14.5953-4.2.10:

MongoDB Agent 10.2.14.5953
--------------------------

:ref:`Released with Ops Manager 4.2.10 on 2020-03-16 <opsmgr-server-4.2.10>`

- Ensures that an error when rotating one type of log file does not interfere
  with log rotation of other log files.

- Ensures that the MongoDB Agent always respects the optionality of keyfiles
  for MongoDB deployments using X-509 cluster authentication.

- Ensures that a majority of healthy nodes remains up at all times if a cluster
  has unhealthy nodes prior to the initiation of a storage-affecting rolling
  change.

- Ensures that when importing a new sharded cluster for monitoring, the
  algorithm for auto-discovering all processes in the sharded cluster
  will also consider the fully qualified domain names.

- Upgrades the backup module of the MongoDB Agent to use the MongoDB Go Driver
  version 1.1.4.

.. _mongodb-10.2.14.5953-4.2.9:

MongoDB Agent 10.2.14.5953
--------------------------

:ref:`Released with Ops Manager 4.2.9 on 2020-03-05 <opsmgr-server-4.2.9>`

- Ensures that an error when rotating one type of log file does not interfere
  with log rotation of other log files.

- Ensures that the MongoDB Agent always respects the optionality of keyfiles
  for MongoDB deployments using X-509 cluster authentication.

- Ensures that a majority of healthy nodes remains up at all times if a cluster
  has unhealthy nodes prior to the initiation of a storage-affecting rolling
  change.

- Upgrades the backup module of the MongoDB Agent to use the MongoDB Go Driver
  version 1.1.4.

.. _mongodb-10.2.13.5943:

MongoDB Agent 10.2.13.5943
--------------------------

:ref:`Released with Ops Manager 4.2.8 on 2020-02-06 <opsmgr-server-4.2.8>`

- Adds support for management of MongoDB deployments on Debian 10.

- Fixes the following issues:

  - During a rolling index build for an unsharded collection on a
    sharded collection, only index the collection on the shard on which
    it already exists.

  - When the MongoDB Agent authenticates to MongoDB clusters using
    |gssapi| authentication, ensure that |mms| falls back to other
    authentication methods if the ``kinit`` call fails.

- Can perform a restore to a cluster that is unhealthy before the
  restore is requested.

- Redacts sensitive configuration data in MongoDB Agent log files to
  improve security.

.. _mongodb-10.2.12.5930:

MongoDB Agent 10.2.12.5930
--------------------------

:ref:`Released with Ops Manager 4.2.7 on 2020-01-09 <opsmgr-server-4.2.7>`

- Improves the behavior when a rollback occurs on a source cluster
  using replication protocol v0 when backing up clusters running
  MongoDB 4.0 and earlier.

.. _mongodb-10.2.11.5927:

MongoDB Agent 10.2.11.5927
--------------------------

:ref:`Released with Ops Manager 4.2.6 on 2019-12-19 <opsmgr-server-4.2.6>`

- Resolves memory leak in MongoDB Agent when performing snapshots for
  MongoDB 4.2 clusters.

.. _mongodb-10.2.10.5921:

MongoDB Agent 10.2.10.5921
--------------------------

:ref:`Released with Ops Manager 4.2.5 on 2019-12-12 <opsmgr-server-4.2.5>`

- MongoDB Agent is now built using Go 1.13.

.. _mongodb-10.2.9.5909:

MongoDB Agent 10.2.9.5909
-------------------------

:ref:`Released with Ops Manager 4.2.4 on 2019-11-07 <opsmgr-server-4.2.4>`

- MongoDB Agent is now built using Go 1.13.
- Fixes an issue where the MongoDB Agent fails to complete some
  requested actions on a sharded cluster if a config server is down.
- When creating an index using :doc:`Data Explorer </data-explorer>`,
  the optional name property of an index is no longer ignored.

.. _mongodb-10.2.8.5901-1:

MongoDB Agent 10.2.8.5901-1
---------------------------

:ref:`Released with Ops Manager 4.2.3 on 2019-10-10 <opsmgr-server-4.2.3>`

- Fixes an issue where upgrading to
  :ref:`MongoDB Agent 10.2.7 <mongodb-10.2.7.5898>` from any previous
  version restarted all |mongos| processes.

.. _mongodb-10.2.7.5898:

MongoDB Agent 10.2.7.5898
-------------------------

:ref:`Released with Ops Manager 4.2.2 on 2019-10-03 <opsmgr-server-4.2.2>`

- Adds support for the ``businessCategory`` field in extended
  validation |tls| certificates.
- MongoDB Agent is now built using Go 1.12.
- Adds support for the
  :xml:`<mono><ref target="index-type-partial">partialFilterExpression</ref></mono>`
  index option when creating an index using
  :doc:`Data Explorer </data-explorer>`.
- **Backup:** Adds support for the ``businessCategory`` field in
  extended validation |tls| certificates.
- **Monitoring:** Adds support for the ``businessCategory`` field in
  extended validation |tls| certificates.

.. _mongodb-10.2.6.5879-1:

MongoDB Agent 10.2.6.5879-1
---------------------------

:ref:`Released with Ops Manager 4.2.1 on 2019-09-05 <opsmgr-server-4.2.1>`

- Fixes a bug where the MongoDB Agent could panic and delete files from
  its current working directory.
- Improves logging in the MongoDB Agent such that when a connection to
  a MongoDB process is deliberately canceled, it does not appear as an
  error.
