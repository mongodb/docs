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
  :k8s:`MongoDB Enterprise Kubernetes Operator`. This support is
  currently in alpha and not recommended for production use.

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

