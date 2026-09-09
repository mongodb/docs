Add a {+azure+} Confluent Private Link Connection through the {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a {+azure+} Confluent Private Link connection to your {+spw+}
through the {+atlas-cli+}, follow these steps:

.. TODO: First-pass draft. Steps require technical verification before
   publication.

.. procedure::
   :style: normal

   .. step:: Get the {+azure+} subscription ID for your project.

      You must configure your Confluent cluster to accept incoming
      connections from your {+service+} project.

      Call the :ref:`atlas api streams getAccountDetails
      <atlas-api-streams-getAccountDetails>` command. Save the value
      of ``azureSubscriptionId`` for further use in this procedure.

   .. step:: Go to your Confluent cluster networking details.

      In your Confluent account:

      a. Navigate to the cluster you want to connect to.
      #. In your cluster networking interface, navigate to your
         cluster networking details.

   .. step:: Add PrivateLink access to your Confluent cluster.

      Follow the procedure provided in the `Confluent documentation
      <https://docs.confluent.io/cloud/current/networking/private-links/azure-privatelink.html#add-a-private-link-access-in-ccloud>`__
      to add PrivateLink access. Provide the value of the
      ``azureSubscriptionId`` field that you saved previously.

      Save the :guilabel:`DNS domain` of your cluster's network and
      the resource ID of the Private Link service endpoint in each
      availability zone for further use in this procedure.

   .. step:: Create an {+service+} Private Endpoint.

      Call the :ref:`atlas api streams createPrivateLinkConnection
      <atlas-api-streams-createPrivateLinkConnection>` command.

      For a {+azure+} Confluent Private Link connection, you must set
      the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``vendor``
           - ``"Confluent"``

         * - ``provider``
           - ``"Azure"``

         * - ``region``
           - Region of the Confluent cluster.

         * - ``dnsDomain``
           - The DNS domain of your cluster's network that you saved
             previously.

         * - ``azureResourceIds``
           - The resource ID for the Confluent Cloud Private Link
             service endpoint in each Availability Zone (AZ) used by
             your cluster's network.

             - Multi-AZ Clusters: Include the unique Resource ID
               corresponding to each Availability Zone where your
               cluster has Private Link enabled.
             - Single-AZ Clusters: Provide only the single Resource ID
               for the specific Availability Zone used.

      You can find these values in your Confluent cluster's
      networking details.

      After you run the command, save the value of the ``_id`` field
      in the response body for further use in this procedure.

   .. step:: Create the {+service+}-side connection.

      .. include:: /includes/atlas-stream-processing/create-kafka-pl-atlas-side-cli.rst
