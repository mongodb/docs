.. tabs-platforms::

   .. tab::
      :tabid: windows

      Use this procedure to enable monitoring on an application
      database on x86_64 architecture running Microsoft Windows:

      .. include:: /includes/steps/monitor-appdb-on-windows.rst

   .. tab::
      :tabid: debian

      Use this procedure to enable monitoring on an application
      database:

      .. tabs::

         .. tab:: Intel/AMD
            :tabid: x86

            On x86_64 architecture running, Debian 8, Debian 9, Ubuntu
            16.04, Ubuntu 18.04, or Ubuntu 20.04:

            .. include:: /includes/steps/monitor-appdb-on-amd64.ubuntu1604-deb.rst

         .. tab:: PowerPC
            :tabid: ppc

            On PowerPC architecture running Ubuntu 16.x (managing
            MongoDB 3.4 or later deployments only):

            .. tabs::

               .. tab:: deb Package
                  :tabid: deb

                  Using a ``deb`` package:

                  .. include:: /includes/steps/monitor-appdb-on-ppc64e1.ubuntu1604-deb.rst

               .. tab:: TAR Archive
                  :tabid: tar

                  Using a ``tar`` archive:

                  .. include:: /includes/steps/monitor-appdb-on-ubuntu1604-ppc64le-tar.rst

         .. tab:: IBM zSeries
            :tabid: s390x

            On zSeries architecture running Ubuntu 16.x using a ``deb``
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

                  Running RHEL / CentOS 6.x or Amazon Linux 1 using an
                  ``rpm`` package:

                  .. include:: /includes/steps/monitor-appdb-on-x86-64-rpm.rst

               .. tab:: RHEL/CentOS (7.x/8.x), SUSE12/15, Amazon Linux 2
                  :tabid: v7

                  RHEL / CentOS 7.x, SUSE12, SUSE15 or
                  Amazon Linux 2:

                  .. tabs::

                     .. tab:: rpm Package
                        :tabid: rpm

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

                  Using an ``rpm`` package:

                  .. include:: /includes/steps/monitor-appdb-on-ppc641e.rhel7-rpm.rst

               .. tab:: TAR Archive
                  :tabid: tar

                  Using a ``tar`` archive:

                  .. include:: /includes/steps/monitor-appdb-on-rhel7-ppc64le-tar.rst

         .. tab:: IBM zSeries
            :tabid: s390x

            On zSeries architecture (managing MongoDB 3.4 or later
            deployments):

            .. tabs::

               .. tab:: 6.0+
                  :tabid: v6

                  Running RHEL / CentOS 6.x using the ``rpm`` package
                  manager:

                  .. include:: /includes/steps/monitor-appdb-on-s390x.rhel6-rpm.rst

               .. tab:: 7.0+
                  :tabid: v7

                  Running RHEL / CentOS 7.x using the ``rpm`` package
                  manager:

                  .. include:: /includes/steps/monitor-appdb-on-s390x.rhel7-rpm.rst

   .. tab::
      :tabid: linux

      Use this procedure to install enable monitoring on an application
      database on Linux systems that do not use ``deb`` or ``rpm``
      packages.

      .. include:: /includes/steps/monitor-appdb-on-linux-x86-64-tar.rst



