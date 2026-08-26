Generate an Incoming VPC Peering Connection Request from Confluent
------------------------------------------------------------------

To set up and configure an |AWS| |vpc| peering connection initiated from a Confluent
account:

.. procedure::
   :style: normal

   .. step:: Create a service account to authenticate with the {+atlas-admin-api+}.

      Create a :ref:`service account <service-accounts-overview>` and
      generate an access token to authenticate your API requests. To
      learn more, see :ref:`atlas-admin-api-access`.

   .. step:: Retrieve the |service| Cloud |AWS| Account ID, the |vpc| ID, and the |cidr| block.

      A sample API request resembles the following:

      .. code-block:: sh

         curl \
         -s --header "Authorization: Bearer {ACCESS-TOKEN}" \
         --header 'Accept: application/vnd.atlas.2024-11-13+json' \
         --header 'Content-Type: application/json' \
         --request GET \ "https://cloud.mongodb.com/api/atlas/v2/groups/671a86f4cfc9da7d7c31b14f/streams/accountDetails?cloudProvider=aws&regionName=US_EAST_1"

      Note the following example parameter values:

      .. list-table::
         :widths: 45 55
         :header-rows: 1

         * - Parameter values
           - Description
         * - 671a86f4cfc9da7d7c31b14f
           - The |service| project Id
         * - |aws|
           - The Cloud provider
         * - US_EAST_1
           - The |aws| region name

      A sample output resembles the following:

      .. code-block:: sh

         {
            "awsAccountId": "974404375205",
            "cidrBlock": "192.168.248.0/21",
            "vpcId": "vpc-0ef7efa5ceca36e2f"
         }

   .. step:: Configure a network configuration.

      A Confluent Network Configuration that supports |vpc| peering is required before you create a |vpc| peering connection.
      If a network configuration doesn't yet exist in your account, then select |AWS| as your cloud provider and select a region from the
      :guilabel:`Add Network Configuration` field in Confluent Cloud.

      .. note::

         If a Confluent |vpc| Peering Network Configuration already exists in your account, then proceed to **Step 7**.

   .. step:: Click :guilabel:`Continue` and select :guilabel:`VPC Peering` in the next page.

      Select three different :guilabel:`Zones` and the |cidr| block for the Confluent |AWS| |vpc|.

   .. step:: Click :guilabel:`Add Network Connection`.

   .. step:: Open the Confluent |vpc| Peering Network Configuration, and click :guilabel:`VPC Peering`.

   .. step:: Provide the connection with a name, an |service| |AWS| Account ID, a |vpc| ID, and the |cidr| block from **Step 2**, and click :guilabel:`Add`.

   .. step:: The |vpc| peering connection request displays in |service| after a potential delay.

      To see your pending request in your |service| account, execute an API request similar to:

      .. code-block:: sh

         curl \
         -s --header "Authorization: Bearer {ACCESS-TOKEN}" \
         --header 'Accept: application/vnd.atlas.2023-02-01+json' \
         --header 'Content-Type: application/json' \
         --request GET \
         "https://cloud.mongodb.com/api/atlas/v2/groups/671a86f4cfc9da7d7c31b14f/streams/vpcPeeringConnections?requesterAccountId=417601102659"

      Note the following example parameter values:

      .. list-table::
         :widths: 45 55
         :header-rows: 1

         * - Parameter values
           - Description
         * - 671a86f4cfc9da7d7c31b14f
           - The |service| project Id
         * - 417601102659
           - The Confluent |AWS| Account ID obtained in **Step 7**

      A sample output resembles the following:

      .. code-block:: sh

         {
            "links": [
               {
                  "href": "https://cloud.mongodb.com/api/atlas/v2/groups/671a86f4cfc9da7d7c31b14f/streams/vpcPeeringConnections?requesterAccountId=417601102659&pageNum=1&itemsPerPage=100",
                  "rel": "self"
               }
            ],
            "results": [
               {
                  "_id": "6759e61aa6cf0a5476e233d1",
                  "accepterAccountId": "974404375205",
                  "accepterVpcId": "vpc-0ddfd37072cc5ed61",
                  "cloudStatus": "pending-acceptance",
                  "expirationTime": "2024-12-18T19:20:37Z",
                  "groupId": "671a86f4cfc9da7d7c31b14f",
                  "localStatus": "NONE",
                  "name": "pcx-09277e1e81d0751c1",
                  "requesterAccountId": "417601102659",
                  "requesterCidr": "10.0.0.0/16",
                  "requesterVpcId": "vpc-0d13eb6a2f0377854"
               }
            ],
            "totalCount": 1
         }

   .. step:: Accept the incoming |vpc| Peering connection request.

      Note that the ``cloudStatus`` value is ``pending-acceptance``.

      Execute the following API request:

      .. code-block:: sh

         curl \
         -s --header "Authorization: Bearer {ACCESS-TOKEN}" \
         --header 'Accept: application/vnd.atlas.2023-02-01+json' \
         --header 'Content-Type: application/json' \
         -d '{"requesterVpcId": "vpc-0d13eb6a2f0377854", "requesterAccountId":"417601102659"}' \
         --request POST \
         "https://cloud.mongodb.com/api/atlas/v2/groups/671a86f4cfc9da7d7c31b14f/streams/vpcPeeringConnections/pcx-09277e1e81d0751c1:accept"

      Note the following example parameter values:

      .. list-table::
         :widths: 45 55
         :header-rows: 1

         * - Parameter values
           - Description

         * - {"requesterVpcId": "vpc-0d13eb6a2f0377854", "requesterAccountId":"417601102659"}
           - This is the POST payload containing the “requester”s |vpc| ID, and the “requester”s |AWS| Account ID. In this case, the “requester” is Confluent.
         * - 671a86f4cfc9da7d7c31b14f
           - The |service| project Id
         * - pcx-09277e1e81d0751c1
           - The incoming |vpc| connection name obtained from the previous step

   .. step:: Verify that the connection was accepted.

      To do this, repeat **Step 9** and observe the ``cloudStatus`` field value. When the connection is finally accepted, the value should return ``active``.
