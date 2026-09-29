Select your operating system and architecture to update to the
{+mdbagent+}.

.. composable-tutorial::
   :options: operating-system-om, arch-ubuntu, arch-rhel, rhel-version, package-rhel, package-rhel-ppc
   :defaults: ubuntu, intel, None, None, rpm, None

   .. selected-content::
      :selections: windows, None, None, None, None, None

      Use this procedure to update to the {+mdbagent+} on x86_64
      architecture running Microsoft Windows:

      .. include:: /includes/steps/update-backup-to-mongodb-agent-on-windows.rst

   .. selected-content::
      :selections: ubuntu, intel, None, None, None, None

      On x86_64 architecture running Debian 9, Ubuntu 18.04,
      Ubuntu 20.04, Ubuntu 22.04, or Ubuntu 24.04:

      .. include:: /includes/steps/update-backup-to-mongodb-agent-amd64.ubuntu1604-deb.rst

   .. selected-content::
      :selections: ubuntu, intel, None, None, rpm, None

      On x86_64 architecture running Debian 9, Ubuntu 18.04,
      Ubuntu 20.04, Ubuntu 22.04, or Ubuntu 24.04:

      .. include:: /includes/steps/update-backup-to-mongodb-agent-amd64.ubuntu1604-deb.rst

   .. selected-content::
      :selections: ubuntu, ibm, None, None, None, None

      On zSeries architecture running Ubuntu 18.04 using a
      ``deb`` package:

      .. include:: /includes/steps/update-backup-to-mongodb-agent-s390x.ubuntu1804-deb.rst

   .. selected-content::
      :selections: rhel, None, intel, v6, None, None

      Running RHEL / CentOS 6.x using an ``rpm`` package:

      .. include:: /includes/steps/update-backup-to-mongodb-agent-x86-64-rpm.rst

   .. selected-content::
      :selections: rhel, None, intel, v7, rpm, None

      For RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x),
      SUSE12, SUSE15, or Amazon Linux 2, using an ``rpm``
      package:

      .. include:: /includes/steps/update-backup-to-mongodb-agent-x86-64.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, intel, v7, tar, None

      For RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x),
      SUSE12, SUSE15, or Amazon Linux 2, using a ``tar``
      archive:

      .. include:: /includes/steps/update-backup-to-mongodb-agent-rhel7-x86-64-tar.rst

   .. selected-content::
      :selections: rhel, None, powerpc, None, None, rpm

      On RHEL / CentOS (7.x) on PowerPC architecture (managing
      MongoDB 3.4 or later deployments):

      Using an ``rpm`` package:

      .. include:: /includes/steps/update-backup-to-mongodb-agent-ppc641e.rhel7-rpm.rst

   .. selected-content::
      :selections: rhel, None, powerpc, None, None, tar

      On RHEL / CentOS (7.x) on PowerPC architecture (managing
      MongoDB 3.4 or later deployments):

      Using a ``tar`` archive:

      .. include:: /includes/steps/update-backup-to-mongodb-agent-rhel7-ppc64le-tar.rst

   .. selected-content::
      :selections: rhel, None, ibm, None, None, None

      On zSeries architecture (managing MongoDB 3.4 or later
      deployments), use RHEL (7.x, 8.x, or 9.x) or CentOS
      (7.x or 8.x):

      Running RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x)
      using the ``rpm`` package manager:

      .. include:: /includes/steps/update-backup-to-mongodb-agent-s390x.rhel7-rpm.rst

   .. selected-content::
      :selections: linux, None, None, None, None, None

      Use this procedure to update to the {+mdbagent+} on
      Linux systems that do not use ``deb`` or ``rpm`` packages.

      .. include:: /includes/steps/update-backup-to-mongodb-agent-linux-x86-64-tar.rst
