Select your operating system and architecture to view the
installation procedure.

.. composable-tutorial::
   :options: operating-system-om, arch-ubuntu, arch-rhel, rhel-version, package-rhel, package-rhel-ppc, package-rhel-arm64
   :defaults: windows, None, None, None, rpm, None, None

   .. selected-content::
      :selections: windows, None, None, None, None, None, None

      Use this procedure to install the {+mdbagent+} on
      x86_64 architecture running Microsoft Windows:

      .. include:: /includes/steps/install-mongodb-agent-manage-on-windows.rst

   .. selected-content::
      :selections: windows, None, None, None, rpm, None, None

      Use this procedure to install the {+mdbagent+} on
      x86_64 architecture running Microsoft Windows:

      .. include:: /includes/steps/install-mongodb-agent-manage-on-windows.rst

   .. selected-content::
      :selections: ubuntu, intel, None, None, None, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      On x86_64 architecture running Debian 9/10/11/12 or Ubuntu
      18.04/20.04/22.04/24.04:

      .. include:: /includes/steps/install-mongodb-agent-manage-amd64.ubuntu1604-deb.rst

   .. selected-content::
      :selections: ubuntu, arm64, None, None, None, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      On ARM64 architecture running Ubuntu 20.04/22.04/24.04:

      .. include:: /includes/steps/install-mongodb-agent-manage-arm64.ubuntu2004.rst

   .. selected-content::
      :selections: rhel, None, intel, v6, None, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Running Amazon Linux using an ``rpm`` package:

      .. include:: /includes/steps/install-mongodb-agent-manage-x86-64-rpm.rst

   .. selected-content::
      :selections: rhel, None, intel, v7, rpm, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      For RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x),
      SUSE12, SUSE15, or Amazon Linux 2, using an ``rpm``
      package:

      .. include:: /includes/steps/install-mongodb-agent-manage-x86-64.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, intel, v7, tar, None, None

      For RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x),
      SUSE12, SUSE15, or Amazon Linux 2, using a ``tar``
      archive:

      .. include:: /includes/steps/install-mongodb-agent-manage-rhel7-x86-64-tar.rst

   .. selected-content::
      :selections: rhel, None, powerpc, None, None, rpm, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      On RHEL / CentOS (7.x) on PowerPC architecture (managing
      MongoDB 3.4 or later deployments) using an ``rpm`` package:

      .. include:: /includes/steps/install-mongodb-agent-manage-ppc641e.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, powerpc, None, None, tar, None

      On RHEL / CentOS (7.x) on PowerPC architecture (managing
      MongoDB 3.4 or later deployments) using a ``tar`` archive:

      .. include:: /includes/steps/install-mongodb-agent-manage-rhel7-ppc64le-tar.rst

   .. selected-content::
      :selections: rhel, None, ibm, None, None, None, None

      On zSeries architecture (managing MongoDB 4.4 or later
      deployments) running RHEL (7.x, 8.x, or 9.x) or CentOS
      (7.x or 8.x) using the ``rpm`` package manager:

      .. include:: /includes/steps/install-mongodb-agent-manage-s390x.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, arm64, None, None, None, rpm

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Running RHEL (8.x or 9.x) or Amazon Linux 2 on ARM64
      architecture using the ``rpm`` package manager:

      .. include:: /includes/steps/install-mongodb-agent-manage-arm64.rhel8-rpm.rst

   .. selected-content::
      :selections: rhel, None, arm64, None, None, None, tar

      On ARM64 architecture running RHEL (8.x or 9.x) or Amazon
      Linux 2 using a ``tar`` archive:

      .. include:: /includes/steps/install-mongodb-agent-manage-rhel8-arm64-tar.rst

   .. selected-content::
      :selections: linux, None, None, None, None, None, None

      Use this procedure to install on Linux systems that do not
      use ``deb`` or ``rpm`` packages.

      .. include:: /includes/steps/install-mongodb-agent-manage-linux-x86-64-tar.rst
