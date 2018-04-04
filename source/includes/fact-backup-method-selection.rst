.. important::

   The backup method that you choose when enabling backup for the first
   time for any cluster in a project is the only method allowed if you
   enable backup for other clusters in the project. For example, if you
   enable continuous backups for your first cluster, you may only perform
   continuous backups with any subsequent clusters in the project.

   To change the backup method for the project, disable backups for all
   clusters in the project, then re-enable backups using your preferred
   backup methodology. |service| deletes any stored snapshots when you
   disable backup for a cluster. 
   
   Consider :ref:`creating a separate project <create-project>` 
   for clusters where a different backup method is required.