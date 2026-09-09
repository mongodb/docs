Add a {+gcp+} Confluent Private Service Connect Connection through the {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a {+gcp+} Confluent Private Service Connect connection to your
{+spw+} through the {+atlas-cli+}, follow these steps:

.. TODO: First-pass draft. Steps require technical verification before
   publication.

.. procedure::
   :style: normal

   .. step:: Get the {+gcp+} project ID for your {+service+} project.

      You must configure your Confluent cluster to accept incoming
      connections from your {+service+} project.

      Call the :ref:`atlas api streams getAccountDetails
      <atlas-api-streams-getAccountDetails>` command. Save the value
      of ``gcpProjectId`` for further use in this procedure.

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
         ``gcpProjectId`` value that you saved previously.

      #. Under :guilabel:`Step 2`, note the service attachment URIs
         for a later step.

         For multi-zone clusters, note all three URIs. For a
         single-zone cluster, navigate to the :guilabel:`Cluster
         settings` page for your cluster. Under :guilabel:`Cloud
         details`, note the value of :guilabel:`Zones`. Note the value
         of the service attachment URI belonging to that zone.

      #. Click :guilabel:`Add`.

   .. step:: Create an {+service+} Private Endpoint.

      Call the :ref:`atlas api streams createPrivateLinkConnection
      <atlas-api-streams-createPrivateLinkConnection>` command.

      For a {+gcp+} Confluent Private Service Connect connection, you
      must set the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``vendor``
           - ``"CONFLUENT"``

         * - ``provider``
           - ``"gcp"``

         * - ``region``
           - Region of the Confluent cluster.

         * - ``dnsDomain``
           - The DNS domain of your cluster's network that you noted
             earlier.

         * - ``gcpServiceAttachmentUris``
           - The service attachment URIs provided by Confluent during
             Private Service Connect configuration.

             - Multi-Zone Clusters: Include the unique URI
               corresponding to each Availability Zone where your
               cluster has Private Link enabled.
             - Single-Zone Clusters: Provide only the single URI for
               the specific Availability Zone where your cluster is
               deployed.

      You can find these values in your Confluent cluster's
      networking details.

      After you run the command, save the value of the ``_id`` field
      in the response body for further use in this procedure.

   .. step:: Create the {+service+}-side connection.

      .. include:: /includes/atlas-stream-processing/create-kafka-pl-atlas-side-cli.rst
