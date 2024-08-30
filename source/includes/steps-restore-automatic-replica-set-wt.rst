.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-continuous-backup.rst
      
   .. step:: Click the :guilabel:`Overview` tab.
      
   .. step:: Click the deployment, then click :guilabel:`Restore or Download`.
      
   .. step:: Select the restore point.
      
      a. Choose the point from which you want to restore your backup.
      
         .. include:: /includes/backup/select-restore-point.rst
      
      b. Click :guilabel:`Next`.
      
   .. step:: Choose to restore the files to another cluster.
      
      a. Click :guilabel:`Choose Cluster to Restore to`.
      
      b. Complete the following fields:
      
         .. list-table::
            :widths: 30 70
            :header-rows: 1
      
            * - Field
              - Action
      
            * - :guilabel:`Project`
              - Select a :cloudmgr:`project </reference/glossary/#std-term-project>` to which you want to restore the
                :manual:`snapshot </reference/glossary/#std-term-snapshot>`.
      
            * - :guilabel:`Cluster to Restore to`
              - Select a :manual:`cluster </reference/glossary/#std-term-cluster>` to which you want to restore
                the snapshot.
      
                |mms| *must* manage the target replica set.
      
                .. include:: /includes/fact-automation-removes-existing-data.rst
      
      b. Click :guilabel:`Restore`.
      
         |mms| notes how much storage space the restore requires.
      
   .. step:: Click :guilabel:`Restore`.
