.. _10.10.0.6122-1:

MongoDB Agent 10.10.0.6122-1
----------------------------

*Released* :ref:`2020-01-28 <cloudmanager-v20200128>`

- Upgrades to MongoDB Go Driver 1.1.4.

- Reduces memory allocations for buffers used for HTTPS communication with
  cloud services, increasing the operational efficiency of the :doc:`Real Time
  Performance Panel </tutorial/view-diagnostics>`.

- Adds a timezone to MongoDB Agent :doc:`log lines </tutorial/view-logs>`.

- Supports concurrent :manual:`draining </manual/tutorial/remove-shards-from-cluster>`
  of multiple shards for MongoDB 4.2.1+.

- Allows automated restores to proceed if the target processes are corrupt
  before the restore begins.

- Fix: during a rolling index build for an unsharded collection on a sharded
  collection, only index the collection on the shard on which it already exists.

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
