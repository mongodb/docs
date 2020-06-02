Restrictions
------------

The following restrictions apply to Encryption at Rest using your Key
Management on an |service| cluster:

- Clusters must use M10 or larger servers.

- :doc:`{+Old-Backup+}s </backup/legacy-backup/overview>` are not
  supported. When enabling backup for a cluster using Encryption at
  Rest using your Key Management, you must use
  :doc:`{+Cloud-Backup+}s </backup/cloud-backup/overview>`
  to encrypt your backup snapshots.
