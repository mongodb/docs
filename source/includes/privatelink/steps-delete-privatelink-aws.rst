.. procedure::
   :style: normal
      
      
   .. include:: /includes/atlas-nav/steps-network-access.rst
      
   .. step:: Remove the private endpoint from |cloudgov-short|.
      
      a. Click the :guilabel:`Private Endpoint` tab.
      
      #. Next to the private endpoint you want to remove, click
         :guilabel:`Terminate`.
      
      #. To confirm, click :guilabel:`Confirm` in the dialog.
      
      .. note::
      
         When you delete a private endpoint from a region in
         |cloudgov-short|, you must manually 
         :aws:`delete the private endpoint </vpc/latest/userguide/delete-vpc-endpoint.html>` 
         in |aws|. |aws| lists the endpoint as ``rejected``. 
         |cloudgov-short| can't delete this resource because it lacks the 
         required permissions.
      
