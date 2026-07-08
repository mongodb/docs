.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-backup-details.rst

   .. step:: Select the snapshot to restore and click 
      :guilabel:`Restore`.

      In the :guilabel:`Actions` column, expand the 
      :icon-fa5:`ellipsis-v` :guilabel:`Actions` menu, and click 
      :guilabel:`Restore` for the snapshot that you want to restore.

   .. step:: Select cluster-level restore.

      In the :guilabel:`Source Details` pane, select
      :guilabel:`Restore entire snapshot`. Click :guilabel:`Continue`.
		
   .. step:: Specify the restore target.
	     
      In the :guilabel:`Destination` pane, select the project that
      hosts the restore target cluster from the :guilabel:`Destination
      Project` dropdown.

      Select the restore target cluster from the
      :guilabel:`Destination Cluster` dropdown.

      The source project and cluster of the snapshot appears with the
      :guilabel:`Source` label.

      Click :guilabel:`Continue`.
		
   .. step:: Review restore job details and initiate the restore.

      Verify that the details of the restore job are correct. Type the
      destination cluster name to confirm the action where prompted.

      Click :guilabel:`Start Restore`.		

   .. step:: Restart your application and ensure it uses the new target
      {+database-deployment+}.
      
