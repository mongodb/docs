.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-continuous-backup.rst
      
   .. step:: Click the :guilabel:`Overview` tab.

   .. step:: Click the deployment, then click :guilabel:`Restore or Download`.
      
   .. step:: Select the restore point.
      
      a. Choose the point from which you want to restore your backup.
      
         .. include:: /includes/backup/select-restore-point.rst
      
      b. Click :guilabel:`Next`.
      
      .. include:: /includes/fact-find-latest-oplog-entry.rst
      
   .. step:: Click :guilabel:`Download` to restore the files manually.

   .. step:: Configure the snapshot download.
      
      a. Configure the following download options:
      
         .. list-table::
            :widths: 30 70
      
            * - :guilabel:`Pull Restore Usage Limit`
              - Select how many times the link can be used. If you select
                ``No Limit``, the link is re-usable until it expires.
      
            * - :guilabel:`Restore Link Expiration (in hours)`
              - Select the number of hours until the link expires. The
                default value is ``1``. The maximum value is the number of
                hours until the selected snapshot expires.
      
      b. Click :guilabel:`Finalize Request`.
      
      c. If you use :doc:`2FA </core/two-factor-authentication>`,
         |mms| prompts you for your 2FA code. Enter your 2FA code, then
         click :guilabel:`Finalize Request`.

   .. include:: /includes/nav/steps-continuous-backup.rst
      
   .. step:: Retrieve the snapshots.
      
      |mms| creates links to the snapshot. By default, these links are
      available for an hour and can be used just once.
      
      To download the snapshots:
      
      a. Click :guilabel:`Restore History`.
      
      b. When the restore job completes, click :guilabel:`(get link)`
         for each :manual:`replica set </reference/glossary/#std-term-replica-set>` appears.
      
      c. Click:
      
         - The copy button to the right of the link to copy the link to
           use it later, or
         - :guilabel:`Download` to download the snapshot immediately.
      
      .. important:: Extra step for point-in-time restores
      
         For point-in-time and oplog timestamp restores, additional
         instructions are shown. The final step shows the full command
         you must run using the :abbr:`MBRU (MongoDB Backup Restore
         Utility)`. It includes all of the necessary options to ensure a
         full restore.
      
         Select and copy the ``mongodb-backup-restore-util`` command
         provided under :guilabel:`Run Binary with PIT Options`.
      
   .. step:: Restore the snapshot data files to the destination host.
      
      .. example::
      
         .. code-block:: sh
      
            tar -xvf <backupSnapshot>.tar.gz
            mv <backupSnapshot> <temp-database-path>
      
   .. step:: Run the MongoDB Backup Restore Utility (Point-in-Time Restore Only).
      
      a. Download the MongoDB Backup Restore Utility to your host.
      
         .. note::
      
            If you closed the restore panel:
            
            1. .. include:: /includes/nav/list-continuous-backup.rst
            #. Click :guilabel:`More` and then 
               :guilabel:`Download MongoDB Backup Restore Utility`.
      
      #. Start a :binary:`~bin.mongod` instance without authentication
         enabled using the extracted snapshot directory as the data
         directory.
      
         .. example::
      
            .. code-block:: sh
      
               mongod --port <port number> \
                 --dbpath <temp-database-path> \
                 --setParameter ttlMonitorEnabled=false
      
         .. warning::
         
            The MongoDB Backup Restore Utility doesn't support
            authentication, so you can't start this temporary database with
            authentication.
      
      #. Run the MongoDB Backup Restore Utility on your destination host.
         Run it once for the replica set.
      
         .. include:: /includes/fact-pre-configured-mbru-command.rst
      
         The ``mongodb-backup-restore-util`` command uses the following
         options:
      
         .. include:: /includes/fact-restore-manual-replica-set-cloud.rst
      
         :icon:`check-circle` means that if you copied the
         ``mongodb-backup-restore-util`` command provided in
         |application|, this field is pre-configured.
      
   .. step:: Unmanage the Replica Set.
      
      Before attempting to restore the data manually, :doc:`remove the
      replica set from Automation </tutorial/unmanage-deployment>`.
      
   .. step:: Restore the Replica Set Manually.
      
      Follow the tutorial from the MongoDB Manual to
      :manual:`restore the replica set </tutorial/restore-replica-set-from-backup>`.
      
   .. step:: Reimport the Replica Set.
      
      To manage the replica set with automation again,
      :doc:`import the replica set </tutorial/add-existing-mongodb-processes>`
      back into |mms|.
      