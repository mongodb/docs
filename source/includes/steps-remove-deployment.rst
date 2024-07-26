.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
   
   .. step:: Select the :guilabel:`Clusters` view for your deployment.
      
   .. step:: Click the :guilabel:`...` ellipsis icon next to the desired deployment.
      
   .. step:: Select :guilabel:`Remove from Cloud Manager`.
      
   .. step:: Choose to stop |mms| from managing and/or monitoring the deployment.
      
      When you stop |mms| from managing your deployment, you must select
      one of the following options:
      
      .. list-table::
         :widths: 30 70
      
         * - :guilabel:`Unmanage this item in Cloud Manager but continue
             to monitor`
           - Removes the process from management only. You can no longer
             control the process through |mms|, but |mms| continues to
             display its status and track its metrics.
      
         * - :guilabel:`Completely remove from Cloud Manager`
           - Removes the processes from both management and monitoring.
             |mms| no longer displays the process. All backups are
             terminated and all backup snapshots are deleted.
      
   .. step:: Confirm that you want automation and/or monitoring disabled for the deployment.
      
      a. Click :guilabel:`Remove <Deployment>`.
      
         :guilabel:`<Deployment>` stands in for the deployment being
         removed: :guilabel:`Sharded Cluster`, :guilabel:`Replica Set` or
         :guilabel:`Standalone`
      
      b. If prompted for a verification code, enter the code and then
         click :guilabel:`Remove <Deployment>` again. 
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.
      
      |mms| displays your proposed changes.
      
      a. If you are satisfied, click :guilabel:`Confirm & Deploy`.
      b. If you want to make further configuration changes, 
         click :guilabel:`Cancel`. Click :guilabel:`Modify` for the
         cluster to make additional changes.
