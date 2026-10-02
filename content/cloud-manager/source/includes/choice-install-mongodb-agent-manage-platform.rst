Select the operating system, architecture, and package type of the
host where you are installing the {+mdbagent+}.

.. composable-tutorial::
   :options: install-agent-platform, install-rhel-arch, install-rhel-x86-version, install-rhel-ppc-package, install-rhel-arm64-package
   :defaults: windows, None, None, None, None

   .. selected-content::
      :selections: windows, None, None, None, None

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running Microsoft Windows:

      .. include:: /includes/steps-install-mongodb-agent-manage-on-windows.rst

   .. selected-content::
      :selections: debian, None, None, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Use this procedure to install the {+mdbagent+} on Intel/AMD
      (x86_64) architecture running Debian 8/9/10/11 or Ubuntu
      18.04/20.04/22.04:

      .. include:: /includes/steps/install-mongodb-agent-manage-amd64.ubuntu1604-deb.rst

   .. selected-content::
      :selections: rhel, x86, v6, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running Amazon Linux using an ``rpm`` package:

      .. include:: /includes/steps/install-mongodb-agent-manage-x86-64-rpm.rst

   .. selected-content::
      :selections: rhel, x86, v7-rpm, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running RHEL / CentOS 7.x, SUSE12, SUSE15, or
      Amazon Linux 2 using an ``rpm`` package:

      .. include:: /includes/steps/install-mongodb-agent-manage-x86-64.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, x86, v7-tar, None, None

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running RHEL / CentOS 7.x, SUSE12, SUSE15, or
      Amazon Linux 2 using a ``tar`` archive:

      .. include:: /includes/steps/install-mongodb-agent-manage-rhel7-x86-64-tar.rst

   .. selected-content::
      :selections: rhel, ppc, None, rpm, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Use this procedure to install the {+mdbagent+} on RHEL /
      CentOS (7.x) on PowerPC architecture (managing MongoDB 3.4 or
      later deployments) using an ``rpm`` package:

      .. include:: /includes/steps/install-mongodb-agent-manage-ppc641e.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, ppc, None, tar, None

      Use this procedure to install the {+mdbagent+} on RHEL /
      CentOS (7.x) on PowerPC architecture (managing MongoDB 3.4 or
      later deployments) using a ``tar`` archive:

      .. include:: /includes/steps/install-mongodb-agent-manage-rhel7-ppc64le-tar.rst

   .. selected-content::
      :selections: rhel, s390x, None, None, None

      Use this procedure to install the {+mdbagent+} on zSeries
      architecture (managing MongoDB 4.0 or later deployments)
      running RHEL / CentOS 7.x/8.x using the ``rpm`` package
      manager:

      .. include:: /includes/steps/install-mongodb-agent-manage-s390x.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, arm64, None, None, rpm

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Use this procedure to install the {+mdbagent+} on ARM64
      architecture running RHEL 8.x/9.x or Amazon Linux 2 using the
      ``rpm`` package manager:

      .. include:: /includes/steps/install-mongodb-agent-manage-arm64.rhel8-rpm.rst

   .. selected-content::
      :selections: rhel, arm64, None, None, tar

      Use this procedure to install the {+mdbagent+} on ARM64
      architecture running RHEL 8.x/9.x or Amazon Linux 2 using a
      ``tar`` archive:

      .. include:: /includes/steps/install-mongodb-agent-manage-rhel8-arm64-tar.rst

   .. selected-content::
      :selections: linux, None, None, None, None

      Use this procedure to install the {+mdbagent+} on Linux
      systems that do not use ``deb`` or ``rpm`` packages.

      .. include:: /includes/steps/install-mongodb-agent-manage-linux-x86-64-tar.rst
