
.. _atlas-sp-azure-confluent-private-link-add:

==================================================
Microsoft Azure Confluent Private Link Connections
==================================================

To create a {+azure+} Confluent Private Link connection to use in your
{+atlas-sp+} project:

.. procedure::
   :style: normal

   .. step:: Configure Confluent cluster.

      Call the ``streams/accountDetails`` endpoint to get your |service| 
      project's |azure| subscription ID:

      .. code-block:: bash

         curl --location 'https://cloud.mongodb.com/api/atlas/v2/groups/<project_id>/streams/accountDetails?cloudProvider=azure&regionName=<region>' \
         --header 'Accept: application/vnd.atlas.2024-11-13+json'

         {
            "azureSubscriptionId": "f1a2b3c4-d5e6-87a8-a9b0-c1d2e3f4a5b6",
            "cidrBlock": "192.168.123.0/21",
            "virtualNetworkName": "vnet_a1b2c3d4e5f6a7b8c9d0e1f2_xyz987ab",
            "cloudProvider": "azure"
         }

   .. step:: Navigate to the cluster you want to connect to.

      In your Confluent account, navigate to the cluster you want to connect to.


   .. step:: Navigate to your cluster networking details.

      In your cluster networking interface, navigate to your cluster 
      networking details.

   .. step:: Add PrivateLink Acess. 

      Follow the procedure provided in the `Confluent documentation <https://docs.confluent.io/cloud/current/networking/private-links/azure-privatelink.html#add-a-private-link-access-in-ccloud>`__ 
      to add PrivateLink access.

      .. note:: 

         You need to provide your ``azureSubscriptionId``.

   .. step:: Request a connection to your cloud provider.

      .. list-table::
         :widths: 20 80
         :header-rows: 1

         * - Key
           - Value

         * - region
           - Region of the Confluent cluster

         * - dnsDomain
           - The DNS domain of your cluster's network.
             Eg: ``abcxyz12345.eastus2.azure.confluent.cloud``

         * - azureResourceIds
           - The resource ID for the Confluent Cloud Private Link service 
             endpoint in each Availability Zone (AZ) used by your cluster's network.

             - Multi-AZ Clusters: Include the unique Resource ID corresponding 
               to each Availability Zone where your cluster has Private Link enabled.
             - Single-AZ Clusters: Provide only the single Resource ID for the 
               specific Availability Zone used.


      .. io-code-block:: 
         :copyable: true 

         .. input::

            curl --location 'https://cloud.mongodb.com/api/atlas/v2/groups/8358217d3abb5c76c3434648/streams/privateLinkConnections' \
            --digest \
            --user "slrntglrbn:933fb118-ac62-4991-db05-ee67a3481fde" \
            --header 'Content-Type: application/json' \
            --header 'Accept: application/vnd.atlas.2024-11-13+json' \
            --data '{ 
              "vendor": "Confluent",
              "provider": "Azure",
              "region": "US_EAST_2",
              "dnsDomain": "abcxyz12345.eastus2.azure.confluent.cloud",
              "azureResourceIds: [
                "/subscriptions/a1b2c3d4-e5f6-7890-abcd-ef1234567890/resourceGroups/d-xyz98/providers/Microsoft.Network/privateLinkServices/d-xyz98-privatelink-1",
                "/subscriptions/a1b2c3d4-e5f6-7890-abcd-ef1234567890/resourceGroups/d-xyz98/providers/Microsoft.Network/privateLinkServices/d-xyz98-privatelink-2",
                "/subscriptions/a1b2c3d4-e5f6-7890-abcd-ef1234567890/resourceGroups/d-xyz98/providers/Microsoft.Network/privateLinkServices/d-xyz98-privatelink-3"
              ]
            }'


         .. output::

            {
              "_id": "65f8a3b4c5d6e7f8a9b0c1d2",
              "azureResourceIds": [
                "/subscriptions/a1b2c3d4-e5f6-7890-abcd-ef1234567890/resourceGroups/d-xyz98/providers/Microsoft.Network/privateLinkServices/d-xyz98-privatelink-1",
                "/subscriptions/a1b2c3d4-e5f6-7890-abcd-ef1234567890/resourceGroups/d-xyz98/providers/Microsoft.Network/privateLinkServices/d-xyz98-privatelink-2",
                "/subscriptions/a1b2c3d4-e5f6-7890-abcd-ef1234567890/resourceGroups/d-xyz98/providers/Microsoft.Network/privateLinkServices/d-xyz98-privatelink-3"
              ],
              "dnsDomain": "abcxyz12345.eastus2.azure.confluent.cloud",
              "provider": "Azure",
              "region": "US_EAST_2",
              "vendor": "Confluent"
            }

   .. step:: Create the Atlas-side connection.

      .. include:: /includes/steps-create-sp-kafka-pl-atlas-side-connection.rst