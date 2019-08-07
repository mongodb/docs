The head database works as a full copy of the deployment database. It
needs oplogs applied to it on a regular basis to keep its data
synchronized with the deployment database. Snapshots are generated from
the data stored in the head database according to your
:ref:`snapshot schedule <snapshot-frequency-and-retention>`.

Once the first full backup is completed, each active backup job follows
this process:

1. {+bagent+} tails the deployment's oplog.
2. {+bagent+} routinely batches new oplog entries in
   :term:`oplog slices <oplog slice>` and transfers them to |onprem|.
3. |onprem| stores the oplog entries in the Oplog Store.
4. |onprem| applies the new oplog entries from the oplog slices to the
   head database that stores the deployment backup.
5. |onprem| creates a new snapshot and stores it in the snapshot store
   as specified in your
   :ref:`snapshot schedule <snapshot-frequency-and-retention>`.
