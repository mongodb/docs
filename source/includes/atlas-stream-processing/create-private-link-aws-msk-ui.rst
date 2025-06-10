.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Go to the {+atlas-sp+} private endpoint interface.

      a. Click the :guilabel:`Private Endpoint` tab.

      #. Click the :guilabel:`{+atlas-sp+}` tab.

      #. Click :guilabel:`Create endpoint`. 

   .. step:: Select your cloud provider and vendor.

      a. Set :guilabel:`Cloud Provider` to :guilabel:`AWS`.

      #. Set :guilabel:`Vendor` to :guilabel:`MSK`.

      #. Click :guilabel:`Next, enter service details`.

   .. step:: Provide your :aws:`AWS MSK cluster ARN </AmazonECS/latest/developerguide/ecs-account-settings.html#ecs-resource-ids>`.

   .. step:: Click :guilabel:`Next, generate endpoint ID`.
             
{+service+} generates a private endpoint ID. You may now view your |aws| MSK private
endpoint's details in the :guilabel:`Network Access` interface under the
:guilabel:`{+atlas-sp+}` tab by clicking the :guilabel:`View` button in the corresponding
row.
