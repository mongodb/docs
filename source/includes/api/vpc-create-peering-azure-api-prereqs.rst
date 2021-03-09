.. note::

   For details about how |service| creates
   :wikipedia:`Network Peering </Virtual_private_cloud>`
   connections with Azure |vpc|\s, see the ``Azure`` tab in
   :ref:`vpc-peering`.

You must complete the following steps before you create each Azure
network peering connection:

1. Run the following Azure CLI command to create a service principal
   using the specified |service| peering application ID:

   .. code-block:: sh

      az ad sp create --id e90a1407-55c3-432d-9cb1-3638900a9d22

   You only have to do this once for each subscription. If you receive
   the following message, the service principal with the |service|
   peering application ID already exists. Proceed to the next step.

   .. code-block:: sh
      :copyable: false

      Another object with the same value for property servicePrincipalNames already exists.

#. Copy the following example ``peering-role.json`` file and save it
   to your current working directory:

   .. code-block:: json
      :linenos:

      {
        "Name":"AtlasPeering/<azureSubscriptionId>/<resourceGroupName>/<vnetName>",
        "IsCustom":true,
        "Description":"Grants MongoDB access to manage peering connections on network /subscriptions/<azureSubscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Network/virtualNetworks/<vnetName>",
        "Actions":[
            "Microsoft.Network/virtualNetworks/virtualNetworkPeerings/read",
            "Microsoft.Network/virtualNetworks/virtualNetworkPeerings/write",
            "Microsoft.Network/virtualNetworks/virtualNetworkPeerings/delete",
            "Microsoft.Network/virtualNetworks/peer/action"
        ],
        "AssignableScopes":[
            "/subscriptions/<azureSubscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Network/virtualNetworks/<vnetName>"
        ]
      }

#. Replace the variables in the ``peering-role.json`` with details
   about the Azure VNet to which you want to create a peering
   connection:

   .. list-table::
      :header-rows: 1
      :widths: 30 70

      * - Variable
        - Description

      * - ``azureSubscriptionId``
        - Unique identifer of the Azure subscription in which the
          VNet resides.

      * - ``resourceGroupName``
        - Name of your Azure resource group.

      * - ``vnetName``
        - Name of your Azure VNet.

#. Run the following Azure CLI command to create the role definition
   using the ``peering-role.json`` file:

   .. code-block:: sh

      az role definition create --role-definition peering-role.json

#. Run the Azure CLI command shown below to assign the role you created
   to the service principal.

   Replace the variables with the same values you used in the
   ``peering-role.json`` file.

   .. code-block:: sh

      az role assignment create  \
      --role "AtlasPeering/<azureSubscriptionId>/<resourceGroupName>/<vnetName>" \
      --assignee "e90a1407-55c3-432d-9cb1-3638900a9d22" \
      --scope "/subscriptions/<azureSubscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Network/virtualNetworks/<vnetName>"
