.. _backup-6.0.10.976:

Backup Agent 6.0.10.976
-----------------------

:ref:`Released with Ops Manager 3.6.8 on 2018-08-02 <opsmgr-server-3.6.8>`


.. _backup-6.0.10.972-1:

Backup Agent 6.0.10.972-1
-------------------------

:ref:`Released with Ops Manager 3.6.7 on 2018-06-06 <opsmgr-server-3.6.7>`

- Improved recovery after transient backup failures.

- Improve retry behavior for aborted network operations during PIT 
  restores.

- **Fix:** Automated PIT restore fails when target does not accept 
  |ssl|.

- **Fix:** Disable session cache refresh during standalone phase of a 
  restore.

- **Fix:** Queryable Restore Daemon file descriptor leak when using a 
  FileSystem Snapshot Store.

.. _backup-6.0.9.969:

Backup Agent 6.0.9.969
----------------------

:ref:`Released with Ops Manager 3.6.6 on 2018-05-03 <opsmgr-server-3.6.6>`

- Provide option for Backup Agent to use persistent HTTPS connections.

.. _backup-6.0.8.960:

Backup Agent 6.0.8.960
----------------------

:ref:`Released with Ops Manager 3.6.5 on 2018-04-05 <opsmgr-server-3.6.5>`

- Build system improvements

.. _backup-6.0.8.752:

Backup Agent 6.0.8.752
----------------------

:ref:`Released with Ops Manager 3.6.4 <opsmgr-server-3.6.4>`

- **Fix:** Backup Agent should produce an error message and not crash 
  when erroneous authentication credentials are provided for a source 
  cluster.

.. _backup-6.0.6.724:

Backup Agent 6.0.6.724
------------------------

:ref:`Released with Ops Manager 3.6.3 <opsmgr-server-3.6.3>`

- **Fix:** For MongoDB 3.6 deployments, the initial sync of a backup 
  could fail creating an index on a collection with a collation 
  specified.

.. _backup-6.0.5.716:

Backup Agent 6.0.5.716
----------------------

:ref:`Released with Ops Manager 3.6.2 on 2018-01-11 <opsmgr-server-3.6.2>`

.. _backup-6.0.3.689:

Backup Agent 6.0.3.689
----------------------

:ref:`Released with Ops Manager 3.6.0 on 2017-12-05 <opsmgr-server-3.6.0>`

- Support for MongoDB 3.6.

- Performance optimizations.

- Support for new Agent API Key model.
