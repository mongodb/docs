Add a {+azure+} Confluent Private Link Connection through the {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a {+azure+} Confluent Private Link connection to your {+spw+}
through the {+atlas-ui+}, first create the private endpoint, then create the
{+service+}-side connection.

Create the Private Endpoint
```````````````````````````

.. TODO: First-pass draft. Steps require technical verification before
   publication.

.. procedure::
   :style: normal

   .. step:: Configure your Confluent cluster.

      In your Confluent account:

      a. Navigate to the cluster you want to connect to.
      #. In your cluster networking interface, navigate to your
         cluster networking details.

   .. step:: Add PrivateLink access to your Confluent cluster.

      Follow the procedure provided in the `Confluent documentation
      <https://docs.confluent.io/cloud/current/networking/private-links/azure-privatelink.html#add-a-private-link-access-in-ccloud>`__
      to add PrivateLink access.

      Note the following values for further use in this procedure:

      - The :guilabel:`DNS domain` of your cluster's network.
      - The resource ID of the Confluent Cloud Private Link service
        endpoint in each availability zone used by your cluster's
        network.

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Go to the {+atlas-sp+} private endpoint interface.

      a. In the sidebar, click :guilabel:`Private Endpoint`.

      #. Click the :guilabel:`{+atlas-sp+}` tab.

      #. Click :guilabel:`Create endpoint`.

   .. step:: Select your cloud provider and vendor.

      a. Set :guilabel:`Cloud Provider` to :guilabel:`Azure`.

      #. Set :guilabel:`Vendor` to :guilabel:`Confluent Cloud`.

      #. Click :guilabel:`Next, enter service details`.

   .. step:: Provide your service details.

      a. Set the :guilabel:`Endpoint region` to the region that hosts
         your Confluent cluster.

      #. Set the :guilabel:`DNS Domain` to the DNS domain of your
         cluster's network that you noted earlier.

      #. Select the :guilabel:`Cluster availability zones` option
         suitable to your use case.

         - If your cluster uses a single availability zone, select
           :guilabel:`Single availability zone`.
         - If your cluster uses multiple availability zones, select
           :guilabel:`Multi-availability zones`.

      #. Set :guilabel:`Private Link Service resource ID(s)` to the
         resource IDs that you noted earlier.

         For a multi-availability zone cluster, provide the resource
         ID for each availability zone. For a single availability zone
         cluster, provide only the single resource ID.

   .. step:: Click :guilabel:`Next, generate endpoint ID`.

{+service+} generates a private endpoint ID. You may now view your
{+azure+} Confluent private endpoint's details in the
:guilabel:`Network Access` interface under the
:guilabel:`{+atlas-sp+}` tab by clicking the :guilabel:`View` button
in the corresponding row.

Create the {+service+}-Side Connection
````````````````````````````````

.. include:: /includes/atlas-stream-processing/create-kafka-pl-atlas-side-ui.rst
