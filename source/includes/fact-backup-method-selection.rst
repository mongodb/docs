.. important::

   For each |service| project, the first cluster for which you enable
   backups for dictates the backup method for all subsequent clusters in
   the project. You cannot change the backup method without first
   deleting all clusters *and*  snapshots in the project.
   
   Consider :ref:`creating a separate project <create-project>` 
   for clusters where a different backup method is required.