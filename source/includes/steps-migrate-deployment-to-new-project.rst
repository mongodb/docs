.. procedure::
   :style: normal
      
   .. step:: Download snapshots.
      
      If you have backup enabled and want to retain snapshots:
      
      a. Download any snapshots that you want to keep:
      
         - :doc:`Download the snapshots for a replica set 
           </tutorial/restore-replica-set>`.
         - :doc:`Download the snapshots for a sharded cluster 
           </tutorial/restore-sharded-cluster>`.
      
      #. :ref:`Stop all backups <stop-backup>`.
      
         .. important::
         
            All existing snapshots remain available for download until they 
            expire, but |onprem| captures no new snapshots.
      
   .. step:: Prepare backup components.
      
      If you want backup enabled for your MongoDB deployment in the new 
      project, :doc:`prepare your backup components
      </core/backup-preparations>`.
      
   .. step:: Prepare the old project.
      
      a. :doc:`Deactivate the backup and monitoring {+mdbagent+} functions 
         </tutorial/mongodb-agent-functions/>` in the old project.
      
      #. :doc:`Unmanage the MongoDB deployment in the old project, but continue to monitor it </tutorial/unmanage-deployment>`.
      
   .. step:: Create a new project.
      
      :ref:`Create a new project <create-project>` to use as the 
      destination project.

   .. include:: /include/nav/steps-project-settings.rst

   .. step:: Prepare the new project.
      
      a. Note the :guilabel:`Project ID` value on the 
         :guilabel:`Project Settings` tab.
      
      #. :doc:`Create a new Agent API key </tutorial/manage-agent-api-key>`.
      
   .. step:: Migrate the MongoDB deployment.
      
      a. :doc:`Activate the backup and monitoring {+mdbagent+} functions 
         </tutorial/mongodb-agent-functions/>` in the new project.
      
      #. :ref:`Add the MongoDB deployment to your new project 
         <add-existing-mongodb-hosts>`.
      
      #. (Optional) :doc:`Start backups 
         </tutorial/stop-restart-terminate-backup>`.
      
   .. step:: Remove the old project.
      
      .. warning::
      
         This step permanetly deletes your old project and its related 
         artifacts.
      
      a. :ref:`Terminate all backups <terminate-backup>` in the old project.
      
         .. important::
      
            If you don't terminate all backups in the old project, all 
            existing snapshots remain available for download until they 
            expire and occupy disk space. You can't remove the MongoDB 
            deployment and delete the old project unless your terminate all 
            backups.
      
      #. :doc:`Completely remove the MongoDB deployment 
         </tutorial/unmanage-deployment>` from the old project.
      
      #. :ref:`Delete the old project <delete-project>`.
      