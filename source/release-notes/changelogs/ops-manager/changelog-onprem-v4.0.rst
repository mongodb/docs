.. _opsmgr-server-4.0.5:

|onprem| Server 4.0.5
~~~~~~~~~~~~~~~~~~~~~

*Released 2018-11-01*

- **Fix:** Removed memory leak in proxy server used for queryable
  restores.

- **Fix:** Removed race condition that could cause a backup initial sync
  to be required when the ``featureCompatibilityVersion`` is updated on
  the source replica set.

- **Fix:** Automatic download of MongoDB binaries fails when hybrid mode
  is enabled for MongoDB binary management.

- **Fix:** When importing a cluster into Ops Manager, ignore the value
  of ``pidFilePath`` if it set to the CentOS default in ``/var/run``.

- Updated JDK to 8u192

- Updated bundled version of the :bic:`BI Connector </>` to 2.7.0.

- **Agent Upgrades:** :ref:`automation-5.4.13.5505-1`

.. _opsmgr-server-4.0.4:

|onprem| Server 4.0.4
~~~~~~~~~~~~~~~~~~~~~

*Released 2018-10-12*

- **Critical Fix:** When running in local mode for MongoDB binary
  management, the Backup Daemon may try to use MongoDB binaries for
  the wrong operating system.

- **Agent Upgrades:** :ref:`automation-5.4.12.5501`

.. _opsmgr-server-4.0.3:

|onprem| Server 4.0.3
~~~~~~~~~~~~~~~~~~~~~

*Released 2018-10-04*

- **Critical Fix:** Backup initial syncs may fail with an error during
  the oplog application phase, if retryable writes are executed on the
  source cluster during the backup initial sync.
- **Fix:** Log collection fails for log files greater than
  approximately 2.2 GB.
- |ldap| connections will now use a connection pool. This reduces load
  on |ldap| servers. 
- Update bundled version of the |bic-full| to version 2.6.1.

.. _opsmgr-server-4.0.2:

|onprem| Server 4.0.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2018-09-06*

- Added support for management of MongoDB processes
  on Ubuntu 18.04.

- User alerts are now available.

- **Fix:** When performing a point in time restore for MongoDB 4.0,
  drop the ``minOptimeRecovery`` document before bringing up the
  target cluster.

- Show MongoDB start-up warnings on the cluster overview page.

- Log Collection was unable to complete if one of the
  requested files was an empty file.

- Real Time Performance Panel adds support for killing
  sessions in MongoDB 4.0+.

- Support additional schema-related options when configuring
  the MongoDB BI Connector.

- Perform additional validations for deployments managed by external
  orchestration platforms (such as the
  :doc:`MongoDB Enterprise Operator for Kubernetes </tutorial/install-k8s-operator>`).

- **Agent Upgrades:** :ref:`automation-5.4.10.5496-1`

.. _opsmgr-server-4.0.1:

|onprem| Server 4.0.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2018-08-02*

- **Critical Fix:** Allow removal of processes from
  :guilabel:`Deployment` :icon:`arrow-right` :guilabel:`List` view.

- **Critical Fix:** Avoid failures to upgrade from Ops Manager 3.4
  when using local mode for MongoDB version management.

- **Critical Fix:** Fix issue which caused the :guilabel:`All Clusters`
  page to fail to display content.

- During a backup initial sync, ensure that the UUID of the 
  ``system.views`` collection is preserved.

- In Local Mode, the Backup Daemon will now unpack MongoDB tarballs. 
  Administrators no longer need to unpack them themselves.

- Reinstate support for ``security.encryptionKeyFile`` parameter.

- Security patches for third-party library dependencies.

- Update Ops Manager JDK (x86_64) to 8u181^M

- When configuring MongoDB |ldap| authentication, allow setting the User
  to Distinguished Name Mapping without setting the Authorization Query
  Template.

- **Agent Upgrades:** :ref:`automation-5.4.9.5483`,  :ref:`backup-6.8.4.1009`

.. _opsmgr-server-4.0.0:

|onprem| Server 4.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2018-06-27*

- Revised |onprem| interface for deployment management.

- Added new :abbr:`CRUD (create, read, update, and delete)` features
  to :doc:`Data Explorer </data-explorer>`.

- Improved the
  :doc:`Real-Time Performance Panel </tutorial/view-diagnostics>`.

.. cond:: onprem

   - Added integrations for:

     - `Pivotal Cloud Foundry <https://pivotal.io/platform/services-marketplace/data-management/mongodb>`__
     - :doc:`Kubernetes </tutorial/install-k8s-operator>` (beta)

- Improved Monitoring

  - Added alert for rollback.

- Updated Public :abbr:`API (Application Programming Interface)`

  - Added endpoints for Public
    :abbr:`API (Application Programming Interface)` Keys.
  - Added endpoints to manage Agent
    :abbr:`API (Application Programming Interface)` keys.
  - Removed support for Agent
    :abbr:`API (Application Programming Interface)` keys created
    before |onprem| 3.4.

    The change to the Agent
    :abbr:`API (Application Programming Interface)` Key model is
    :v3.6:`described in the v3.6 documentation </tutorial/manage-agent-api-key>`.

- Provided :doc:`new option </tutorial/configure-local-mode>` to only
  have |onprem| connect to the internet to download MongoDB installer
  binaries.

- Deprecated Server Pools.

  - In |onprem| 4.0, Server Pools are disabled by default.
  - If you are currently using Server Pools, they will continue to
    work as expected after upgrading to |onprem| 4.0.

- Added platform support to include:

  - Amazon Linux 2
  - Debian 9
  - :abbr:`SLES (SUSE Linux Enterprise Server)` 12

- Deprecated platform support for:

  - Windows 2008 R2
  - MongoDB 2.6, 3.0

  .. note::

     Support for these platforms will be removed in a future |onprem|
     release.

- Removed platform support for:

  - Ubuntu 12.04
  - :abbr:`SLES (SUSE Linux Enterprise Server)` 11
  - Debian 7

- Added support for PowerPC hardware using the following Linux distros:

  - Ubuntu 16.04
  - :abbr:`RHEL (Red Hat Enterprise Linux)` 7.x

- **Agent Upgrades:** :ref:`automation-5.4.6.5465-1`,  :ref:`backup-6.8.3.1002-1`, :ref:`monitoring-6.6.2.464-1`
