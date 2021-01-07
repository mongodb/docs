.. admonition:: Upgrade Mode for Highly Available |application|\s
   :class: note

   If you have an |onprem| 4.2 installation with more than one |onprem|
   host pointing to the same Application Database, you can upgrade
   |onprem| to a newer 4.2 version without incurring monitoring
   downtime. During this upgrade, |onprem| enters a state known as
   **Upgrade Mode**. The benefits of this mode are that throughout the
   upgrade process:

   - Alerts and monitoring operate
   - |onprem| instances remain live
   - |application| may be accessed in read-only mode
   - |onprem| |api|\s that write or delete data are disabled

   Your |onprem| instance stays in **Upgrade Mode** until all |onprem|
   hosts have been upgraded and restarted.

   **Upgrade Mode** works with |onprem| 4.2 and later only.

   You should not upgrade more than one |onprem| host at a time.

   You need to stop all Backup Daemons before upgrading to later
   versions of 4.2.x. To stop your Backup Daemons:

   .. tabs-platforms::

      .. tab::
         :tabid: debian

         1. Log into the first host that serves a Backup Daemon.

         2. Issue the following command:

            .. code-block:: sh

               sudo service mongodb-mms-backup-daemon stop

         3. Verify that you shut down the Backup Daemon:

            .. code-block:: sh

               ps -ef | grep mongodb-mms-backup-daemon

            If the Backup Daemon continues to run, issue this command:

            .. code-block:: sh

               sudo /etc/init.d/mongodb-mms-backup-daemon stop

         4. Repeat steps 2 to 3 with every other Backup Daemon host.

      .. tab::
         :tabid: rhel

         1. Log into the first host that serves a Backup Daemon.

         2. Issue the following command:

            .. code-block:: sh

               sudo service mongodb-mms-backup-daemon stop

         3. Verify that you shut down the Backup Daemon:

            .. code-block:: sh

               ps -ef | grep mongodb-mms-backup-daemon

            If the Backup Daemon continues to run, issue this command:

            .. code-block:: sh

               sudo /etc/init.d/mongodb-mms-backup-daemon stop

         4. Repeat steps 2 to 3 with every other Backup Daemon host.

      .. tab::
         :tabid: linux

         1. Log into the first host that serves a Backup Daemon.

         2. Issue the following command:

            .. code-block:: sh

               <install_dir>/bin/mongodb-mms-backup-daemon stop

         3. Verify that you shut down the Backup Daemon:

            .. code-block:: sh

               ps -ef | grep mongodb-mms-backup-daemon

            If the Backup Daemon continues to run, issue this command:

            .. code-block:: sh

               sudo /etc/init.d/mongodb-mms-backup-daemon stop

         4. Repeat steps 2 to 3 with every other Backup Daemon host.
