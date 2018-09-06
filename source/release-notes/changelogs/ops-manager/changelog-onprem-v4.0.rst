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

- When configuring MongoDB LDAP authentication, allow setting the User
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
