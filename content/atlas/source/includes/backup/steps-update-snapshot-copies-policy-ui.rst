To update the snapshot copy policy for your cluster using the
{+atlas-ui+}: 

.. procedure::
   :style: normal 

   .. include:: /includes/nav/steps-backup-details

   .. step:: In the :guilabel:`Backup Policy` tab, expand the :guilabel:`Additional Snapshot Copies Policy` section.

      If :guilabel:`Copy to other regions` is enabled, this section
      displays a table of your currently configured snapshot copy
      policies.

   .. step:: Add or update snapshot copies policy items. 
    
      Make your changes to the snapshot copy policy items in the table.

      To add a new snapshot copies policy item, click :guilabel:`Add
      Another Region and Frequency` and configure the new item in the
      new row. 

   .. step:: Click :guilabel:`Review Changes`.

      A dialog box appears, summarizing your new snapshot copies policy
      configuration. If you made changes, you can select checkboxes for
      the following options to apply your changes to existing snapshots
      in the copy regions:
          
      - Update retention time of existing snapshot copies
      - Delete all snapshots from removed policies

      .. include:: /includes/backup/note-update-existing-snapshots.rst

   .. step:: Click :guilabel:`Confirm` to apply your changes. 
