Select your operating system and architecture to install the
{+mdbagent+} to monitor your deployments.

.. composable-tutorial::
   :options: operating-system-om, arch-ubuntu, arch-rhel, rhel-version, package-rhel, package-rhel-ppc, package-rhel-arm64
   :defaults: ubuntu, intel, None, None, rpm, None, None

   .. selected-content::
      :selections: windows, None, None, None, None, None, None

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running Microsoft Windows:

      .. include:: /includes/steps/install-mongodb-agent-monitor-on-windows.rst

   .. selected-content::
      :selections: ubuntu, intel, None, None, None, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      On x86_64 architecture running Debian 9,
      Ubuntu 22.04, or Ubuntu 24.04:

      .. include:: /includes/steps/install-mongodb-agent-monitor-amd64.ubuntu1604-deb.rst

   .. selected-content::
      :selections: ubuntu, intel, None, None, rpm, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      On x86_64 architecture running Debian 9,
      Ubuntu 22.04, or Ubuntu 24.04:

      .. include:: /includes/steps/install-mongodb-agent-monitor-amd64.ubuntu1604-deb.rst

   .. selected-content::
      :selections: ubuntu, ibm, None, None, None, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      On zSeries architecture running Ubuntu 18.04 using a
      ``deb`` package:

      .. include:: /includes/steps/install-mongodb-agent-monitor-s390x.ubuntu1804-deb.rst

   .. selected-content::
      :selections: rhel, None, intel, v6, None, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Running Amazon Linux using an ``rpm`` package:

      .. include::
         /includes/steps/install-mongodb-agent-monitor-x86-64-rpm.rst

   .. selected-content::
      :selections: rhel, None, intel, v7, rpm, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      For RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x),
      SUSE12, SUSE15, or Amazon Linux 2, using an ``rpm``
      package:

      .. include:: /includes/steps/install-mongodb-agent-monitor-x86-64.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, intel, v7, tar, None, None

      For RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x),
      SUSE12, SUSE15, or Amazon Linux 2, using a ``tar``
      archive:

      .. include:: /includes/steps/install-mongodb-agent-monitor-rhel7-x86-64-tar.rst

   .. selected-content::
      :selections: rhel, None, powerpc, None, None, rpm, None

      On RHEL / CentOS (7.x) on PowerPC architecture (managing
      MongoDB 6.0 or later deployments):

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Using an ``rpm`` package:

      .. include:: /includes/steps/install-mongodb-agent-monitor-ppc641e.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, powerpc, None, None, tar, None

      On RHEL / CentOS (7.x) on PowerPC architecture (managing
      MongoDB 6.0 or later deployments):

      Using a ``tar`` archive:

      .. include:: /includes/steps/install-mongodb-agent-monitor-rhel7-ppc64le-tar.rst

   .. selected-content::
      :selections: rhel, None, ibm, None, None, None, None

      On zSeries architecture (managing MongoDB 6.0 or later
      deployments), use RHEL (7.x, 8.x, or 9.x) or CentOS
      (7.x or 8.x):

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Running RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x)
      using the ``rpm`` package manager:

      .. include:: /includes/steps/install-mongodb-agent-monitor-s390x.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, arm64, None, None, None, rpm

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Running RHEL (8.x or 9.x) or Amazon Linux 2 on ARM64
      architecture using the ``rpm`` package manager:

      .. include:: /includes/steps/install-mongodb-agent-monitor-arm64.rhel8-rpm.rst

   .. selected-content::
      :selections: rhel, None, arm64, None, None, None, tar

      On ARM64 architecture running RHEL (8.x or 9.x) or Amazon
      Linux 2 using a ``tar`` archive:

      .. include:: /includes/steps/install-mongodb-agent-monitor-rhel8-arm64-tar.rst

   .. selected-content::
      :selections: linux, None, None, None, None, None, None

      Use this procedure to install on Linux systems that do not
      use ``deb`` or ``rpm`` packages.

      .. include:: /includes/steps/install-mongodb-agent-monitor-linux-x86-64-tar.rst
