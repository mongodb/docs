.. tabs-platforms::

   .. tab::
      :tabid: macos

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running macOS 10.8 or later:

      .. include:: /includes/steps/install-mongodb-agent-monitor-macos-x86-64-tar.rst

   .. tab::
      :tabid: windows

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running Microsoft Windows:

      .. include:: /includes/steps/install-mongodb-agent-monitor-on-windows.rst

   .. tab::
      :tabid: debian

      Use this procedure to install the {+mdbagent+}:

      .. tabs::

         .. tab:: Intel/AMD
            :tabid: x86

            On x86_64 architecture running, Debian 8, Debian 9, Ubuntu 16.04, or Ubuntu 18.04:

            .. include:: /includes/steps/install-mongodb-agent-monitor-amd64.ubuntu1604-deb.rst

         .. tab:: PowerPC
            :tabid: ppc

            On PowerPC architecture running Ubuntu 16.x
            (managing MongoDB 3.4 or later deployments only):

            .. tabs::

               .. tab:: DEB package
                  :tabid: deb

                  Using a ``deb`` package:

                  .. include:: /includes/steps/install-mongodb-agent-monitor-ppc64e1.ubuntu1604-deb.rst

               .. tab:: TAR archive
                  :tabid: tar

                  Using a ``tar`` archive:

                  .. include:: /includes/steps/install-mongodb-agent-monitor-ubuntu1604-ppc64le-tar.rst

         .. tab:: IBM ZSeries
            :tabid: s390x

            On zSeries architecture running Ubuntu 16.x using a
            ``deb`` package:

            .. include:: /includes/steps/install-mongodb-agent-monitor-s390x.ubuntu1804-deb.rst

   .. tab::
      :tabid: rhel

      Use this procedure to install the {+mdbagent+}:

      .. tabs::

         .. tab:: Intel/AMD
            :tabid: x86

            On x86_64 architecture:

            .. tabs::

               .. tab:: RHEL/CentOS 6.x, Amazon Linux
                  :tabid: v6

                  Running RHEL / CentOS 6.x or Amazon Linux 1
                  using an ``rpm`` package:

                  .. include:: /includes/steps/install-mongodb-agent-monitor-x86-64-rpm.rst

               .. tab:: RHEL/CentOS (7.x/8.x), SUSE12/15, Amazon Linux 2
                  :tabid: v7

                  Running RHEL / CentOS 7.x, SUSE12, SUSE15, or
                  Amazon Linux 2:

                  .. tabs::

                     .. tab:: RPM package
                        :tabid: rpm

                        Using an ``rpm`` package:

                        .. include:: /includes/steps/install-mongodb-agent-monitor-x86-64.rhel7-rpm.rst

                     .. tab:: TAR archive
                        :tabid: tar

                        Using a ``tar`` archive:

                        .. include:: /includes/steps/install-mongodb-agent-monitor-rhel7-x86-64-tar.rst

         .. tab:: PowerPC
            :tabid: ppc

            On RHEL / CentOS (7.x) on PowerPC architecture
            (managing MongoDB 3.4 or later deployments):

            .. tabs::

               .. tab:: RPM package
                  :tabid: rpm

                  Using an ``rpm`` package:

                  .. include:: /includes/steps/install-mongodb-agent-monitor-ppc641e.rhel7-rpm.rst

               .. tab:: TAR archive
                  :tabid: tar

                  Using a ``tar`` archive:

                  .. include:: /includes/steps/install-mongodb-agent-monitor-rhel7-ppc64le-tar.rst

         .. tab:: IBM ZSeries
            :tabid: s390x

            On zSeries architecture (managing MongoDB 3.4 or
            later deployments):

            .. tabs::

               .. tab:: 6.x
                  :tabid: v6

                  Running RHEL / CentOS 6.x using the
                  ``rpm`` package manager:

                  .. include:: /includes/steps/install-mongodb-agent-monitor-s390x.rhel6-rpm.rst

               .. tab:: 7.x
                  :tabid: v7

                  Running RHEL / CentOS 7.x using the
                  ``rpm`` package manager:

                  .. include:: /includes/steps/install-mongodb-agent-monitor-s390x.rhel7-rpm.rst

   .. tab::
      :tabid: linux

      Use this procedure to install Linux systems that do not use
      ``deb`` or ``rpm`` packages.

      .. include:: /includes/steps/install-mongodb-agent-monitor-linux-x86-64-tar.rst



