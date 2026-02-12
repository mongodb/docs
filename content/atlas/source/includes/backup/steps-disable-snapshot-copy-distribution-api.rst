To disable snapshot copy distribution or delete snapshot copy policy
items using the {+atlas-admin-api+}:

.. procedure::
   :style: normal

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

   .. step:: Remove the copy policy item(s). 

      Modify the response from the previous step to remove the copy
      policy item(s) that you want to disable from the ``copySettings``
      array.

      To disable all snapshot copy distribution, replace the
      ``copySettings`` array with an empty array.

   .. step:: *(Optional)* Delete existing snapshot copies. 

      To delete all copy snapshots associated with removed policies,
      pass in the ``deleteCopySnapshots`` parameter with a value of
      ``true`` in the modified payload. 
      
      .. include:: /includes/backup/note-delete-existing-snapshots.rst

   .. step:: Update the snapshot copy policy.

      Make a ``PATCH`` request with the modified payload to the
      :oas-atlas-op:`/backup/schedule
      </updateGroupClusterBackupSchedule>` endpoint. 