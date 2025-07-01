.. procedure::
   :style: normal
     
   .. include:: /includes/nav/steps-network-access.rst
      
   .. step:: Click the :guilabel:`Private Endpoint` tab.

   .. step:: Click the :guilabel:`Federated Database Instance / Online Archive` tab.   
      
   .. step:: Click the :guilabel:`Create New Endpoint` button.

   .. step:: Choose a cloud provider and region.
      
      a. Click the :guilabel:`Azure` button.

      #. From the dropdown, select the region where you 
         want to create the private endpoint.
      
         You can select one of the following regions: 
      
         .. include:: /includes/list-table-adf-supported-azure-regions.rst
      
         To learn more, see :ref:`atlas-data-federation-regions`.
      
      #. Click :guilabel:`Next`.
      
   .. step:: Configure your private endpoint.

      a. Enter the following details about your |azure| private endpoint:
      
         .. tip:: 
      
            You can click :guilabel:`Show instruction` in the {+atlas-ui+} for 
            the following settings to display a screenshot of the |azure| Dashboard 
            where you can find the value for the setting. 
      
         .. list-table::
            :widths: 20 80
      
            * - :guilabel:`Resource Group Name`
              - Name of the |azure| resource group that contains the VNet that 
                you want to use to connect to |service|.
                Find this value in your |azure| account.

            * - :guilabel:`Virtual Network Name`
              - Name of the VNet that you want to use to connect to
                |service|. Find this value in your |azure| account.

            * - :guilabel:`Subnet ID`
              - Identifier of the subnet in your |azure| VNet. 
                Find this value in your |azure| account.

            * - :guilabel:`Private Endpoint Name`
              - Unique alphanumeric string that identifies the private
                endpoint within your |azure| resource group. Any private endpoint name 
                that exceeds 24 characters is automatically transformed into a unique 
                identifier in your private endpoint |uri| :ref:`connection string <gst-connect-adf>`.

      #. Click :guilabel:`Next`.

      #. Copy the command the dialog box displays and run it using the |azure| 
         CLI.
      
         .. note::
            
            You can't copy the command until |service| finishes creating 
            virtual network resources in the background.

      #. Click :guilabel:`Finish`.
            