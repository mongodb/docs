.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-advanced.rst

   .. include:: /includes/ear/steps-ear-pvt-endpoints-mgmnt-page.rst

      .. |ear-key-provider| replace:: :guilabel:`Azure Key Vault`

   .. step:: Click :guilabel:`Create new endpoints`. 

   .. step:: Specify the regions where you want to create private endpoints. 

      a. Select the regions from the dropdown.
      #. Click :guilabel:`Continue`.

         |service| automatically creates private endpoints in these
         regions to allow you to connect by using private networking.

   .. step:: Approve the private endpoints. 

      You must approve each endpoint in your |akv| to use the private
      endpoint. You can use the |azure| :azure:`UI
      </private-link/manage-private-endpoint>`, 
      `CLI <https://learn.microsoft.com/en-us/cli/azure/network/private-endpoint-connection>`__,
      or Terraform to approve the private endpoint connections. 

      For private endpoints in each region, the :guilabel:`Approve
      Endpoints` page displays the status of each private endpoint.
      After you approve the private endpoint, it can take |service| up
      to three minutes to reflect the current status of your private
      endpoint. To learn more about private endpoint statuses, see
      :ref:`azure-view-pvt-endpoints`. 

   .. step:: Click :guilabel:`Done` to start using the private endpoints.
