.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-continuous-backup.rst
      
   .. step:: Click the :guilabel:`Overview` tab.
    
   .. step:: Click the deployment, then click :guilabel:`Restore or Download`.
      
   .. step:: Select the restore point.
      
      a. Choose the point from which you want to restore your backup.
      
         .. list-table::
            :widths: 20 40 40
            :header-rows: 1
      
            * - Restore Type
      
              - Description
      
              - Action
      
            * - :guilabel:`Snapshot`
      
              - Allows you to choose one
                :manual:`stored snapshot </reference/glossary/#std-term-snapshot>`.
      
              - Select an existing :manual:`snapshot </reference/glossary/#std-term-snapshot>` to restore.
      
            * - :guilabel:`Point In Time`
      
              - Allows you to choose a date and time as your restore time
                objective for your snapshot. By default, the
                Oplog Store stores 24 hours of data.
      
                .. include:: /includes/fact-restore-doesnt-include-selected-time.rst
      
                :gold:`IMPORTANT:` If you are restoring a sharded
                cluster that runs |fcv-link| of 4.0 or earlier, you
                must :ref:`enable cluster checkpoints
                <enable-cluster-checkpoints>` to
                perform a |pit| restore on a sharded cluster. If no
                checkpoints that include your date and time are
                available, |mms| asks you to
                :guilabel:`choose another point in time`.
      
                :gold:`IMPORTANT:` You cannot perform a |pit| restore
                that covers any time prior to the latest backup resync.
                For the conditions that cause a resync, see
                :doc:`/tutorial/resync-backup`.
      
              - Select a :guilabel:`Date` and :guilabel:`Time`.
      
      b. Click :guilabel:`Next`.
      
      c. If you are restoring a sharded cluster that runs |fcv-link| of 4.0
         or earlier and you chose :guilabel:`Point In Time`:
      
         i.  A list of :guilabel:`Checkpoints` closest to the time you
             selected appears.
      
         ii. To start your point in time restore, you may:
      
             - Choose one of the listed checkpoints, or
             - Click :guilabel:`Choose another point in time` to remove the
               list of checkpoints and select another date and time from
               the menus.
      
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
              - Select a :manual:`cluster </reference/glossary/#std-term-cluster>` to which you want to restore the
                snapshot.
      
                |mms| *must* manage the target sharded cluster.
      
                .. include:: /includes/fact-automation-removes-existing-data.rst
      
      b. Click :guilabel:`Restore`.
      
         |mms| notes how much storage space the restore requires in its
         console.
      
   .. step:: Click :guilabel:`Restore`.
