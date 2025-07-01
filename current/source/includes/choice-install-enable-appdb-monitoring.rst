.. tabs-platforms::

   .. tab::
      :tabid: debian

      Use this procedure to enable monitoring on an application
      database:

      .. tabs::

         .. tab:: Intel/AMD
            :tabid: x86

            .. include:: /includes/agents/binaries-removed-from-path.rst

            On x86_64 architecture running Debian 10 or 11, and
            Ubuntu 18.04, 20.04, 22.04, or 24.04:

            .. include:: /includes/steps/monitor-appdb-on-amd64.ubuntu1604-deb.rst

         .. tab:: IBM zSeries
            :tabid: s390x

            .. include:: /includes/agents/binaries-removed-from-path.rst

            On zSeries architecture running Ubuntu 18.04 using a ``deb``
            package:

            .. include:: /includes/steps/monitor-appdb-on-s390x.ubuntu1804-deb.rst

   .. tab::
      :tabid: rhel

      Use this procedure to enable monitoring on an application
      database:

      .. tabs::

         .. tab:: Intel/AMD
            :tabid: x86

            On x86_64 architecture:

            .. tabs::

               .. tab:: RHEL/CentOS 6.x, Amazon Linux
                  :tabid: v6

                  .. include:: /includes/agents/binaries-removed-from-path.rst

                  Running RHEL / CentOS 6.x using an
                  ``rpm`` package:

                  .. include:: /includes/steps/monitor-appdb-on-x86-64-rpm.rst

               .. tab:: RHEL/CentOS (7.X+), SUSE, Amazon Linux 2
                  :tabid: v7

                  RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x), 
                  SUSE12, SUSE15, or Amazon Linux 2:

                  .. tabs::

                     .. tab:: rpm Package
                        :tabid: rpm

                        .. include:: /includes/agents/binaries-removed-from-path.rst

                        Using an ``rpm`` package:

                        .. include:: /includes/steps/monitor-appdb-on-x86-64.rhel7-rpm.rst

                     .. tab:: TAR Archive
                        :tabid: tar

                        Using a ``tar`` archive:

                        .. include:: /includes/steps/monitor-appdb-on-rhel7-x86-64-tar.rst

         .. tab:: PowerPC
            :tabid: ppc

            On RHEL / CentOS (7.x) on PowerPC architecture (managing
            MongoDB 3.4 or later deployments):

            .. tabs::

               .. tab:: rpm Package
                  :tabid: rpm

                  .. include:: /includes/agents/binaries-removed-from-path.rst

                  Using an ``rpm`` package:

                  .. include:: /includes/steps/monitor-appdb-on-ppc641e.rhel7-rpm.rst

               .. tab:: TAR Archive
                  :tabid: tar

                  Using a ``tar`` archive:

                  .. include:: /includes/steps/monitor-appdb-on-rhel7-ppc64le-tar.rst

         .. tab:: IBM zSeries
            :tabid: s390x

            On zSeries architecture (managing MongoDB 4.4 or later
            deployments), use RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 
            8.x):

            .. include:: /includes/agents/binaries-removed-from-path.rst

            Running RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x) 
            using the ``rpm`` package manager:

            .. include:: /includes/steps/monitor-appdb-on-s390x.rhel7-rpm.rst


   .. tab::
      :tabid: linux

      Use this procedure to install enable monitoring on an application
      database on Linux systems that do not use ``deb`` or ``rpm``
      packages.

      .. include:: /includes/steps/monitor-appdb-on-linux-x86-64-tar.rst

