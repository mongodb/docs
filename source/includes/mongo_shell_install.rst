.. tabs::

   tabs:
     - id: linux
       name: Linux
       content: |

         Download the `latest stable version
         <https://www.mongodb.com/download-center#community>`__ for your environment.

         Extract the tar file and locate the ``mongo`` executable under the bin directory of your install root.

         .. cssclass:: copyable-code
         .. code-block:: sh
  
            tar -xvzf /[mongodbstall]/bin/mongodb-shell-[version].tgz

     - id: macos
       name: MacOS
       content: |

         Download the `latest stable version
         <https://www.mongodb.com/download-center#community>`__ for your environment.

     - id: windows
       name: Windows
       content: |

         Download the `latest stable version
         <https://www.mongodb.com/download-center#community>`__ for your environment.

         After downloading, click on the downloaded ``.msi`` file. The
         Windows Installer will guide you through the installation.
       
     - id: atlas
       name: Atlas (Cloud)
       content: |
       
         If you do not already have a ``mongo`` shell, you can download
         just the shell by logging into Atlas. For your cluster, click
         ``Connect``.

         .. figure:: /images/connect_panel.png
            :scale: 50%
            
         Under ``Check the IP Whitelist``, add the IP address of the
         client you wish to have connecting to Atlas. Then click the
         ``Connect with the Mongo Shell``. Follow the instructions in
         the dialog to download and install the shell.

         .. figure:: /images/whitelistpanel.png
            :scale: 50%
