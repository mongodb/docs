=========================================================================
{+aws+} Confluent Enterprise Cluster Connection
=========================================================================

.. include:: /includes/atlas-stream-processing/aws-confluent-pl-limitation.rst

To create a connection to an {+aws+} Confluent Enterprise cluster for
use in your {+atlas-sp+} project, follow these steps:

.. procedure::
   :style: normal

   .. step:: Go to your Confluent cluster networking details.

      You must configure your Confluent cluster to accept incoming
      connections from your {+service+} project.

      :gold:`IMPORTANT:` Confluent accepts incoming connections only
      from {+aws+}. To use a Confluent Private Link connection, you
      must host your {+spw+}s on {+aws+}.

      In your Confluent account:

      a. Navigate to the cluster you want to connect to.
      #. In your cluster networking interface, navigate to your
         cluster networking details.

   .. step:: Add a PrivateLink Gateway to your Confluent cluster.

      `Add a PrivateLink Gateway configuration
      <https://docs.confluent.io/cloud/current/networking/aws-platt.html>`__
      in the same {+aws+} region as your cluster.

      Save the value of the :guilabel:`PrivateLink Service ID` for
      further use in this procedure.

   .. step:: Request a connection to your cloud provider.

      .. include:: /includes/atlas-stream-processing/aws-confluent-pl-request-connection-intro.rst

      For an {+aws+} Confluent Enterprise cluster Private Link
      connection, you must set the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``serviceEndpointId``
           - Your gateway's :guilabel:`PrivateLink Service ID`.

         * - ``dnsSubDomain``
           - You must set this to the empty array ``[]``.

      You can find these values in your Confluent cluster's
      networking details.

      The following example command requests a connection to your
      Confluent cluster and illustrates a typical response:

      .. include:: /includes/fact-service-accounts-first.rst

      .. io-code-block::
         :copyable: true

         .. input::
            :language: sh

            curl --location 'https://cloud.mongodb.com/api/atlas/v2/groups/8358217d3abb5c76c3434648/streams/privateLinkConnections' \
            --header "Authorization: Bearer {ACCESS-TOKEN}" \
            --header 'Content-Type: application/json' \
            --header 'Accept: application/vnd.atlas.2023-02-01+json' \
            --data '{ "vendor": "Confluent", "provider": "AWS",
              "region": "us_east_1", "serviceEndpointId":
              "<privatelink-service-id>",
              "dnsSubDomain": []
            }'

         .. output::
            :language: bash

            {"_id":"6aa12e7ccd660d4b2380b1c1","vendor":"Confluent","provider":"AWS","region":"us_east_1","serviceEndpointId":"<privatelink-service-id>"}

      After you send the request, save the value of the ``_id`` field
      in the response body for further use in this procedure.

   .. step:: Provide the interface endpoint ID to Confluent.

      Call the :oas-bump-atlas-op:`Return One Private Link
      <getgroupstreamprivatelinkconnection>` endpoint with the ``_id``
      value that you saved previously and, on the Confluent
      :guilabel:`Configure gateway` page, provide the value of
      ``interfaceEndpointId`` as the VPC interface endpoint ID to
      continue the configuration.

      If you aren't on the :guilabel:`Configure gateway` page, follow
      these steps in your Confluent account to provide the
      ``interfaceEndpointId`` value as the VPC endpoint:

      a. Navigate to the cluster you want to connect to.
      #. In your cluster networking interface, navigate to your
         cluster networking details.
      #. Navigate to the access points interface.
      #. Add a new access point.
      #. When Confluent prompts you for an interface endpoint,
         provide the value of ``interfaceEndpointId``.

      After Confluent creates the access point, save the DNS domain
      that the gateway generates for it for further use in this
      procedure. This domain has the following format:

      .. code-block:: none

         <access-point-id>.<region>.aws.accesspoint.confluent.cloud

   .. step:: Add the DNS domain to your Private Link connection.

      Call the :oas-bump-atlas-op:`Update One Private Link Connection
      <updategroupstreamprivatelinkconnection>` endpoint to set the
      ``dnsDomain`` field on the connection that you created earlier.
      Use the ``_id`` value that you saved previously as the
      ``connectionId`` path parameter.

      :red:`WARNING:` {+service+} can't generate DNS records for your
      connection until you complete this step. The connection remains
      pending until you set ``dnsDomain``.

      .. code-block:: sh

         curl --location --request PATCH 'https://cloud.mongodb.com/api/atlas/v2/groups/8358217d3abb5c76c3434648/streams/privateLinkConnections/6aa12e7ccd660d4b2380b1c1' \
         --header "Authorization: Bearer {ACCESS-TOKEN}" \
         --header 'Content-Type: application/json' \
         --header 'Accept: application/vnd.atlas.2025-03-12+json' \
         --data '{
           "dnsDomain": "apdn60lj.us-east-1.aws.accesspoint.confluent.cloud"
         }'

      You can set ``dnsDomain`` only when the connection doesn't
      already have a DNS domain, or when the connection is in the
      ``IDLE`` state.

   .. step:: Create the {+service+}-side connection.

      .. include:: /includes/steps-create-sp-kafka-pl-atlas-side-connection.rst
