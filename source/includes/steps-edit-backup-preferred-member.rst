.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-continuous-backup.rst

   .. step:: Click the :guilabel:`Overview` tab.
      
   .. step:: Open the :guilabel:`Select Preferred Member to Backup` panel.

      On the line listing the process, click :icon-mms:`ellipsis` then click
      :guilabel:`Select Preferred Member to Backup`.
      
   .. step:: Choose a replica set member to create snapshots.
      
      Click :guilabel:`Select a member manually`.
      
   .. step:: Select an available member.
      
      From the :guilabel:`Select an available member` drop-down, select the
      hostname and process port for the desired member.
      
      .. note::
      
         If the selected member becomes unavailable, an error message 
         appears in the panel. |mms| uses a default member until the 
         selected member is available.
      
   .. step:: Click :guilabel:`Submit`.
