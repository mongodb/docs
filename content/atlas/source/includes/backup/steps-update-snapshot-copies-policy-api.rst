To update the snapshot copy policy for your cluster using the
{+atlas-admin-api+}:

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

   .. step:: Modify the payload to add or update snapshot copy policy items.

      Modify the response from the last step to update the
      ``copySettings`` array with your desired snapshot copy policy
      items.

      Each item in the ``copySettings`` array represents the active
      snapshot copy policy items for a specified region in a zone. For
      an example snapshot copy policy configuration, see
      :oas-atlas-op:`Update Cloud Backup Schedule for One Cluster
      </updateGroupClusterBackupSchedule>`.

   .. step:: *(Optional)* Apply your changes to existing snapshot copies.

      You can pass the following parameters into the modified payload to
      apply your updated snapshot copy policy to existing snapshot
      copies: 

      - ``updateCopySnapshots``: Pass in this parameter with a value of
        ``true`` to update the retention time of existing snapshot copies
        to match the new retention time set for the corresponding
        snapshot policy item.
      - ``deleteCopySnapshots``: Pass in this parameter with a value of
        ``true`` to delete all snapshots from removed policies.

      .. include:: /includes/backup/note-update-existing-snapshots.rst
       
   .. step:: Update the snapshot copy policy.

      Make a ``PATCH`` request with the modified payload to the
      :oas-atlas-op:`/backup/schedule
      </updateGroupClusterBackupSchedule>` endpoint.