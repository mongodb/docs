To enable and configure snapshot copy distribution from your primary
region to other regions using the {+atlas-ui+}:

.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-backup-details

   .. step:: In the :guilabel:`Backup Policy` tab, expand the :guilabel:`Additional Snapshot Copies Policy` section. 
   
   .. step:: Toggle :guilabel:`Copy to other regions` to :guilabel:`On`.

      This displays a table where you can configure snapshot copy policy
      items to distribute snapshot copies to additional regions.

      .. note:: 

         For a global cluster, you can enable or disable this setting
         independently for each zone.

   .. step:: Choose the additional region(s) to distribute snapshot copies to.
    
      In the :guilabel:`Region` column of the snapshot copy policy 
      table, select a region from the :guilabel:`Choose a region` dropdown. 

      To add another region, click :guilabel:`Add Another Region and
      Frequency`.

      .. include:: /includes/backup/note-copy-region-cloud-provider.rst

   .. step:: Configure snapshot copy frequency.

      In the :guilabel:`Snapshots` column for each region that you
      added, select the frequency for copying snapshots to that region. 

      You can select from the following frequency options:

      - :guilabel:`Last number of snapshots`: Copies a specific number
        of the most recent snapshots to the copy region, deleting older
        snapshots as new snapshots are copied. If you select this
        option, you can't select any other frequency options for that
        region. 
        
        For example, specifying :guilabel:`Last` ``5``
        :guilabel:`Snapshots` copies the five most recent snapshots
        taken on the source region, and maintains that number of copies
        for as long as the copy policy item is active.

      - :guilabel:`Backup Policy Frequency`: Copies snapshots taken
        according to the :ref:`backup policy <configure-backup-policy>`
        item(s) defined for your cluster. Possible values include
        ``Hourly``, ``Daily``, ``Weekly``, ``Monthly``, or ``Yearly``. 

        The available frequencies correspond to the frequencies of the
        backup policy items defined for your cluster. For example, if
        your backup policy specifies only weekly and monthly snapshots,
        then you can select either ``Weekly`` or ``Monthly`` as the
        snapshot copy frequency to copy those respective snapshots to
        the copy region.

        {+service+} copies snapshots taken for *all* backup policy items
        with the specified frequency. For example, if your backup policy
        takes two weekly snapshots, then a ``Weekly`` snapshot copy
        policy item copies both weekly snapshots.

        To select more than one frequency option for the same copy
        region, click :guilabel:`Add Another Region and Frequency` and
        choose the same region in the new row.

        .. note::          

           .. include:: /includes/fact-overlapping-backup-policy-items.rst
      - :guilabel:`On Demand`: Copies on-demand snapshots
        taken for the cluster.

   .. step:: Configure retention time.

      In the :guilabel:`Retention Time` column for each row that you
      added, select the retention time for snapshots copied to that
      region and frequency. The retention time cannot exceed the
      retention time set

      You can choose from the following units of time for retention:
      
      - Hours
      - Days
      - Weeks
      - Months

   .. step:: *(Optional)* Enable point-in-time restores. 
    
      In the :guilabel:`Point-in-Time Restore` column for each row that 
      you added, set the toggle to :guilabel:`On` to enable oplog copy
      distribution to that region. This enables |pit| restores for all 
      snapshot copies in that region.

      This is only available if you enabled {+PIT-Restore+} for your
      cluster.

   .. step:: Click :guilabel:`Review Changes`.

      Review the new snapshot copy policy configuration in the dialog 
      box, and click :guilabel:`Confirm` to save your changes. 
