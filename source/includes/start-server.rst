.. tabs::

   tabs:
     - id: windows
       name: Windows
       content: |
         .. warning::
            Do not make :binary:`~bin.mongod.exe` visible on public
            networks without running in "Secure Mode" with the
            :setting:`auth` setting. MongoDB is designed to be run in
            trusted environments, and the database does not enable
            "Secure Mode" by default.

         .. include:: /includes/steps/run-mongodb-on-windows.rst

     - id: macOS
       name: macOS
       content: |
         .. include:: /includes/steps/run-mongodb-on-linux.rst
     - id: RHEL
       name: RHEL / CentOS
       content: |
         .. important::
            If you are using SELinux, you must configure SELinux to allow
            MongoDB to start on Red Hat Linux-based systems (Red Hat Enterprise Linux
            or CentOS Linux). Refer to :ref:`install-rhel-configure-selinux`
            for instructions.

         .. |mongod-user| replace:: ``mongodb``
         .. |mongod-datadir| replace:: ``/var/lib/mongodb``

         .. include:: /includes/extracts/installation-directory-rhel.rst

         .. include:: /includes/steps/run-mongodb-on-a-linux-distro.rst
     - id: ubuntu
       name: Ubuntu
       content: |
         .. include:: /includes/extracts/installation-directory-ubuntu.rst

         .. include:: /includes/steps/run-mongodb-on-a-linux-distro.rst
     - id: debian
       name: Debian
       content: |
         .. include:: /includes/extracts/installation-directory-debian.rst

         .. include:: /includes/steps/run-mongodb-on-a-linux-distro.rst

     - id: amazon
       name: Amazon Linux
       content: |
         .. include:: /includes/extracts/installation-directory-amazon.rst

         .. include:: /includes/steps/run-mongodb-on-a-linux-distro.rst
     - id: SUSE
       name: SUSE
       content: |
         .. include:: /includes/extracts/installation-directory-suse.rst

         .. include:: /includes/steps/run-mongodb-on-a-linux-distro.rst
     - id: linux
       name: Linux
       content: |
         .. include:: /includes/steps/run-mongodb-on-linux.rst

