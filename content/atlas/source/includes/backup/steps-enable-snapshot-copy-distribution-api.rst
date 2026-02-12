To enable and configure snapshot copy distribution from your primary
region to other regions using the {+atlas-admin-api+}:

.. procedure:: 
   :style: normal
   
   .. step:: Get the cluster's current {+Cloud-Backup+} schedule.
      
      Make a ``GET`` request to the 
      :oas-atlas-op:`/backup/schedule </getGroupClusterBackupSchedule>`
      endpoint to retrieve the current {+Cloud-Backup+} schedule for 
      the cluster. The ``copySettings`` field in the response body 
      contains the current snapshot copy policy. 
      
      Copy the entire response to modify in the next step. 

      .. include:: /includes/backup/enable-copy-policy-items-api.rst

   .. step:: Modify the payload to add snapshot copy policy items.

      Modify the response from the last step to update the
      ``copySettings`` array with your desired snapshot copy policy
      items.

      Each item in the ``copySettings`` array represents the active
      snapshot copy policy items for a specified region in a zone. For
      an example snapshot copy policy configuration, see
      :oas-atlas-op:`Update Cloud Backup Schedule for One Cluster
      </updateGroupClusterBackupSchedule>`.

      .. include:: /includes/backup/note-copy-region-cloud-provider.rst

   .. step:: Update the snapshot copy policy.

      Make a ``PATCH`` request with the modified payload to the
      :oas-atlas-op:`/backup/schedule
      </updateGroupClusterBackupSchedule>` endpoint. 