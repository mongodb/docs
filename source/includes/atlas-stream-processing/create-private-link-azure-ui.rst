.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Navigate to the {+atlas-sp+} private endpoint interface.

      a. Select the :guilabel:`Private Endpoint` tab.

      #. Select the :guilabel:`{+atlas-sp+}` tab.

         If you have not created an {+atlas-sp+} private endpoint
         previously, click :guilabel:`Create endpoint`. If you have,
         click :guilabel:`Add ASP Endpoint`.

   .. step:: Select your cloud provider and vendor.

      a. Set :guilabel:`Cloud Provider` to :guilabel:`Azure`.

      #. Set :guilabel:`Vendor` to :guilabel:`EventHub`.

      #. Click :guilabel:`Next, enter service details`

   .. step:: Provide your Azure EventHub endpoint details.

      a. Provide your `Azure service endpoint ID
         <https://learn.microsoft.com/en-us/rest/api/eventhub/namespaces/get?view=rest-eventhub-2024-01-01&tabs=HTTP>`__.

      #. Select your :guilabel:`Endpoint region`.

      #. Select your :guilabel:`Host name`.

      #. Click :guilabel:`Next, generate endpoint ID`

You may now view your |azure| EventHub private endpoint in the
:guilabel:`Network Access` interface under the
:guilabel:`{+atlas-sp+}` tab by clicking the :guilabel:`View` button
in its row.
