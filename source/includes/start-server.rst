.. tabs-platforms::

   tabs:
     - id: windows
       content: |
         .. warning::
            Do not make :binary:`~bin.mongod.exe` visible on public
            networks without running in "Secure Mode" with the
            :setting:`auth` setting. MongoDB is designed to be run in
            trusted environments, and the database does not enable
            "Secure Mode" by default.

         .. include:: /includes/steps/run-mongodb-on-windows.rst

     - id: macos
       content: |
         .. include:: /includes/steps/run-mongodb-on-linux.rst
     - id: linux
       content: |
         .. important::
            If you are using SELinux on a Red Hat Linux-based system,
            (Red Hat Enterprise Linux or CentOS Linux), you must
            configure SELinux to allow MongoDB to start. Refer to
            :ref:`install-rhel-configure-selinux` for instructions.

         .. include:: /includes/steps/run-mongodb-on-linux.rst

