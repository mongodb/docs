Select the operating system, architecture, and package type of the
host running your legacy Monitoring Agent.

.. composable-tutorial::
   :options: update-agent-platform, update-debian-arch, update-rhel-arch, update-rhel-x86-version, update-rhel-ppc-package
   :defaults: windows, None, None, None, None

   .. selected-content::
      :selections: windows, None, None, None, None

      Use this procedure to update to the {+mdbagent+} on x86_64
      architecture running Microsoft Windows:

      .. include:: /includes/steps-update-monitoring-to-mongodb-agent-on-windows.rst

   .. selected-content::
      :selections: debian, x86, None, None, None

      Use this procedure to update to the {+mdbagent+} on x86_64
      architecture running Debian 8, Debian 9, Ubuntu 18.04, Ubuntu
      20.04, or Ubuntu 22.04:

      .. include:: /includes/steps/update-monitoring-to-mongodb-agent-amd64.ubuntu1604-deb.rst

   .. selected-content::
      :selections: debian, s390x, None, None, None

      Use this procedure to update to the {+mdbagent+} on zSeries
      architecture running Ubuntu 18.x using a ``deb`` package:

      .. include:: /includes/steps/update-monitoring-to-mongodb-agent-s390x.ubuntu1804-deb.rst

   .. selected-content::
      :selections: rhel, None, x86, v6, None

      Use this procedure to update to the {+mdbagent+} on x86_64
      architecture running RHEL / CentOS 6.x using an ``rpm`` package:

      .. include:: /includes/steps/update-monitoring-to-mongodb-agent-x86-64-rpm.rst

   .. selected-content::
      :selections: rhel, None, x86, v7-rpm, None

      Use this procedure to update to the {+mdbagent+} on x86_64
      architecture running RHEL / CentOS 7.x, SUSE12, SUSE15, or
      Amazon Linux 2 using an ``rpm`` package:

      .. include:: /includes/steps/update-monitoring-to-mongodb-agent-x86-64.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, x86, v7-tar, None

      Use this procedure to update to the {+mdbagent+} on x86_64
      architecture running RHEL / CentOS 7.x, SUSE12, SUSE15, or
      Amazon Linux 2 using a ``tar`` archive:

      .. include:: /includes/steps/update-monitoring-to-mongodb-agent-rhel7-x86-64-tar.rst

   .. selected-content::
      :selections: rhel, None, ppc, None, rpm

      Use this procedure to update to the {+mdbagent+} on RHEL /
      CentOS (7.x) on PowerPC architecture (managing MongoDB 3.4 or
      later deployments) using an ``rpm`` package:

      .. include:: /includes/steps/update-monitoring-to-mongodb-agent-ppc641e.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, ppc, None, tar

      Use this procedure to update to the {+mdbagent+} on RHEL /
      CentOS (7.x) on PowerPC architecture (managing MongoDB 3.4 or
      later deployments) using a ``tar`` archive:

      .. include:: /includes/steps/update-monitoring-to-mongodb-agent-rhel7-ppc64le-tar.rst

   .. selected-content::
      :selections: rhel, None, s390x, None, None

      Use this procedure to update to the {+mdbagent+} on zSeries
      architecture (managing MongoDB 4.0 or later deployments)
      running RHEL / CentOS 7.x/8.x using the ``rpm`` package
      manager:

      .. include:: /includes/steps/update-monitoring-to-mongodb-agent-s390x.rhel7-rpm.rst

   .. selected-content::
      :selections: linux, None, None, None, None

      Use this procedure to update to the {+mdbagent+} on Linux
      systems that do not use ``deb`` or ``rpm`` packages.

      .. include:: /includes/steps/update-monitoring-to-mongodb-agent-linux-x86-64-tar.rst
