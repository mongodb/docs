.. tabs-platforms::

   .. tab::
      :tabid: windows

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running Microsoft Windows:

      .. include:: /includes/steps/install-mongodb-agent-manage-on-windows.rst

   .. tab::
      :tabid: debian

      Use this procedure to install the {+mdbagent+}:

      .. tabs::

         .. tab:: Intel/AMD
            :tabid: x86

            .. include:: /includes/agents/binaries-removed-from-path.rst

            On x86_64 architecture running Debian 9/10/11/12 or Ubuntu 18.04/20.04/22.04/24.04:

            .. include:: /includes/steps/install-mongodb-agent-manage-amd64.ubuntu1604-deb.rst

         .. tab:: ARM64
            :tabid: ARM64

            .. include:: /includes/agents/binaries-removed-from-path.rst

            On ARM64 architecture running Ubuntu 20.04/22.04/24.04:

            .. include:: /includes/steps/install-mongodb-agent-manage-arm64.ubuntu2004.rst

   .. tab::
      :tabid: rhel

      Use this procedure to install the {+mdbagent+}:

      .. tabs::

         .. tab:: Intel/AMD
            :tabid: x86

            On x86_64 architecture:

            .. tabs::

               .. tab:: Amazon Linux
                  :tabid: v6

                  .. include:: /includes/agents/binaries-removed-from-path.rst

                  Running Amazon Linux using an ``rpm`` package:

                  .. include:: /includes/steps/install-mongodb-agent-manage-x86-64-rpm.rst
                        
               .. tab:: RHEL/CentOS, SUSE, Amazon Linux 2
                  :tabid: v7

                  Running RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 
                  8.x), SUSE12, SUSE15, or Amazon Linux 2:

                  .. tabs::

                     .. tab:: RPM package
                        :tabid: rpm

                        .. include:: /includes/agents/binaries-removed-from-path.rst

                        Using an ``rpm`` package:

                        .. include:: /includes/steps/install-mongodb-agent-manage-x86-64.rhel7-rpm.rst

                     .. tab:: TAR archive
                        :tabid: tar

                        Using a ``tar`` archive:

                        .. include:: /includes/steps/install-mongodb-agent-manage-rhel7-x86-64-tar.rst

         .. tab:: PowerPC
            :tabid: ppc

            On RHEL / CentOS (7.x) on PowerPC architecture
            (managing MongoDB 3.4 or later deployments):

            .. tabs::

               .. tab:: RPM package
                  :tabid: rpm

                  .. include:: /includes/agents/binaries-removed-from-path.rst

                  Using an ``rpm`` package:

                  .. include:: /includes/steps/install-mongodb-agent-manage-ppc641e.rhel7-rpm.rst

               .. tab:: TAR archive
                  :tabid: tar

                  Using a ``tar`` archive:

                  .. include:: /includes/steps/install-mongodb-agent-manage-rhel7-ppc64le-tar.rst

         .. tab:: IBM ZSeries
            :tabid: s390x

            On zSeries architecture (managing MongoDB 4.4 or
            later deployments):

            Running RHEL (7.x, 8.x, or 9.x) or CentOS (7.x or 8.x) 
            using the ``rpm`` package manager:

            .. include:: /includes/steps/install-mongodb-agent-manage-s390x.rhel7-rpm.rst

         .. tab:: ARM64
            :tabid: arm64

            On ARM64 architecture running RHEL (8.x or 9.x) or Amazon 
            Linux 2:

            .. tabs::

               .. tab:: RPM package
                  :tabid: rpm

                  .. include:: /includes/agents/binaries-removed-from-path.rst

                  Running RHEL (8.x or 9.x) or Amazon Linux 2 using the 
                  rpm package manager:

                  .. include:: /includes/steps/install-mongodb-agent-manage-arm64.rhel8-rpm.rst

               .. tab:: TAR archive
                  :tabid: tar

                  Using a ``tar`` archive:

                  .. include:: /includes/steps/install-mongodb-agent-manage-rhel8-arm64-tar.rst
   
   .. tab::
      :tabid: linux

      Use this procedure to install Linux systems that do not use
      ``deb`` or ``rpm`` packages.

      .. include:: /includes/steps/install-mongodb-agent-manage-linux-x86-64-tar.rst

