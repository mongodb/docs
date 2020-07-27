.. _opsmgr-server-4.2.15:

|onprem| Server 4.2.15
~~~~~~~~~~~~~~~~~~~~~~

*Released 2020-07-02*

- Allows users to audit user creation / modification events through the
  |api|.

Fixes
`````

- Fixes a bug that prevented |onprem| upgrades when the Application
  Database is a sharded cluster.

- Fixes a bug with converting from |ldap| Native Authentication to
  ``saslauthd``.

- Fixes a bug where the :guilabel:`Backup` dashboard can be
  inaccessible while a snapshot is in progress for a MongoDB 4.2
  deployment.

- Fixes an issue that can prevent a successful snapshot of a MongoDB
  4.2 deployment that contains a large number of files.

Agents
``````
Upgrades MongoDB Agent: :ref:`10.2.19.5989 <mongodb-10.2.19.5989>`.

.. _opsmgr-server-4.2.14:

|onprem| Server 4.2.14
~~~~~~~~~~~~~~~~~~~~~~

*Released 2020-06-04*

Alerts
``````

- Fixes an issue with the ``BACKUP_AGENT_DOWN`` alert and MongoDB 4.2+
  deployments. 

Backup
``````

- Removes enforcement of a minimum oplog window size on a replica set
  before you can enable {+bagent+}. 

- Fixes an issue with snapshots of MongoDB 4.2+ running on Windows while
  the |application| runs on Linux.

- Fixes an issue where a MongoDB 4.2+ queryable restore fails if the
  snapshot contains a large ``WiredTiger.wt`` file.

- Fixes an issue that caused snapshot generation of the |csrs| of a
  sharded cluster to stall in certain arrangements of {+mdbagent+}\s
  running the {+bagent+} module.

- Fixes an issue that prevented editing block stores in the |mms|
  Administration Console.

Agents
``````
Upgrades MongoDB Agent: :ref:`10.2.18.5978 <mongodb-10.2.18.5978>`.


.. _opsmgr-server-4.2.13:

|onprem| Server 4.2.13
~~~~~~~~~~~~~~~~~~~~~~

*Released 2020-05-14*

Backup
``````

- Supports :ref:`point-in-time restores <restore-http-point>` for
  MongoDB 4.2 deployments.

- Retries rather than fails when a transient network error to the
  |kmip| server configured for |onprem| occurs.

- Improves the algorithm for which MongoDB 4.2 replica set and shard
  members use to select for creating snapshots.

- Supports queryable restores for MongoDB 4.2 deployments.

- Supports incremental backup with MongoDB 4.2.6 or later.

Fixes
`````

- Fixes bug that prevented creating a new group via the |api| when
  |saml| is enabled.

- Fixes a console issue for managed deployments where a shard key's
  fields can be displayed out of order.

- Fixes an issue for managed deployments on Windows with spaces in
  directory paths.

- Fixes an issue that could prevent enabling authentication on a
  managed deployment through the |api|.

- Fixes an issue that could prevent managed deployments from upgrading
  to a custom MongoDB build.

- Fixes issue in console for managed deployments where the Review and
  Deploy confirmation can mistakenly display that a sharded cluster
  |csrs| is being removed from the deployment.

- Reduces impact of RTPP on backing MongoDB.

Agents
``````

Upgrades MongoDB Agent: :ref:`10.2.17.5970 <mongodb-10.2.17.5970>`.

.. _opsmgr-server-4.2.12:

|onprem| Server 4.2.12
~~~~~~~~~~~~~~~~~~~~~~

*Released 2020-04-09*

Upgrades Agent: :ref:`mongodb-10.2.16.5960`.

.. _opsmgr-server-4.2.11:

|onprem| Server 4.2.11
~~~~~~~~~~~~~~~~~~~~~~

*Released 2020-04-06*

- Bootstrapping a Backup
  :term:`initial sync <initial sync>` using
  :manual:`rsync </core/backups/index.html#back-up-with-cp-or-rsync>` 
  can now complete when syncing from a hidden secondary.
- Logs are viewable in the |onprem| Admin panel.
- Ensures initial sync can complete after FCV downgrades.
- Upgrades Agent: :ref:`mongodb-10.2.15.5958`.

.. _opsmgr-server-4.2.10:

|onprem| Server 4.2.10
~~~~~~~~~~~~~~~~~~~~~~

*Released 2020-03-16*

- No longer requires that JavaScript be enabled on the Ops Manager
  Application Database.

.. _opsmgr-server-4.2.9:

|onprem| Server 4.2.9
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-03-05*

- Fixes an issue which arose when toggling the authentication mechanism
  for a MongoDB user in the :guilabel:`Deployment: Security: Users` tab
  between ``SCRAM-SHA-256`` and ``SCRAM-SHA-1``.

- Adds the new version (2.13.4) for the
  :bic:`MongoDB Business Intelligence Connector </>`.

- Removes all uses of the MMAPv1 ``noPadding`` option for Ops Manager
  backing databases. This resolves issues encountered when upgrading
  Ops Manager backing databases from MongoDB version 4.0 to 4.2.

- Shows progress of backup snapshots for MongoDB version 4.2+ on the
  backup dashboard.

.. _opsmgr-server-4.2.8:

|onprem| Server 4.2.8
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-02-06*

- Allows you to manage the |ldap| and |saml| configuration for the
  :authrole:`Organization Project Creator` and
  :authrole:`Project User Admin` roles via the |onprem| user interface.

- Fixes a bug that prevented the Backup Daemon from correctly working
  on RHEL8 when using a MongoDB 4.2 database.

- Updates JDK to AdoptOpenJDK 11.0.6+10.

- **Upgrades Agent:** :ref:`mongodb-10.2.13.5943`

.. _opsmgr-server-4.2.7:

|onprem| Server 4.2.7
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-01-09*

- Optimizes snapshots of MongoDB 4.2 and later clusters. This increases
  parallelism when sending bytes to the snapshot store for large files.
- Upgrades Agent: :ref:`mongodb-10.2.12.5930`.

.. _opsmgr-server-4.2.6:

|onprem| Server 4.2.6
~~~~~~~~~~~~~~~~~~~~~

*Released 2019-12-19*

Upgrades Agent: :ref:`mongodb-10.2.11.5927`.

.. _opsmgr-server-4.2.5:

|onprem| Server 4.2.5
~~~~~~~~~~~~~~~~~~~~~

*Released 2019-12-12*

- Supports backup of MongoDB 4.2 sharded clusters.

- |onprem| is now supported on RHEL8 and Debian 10.

- Upgrades Agent: :ref:`mongodb-10.2.10.5921`.

.. _opsmgr-server-4.2.4:

|onprem| Server 4.2.4
~~~~~~~~~~~~~~~~~~~~~

*Released 2019-11-07*

- Supports the MongoDB Agent on RHEL 8 and CentOS 8.

- Shards of a sharded cluster now appear in alphanumeric order.

- Adds support for managing deployments using
  :doc:`Externally Sourced Configuration File Values </reference/mongodb-agent-external-configuration>`.

- Upgrades JDK to 11.0.5.10.

- Upgrades Agent: :ref:`mongodb-10.2.9.5909`.

.. _opsmgr-server-4.2.3:

|onprem| Server 4.2.3
~~~~~~~~~~~~~~~~~~~~~

*Released 2019-10-10*

- Removes the **Version Behind** alert if:

  - The alert had been configured for deployments using the legacy
    Monitoring and Backup Agents, and
  - Deployments using that alert were upgraded to using the
    :doc:`MongoDB Agent </tutorial/nav/mongodb-agent>`.


- Upgrades Agent: :ref:`mongodb-10.2.8.5901-1`.

.. _opsmgr-server-4.2.2:

|onprem| Server 4.2.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2019-10-03*

- Adds support for
  :doc:`changing the MongoDB keyfile in a rolling fashion </tutorial/rotate-keyfile>`.

- Fixes an issue where the Backup Daemon attempts to automatically
  download MongoDB binaries when running in local mode. This avoids
  many spurious errors in the log files.

- Agent Upgrade: :ref:`mongodb-10.2.7.5898`.

.. _opsmgr-server-4.2.1:

|onprem| Server 4.2.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2019-09-05*

- Fixes an issue in |onprem| 4.2.0 that prevented |onprem|
  versions 4.0.2, 4.0.3, 4.0.4 and 4.0.5 from being :doc:`upgraded
  </tutorial/upgrade-ops-manager>` to |onprem| 4.2.0. This is
  resolved in |onprem| 4.2.1 such that all |onprem| 4.0.x
  versions can be upgraded to |onprem| 4.2.1+.

- Removes need for a persistent cookie to be set on login.

- Agent Upgrade: :ref:`mongodb-10.2.6.5879-1`.

.. _opsmgr-server-4.2.0:

|onprem| Server 4.2.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2019-08-16*

- Supports management of MongoDB 4.2 deployments.

- Merges Automation, Backup and Monitoring Agents into a single
  :doc:`{+mdbagent+} </tutorial/nav/mongodb-agent>`.

- Replaces Personal |api| Keys with
  :doc:`Programmatic API Keys </tutorial/manage-programmatic-access>`.
  New users of the |api| should use Programmatic |api| Keys. Personal
  |api| Keys will be deprecated in a future release of |onprem|.

- Begins support for MongoDB 4.2 with ``"featureCompatibilityVersion" :
  4.2``. Backup of MongoDB 4.2 instances with FCV: 4.2 no longer
  require :term:`head databases <head database>` within the |onprem|
  installation.

  .. note:: Support is incomplete; see release advisories.

- Supports running and managing MongoDB in |ipv6|\-only environments.
  For additional details, see the release advisories.

- Allows you to track your usage of MongoDB instances in the |onprem|
  Admin panel.

- Allows you to upgrade |onprem| without downtime of Monitoring or
  Alerting. This applies to upgrades from |onprem| 4.2.0 and later
  versions.

- Containerizes |onprem| in a Docker Container for use with the
  :k8s:`MongoDB Enterprise Kubernetes Operator </>`. This support is
  currently in alpha and not recommended for production use.

- Supports :doc:`SAML authentication </tutorial/configure-for-saml-authentication>`.

- Removes the Version Manager.

- Disables weak |tls| ciphers.

  .. hlist::
     :columns: 2

     - ``SSL_DHE_DSS_WITH_3DES_EDE_CBC_SHA``
     - ``SSL_DHE_DSS_WITH_DES_CBC_SHA``
     - ``SSL_DHE_RSA_EXPORT_WITH_DES40_CBC_SHA``
     - ``SSL_DHE_RSA_WITH_3DES_EDE_CBC_SHA``
     - ``SSL_DHE_RSA_WITH_DES_CBC_SHA``
     - ``SSL_RSA_EXPORT_WITH_DES40_CBC_SHA``
     - ``SSL_RSA_EXPORT_WITH_RC4_40_MD5``
     - ``TLS_DHE_DSS_WITH_AES_128_CBC_SHA256``
     - ``TLS_DHE_DSS_WITH_AES_128_CBC_SHA``
     - ``TLS_DHE_DSS_WITH_AES_256_CBC_SHA256``
     - ``TLS_DHE_DSS_WITH_AES_256_CBC_SHA``
     - ``TLS_DHE_RSA_WITH_AES_128_CBC_SHA256``
     - ``TLS_DHE_RSA_WITH_AES_128_CBC_SHA``
     - ``TLS_DHE_RSA_WITH_AES_128_GCM_SHA256``
     - ``TLS_DHE_RSA_WITH_AES_256_CBC_SHA256``
     - ``TLS_DHE_RSA_WITH_AES_256_CBC_SHA``
     - ``TLS_DHE_RSA_WITH_AES_256_GCM_SHA384``
     - ``TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256``
     - ``TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384``

  .. seealso:: :setting:`mms.disableCiphers`

Platform Support
````````````````

- |onprem| supports the following new platforms:

  - SUSE Linux 15

- |onprem| no longer supports the following platforms:

  - Debian 8
  - Ubuntu 14.04
  - Windows Server 2008R2

- |onprem| has deprecated the following platforms. These platforms will
  not be supported in a future |onprem| release:

  - Windows Server 2012
