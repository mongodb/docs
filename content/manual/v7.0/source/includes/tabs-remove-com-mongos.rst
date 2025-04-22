
If you installed ``mongos`` with a package manager on Linux, you
must remove the existing packages before you install the
Enterprise ``mongos``

To remove the Community ``mongos``:

.. tabs::

   .. tab:: RHEL/Amazon
      :tabid: rhel

      To remove the Community ``mongos`` from RHEL, CentOS, Alma
      Linux, Oracle, Rocky, and Amazon Linux, run the following
      command:

      .. code-block:: bash

         sudo dnf remove mongodb-mongos

   .. tab:: Ubuntu/Debian
      :tabid: debian-ubuntu

      To remove the Community ``mongos`` from Ubuntu and Debian,
      run the following command:

      .. code-block:: bash

         sudo apt remove mongodb-mongos

   .. tab:: SUSE
      :tabid: suse

      To remove the Community ``mongos`` from SUSE Enterprise
      Linux, run the following command:

      .. code-block:: bash

         sudo zypper remove mongodb-mongos
