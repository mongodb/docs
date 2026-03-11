To update the snapshot copy policy for your cluster using the
{+atlas-ui+}: 

.. procedure::
   :style: normal 

   .. include:: /includes/nav/steps-backup-details

   .. step:: In the :guilabel:`Backup Policy` tab, expand the :guilabel:`Additional Snapshot Copies Policy` section.

      If :guilabel:`Copy to other regions` is enabled, this section
      displays a table of your currently configured snapshot copy
      policies.

   .. step:: (Optional) Enable or disable automatic copy distribution to secondary regions.

      Toggle :guilabel:`Automatically Sync Copy Regions with Cluster
      Regions` to :guilabel:`On` or :guilabel:`Off` to enable or disable
      automatic distribution of snapshot copies to all secondary regions
      in a multi-region cluster.

      When you enable :guilabel:`Automatically Sync Copy Regions with
      Cluster Regions`, {+service+} configures snapshot copy policy
      items for each secondary region in your cluster and keeps the
      policy in sync with the cluster configuration as you add or remove
      secondary regions. {+service+} creates each snapshot copy policy
      item with the same frequency and retention times as the backup
      policy items defined for the cluster.

      .. important:: 
         
         When you enable :guilabel:`Automatically Sync Copy Regions 
         with Cluster Regions`, {+service+} overwrites any existing 
         snapshot copy policy items you have configured. 

   .. step:: Add or update snapshot copies policy items. 
    
      Make your changes to the snapshot copy policy items in the table.

      To add a new snapshot copies policy item, click :guilabel:`Add
      Another Region and Frequency` and configure the new item in the
      new row.

      .. include:: /includes/backup/note-auto-option-ui.rst

   .. step:: Click :guilabel:`Review Changes`.

      A dialog box appears, summarizing your new snapshot copies policy
      configuration. If you made changes, you can select checkboxes for
      the following options to apply your changes to existing snapshots
      in the copy regions:
          
      - Update retention time of existing snapshot copies
      - Delete all snapshots from removed policies

      .. include:: /includes/backup/note-update-existing-snapshots.rst

   .. step:: Click :guilabel:`Confirm` to apply your changes. 
