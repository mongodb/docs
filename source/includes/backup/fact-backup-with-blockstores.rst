We recommend that you review the amount of data that you are backing up
to the blockstore. If the amount of data that you back up negatively 
affects the performance of the blockstore or if you can't meet your
:abbr:`RTO (Recovery Time Objective)` requirements with a single
blockstore, distribute the workload across multiple blockstores to
balance the backup operations. You can even configure a single
blockstore per shard to meet your scaling needs. 

You can create additional blockstores any time and configure your backup
jobs to use the blockstores manually: 

- To learn more about allocating specific blockstores to a project, see
  :ref:`admin-manage-backup-resources`. 
- To learn more about configuring shard backups to use specific
  blockstores, see :ref:`manual-blockstore-maintenance`.
