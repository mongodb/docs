.. _automation-4.5.17.5289-1:

Automation Agent 4.5.17.5289-1
------------------------------

:ref:`Released with Ops Manager 3.6.10 on 2019-01-10 <opsmgr-server-3.6.10>`

- **Fix:** Allow CSRS replica set members to be shut down.

.. _automation-4.5.16.5284-1:

Automation Agent 4.5.16.5284-1
------------------------------

:ref:`Released with Ops Manager 3.6.9 on 2018-11-01 <opsmgr-server-3.6.9>`

- **Critical Fix:** Storage affecting field changes in a replica set
  could result in data loss if processes were restarted unexpectedly.

- **Fix:** Memory leak when using Server Pools feature.

.. _automation-4.5.15.5281:

Automation Agent 4.5.15.5281
----------------------------

:ref:`Released with Ops Manager 3.6.8 on 2018-08-02 <opsmgr-server-3.6.8>`

- **Critical Fix:** Set ``TasksMax=infinity`` and 
  ``TasksAccounting=false`` in ``systemd`` scripts for
  Automation Agent.

.. _automation-4.5.15.5279-1:

Automation Agent 4.5.15.5279-1
------------------------------

- Ends support for SLES 11 and Ubuntu 12.04.

- Automation Agent support for BI Connector 2.5.

- Compound Text Indexes through Automation.

- **Fix:** When collecting logs, ignore errors for files that have 
  disappeared.

- Replace evergreen Ubuntu 12 testing with Ubuntu 14.

- Update version of BI Connector tested to 2.5.0.

.. _automation-4.5.14.5266:

Automation Agent 4.5.14.5266
----------------------------

:ref:`Released with Ops Manager 3.6.6 on 2018-05-03 <opsmgr-server-3.6.6>`

- **Fix:** Automation Agents should not attempt to rotate BI Connector
  log files for BI Connectors on other servers.

.. _automation-4.5.13.5261:

Automation Agent 4.5.13.5261
----------------------------

:ref:`Released with Ops Manager 3.6.5 on 2018-04-05 <opsmgr-server-3.6.5>`

- **Fix:** Disable MongoDB's TTL monitor thread while applying oplogs
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

- **Fix:** Automation Agent correctly resizes the :manual:`oplog </reference/glossary/#std-term-oplog>` for 
  MongoDB clusters that use X-509 for cluster authentication.

.. note:: RELEASE ADVISORY

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

:ref:`Released with Ops Manager 3.6.2 on 2018-01-11 <opsmgr-server-3.6.2>`

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

:ref:`Released with Ops Manager 3.6.1 on 2017-12-19 <opsmgr-server-3.6.1>`

- **Fix:** Prevent race condition when MongoDB version and FCV are
  updated at the same time.

- Manage Windows Firewall rules for the BI Connector.

.. _automation-4.5.7.2375:

Automation Agent 4.5.7.2375
---------------------------

:ref:`Released with Ops Manager 3.6.0 on 2017-12-05 <opsmgr-server-3.6.0>`

- Support for MongoDB 3.6.

- Support for advanced replica set configuration fields.

- Support for new Agent API Key model.
