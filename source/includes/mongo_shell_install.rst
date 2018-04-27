.. tabs::

   tabs:
     - id: linux
       name: Linux
       content: |

         Download the latest distribution for the environment you are working in.

         `Amazon Linux
         <https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-amazon-3.6.4.tgz>`__

         `RHEL 7
         <https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-rhel70-3.6.4.tgz>`__

         `RHEL 6
         <https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-rhel62-3.6.4.tgz>`__

         `Ubuntu 12.04
         <https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-ubuntu1204-3.6.4.tgz>`__

         `Ubuntu 14.04
         <https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-ubuntu1404-3.6.4.tgz>`__

         `Ubuntu 16.04
         <https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-ubuntu1604-3.6.4.tgz>`__

         `SUSE 11
         <https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-suse11-3.6.4.tgz>`__

         `SUSE 12
         <https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-suse12-3.6.4.tgz>`__

         `Debian 7
         <https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-debian71-3.6.4.tgz>`__
         

         Extract the tar file and locate the ``mongo`` executable under the bin directory of your install root.

         .. cssclass:: copyable-code
         .. code-block:: sh
  
            tar -xvzf /[mongodbstall]/bin/mongodb-shell-[version].tgz


     - id: macos
       name: MacOs
       content: |

         Download `the latest <https://downloads.mongodb.org/osx
         /mongodb-shell-osx-ssl-x86_64-3.6.3.tgz>`__ or use ``brew`` to
         install.
         
         .. cssclass:: copyable-code
         .. code-block:: sh
  
            brew install mongodb --with-openssl

     - id: windows
       name: Windows
       content: |

         Download `the latest <https://downloads.mongodb.org/win32
         /mongodb-win32-x86_64-2008plus-ssl-3.6.4-signed.msi>`__  to
         install.

         Once you download the file, click on it (it has an ``.msi``
         extension). A user interface will open up to guide you through
         the installation.
       
     - id: atlas
       name: Atlas (Cloud)
       content: |

         To get to the list of downloadable mongo shell installations
         for use with Atlas, login to Atlas and select the ``Connect``
         button on the cluster management panel.

         .. figure:: /images/connect_panel.png
            :scale: 50%
            
         Under ``Check the IP Whitelist``, add the IP address of the
         client you wish to have connecting to Atlas. Then click the
         ``Choose the Connection Method`` button to select your
         environment. You will then be directed to the appropriate
         client download.
         
         .. figure:: /images/whitelistpanel.png
            :scale: 50%

         Once you have downloaded the shell distribution that correlates
         to your environment, if you need further instructions on how to
         install the shell, select the appropriate environment tab in
         this step.
         
