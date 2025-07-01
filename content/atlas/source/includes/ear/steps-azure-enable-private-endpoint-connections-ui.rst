.. procedure:: 
   :style: normal 

   .. step:: Complete the steps to enable Customer-Managed Keys for your project.

      To learn more, see
      :ref:`azure-kms-configure-project-pvt-endpoint`.
      
   .. step:: Enable private endpoint connections if you haven't already. 
    
      a. Toggle :guilabel:`Require Private Networking` to enable private 
         endpoint connections. 
      #. Click :guilabel:`Save`.

   .. step:: Click :guilabel:`Set up` to set up the private endpoint connections.

      The :guilabel:`Set Up Private Networking for Azure` page displays. 

   .. step:: Specify the |azure| regions where you want to create private endpoints. 

      If your {+cluster+} is already enabled for Encryption at Rest with
      |akv|, |service| automatically populates the regions with your
      {+cluster+} regions. Otherwise, to add regions, do the following: 

      a. Select the |azure| regions from the dropdown.
      #. Click :guilabel:`Continue`.

         |service| automatically creates private endpoints in these
         regions to allow you to connect by using private networking.

   .. step:: Approve the private endpoints. 

      You can use the |azure| :azure:`UI </private-link/manage-private-endpoint>`, 
      `CLI <https://learn.microsoft.com/en-us/cli/azure/network/private-endpoint-connection>`__,
      or Terraform to approve the private endpoint connections. 
      
      After you approve, |service| automatically migrates all
      {+clusters+} for which you enabled :ref:`customer managed keys
      <azure-enable-cluster-encryption-at-rest-pvt-endpoint>`, including
      existing {+clusters+} that allow connections using public
      internet, to use only the private endpoint connection. You can
      optionally disable public internet access to your |akv| after
      migrating your {+clusters+} to use the private endpoint
      connection. All new |service| {+clusters+} on |azure| will by
      default use only the active private endpoint connection. |service|
      deploys additional nodes for existing {+clusters+} only in the
      regions with approved private endpoints. 

      After you approve the private endpoint, it can take |service| up
      to three minutes to reflect the current status of your private
      endpoint. For private endpoints in each region, the
      :guilabel:`Approve Endpoints` page displays the status of each
      private endpoint. To learn more, see
      :ref:`azure-view-pvt-endpoints`. 

   .. step:: Click :guilabel:`Done` to start using the private endpoints. 
