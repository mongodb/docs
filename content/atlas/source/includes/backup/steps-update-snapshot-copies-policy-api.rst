To update the snapshot copy policy for your cluster using the
{+atlas-admin-api+}:

.. procedure:: 
   :style: normal
   
   .. step:: Get the cluster's current {+Cloud-Backup+} schedule.
      
      Use the :oas-atlas-op:`Get Cloud Backup Schedule for One Cluster
      </getGroupClusterBackupSchedule>` endpoint to retrieve the current
      {+Cloud-Backup+} schedule for the cluster. The ``copySettings`` 
      field in the response body contains the current snapshot copy p
      olicy.
      
      Copy the entire response to modify in the next step. 

      .. include:: /includes/backup/enable-copy-policy-items-api.rst

   .. step:: (Optional) Enable or disable automatic copy distribution to secondary regions.

      Set the ``autoCopySettingsEnabled`` field to ``true`` or ``false``
      and send the modified payload to the :oas-atlas-op:`Update Cloud
      Backup Schedule for One Cluster
      </updateGroupClusterBackupSchedule>` endpoint to enable or disable
      automatic distribution of snapshot copies to all secondary regions
      in a multi-region cluster.
      
      When you set ``autoCopySettingsEnabled`` to ``true``, {+service+}
      configures snapshot copy policy items for each secondary region in
      your cluster and keeps the policy in sync with the cluster
      configuration as you add or remove secondary regions. {+service+}
      creates each snapshot copy policy item with the same frequency and
      retention times as the backup policy items defined for the
      cluster.

      To customize the frequency and retention times for the automatic
      snapshot copies, copy the response from this step to modify in the
      next step. If the automatic snapshot copy policy meets your needs,
      you can end the procedure here.

      .. important:: 
         
         When you set the ``autoCopySettingsEnabled`` field to ``true``,
         {+service+} overwrites any existing snapshot copy policy items 
         you have configured. 

   .. step:: Modify the payload to add or update snapshot copy policy items.

      Modify the response from the last step to update the
      ``copySettings`` array with your desired snapshot copy policy
      items.

      Each item in the ``copySettings`` array represents the active
      snapshot copy policy items for a specified region in a zone. For
      an example snapshot copy policy configuration, see
      :oas-atlas-op:`Update Cloud Backup Schedule for One Cluster
      </updateGroupClusterBackupSchedule>`.

      .. include:: /includes/backup/note-auto-option-api.rst

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

      Make a request to the :oas-atlas-op:`Update Cloud Backup Schedule
      for One Cluster </updateGroupClusterBackupSchedule>` endpoint
      with the modified payload to update the snapshot copy policy.