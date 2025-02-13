.. important::

   You can't have more than one Private Link connection to a given
   Confluent cluster per |service| project. Before you begin this
   procedure, call the :oas-atlas-tag:`Return All Private Link
   Connections </Streams/operation/listPrivateLinkConnections>`
   endpoint. If you have an existing Private Link connection to your
   Confluent cluster within {+service+} but not within your Confluent
   account, only perform those steps that configure your
   Confluent-side networking.

.. procedure::
   :style: normal

   .. step:: Configure your Confluent cluster.

      You must configure your Confluent cluster to accept incoming connections from your {+service+} project.

      .. important::
     
         Confluent accepts incoming connections only from {+aws+}. To
         use a Confluent Private Link connection, you must host your
         {+spi+}s on {+aws+}.

      a. Call the :oas-atlas-tag:`Return Account ID and VPC ID for group and region </Streams/operation/getAccountDetails>`
         {+atlas-admin-api+} endpoint. Note the value of
         ``awsAccountId``, you will need this in a later step.

      #. In your Confluent account, navigate to the cluster you
         want to connect to. In your cluster networking
         interface, navigate to your cluster networking details.

      #. `Add Private Link Access <https://docs.confluent.io/cloud/current/networking/private-links/aws-privatelink.html#aws-privatelink-register>`__

      For a Confluent dedicated cluster, provide a name of your
      choice. For the {+aws+} account number, provide the value of
      the ``awsAccountId`` field you noted earlier.

      .. note::

        This step is not required for Confluent serverless
        clusters.
     
   .. step:: Request a connection to your cloud provider.

      The {+atlas-admin-api+} provides an endpoint for requesting a
      Private Link connection configured for {+atlas-sp+}.

      :oas-atlas-tag:`Create One Private Link
      </Streams/operation/createPrivateLinkConnection>`

      For an {+aws+} Confluent Private Link connection, you must set
      the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``serviceEndpointId`` 
           - Your Confluent cluster's :guilabel:`VPC Endpoint service name`.

         * - ``dnsDomain``
           - Fully qualified domain name of the bootstrap server on your
             Confluent cluster.

         * - ``dnsSubDomain``
           - If your cluster doesn't use subdomains, you must set this to
             the empty array ``[]``. If your cluster uses subdomains, you
             must set this to an array containing one fully qualified
             subdomain name for each of your cluster's subdomains.

      You can find these values in your Confluent cluster's networking details.

      The following example command requests a connection to your
      Confluent cluster and illustrates a typical response:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: sh

            curl --location 'https://cloud.mongodb.com/api/atlas/v2/groups/8358217d3abb5c76c3434648/streams/privateLinkConnections' \
            --digest \
            --user "slrntglrbn:933fb118-ac62-4991-db05-ee67a3481fde" \
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
            
      After you send the request, note the value of the ``_id`` field in the response body. You will need this in a later step.

   .. step:: Provide the interface endpoint ID to Confluent.

      .. note::

         This step applies only to Confluent serverless clusters.
         
      Call the :oas-atlas-tag:`Return All Private Link Connections
      </Streams/operation/listPrivateLinkConnections>` endpoint. Note
      the value of ``interfaceEndpointId``.

      In your Confluent account, navigate to the cluster you want to
      connect to. In your cluster networking interface, navigate to
      your cluster networking details. Navigate to the access points
      interface, and add a new access point. When Confluent prompts
      you for an interface endpoint, provide the value of
      ``interfaceEndpointId`` that you noted previously.
      
   .. step:: Create the {+service+}-side connection.

      :ref:`Add a connection <atlas-sp-manage-connection-add>`
      with the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``bootstrapServers``
           - IP address of your cloud provider's Kafka bootstrap server.

         * - ``security.protocol``
           - ``SASL_SSL``

         * - ``authentication.mechanism``
           - ``"PLAIN"``

         * - ``authentication.password``
           - The password associated with your `Confluent API key
             <https://docs.confluent.io/cloud/current/security/authenticate/workload-identities/service-accounts/api-keys/overview.html>`__

         * - ``authentication.username``
           -  The username associated with your `Confluent API key
              <https://docs.confluent.io/cloud/current/security/authenticate/workload-identities/service-accounts/api-keys/overview.html>`__

         * - ``type``
           - ``"Kafka"``

         * - ``networking.access.type``
           - ``"PRIVATE_LINK"``

         * - ``networking.access.connectionId``
           - ``_id`` value from your Private Link request response

      Set all other values as necessary.

      The following example command creates a {+kafka+} connection in
      {+service+}:

      .. code-block:: sh

         curl --location 'https://cloud.mongodb.com/api/atlas/v2/groups/8358217d3abb5c76c3434648/streams/spinstance/connections' \ 
         --digest \ 
         --user "slrntglrbn:933fb118-ac62-4991-db05-ee67a3481fde" \ 
         --header 'Content-Type: application/json' \ 
         --header 'Accept: application/vnd.atlas.2023-02-01+json' \ 
         --data '{ 
           "name": "confluent_demo", 
           "bootstrapServers": "slr-ntgrbn.sample.us-east-1.aws.confluent.cloud:9092", 
           "security": { 
             "protocol": "SASL_SSL" 
           }, 
           "authentication": { 
             "mechanism": "PLAIN", 
             "password": "apiSecretDemo", 
             "username": "apiUserDemo" 
           }, 
           "type": "Kafka", 
           "networking": { 
             "access": { 
             "type": "PRIVATE_LINK", 
             "connectionId": "38972b0cbe9c2aa40a30a246" 
             } 
           }  
         }'

