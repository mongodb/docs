Restrictions
------------

The following restrictions apply to Encryption at Rest using your Key
Management on an |service| cluster:

* Clusters must use M10 or larger servers.

* :doc:`Continuous Backups </backup/continuous-backups>` are not supported. 
  When enabling backup for a cluster using Encryption at Rest using your
  Key Management, you must use
  :doc:`Cloud Provider Snapshots </backup/cloud-provider-snapshots>`
  to encrypt your backup snapshots.
