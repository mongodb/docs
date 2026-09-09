Add a {+gcp+} Confluent Private Service Connect Connection through the {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a {+gcp+} Confluent Private Service Connect connection to your
{+spw+} through the {+atlas-ui+}, first create the private endpoint, then create the
{+service+}-side connection.

Create the Private Endpoint
```````````````````````````

.. TODO: First-pass draft. Steps require technical verification before
   publication.

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Go to the {+atlas-sp+} private endpoint interface.

      a. In the sidebar, click :guilabel:`Private Endpoint`.

      #. Click the :guilabel:`{+atlas-sp+}` tab.

      #. Click :guilabel:`Create endpoint`.

   .. step:: Select your cloud provider and vendor.

      a. Set :guilabel:`Cloud Provider` to :guilabel:`GCP`.

      #. Set :guilabel:`Vendor` to :guilabel:`Confluent Cloud`.

      #. Click :guilabel:`Next, enter service details`.

   .. step:: Select your {+gcp+} region.

      Set :guilabel:`GCP Region` to the region that hosts your
      Confluent cluster. {+service+} uses this region to generate a
      :guilabel:`GCP Project ID`.

      You must have an {+service+} cluster in the region you select.

   .. step:: Note your :guilabel:`GCP Project ID`.

      {+service+} displays a :guilabel:`GCP Project ID`. Save this
      value for further use in this procedure.

   .. step:: Retrieve the Service Attachment URIs from Confluent.

      1. In your Confluent account, `provision a Google Cloud Private
         Service Connect network
         <https://docs.confluent.io/cloud/current/networking/private-links/gcp-private-service-connect.html>`__.

      #. Navigate to the :guilabel:`Ingress connections` tab for your
         network.

      #. Note the value of :guilabel:`DNS domain`. You will need this
         value for a later step.

      #. Click the :guilabel:`+ Private Service Connect Access`
         button.

      #. Provide a name for the connection.

      #. In the :guilabel:`GCP Project ID` field, provide the
         :guilabel:`GCP Project ID` that you saved previously.

      #. Under :guilabel:`Step 2`, note the service attachment URIs
         for a later step.

         For multi-zone clusters, note all three URIs. For a
         single-zone cluster, navigate to the :guilabel:`Cluster
         settings` page for your cluster. Under :guilabel:`Cloud
         details`, note the value of :guilabel:`Zones`. Note the value
         of the service attachment URI belonging to that zone.

      #. Click :guilabel:`Add`.

   .. step:: Return to {+service+} and provide your service details.

      a. Select the cluster type that matches your Confluent cluster.
         {+atlas-sp+} supports :guilabel:`Single-zone cluster`,
         :guilabel:`Multi-zone cluster`, and :guilabel:`Serverless`.

      #. Set :guilabel:`Service Attachment URI(s)` to the service
         attachment URIs that you noted earlier.

         For a multi-zone cluster, provide all three URIs. For a
         single-zone or serverless cluster, provide the single URI.

      #. Set the :guilabel:`DNS domain` to the DNS domain of your
         cluster's network that you noted earlier.

   .. step:: Click :guilabel:`Next, generate endpoint ID`.

{+service+} generates a private endpoint ID. You may now view your
{+gcp+} Confluent private endpoint's details in the :guilabel:`Network
Access` interface under the :guilabel:`{+atlas-sp+}` tab by clicking
the :guilabel:`View` button in the corresponding row.

Create the {+service+}-Side Connection
````````````````````````````````

.. include:: /includes/atlas-stream-processing/create-kafka-pl-atlas-side-ui.rst
