Upgrading a ``tgz``/``zip`` Installation
++++++++++++++++++++++++++++++++++++++++

To upgrade a tarball installation, backup configuration and/or logs,
and then re-install the On-Prem MMS server.

.. important:: It is crucial that you back up the existing
   configuration because the upgrade process will delete existing
   data.

In more details:

#. Shutdown the MMS server and take a backup of your existing
   configuration and logs.

   .. code-block:: sh

      sudo /etc/init.d/mongodb-mms stop
      sudo cp -a <install_dir>/conf ~/mms_conf.backup
      sudo cp -a <install_dir>/logs ~/mms_logs.backup

#. Remove your existing MMS server installation entirely and extract
   latest release in its place:

   .. code-block:: sh

      cd <install_dir>/../
      sudo rm -rf <install_dir>
      sudo tar -zxf -C . /path/to/10gen-mms-<version>.x86_64.tar.gz

#. Compare and reconcile any changes in configuration between versions:

   .. code-block:: sh

      diff -u ~/mms_conf.backup/conf-mms.properties <install_dir>/conf/conf-mms.properties
      diff -u ~/mms_conf.backup/mms.conf <install_dir>/conf/mms.conf

#. Edit your configuration to resolve any conflicts between the old
   and new versions, being sure to take any new changes as
   appropriate.

   .. note::

      Changes to ``mms.centralUri``, email addresses, and MongoDB are
      the most common configuration changes.

#. Restart the On-Prem MMS server.

   .. code-block:: sh

      sudo /etc/init.d/mongodb-mms start
