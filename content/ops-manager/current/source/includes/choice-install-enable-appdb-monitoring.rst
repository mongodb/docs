Select your Linux platform, architecture, and installation method
to enable monitoring on an application database.

.. composable-tutorial::
   :options: operating-system-om, arch-ubuntu, arch-rhel, rhel-version, package-rhel, package-rhel-ppc
   :defaults: ubuntu, intel, None, None, rpm, None

   .. selected-content::
      :selections: ubuntu, intel, None, None, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      On x86_64 architecture running Debian 10 or 11, and
      Ubuntu 18.04, 20.04, 22.04, or 24.04:

      .. include:: /includes/steps/monitor-appdb-on-amd64.ubuntu1604-deb.rst

   .. selected-content::
      :selections: ubuntu, intel, None, None, rpm, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      On x86_64 architecture running Debian 10 or 11, and
      Ubuntu 18.04, 20.04, 22.04, or 24.04:

      .. include:: /includes/steps/monitor-appdb-on-amd64.ubuntu1604-deb.rst

   .. selected-content::
      :selections: ubuntu, ibm, None, None, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      On zSeries architecture running Ubuntu 18.04 using a ``deb``
      package:

      .. include:: /includes/steps/monitor-appdb-on-s390x.ubuntu1804-deb.rst

   .. selected-content::
      :selections: rhel, None, intel, v6, None, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Running RHEL / CentOS 6.x using an ``rpm`` package:

      .. include:: /includes/steps/monitor-appdb-on-x86-64-rpm.rst

   .. selected-content::
      :selections: rhel, None, intel, v7, rpm, None

      .. include:: /includes/agents/binaries-removed-from-path.rst

      For RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x),
      SUSE12, SUSE15, or Amazon Linux 2, using an ``rpm``
      package:

      .. include:: /includes/steps/monitor-appdb-on-x86-64.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, intel, v7, tar, None

      For RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x),
      SUSE12, SUSE15, or Amazon Linux 2, using a ``tar``
      archive:

      .. include:: /includes/steps/monitor-appdb-on-rhel7-x86-64-tar.rst

   .. selected-content::
      :selections: rhel, None, powerpc, None, None, rpm

      On RHEL / CentOS (7.x) on PowerPC architecture (managing
      MongoDB 3.4 or later deployments):

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Using an ``rpm`` package:

      .. include:: /includes/steps/monitor-appdb-on-ppc641e.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, powerpc, None, None, tar

      On RHEL / CentOS (7.x) on PowerPC architecture (managing
      MongoDB 3.4 or later deployments):

      Using a ``tar`` archive:

      .. include:: /includes/steps/monitor-appdb-on-rhel7-ppc64le-tar.rst

   .. selected-content::
      :selections: rhel, None, ibm, None, None, None

      On zSeries architecture (managing MongoDB 4.4 or later
      deployments), use RHEL (7.x, 8.x, or 9.x) or CentOS
      (7.x or 8.x):

      .. include:: /includes/agents/binaries-removed-from-path.rst

      Running RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x)
      using the ``rpm`` package manager:

      .. include:: /includes/steps/monitor-appdb-on-s390x.rhel7-rpm.rst

   .. selected-content::
      :selections: linux, None, None, None, None, None

      On Linux systems that do not use ``deb`` or ``rpm``
      packages:

      .. include:: /includes/steps/monitor-appdb-on-linux-x86-64-tar.rst
