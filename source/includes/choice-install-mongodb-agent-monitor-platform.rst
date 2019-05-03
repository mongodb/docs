.. tabs-platforms::

   tabs:
     - id: macos
       content: |

         Use this procedure to install the {+mdbagent+} on x86_64
         architecture running macOS 10.8 or later:

         .. include:: /includes/steps/install-mongodb-agent-monitor-macos-x86-64-tar.rst

     - id: windows
       content: |

         Use this procedure to install the {+mdbagent+} on x86_64
         architecture running Microsoft Windows:

         .. include:: /includes/steps/install-mongodb-agent-monitor-on-windows.rst

     - id: debian
       content: |

         Use this procedure to install the {+mdbagent+}:

         .. tabs::

            tabs:
              - id: x86
                name: Intel/AMD
                content: |

                  On x86_64 architecture running, Debian 8, Debian 9, Ubuntu 16.04, or Ubuntu 18.04:

                  .. include:: /includes/steps/install-mongodb-agent-monitor-amd64.ubuntu1604-deb.rst

              - id: ppc
                name: PowerPC
                content: |

                  On PowerPC architecture running Ubuntu 16.x
                  (managing MongoDB 3.4 or later deployments only):

                  .. tabs::

                     tabs:
                       - id: deb
                         name: DEB package
                         content: |

                           Using a ``deb`` package:

                           .. include:: /includes/steps/install-mongodb-agent-monitor-ppc64e1.ubuntu1604-deb.rst

                       - id: tar
                         name: TAR archive
                         content: |

                           Using a ``tar`` archive:

                           .. include:: /includes/steps/install-mongodb-agent-monitor-ubuntu1604-ppc64le-tar.rst

              - id: s390x
                name: IBM ZSeries
                content: |

                  On zSeries architecture running Ubuntu 16.x using a
                  ``deb`` package:

                  .. include:: /includes/steps/install-mongodb-agent-monitor-s390x.ubuntu1804-deb.rst

     - id: rhel
       content: |

         Use this procedure to install the {+mdbagent+}:

         .. tabs::

            tabs:
              - id: x86
                name: Intel/AMD
                content: |

                  On x86_64 architecture:

                  .. tabs::

                     tabs:
                       - id: v6
                         name: 6.x
                         content: |

                           Running RHEL / CentOS 6.x or Amazon Linux 1
                           using an ``rpm`` package:

                           .. include:: /includes/steps/install-mongodb-agent-monitor-x86-64-rpm.rst

                       - id: v7
                         name: 7.x
                         content: |

                           Running RHEL / CentOS 7.x, SUSE 12, or
                           Amazon Linux 2:

                           .. tabs::

                              tabs:
                                - id: rpm
                                  name: RPM package
                                  content: |

                                    Using an ``rpm`` package:

                                    .. include:: /includes/steps/install-mongodb-agent-monitor-x86-64.rhel7-rpm.rst

                                - id: tar
                                  name: TAR archive
                                  content: |

                                    Using a ``tar`` archive:

                                    .. include:: /includes/steps/install-mongodb-agent-monitor-rhel7-x86-64-tar.rst

              - id: ppc
                name: PowerPC
                content: |

                  On RHEL / CentOS (7.x) on PowerPC architecture
                  (managing MongoDB 3.4 or later deployments):

                  .. tabs::

                     tabs:
                       - id: rpm
                         name: RPM package
                         content: |

                           Using an ``rpm`` package:

                           .. include:: /includes/steps/install-mongodb-agent-monitor-ppc641e.rhel7-rpm.rst

                       - id: tar
                         name: TAR archive
                         content: |

                           Using a ``tar`` archive:

                           .. include:: /includes/steps/install-mongodb-agent-monitor-rhel7-ppc64le-tar.rst

              - id: s390x
                name: IBM ZSeries
                content: |

                  On zSeries architecture (managing MongoDB 3.4 or
                  later deployments):

                  .. tabs::

                     tabs:
                       - id: v6
                         name: 6.x
                         content: |

                           Running RHEL / CentOS 6.x using the
                           ``rpm`` package manager:

                           .. include:: /includes/steps/install-mongodb-agent-monitor-s390x.rhel6-rpm.rst

                       - id: v7
                         name: 7.x
                         content: |

                           Running RHEL / CentOS 7.x using the
                           ``rpm`` package manager:

                           .. include:: /includes/steps/install-mongodb-agent-monitor-s390x.rhel7-rpm.rst

     - id: linux
       content: |

         Use this procedure to install Linux systems that do not use
         ``deb`` or ``rpm`` packages.

         .. include:: /includes/steps/install-mongodb-agent-monitor-linux-x86-64-tar.rst



