To enable and configure snapshot copy distribution from your primary
region to other regions using the {+atlas-admin-api+}:

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

   .. step:: (Optional) Automatically copy snapshots to all secondary regions.

      To distribute snapshot copies to all secondary regions in a
      multi-region cluster, set the ``autoCopySettingsEnabled`` field to
      ``true`` and send the modified payload to the
      :oas-atlas-op:`Update Cloud Backup Schedule for One Cluster
      </updateGroupClusterBackupSchedule>` endpoint to update the
      snapshot copy policy.

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

      .. include:: /includes/backup/note-auto-option-api.rst

   .. step:: Update the snapshot copy policy.

      Make a request to the :oas-atlas-op:`Update Cloud Backup Schedule
      for One Cluster </updateGroupClusterBackupSchedule>` endpoint
      with the modified payload to update the snapshot copy policy.