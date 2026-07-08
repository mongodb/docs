When you perform a cluster-level restore, |service| deletes all
existing data on the target {+cluster+} before the restore. The
target {+cluster+} is unavailable for the duration of the restore. As
part of the restore, |service| also restores any indexes. This does
*not* apply to {+db-coll-restore+}.
