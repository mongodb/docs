
The procedure differs depending on whether you use |aws| or |azure| for your cloud provider.
Select the appropriate tab:

.. tabs:: 

   .. tab:: AWS
      :tabid: aws

      1. Have an |aws| user account with an |iam| user policy that grants 
         permissions to create, modify, describe, and delete endpoints. To 
         learn more about controlling the use of interface endpoints, see 
         the :aws:`AWS Documentation 
         </vpc/latest/userguide/vpc-endpoints.html>`.

      #. :aws:`Install the AWS CLI 
         </cli/latest/userguide/cli-chap-install.html>`.

      #. If you have not already done so, create your |vpc| and EC2 instances 
         in |aws|. To learn more, see the :aws:`AWS documentation 
         </index.html>` for guidance.

   .. tab:: Azure
      :tabid: azure

      #. Have an |azure| user account with 
         permissions to create resources like virtual networks and private endpoints.
         To learn more about the permissions required, see 
         the `Azure Documentation 
         <https://learn.microsoft.com/en-us/azure/private-link/rbac-permissions>`__.

      #. `Install the Azure CLI <https://learn.microsoft.com/en-us/cli/azure/install-azure-cli>`__.

      .. important:: 

         With |azure|, you can create *up to three private endpoints per project* 
         for your {+fdi+}\s due to an |azure|-imposed limit. This is why |service| 
         prevents you from deleting an |service| project before first deleting its 
         private endpoints. To request more than three private endpoints for a project, 
         contact :ref:`MongoDB Support <request-support>`.