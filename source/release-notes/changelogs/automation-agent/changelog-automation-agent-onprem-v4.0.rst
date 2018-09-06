.. _automation-5.4.10.5496-1:

Automation Agent 5.4.10.5496-1
------------------------------

:ref:`Released with Ops Manager 4.0.2 on 2018-09-06 <opsmgr-server-4.0.0>`

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

.. _automation-5.4.6.5465-1:

Automation Agent 5.4.6.5465-1
-----------------------------

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
