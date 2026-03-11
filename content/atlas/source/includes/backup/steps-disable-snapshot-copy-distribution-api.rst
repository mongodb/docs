To disable snapshot copy distribution or delete snapshot copy policy
items using the {+atlas-admin-api+}:

.. procedure::
   :style: normal

.. procedure:: 
   :style: normal
   
   .. step:: Get the cluster's current {+Cloud-Backup+} schedule.
      
      Use the :oas-atlas-op:`Get Cloud Backup Schedule for One Cluster
      </getGroupClusterBackupSchedule>` endpoint to retrieve the current
      {+Cloud-Backup+} schedule for the cluster. The ``copySettings`` 
      field in the response body contains the current snapshot copy
      policy.
      
      Copy the entire response to modify in the next step. 

      .. include:: /includes/backup/enable-copy-policy-items-api.rst

   .. step:: Remove the copy policy item(s). 

      Modify the response from the previous step to remove the copy
      policy item(s) that you want to disable from the ``copySettings``
      array.

      To disable all snapshot copy distribution, replace the
      ``copySettings`` array with an empty array.

      .. note::

         You must set the ``autoCopySettingsEnabled`` field to ``false``
         to be able to add or delete copy regions. When
         ``autoCopySettingsEnabled`` is ``true``, {+service+}
         automatically configures snapshot copy policy items for each
         secondary region in your cluster and keeps the policy in sync
         with the cluster configuration as you add or remove secondary
         regions. 

   .. step:: *(Optional)* Delete existing snapshot copies. 

      To delete all copy snapshots associated with removed policies,
      pass in the ``deleteCopySnapshots`` parameter with a value of
      ``true`` in the modified payload. 
      
      .. include:: /includes/backup/note-delete-existing-snapshots.rst

   .. step:: Update the snapshot copy policy.

      Make a request to the :oas-atlas-op:`Update Cloud Backup Schedule
      for One Cluster </updateGroupClusterBackupSchedule>` endpoint with
      the modified payload to update the snapshot copy policy.