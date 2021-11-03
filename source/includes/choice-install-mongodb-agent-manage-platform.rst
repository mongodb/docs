.. tabs-platforms::

   .. tab::
      :tabid: macos

      Use this procedure to install the {+mdbagent+} on x86_64
      architecture running macOS 10.8 or later:

      .. include:: /includes/steps/install-mongodb-agent-manage-macos-x86-64-tar.rst

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

            On x86_64 architecture running, Debian 8, Debian 9,
            Ubuntu 18.04, or Ubuntu 20.04:

            .. include:: /includes/steps/install-mongodb-agent-manage-amd64.ubuntu1604-deb.rst

         .. tab:: PowerPC
            :tabid: ppc

            On PowerPC architecture running Ubuntu 18.04
            (managing MongoDB 3.4 or later deployments only):

            .. tabs::

               .. tab:: DEB package
                  :tabid: deb

                  .. include:: /includes/agents/binaries-removed-from-path.rst

                  Using a ``deb`` package:

                  .. include:: /includes/steps/install-mongodb-agent-manage-ppc64e1.ubuntu1604-deb.rst

               .. tab:: TAR archive
                  :tabid: tar

                  Using a ``tar`` archive:

                  .. include:: /includes/steps/install-mongodb-agent-manage-ubuntu1604-ppc64le-tar.rst

   .. tab::
      :tabid: rhel

      Use this procedure to install the {+mdbagent+}:

      .. tabs::

         .. tab:: Intel/AMD
            :tabid: x86

            On x86_64 architecture:

            .. cond:: cloud

               .. tabs::

                  .. tab:: Amazon Linux
                     :tabid: v6

                     .. include:: /includes/agents/binaries-removed-from-path.rst

                     Running Amazon Linux using an ``rpm`` package:

                     .. include:: /includes/steps/install-mongodb-agent-manage-x86-64-rpm.rst
                        
                  .. tab:: RHEL/CentOS (7.x/8.x), SUSE12/15, Amazon Linux 2
                     :tabid: v7

                     Running RHEL / CentOS 7.x, SUSE12, SUSE15, or
                     Amazon Linux 2:

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

            .. cond:: onprem

               .. tabs::

                  .. tab:: RHEL/CentOS 6.x, Amazon Linux
                     :tabid: v6

                     .. include:: /includes/agents/binaries-removed-from-path.rst

                     Running RHEL / CentOS 6.x using an ``rpm`` package:

                     .. include:: /includes/steps/install-mongodb-agent-manage-x86-64-rpm-old.rst

                  .. tab:: RHEL/CentOS (7.x/8.x), SUSE12/15, Amazon Linux 2
                     :tabid: v7

                     Running RHEL / CentOS 7.x, SUSE12, SUSE15, or
                     Amazon Linux 2:

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

            On zSeries architecture (managing MongoDB 3.4 or
            later deployments):

            .. cond:: cloud

               Running RHEL / CentOS 7.x:

               .. tabs::

                  .. tab:: RPM package
                     :tabid: rpm 

                     .. include:: /includes/agents/binaries-removed-from-path.rst

                     Running RHEL / CentOS 7.x using the
                     ``rpm`` package manager:

                     .. include:: /includes/steps/install-mongodb-agent-manage-s390x.rhel7-rpm.rst

                  .. tab:: TAR archive
                     :tabid: tar 

                     Running RHEL / CentOS 7.x using the
                     ``tar`` archive:

                     .. include:: /includes/steps/install-mongodb-agent-manage-s390x.rhel7-tar.rst

            .. cond:: onprem

               .. tabs::

                  .. tab:: 6.x
                     :tabid: v6

                     .. include:: /includes/agents/binaries-removed-from-path.rst

                     Running RHEL / CentOS 6.x using the
                     ``rpm`` package manager:

                     .. include:: /includes/steps/install-mongodb-agent-manage-s390x.rhel6-rpm.rst

                  .. tab:: 7.x
                     :tabid: v7

                     .. tabs::

                        .. tab:: RPM package
                           :tabid: rpm

                           .. include:: /includes/agents/binaries-removed-from-path.rst

                           Running RHEL / CentOS 7.x using the
                           ``rpm`` package manager:

                           .. include:: /includes/steps/install-mongodb-agent-manage-s390x.rhel7-rpm.rst

                        .. tab:: TAR archive
                           :tabid: tar 

                           Running RHEL / CentOS 7.x using the
                           ``tar`` archive:

                           .. include:: /includes/steps/install-mongodb-agent-manage-s390x.rhel7-tar.rst
   
   .. tab::
      :tabid: linux

      Use this procedure to install Linux systems that do not use
      ``deb`` or ``rpm`` packages.

      .. include:: /includes/steps/install-mongodb-agent-manage-linux-x86-64-tar.rst

