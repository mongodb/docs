========================================================================
{+aws+} Confluent Dedicated Cluster Connection
========================================================================

.. include:: /includes/atlas-stream-processing/aws-confluent-pl-limitation.rst

To create a connection to an {+aws+} Confluent Dedicated cluster for
use in your {+atlas-sp+} project, follow these steps:

.. procedure::
   :style: normal

   .. step:: Get the {+aws+} account ID for your {+service+} project.

      You must configure your Confluent cluster to accept incoming
      connections from your {+service+} project.

      :gold:`IMPORTANT:` Confluent accepts incoming connections only
      from {+aws+}. To use a Confluent Private Link connection, you
      must host your {+spw+}s on {+aws+}.

      Call the :oas-bump-atlas-op:`Return Account ID and VPC ID for
      group and region <getgroupstreamaccountdetails>`
      {+atlas-admin-api+} endpoint. Save the value of
      ``awsAccountId`` for further use in this procedure.

   .. step:: Go to your Confluent cluster networking details.

      In your Confluent account:

      a. Navigate to the cluster you want to connect to.
      #. In your cluster networking interface, navigate to your
         cluster networking details.

   .. step:: Add Private Link Access to your Confluent cluster.

      `Add Private Link Access
      <https://docs.confluent.io/cloud/current/networking/private-links/aws-privatelink.html#aws-privatelink-register>`__
      to your cluster. Provide a name of your choice. For the {+aws+}
      account number, provide the value of the ``awsAccountId`` field
      that you saved previously.

      Save the value of the :guilabel:`VPC Endpoint service name` for
      further use in this procedure.

   .. step:: Request a connection to your cloud provider.

      .. include:: /includes/atlas-stream-processing/aws-confluent-pl-request-connection-intro.rst

      For an {+aws+} Confluent Dedicated cluster Private Link
      connection, you must set the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``serviceEndpointId``
           - Your cluster's :guilabel:`VPC Endpoint service name`.

         * - ``dnsDomain``
           - Fully qualified domain name of the bootstrap server on
             your Confluent cluster.

         * - ``dnsSubDomain``
           - - If your cluster doesn't use subdomains, you must set
               this to the empty array ``[]``.
             - If your cluster uses subdomains, you must set this to
               an array containing one fully qualified subdomain name
               for each of your cluster's subdomains.

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
              "com.amazonaws.vpce.us-east-1.vpce-svc-93da685022ee702a9",
              "dnsDomain": "sample.us-east-1.aws.confluent.cloud",
              "dnsSubDomain: [
                "use1-az1.sample.us-east-1.aws.confluent.cloud",
                "use1-az2.sample.us-east-1.aws.confluent.cloud",
                "use1-az4.sample.us-east-1.aws.confluent.cloud"
              ]
            }'

         .. output::
            :language: bash

            {"_id":"6aa12e7ccd660d4b2380b1c1","dnsDomain":"sample.us-east-1.aws.confluent.cloud.","vendor":"Confluent","provider":"AWS","region":"us_east_1","serviceEndpointId":"com.amazonaws.vpce.us-east-1.vpce-svc-93da685022ee702a9"}

      After you send the request, save the value of the ``_id`` field
      in the response body for further use in this procedure.

   .. step:: Create the {+service+}-side connection.

      .. include:: /includes/steps-create-sp-kafka-pl-atlas-side-connection.rst
