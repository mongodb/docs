|service| provides a detailed list of completed and in-progress
snapshot restorations, including when |service| took the snapshot and
the snapshot's delivery type. To view this list, from a cluster's
:guilabel:`Backup` tab, click the :guilabel:`Restores & Downloads` tab.

The :guilabel:`Status` column of the table displays the results of
completed snapshots, and the progress of snapshots currently
being restored.

- For manually downloaded snapshots, the :guilabel:`Status` column
  displays progress while |service| prepares the download link. Once
  the download is ready, the column displays the link to download the
  snapshot.

- For automated restores and {+PIT-Restore+} restores, the
  :guilabel:`Status` column updates as the restoration progresses on
  each node in the cluster. When the restoration completes, the column
  displays the time of completion and the cluster to which |service|
  restored the snapshot.
