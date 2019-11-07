.. _opsmgr-server-4.2.4:

|onprem| Server 4.2.4
~~~~~~~~~~~~~~~~~~~~~

*Released 2019-11-07*

- Supports the MongoDB Agent on RHEL 8 and CentOS 8.

- Shards of a sharded cluster now appear in alphanumeric order.

- Adds support for managing deployments using
  :doc:`Externally Sourced Configuration File Values <reference/mongodb-agent-external-configuration>`.

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

