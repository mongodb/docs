.. _backup-6.8.9.1030:

Backup Agent 6.8.9.1030
-----------------------

:ref:`Released with Ops Manager 4.0.20 on 2020-11-05 <opsmgr-server-4.0.20>`

.. _backup-6.8.8.1027:

Backup Agent 6.8.8.1027
-----------------------

:ref:`Released with Ops Manager 4.0.16 on 2019-11-07 <opsmgr-server-4.0.16>`

- Adds support for the ``businessCategory`` field in extended validation
  |tls| certificates.
- The Backup Agent is now built using Go 1.13.

.. _backup-6.8.7.1024:

Backup Agent 6.8.7.1024
-----------------------

:ref:`Released with Ops Manager 4.0.13 on 2019-07-04 <opsmgr-server-4.0.13>`

- **Fix:** Improve the ability of the Backup Agent to stop the
  balancer when preparing to take a snapshot for a sharded cluster.
- **Fix:** Set a |tls| timeout for connections between the Backup Agent
  and Ops Manager services.

.. _backup-6.8.6.1013:

Backup Agent 6.8.6.1013
-----------------------

:ref:`Released with Ops Manager 4.0.7 on 2019-01-10 <opsmgr-server-4.0.7>`

- **Fix:** Improve Backup Agent handling when stopping the balancer in
  preparation for marking a point in time to take a snapshot for a
  sharded cluster. Prior handling could result in the balancer being
  left in a stopped state for MongoDB 3.4+. This has been resolved.

.. _backup-6.8.4.1009:

Backup Agent 6.8.4.1009
-----------------------

:ref:`Released with Ops Manager 4.0.1 on 2018-08-02 <opsmgr-server-4.0.1>`

.. _backup-6.8.3.1002:

Backup Agent 6.8.3.1002
-----------------------

:ref:`Released with Ops Manager 4.0.0 on 2018-06-27 <opsmgr-server-4.0.0>`

- Added support for MongoDB 4.0.
- Added support for SCRAM-SHA-256
- Added platform support for:

  - zLinux on :abbr:`RHEL (Red Hat Enterprise Linux)` 6
  - Debian 9
  - Amazon Linux 2
