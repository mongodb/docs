.. list-table::
   :header-rows: 1
   :class: border-table
   :widths: 60 50

   * - Removed Configuration File Setting
     - Removed Command-line Option

   * - ``storage.mmapv1.journal.commitIntervalMs``
     -

   * - ``storage.mmapv1.journal.debugFlags``
     - ``mongod --journalOptions``

   * - ``storage.mmapv1.nsSize``
     - ``mongod --nssize``

   * - ``storage.mmapv1.preallocDataFiles``
     - ``mongod --noprealloc``

   * - ``storage.mmapv1.quota.enforced``
     - ``mongod --quota``

   * - ``storage.mmapv1.quota.maxFilesPerDB``
     - ``mongod --quotaFiles``

   * - ``storage.mmapv1.smallFiles``
     - ``mongod --smallfiles``

   * - ``storage.repairPath``
     - ``mongod --repairpath``

   * - ``replication.secondaryIndexPrefetch``
     - ``mongod --replIndexPrefetch``
