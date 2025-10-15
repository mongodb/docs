.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-backup-details.rst

   .. step:: Select the snapshot to restore and click 
      :guilabel:`Restore`.

      In the :guilabel:`Actions` column, expand the 
      :icon-fa5:`ellipsis-v` :guilabel:`Actions` menu, and click 
      :guilabel:`Restore` for the snapshot that you want to restore.

   .. step:: In the modal window, select the target 
      project and the target {+cluster+} from the dropdown 
      menu. If the target {+cluster+} is part of a different 
      project or organization than your source {+cluster+}, 
      you can enter the name of and select the target project 
      from the dropdown menu.

   .. step:: Follow the prompt and click 
      :guilabel:`Restore`.

   .. step:: Restart your application and ensure it uses the new target
      {+database-deployment+}.
      