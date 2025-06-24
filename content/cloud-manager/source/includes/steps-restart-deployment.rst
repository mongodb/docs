.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
   
   .. step:: Select the :guilabel:`Clusters` view for your deployment.
      
   .. step:: Restart the deployment.
      
      a. Click the ellipsis icon [ :icon:`ellipsis-h`] 
         for the deployment that you want to restart.
         
      #. Click :guilabel:`Restart`.
      
      #. Click :guilabel:`Confirm`.
      
      .. note::
      
         If you are restarting a running deployment,  
         |mms| restarts the deployment after the next publish.
         Deployments with multiple members remain available as |mms| 
         performs a rolling restart. During an |mms| rolling restart,
         several processes can go offline at once, but the majority of
         processes remain available.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.
      
      |mms| displays your proposed changes.
      
      a. If you are satisfied, click :guilabel:`Confirm & Deploy`.
      b. If you want to make further configuration changes, 
         click :guilabel:`Cancel`. Click :guilabel:`Modify` for the
         cluster to make additional changes. 
