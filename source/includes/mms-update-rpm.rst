Upgrading an RPM-Based Installation
+++++++++++++++++++++++++++++++++++

Please contact MMS to receive the download location of the latest
MMS server release.

#. Shutdown the On-Prem MMS server and take a backup of your existing
   configuration:

   .. code-block:: sh

    sudo /etc/init.d/mongodb-mms stop
    sudo cp -a <install_dir>/conf ~/mms_conf.backup

#. Perform an RPM upgrade:

   .. code-block:: sh

      sudo rpm -Uvh 10gen-mms-<version>.x86_64.rpm

#. Reconcile any changes in configuration files.

   At this point the upgrade is complete. However you may need to reconcile
   changes in your configuration with new configuration options
   available in the latest release.

   During the ``rpm`` operation, if you saw the following output, you
   have changes to reconcile:

   .. code-block:: none

       warning: <install_dir>/conf/conf-mms.properties created as    <install_dir>/conf/conf-mms.properties.rpmnew

   Compare your current configuration to the updated version, with the
   following sequence of operations:

   .. code-block:: sh

      diff -u <install_dir>/conf/conf-mms.properties <install_dir>/conf/conf-mms.properties.rpmnew
      diff -u <install_dir>/conf/mms.conf <install_dir>/conf/mms.conf.rpmnew

   Edit your configuration to resolve any conflicts between the old
   and new versions, being sure to take any new changes from
   ``conf-mms.properties.rpmnew`` as appropriate. Changes to
   ``mms.centralUri``, email addresses, and MongoDB are the most
   common configuration changes.

   Repeat the above reconciliation for ``mms.conf`` if the upgrade
   indicates a conflict.

   .. note::

      The upgrade from beta versions 1.0.1 to 1.0.2 changed several
      paths to make the MMS server completely self contained. In
      1.0.2 all logs, configuration, and working files are in the
      ``/opt/10gen/mms/`` hierarchy. This changes the following paths
      from 1.0.1:

      - New logs path:  <install_dir>/logs/
      - New tmp path:  <install_dir>/tmp/

      Finally, you may also need to re-symlink your startup script:

      .. code-block:: sh

         sudo ln -s /<install_dir>/bin/mongodb-mms /etc/init.d/mongodb-mms

#. Restart the On-Prem MMS server.

   .. code-block:: sh

      sudo /etc/init.d/mongodb-mms start
