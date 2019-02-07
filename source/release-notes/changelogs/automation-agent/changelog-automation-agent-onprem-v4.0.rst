.. _automation-5.4.16.5515-1:

Automation Agent 5.4.16.5515-1
------------------------------

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
