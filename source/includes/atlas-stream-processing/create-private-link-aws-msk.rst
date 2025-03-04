.. procedure::
   :style: normal

   .. step:: Configure your {+aws-msk+} cluster.

      You must configure your {+aws-msk+} cluster to accept incoming
      connections from your {+service+} project.

      .. important::

	 {+aws-msk+} accepts incoming connections from {+aws+} only. To use an
	 {+aws-msk+} Private Link connection, you must host your {+spi+}s on
	 {+aws+}.

      a. Use the :oas-atlas-tag:`Get Account Details
         </Streams/operation/getAccountDetails>` endpoint to retrieve
         the {+aws+} Principal identity. You will need this value for
         your {+aws-msk+} cluster policy.

      #. Sign in to the {+aws+} Management Console and navigate to the
	 {+aws-msk+} console. Ensure that ``multi-VPC connectivity`` is
	 enabled on the cluster to which you want to connect.

      #. Navigate to the |iam| console and select :guilabel:`Policies` from
	 the navigation pane. Create or modify the target cluster
	 policy. Use the Principal identity you retrieved earlier as
	 the value of ``Statement.Principal.Aws.[]`` and ensure the
	 policy takes the following form:

	 .. code-block:: json

	    {
		"Version": "2012-10-17",
		"Statement": [
		    {
			"Effect": "Allow",
			"Principal": {
			    "AWS": [
				"123456789012"
			    ]
			},
			"Action": [
			    "kafka:CreateVpcConnection",
			    "kafka:GetBootstrapBrokers",
			    "kafka:DescribeCluster",
			    "kafka:DescribeClusterV2"
			],
			"Resource": "arn:aws:kafka:us-east-1:123456789012:cluster/testing/de8982fa-8222-4e87-8b20-9bf3cdfa1521-2"
		    }
		]
	    }

   .. step:: Request a connection to your cloud provider.

      The {+atlas-admin-api+} provides an endpoint for requesting a
      Private Link connection configured for {+atlas-sp+}.

      :oas-atlas-tag:`Create One Private Link
      </Streams/operation/createPrivateLinkConnection>`

      For an {+aws-msk+} Private Link connection, you must set
      the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``vendor``
	   - Must be set to ``"msk"``

         * - ``provider``
	   - Must be set to ``"aws"``

         * - ``arn``
	   - String representing the Amazon Resource Number of your {+aws-msk+} cluster.

      You can find the |arn| in your {+aws-msk+} cluster's networking details.

      The following example command requests a connection to your
      {+aws-msk+} cluster and illustrates a typical response:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: sh

            curl --location 'https://cloud.mongodb.com/api/atlas/v2/groups/8358217d3abb5c76c3434648/streams/privateLinkConnections' \
            --digest \
            --user "slrntglrbn:933fb118-ac62-4991-db05-ee67a3481fde" \
            --header 'Content-Type: application/json' \
            --header 'Accept: application/vnd.atlas.2023-02-01+json' \
            --data '{ "vendor": "msk",
	      "provider": "AWS",
              "arn": "1235711"}'

         .. output::
            :language: bash

            {"_id":"6aa12e7ccd660d4b2380b1c1","dnsDomain":"scram.sample.us-east-1.amazonaws.com","vendor":"msk","provider":"AWS","region":"us_east_1","serviceEndpointId":"com.amazonaws.vpce.us-east-1.vpce-svc-93da685022ee702a9"}   

      After you send the request, note the value of the ``_id`` field
      in the response body. You will need this in a later step.

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
           -  The SCRAM password associated with your cluster. You must define a
	      paired SCRAM user and password and associate it with your {+aws-msk+} cluster
	      using :aws:`AWS Secrets Manager </msk/latest/developerguide/msk-password-tutorial.html>`.

         * - ``authentication.username``
           -  The SCRAM user associated with your cluster. You must define a
	      paired SCRAM user and password and associate it with your {+aws-msk+} cluster
	      using :aws:`AWS Secrets Manager </msk/latest/developerguide/msk-password-tutorial.html>`.
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
           "name": "msk_demo", 
           "bootstrapServers": "slr-ntgrbn.sample.us-east-1.amazonaws.com:9092", 
           "security": { 
             "protocol": "SASL_SSL" 
           }, 
           "authentication": { 
             "mechanism": "PLAIN", 
             "password": "scramSecretDemo", 
             "username": "scramUserDemo" 
           }, 
           "type": "Kafka", 
           "networking": { 
             "access": { 
             "type": "PRIVATE_LINK", 
             "connectionId": "38972b0cbe9c2aa40a30a246" 
             } 
           }  
         }'
