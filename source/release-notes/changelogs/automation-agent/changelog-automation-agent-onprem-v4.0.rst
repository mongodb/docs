.. _automation-5.4.24.5565:

Automation Agent 5.4.24.5565
----------------------------

:ref:`Released with Ops Manager 4.0.17 on 2020-02-06 <opsmgr-server-4.0.17>`

- Redacts sensitive configuration data in MongoDB Agent log files to
  improve security.

.. _automation-5.4.23.5559:

Automation Agent 5.4.23.5559
----------------------------

:ref:`Released with Ops Manager 4.0.16 on 2019-11-07 <opsmgr-server-4.0.16>`

- Adds support for the ``businessCategory`` field in extended validation
  |tls| certificates.
- The Automation Agent is now built using Go 1.13.

.. _automation-5.4.22.5547:

Automation Agent 5.4.22.5547
----------------------------

:ref:`Released with Ops Manager 4.0.15 on 2019-09-05 <opsmgr-server-4.0.15>`

- Fixes a bug where the MongoDB Agent could panic and delete files from
  its current working directory.

.. _automation-5.4.21.5544:

Automation Agent 5.4.21.5544
----------------------------

:ref:`Released with Ops Manager 4.0.14 on 2019-07-31 <opsmgr-server-4.0.14>`

- **Fix:** Restore downloads performed by Automation Agent now respect
  the configured ``sslTrustedMMSServerCertificate`` |onprem|
  parameter.

.. note::

   ``sslTrustedMMSServerCertificate`` has been deprecated. Use 
   :asetting:`httpsCAFile` instead.

.. _automation-5.4.20.5541:

Automation Agent 5.4.20.5541
----------------------------

:ref:`Released with Ops Manager 4.0.13 on 2019-07-04 <opsmgr-server-4.0.13>`

.. _automation-5.4.19.5537:

Automation Agent 5.4.19.5537
----------------------------

:ref:`Released with Ops Manager 4.0.12 on 2019-06-06 <opsmgr-server-4.0.12>`

- **Fix:** Automation Agent now periodically closes all idle |http|
  connections.

- **Fix:** Allow Automation Agent to connect to |mongos| through either
  "short" or "long" hostnames.

- **Fix:** Fix failure in the
  :doc:`make-init-scripts </tutorial/suspend-automation>` tool.

- **Fix:** Lower the default |http| Header time out in the Automation
  Agent from 15 minutes to 30 seconds. This ensures faster failures
  in the event of |onprem| service infrastructure changes, such as
  load balancers moving nodes out of a pool.

- **Fix:** When restoring a sharded cluster, remove all sharding
  metadata from the :data:`config.system.sessions` collection. If you
  do not remove the sharding metadata, MongoDB cannot to re-create this
  collection after the restore is complete.

.. _automation-5.4.16.5515:

Automation Agent 5.4.16.5515
----------------------------

:ref:`Released with Ops Manager 4.0.8 on 2019-02-07 <opsmgr-server-4.0.8>`

- **Fix:** Reduce the amount of memory used to generate plans for large
  sharded clusters.

- **Fix:** Rotation of log files when MongoDB log rotation is
  enabled and the maximum number of uncompressed log files is set to
  two.

.. _automation-5.4.15.5513:

Automation Agent 5.4.15.5513
----------------------------

:ref:`Released with Ops Manager 4.0.7 on 2019-01-10 <opsmgr-server-4.0.7>`

- Add support for the net.ssl.certificateSelector configuration option.

- **Fix:** Allow the successful change in the storageEngine for
  standalone binary: :binary:`~bin.mongod` with |tls-ssl| enabled.

- **Fix:** Automation Agent no longer attempts to authenticate to
  arbiters that are configured to use X.509 for ``clusterAuthMode``.

.. _automation-5.4.14.5509:

Automation Agent 5.4.14.5509
----------------------------

:ref:`Released with Ops Manager 4.0.6 on 2018-12-10 <opsmgr-server-4.0.6>`

.. _automation-5.4.13.5505:

Automation Agent 5.4.13.5505
----------------------------

:ref:`Released with Ops Manager 4.0.5 on 2018-11-01 <opsmgr-server-4.0.5>`

- Add support for the ``ssl.FIPSMode`` parameter.

- **Fix:** Memory leak when using Server Pools feature.

.. _automation-5.4.12.5501:

Automation Agent 5.4.12.5501
----------------------------

:ref:`Released with Ops Manager 4.0.4 on 2018-10-12 <opsmgr-server-4.0.4>`

- **Critical Fix:** MongoDB 4.0 restores may fail if snapshot
  downloads for nodes in the replica set finish at significantly
  different times.

- **Fix:** Restore the ability to upgrade from ``authSchemaVersion`` 3
  to 5 in a sharded cluster.

.. _automation-5.4.11.5498:

Automation Agent 5.4.11.5498
----------------------------

:ref:`Released with Ops Manager 4.0.3 on 2018-10-04 <opsmgr-server-4.0.3>`

- **Fix:** Automation Agent can add new MongoDB users even if
  SCRAM-SHA-1 authentication was enabled for the deployment after
  enabling SCRAM-SHA-256.

.. _automation-5.4.10.5496:

Automation Agent 5.4.10.5496
----------------------------

:ref:`Released with Ops Manager 4.0.2 on 2018-09-06 <opsmgr-server-4.0.2>`

- Storage affecting field changes in a replica set could result in
  data loss if processes were restarted unexpectedly.

- Automation Agent was unable to properly determine state if
  the process ID previously used by a MongoDB process was reclaimed by
  a different process after an unexpected server reboot.

- **Fix:** Allow :abbr:`CSRS (Config Server Replica Set)` members to
  be shut down.

.. _automation-5.4.9.5483:

Automation Agent 5.4.9.5483
---------------------------

:ref:`Released with Ops Manager 4.0.1 on 2018-08-02 <opsmgr-server-4.0.1>`

- **Critical Fix:** Set ``TasksMax=infinity`` and
  ``TasksAccounting=false`` in ``systemd`` scripts for
  Automation Agent.

- **Fix:** Automation Agent handling of enterprise builds for
  Amazon Linux 2.

.. _automation-5.4.6.5465:

Automation Agent 5.4.6.5465
---------------------------

:ref:`Released with Ops Manager 4.0.0 on 2018-06-27 <opsmgr-server-4.0.0>`

- Added support for MongoDB 4.0.
- Added support for SCRAM-SHA-256
- Added platform support for:

  - zLinux on :abbr:`RHEL (Red Hat Enterprise Linux)` 6
  - Debian 9
  - Amazon Linux 2

.. important::

   MongoDB 4.0 Community Edition requires
   `libcurl <https://curl.haxx.se/libcurl/>`__. Install ``libcurl``
   before using |onprem| to install MongoDB 4.0 Community.
