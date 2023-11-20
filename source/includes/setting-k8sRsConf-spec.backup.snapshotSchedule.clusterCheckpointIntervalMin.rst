.. setting:: spec.backup.snapshotSchedule.clusterCheckpointIntervalMin

   *Type*: number

   
   Number of minutes between successive cluster checkpoints. This setting
   applies only to sharded clusters that run MongoDB with FCV of 4.0 or
   earlier. This number determines the granularity of point-in-time
   restores for sharded clusters. You can set a value of ``15``, ``30``,
   or ``60``.
   

