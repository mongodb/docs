.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
   
   .. step:: Select the :guilabel:`Clusters` view for your deployment.
      
   .. step:: Click :guilabel:`Modify` in the cluster from which you want to remove a process.
      
   .. step:: In :guilabel:`Member Configuration`, click the ellipsis icon next to the process that you want to remove and select :guilabel:`Remove from Cluster`.

      For replica sets, select :guilabel:`Remove from Replica Set`.
      For ``mongod`` processes in a sharded replica set, select
      :guilabel:`Remove From Shard`. For ``mongos`` processes,
      select :guilabel:`Remove from Cluster`.
      
   .. step:: Click :guilabel:`Remove from Cluster` in the verification dialog.

      For replica sets, select :guilabel:`Remove from Replica Set`.
      For ``mongod`` processes in a sharded replica set, select
      :guilabel:`Remove From Shard`. For ``mongos`` processes,
      select :guilabel:`Remove from Cluster`.
      
   .. step:: Click :guilabel:`Save`.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.
      
   .. step:: Click :guilabel:`Confirm and Deploy` to deploy your changes.
      The process that you removed earlier now appears as a standalone 
      process. However, ``mongos`` processes are automatically removed 
      from the cluster and do not appear.
      
   .. step:: Click the ellipsis next to the standalone process, and select Remove from Cloud Manager.
