
If you installed MongoDB Community Server with a package manager
on Linux, you must remove the existing packages before you
install MongoDB Enterprise Server.

To remove MongoDB Community Server:

.. tabs::

   .. tab:: RHEL/Amazon
      :tabid: rhel

      To remove MongoDB Community Server from RHEL, CentOS, Alma
      Linux, Oracle, Rocky, and Amazon Linux, run the following
      command:

      .. code-block:: bash

         sudo dnf remove $(sudo rpm -qa | grep mongodb-org)

   .. tab:: Ubuntu/Debian
      :tabid: debian-ubuntu

      To remove MongoDB Community Server from Ubuntu and Debian,
      run the following command:

      .. code-block:: bash

         sudo apt remove mongodb-org\*

   .. tab:: SUSE
      :tabid: suse

      To remove MongoDB Community Server from SUSE Enterprise
      Linux, run the following command:

      .. code-block:: bash

         sudo zypper remove $(sudo rpm -qa | grep mongodb-org)

   .. tab:: macOS
      :tabid: macos

      To remove MongoDB Community Server for macOS (if you
      installed it with Homebrew), run the following command:

      .. code-block:: bash

         brew uninstall mongodb-community mongodb-database-tools

      To remove the MongoDB tap from Homebrew, run the following
      command:

      .. code-block:: bash

         brew untap mongodb/brew

