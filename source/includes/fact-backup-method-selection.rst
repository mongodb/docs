.. important::

   For each |service| project, the first cluster for which you enable
   backups for dictates the backup method for all subsequent clusters in
   the project. To change the backup method for the project,
   disable backups for all clusters in the project, then re-enable
   backups using your preferred backup methodology. |service| deletes
   any stored snapshots when you disable backup for a cluster. 
   
   Consider :ref:`creating a separate project <create-project>` 
   for clusters where a different backup method is required.