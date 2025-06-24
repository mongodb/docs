.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-continuous-backup.rst
      
   .. step:: Enable |mms| Backup.

      If you have not yet enabled |mms| Backup, click
      :guilabel:`Begin Setup` and complete the wizard. This results in a
      completed backup setup, so you can skip the rest of this procedure.
      
   .. step:: Start backing up the process.
    
      From the list of processes, navigate to the :guilabel:`Status` column
      for the process you want to back up and click :guilabel:`Start`.
      
   .. step:: In the :guilabel:`Start Backup` sidebar, configure the backup source and storage engine.
      
      .. list-table::
         :widths: 20 40 40
         :header-rows: 1
      
         * - Menu
           - Possible Values
           - Default Value
      
         * - :guilabel:`Sync source`
      
           - - *Any* secondary (Ops Manager chooses)
      
             - Any specific secondary
      
             - The primary node
      
           - ``any secondary``
      
             Using a secondary is preferred because it minimizes
             performance impact on the primary.
      
         * - :guilabel:`Storage Engine`
      
           - :guilabel:`WiredTiger`
      
             |mms| limits backups to deployments with fewer than 100,000
             files. Files includes collections and indexes.
      
           - ``WiredTiger``
      
   .. step:: Set Authentication Mechanisms.
      
      If Automation doesn't manage your deployment and your deployment
      requires authentication, specify the authentication mechanism and
      credentials.
      
      Specify the following, as appropriate:
      
      .. include:: /includes/list-table-edit-backup-host-credentials-ui.rst
      
   .. step:: Click :guilabel:`Start`.
