.. procedure::
   :style: normal
      
   .. step:: Add a new network peering connection for your project.
      
      .. note::
      
         You can skip this step if you are using the {+atlas-cli+} to add a network peering connection.
      
      a. .. include:: /includes/nav/list-network-access.rst
         
      #. In the :guilabel:`Peering` tab, click :icon-fa5:`plus`
         :guilabel:`Add Peering Connection`.
      
   .. step:: In |service|, configure your network peering connection.
      
      .. important::
      
         For multi-region Azure clusters, you must create a peering connection for 
         each |service| region from your application's regional VNET. 
         
         For example, if you have an application VNET in Sydney, another application 
         VNET in Singapore, and |service| nodes deployed in both regions, with the 
         primary node deployed in Sydney, you need to cross peer the application 
         VNET in Singapore to the |service| VNET in Sydney, in addition to 
         the |service| VNET in Singapore, in order to establish a successful 
         connection between the application in Singapore and the primary node.
      
         To configure the |service| region, fill in the 
         :guilabel:`Atlas Vnet Region` field in the :guilabel:`Peering Connection` 
         modal.
      
      .. tabs::
      
         .. tab:: {+atlas-cli+}
            :tabid: atlascli
      
            .. include:: /includes/extracts/atlas-networking-peering-create-and-watch-azure.rst
      
         .. tab:: {+atlas-ui+}
            :tabid: ui
      
            a. In the :guilabel:`Peering Connection` modal, select
               :guilabel:`Azure` and click :guilabel:`Next`.
      
            #. To create the network peering connection, fill in the
               requested information:
      
               .. include:: /includes/list-table-network-peering-azure.rst
      
            #. Click :guilabel:`Next`.
      
   .. step:: In |azure|, create the peering request.
      
      You must grant |service| the
      following permissions on the virtual network. You can revoke
      these permissions after the VNet peering has been
      established.
      
      - ``Microsoft.Network/virtualNetworks/virtualNetworkPeerings/read``
      
      - ``Microsoft.Network/virtualNetworks/virtualNetworkPeerings/write``
      
      - ``Microsoft.Network/virtualNetworks/virtualNetworkPeerings/delete``
      
      - ``Microsoft.Network/virtualNetworks/peer/action``
      
      To grant |service| permission to create a peering
      connection with your Azure virtual network:
      
      a. Launch the Azure console.
      
      #. Run the commands from the :guilabel:`Peering Connection`
         modal to create a service principal, create a new custom
         role, and assign the custom role to the service
         principal.
      
         .. note::
      
            Run the first command to create a service principal
            only once for all Azure VNets from the same Azure
            subscription.
      
      #. Click :guilabel:`Validate`.
      
      #. Click :guilabel:`Initiate Peering`.
      
