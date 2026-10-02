Select the operating system, architecture, and package type of the
host where you are installing the {+mdbagent+}.

.. composable-tutorial::
   :options: install-agent-platform, install-debian-arch, install-rhel-arch, install-rhel-x86-version, install-rhel-ppc-package, install-rhel-arm64-package
   :defaults: windows, None, None, None, None, None

   .. selected-content::
      :selections: windows, None, None, None, None, None

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running Microsoft Windows:

      .. include:: /includes/steps-install-mongodb-agent-monitor-on-windows.rst

   .. selected-content::
      :selections: debian, x86, None, None, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running Debian 8, Debian 9, Ubuntu 18.04,
      Ubuntu 20.04, or Ubuntu 22.04:

      .. include:: /includes/steps/install-mongodb-agent-monitor-amd64.ubuntu1604-deb.rst

   .. selected-content::
      :selections: debian, s390x, None, None, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Use this procedure to install the {+mdbagent+} on zSeries
      architecture running Ubuntu 18.04 using a ``deb`` package:

      .. include:: /includes/steps/install-mongodb-agent-monitor-s390x.ubuntu1804-deb.rst

   .. selected-content::
      :selections: rhel, None, x86, v6, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running Amazon Linux using an ``rpm`` package:

      .. include:: /includes/steps/install-mongodb-agent-monitor-x86-64-rpm.rst

   .. selected-content::
      :selections: rhel, None, x86, v7-rpm, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running RHEL / CentOS 7.x, SUSE12, SUSE15, or
      Amazon Linux 2 using an ``rpm`` package:

      .. include:: /includes/steps/install-mongodb-agent-monitor-x86-64.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, x86, v7-tar, None, None

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running RHEL / CentOS 7.x, SUSE12, SUSE15, or
      Amazon Linux 2 using a ``tar`` archive:

      .. include:: /includes/steps/install-mongodb-agent-monitor-rhel7-x86-64-tar.rst

   .. selected-content::
      :selections: rhel, None, ppc, None, rpm, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Use this procedure to install the {+mdbagent+} on RHEL /
      CentOS (7.x) on PowerPC architecture (managing MongoDB 4.2 or
      later deployments) using an ``rpm`` package:

      .. include:: /includes/steps/install-mongodb-agent-monitor-ppc641e.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, ppc, None, tar, None

      Use this procedure to install the {+mdbagent+} on RHEL /
      CentOS (7.x) on PowerPC architecture (managing MongoDB 4.2 or
      later deployments) using a ``tar`` archive:

      .. include:: /includes/steps/install-mongodb-agent-monitor-rhel7-ppc64le-tar.rst

   .. selected-content::
      :selections: rhel, None, s390x, None, None, None

      Use this procedure to install the {+mdbagent+} on zSeries
      architecture (managing MongoDB 4.0 or later deployments)
      running RHEL / CentOS 7.x/8.x using the ``rpm`` package
      manager:

      .. include:: /includes/agents/binaries-removed-from-path.rst

      .. include:: /includes/steps/install-mongodb-agent-monitor-s390x.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, arm64, None, None, rpm

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Use this procedure to install the {+mdbagent+} on ARM64
      architecture running RHEL 8.x/9.x or Amazon Linux 2 using the
      ``rpm`` package manager:

      .. include:: /includes/steps/install-mongodb-agent-monitor-arm64.rhel8-rpm.rst

   .. selected-content::
      :selections: rhel, None, arm64, None, None, tar

      Use this procedure to install the {+mdbagent+} on ARM64
      architecture running RHEL 8.x/9.x or Amazon Linux 2 using a
      ``tar`` archive:

      .. include:: /includes/steps/install-mongodb-agent-monitor-rhel8-arm64-tar.rst

   .. selected-content::
      :selections: linux, None, None, None, None, None

      Use this procedure to install the {+mdbagent+} on Linux
      systems that do not use ``deb`` or ``rpm`` packages.

      .. include:: /includes/steps/install-mongodb-agent-monitor-linux-x86-64-tar.rst
