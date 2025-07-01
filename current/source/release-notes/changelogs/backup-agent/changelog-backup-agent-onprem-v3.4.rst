.. _backup-5.0.12.840:

Backup Agent 5.0.12.840
-------------------------

:ref:`Released with Ops Manager 3.4.13 on 2018-04-05 <opsmgr-server-3.4.13>`

- Build system improvements.

.. _backup-5.0.12.725:

Backup Agent 5.0.12.725
-------------------------

:ref:`Released with Ops Manager 3.4.12 on 2018-02-01 <opsmgr-server-3.4.12>`

- **Fix:** For MongoDB 3.6 deployments, the initial sync of a backup 
  could fail creating an index on a collection with a collation 
  specified.

.. _backup-5.0.11.663:

Backup Agent 5.0.11.663
-------------------------

:ref:`Released with Ops Manager 3.4.9 on 2017-10-05 <opsmgr-server-3.4.9>`

.. _backup-5.0.10.634:

Backup Agent 5.0.10.634
-------------------------

:ref:`Released with Ops Manager 3.4.7 on 2017-08-03 <opsmgr-server-3.4.7>`

- Improve state management when executing an administrative error
  retrieval task.

.. _backup-5.0.8.601:

Backup Agent 5.0.8.601
------------------------

:ref:`Released with Ops Manager 3.4.6 on 2017-07-06 <opsmgr-server-3.4.6>`

- Performance enhancement: Use bson.Raw for initial sync.

.. _backup-5.0.7.494:

Backup Agent 5.0.7.494
----------------------

:ref:`Released with Ops Manager 3.4.5 on 2017-05-18 <opsmgr-server-3.4.5>`

- **Fix:** High Memory Usage during Initial Sync with Large Numbers of
  Small Documents.

.. _backup-5.0.6.486:

Backup Agent 5.0.6.486
----------------------

:ref:`Released with Ops Manager 3.4.4 on 2017-03-30 <opsmgr-server-3.4.4>`

- Performance optimization for initial data collection in the initial
  sync phase.

.. _backup-5.0.6.477:

Backup Agent 5.0.6.477
----------------------

:ref:`Released with Ops Manager 3.4.3 on 2017-02-17 <opsmgr-server-3.4.3>`

- Built with Go 1.7.

- Support for MacOS Sierra.

.. _backup-5.0.5.472:

Backup Agent 5.0.5.472
----------------------

:ref:`Released with Ops Manager 3.4.2 on 2017-01-19 <opsmgr-server-3.4.2>`

- Fixed Backup Agent logs not getting sent to server on Windows.

.. _backup-5.0.4.469:

Backup Agent 5.0.4.469
----------------------

:ref:`Released with Ops Manager 3.4.1 on 2016-12-27 <opsmgr-server-3.4.1>`

- Fix initial sync failures in MongoDB 3.4.0 and later.

- Fix crash causes by initial sync of a large capped collection.

- Added support for MongoDB 3.4 feature compatibility version and
  views.

.. _backup-5.0.3.465:

Backup Agent 5.0.3.465
----------------------

:ref:`Released with Ops Manager 3.4.0 on 2016-11-29 <opsmgr-server-3.4.0>`

- Added support for uncompressed WiredTiger snapshots on the
  filesystem.

- Added support for storing snapshots in S3.

- Added support for WiredTiger encryption at rest.

- Added ability to control the reference time for the snapshot
  schedule. 

  .. example::

     Can now specify that snapshots are taken every
     6 hours, starting at 12:00:00 AM.

- Added support for all data-format affecting MongoDB configuration
  options: ``directoryPerDB``, ``smallfiles``, etc.
