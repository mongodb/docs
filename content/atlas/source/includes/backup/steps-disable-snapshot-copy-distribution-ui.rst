To disable snapshot copy distribution or delete snapshot copy policy
items in the {+atlas-ui+}:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-backup-details

   .. step:: In the :guilabel:`Backup Policy` tab, expand the :guilabel:`Additional Snapshot Copies Policy` section.

      This displays a table of your currently configured snapshot copy
      policies.

   .. step:: Disable snapshot copy distribution. 
    
      To disable all snapshot copy distribution for the cluster, toggle 
      :guilabel:`Copy to other regions` to :guilabel:`Off`.

      If you want to disable only specific snapshot copy policy items,
      click :icon:`trash-alt` in the :guilabel:`Action` column for the
      region and frequency you want to stop copying snapshots for.

      .. note:: 

         For a global cluster, you can enable or disable the
         :guilabel:`Copy to other regions` setting independently for
         each zone.

   .. step:: Click :guilabel:`Review Changes`.

      A dialog box appears summarizing your new snapshot copy policy
      configuration. If you disabled snapshot copy distribution or
      deleted any snapshot copy policy items, you can select from the
      following options to apply your changes to existing snapshots in
      the copy regions:
          
      - Update retention time of existing snapshot copies
      - Delete all snapshots from removed policies

      .. include:: /includes/backup/note-delete-existing-snapshots.rst

   .. step:: Click :guilabel:`Confirm` to apply your changes.    