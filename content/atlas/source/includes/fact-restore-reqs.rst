- You can't write to your cluster while a backup restore is in progress
  for that cluster.

- If the ``DefaultRWConcern`` value on the source snapshot differs
  from the ``DefaultRWConcern`` value on the target 
  {+database-deployment+}, |service| overrides the value on the source 
  snapshot with the value on the target {+database-deployment+}. If 
  there is no value configured for the ``DefaultRWConcern`` on the 
  target {+database-deployment+}, |service| keeps the value of 
  ``DefaultRWConcern`` from the snapshot without explicit 
  configuration. This may differ from the default value for that
  MongoDB version.

- You can restore a backup only to a cluster running either:

  - The same major release version with an equal or higher minor
    version. For example, if you create a backup for a cluster running
    MongoDB 8.1.x, you can restore this backup to a cluster running any
    other 8.1.x version, or any 8.y.x version where ``y > 1``, but you
    can't restore it to any 8.0.x version.

  - The next higher major release version. For example, if you create a
    backup for a cluster running MongoDB 8.y.x, you can restore this
    backup to a cluster running 9.y.x, but you can't restore it to any
    7.y.x version.
  
  If the backup has a pinned feature compatibility version (FCV), the
  major version of the target {+database-deployment+} must match the
  major version of that pinned FCV.
