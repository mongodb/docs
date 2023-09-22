.. procedure::
   :style: normal

   .. step:: Click :guilabel:`Database` in the top-left corner of 
      |service|.

   .. step:: From the :guilabel:`{+Database-Deployments+}` view, click 
      on the {+database-deployment+} name.

   .. step:: Click the :guilabel:`Backup` tab.

      If the {+database-deployment+} has no 
      :guilabel:`Backup` tab, then |service| backups are 
      disabled for it and no snapshots are available.

   .. step:: Select the snapshot to restore and click 
      :guilabel:`Restore`.

      In the :guilabel:`Actions` column, expand the 
      :icon-fa5:`ellipsis-v` :guilabel:`Actions` menu, and click 
      :guilabel:`Restore` for the snapshot that you want to restore.

   .. step:: In the modal window, select the target 
      {+database-deployment+} from the dropdown menu.

   .. step:: Follow the prompt and click 
      :guilabel:`Restore`.

   .. step:: Restart your application and ensure it uses the new target
      {+database-deployment+}.
      