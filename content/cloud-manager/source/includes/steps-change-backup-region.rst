.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-continuous-backup.rst
      
   .. step:: Download any required :doc:`backup snapshots </tutorial/view-snapshots>`.
      
      To find the download link, 
      click the :guilabel:`Restore History` tab, then click the 
      :guilabel:`download` link next to the snapshot. 
      
   .. step:: Terminate your backups.
      
      For each backup job, complete the steps to 
      :ref:`terminate your backups <terminate-backup>`. When you terminate 
      a deployment's backup, |mms| immediately deletes the snapshots that 
      are within the dates of the current retention policy.
      
      .. note:: 
      
          The backup region can only be changed once all backup jobs are 
          in the ``inactive`` state.
   
   .. include:: /includes/nav/steps-org-support.rst
      
   .. step:: Open a support case.
      
      a. In the :guilabel:`Request Support` dialog, click 
         :guilabel:`Create New Case`.
      
      b. In the support case, specify the |mms| project and the backup 
         region that you want to switch to.
      
   .. step:: Restart your backups.
      
      After MongoDB Support has changed the backup region for your project, 
      you can restart your backups. For detailed instructions, 
      see :ref:`restart-backup`.
