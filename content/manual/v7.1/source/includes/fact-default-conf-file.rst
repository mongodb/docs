- If you :ref:`installed MongoDB <tutorial-installation>` with a package manager
  such as ``yum`` or ``apt`` on Linux or ``brew`` on macOS, or with the
  MSI installer on Windows, a default :doc:`configuration file
  </reference/configuration-options>` has been provided as part of your
  installation:

  .. list-table::
     :header-rows: 1
     :widths: 10 25 65

     * - Platform
       - Method
       - Configuration File

     * - Linux
       - ``apt``, ``yum``, or ``zypper`` Package Manager
       - ``/etc/mongod.conf``

     * - macOS
       - ``brew`` Package Manager
       - ``/usr/local/etc/mongod.conf`` (on Intel processors), or

         ``/opt/homebrew/etc/mongod.conf`` (on `Apple M1 processors
         <https://support.apple.com/en-us/HT211814>`__)

     * - Windows
       - MSI Installer
       - ``<install directory>\bin\mongod.cfg``

- If you :ref:`installed MongoDB <tutorial-installation>` via a downloaded
  ``TGZ`` or ``ZIP`` file, you will need to create your own configuration
  file. The :ref:`basic example configuration <base-config>` is a good
  place to start.
