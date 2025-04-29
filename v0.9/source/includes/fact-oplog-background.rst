The :term:`oplog` in the source cluster must be large enough to track
events that happen during the time it takes to complete the initial
sync to the destination cluster.

If you anticipate synchronizing a large data set, or if you plan to
pause synchronization for an extended period of time, increase the size
of the replica set ``oplog`` in the source cluster.
