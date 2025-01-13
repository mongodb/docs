.. procedure::
   :style: normal
 
   .. step:: Request a connection to your cloud provider.

      The {+atlas-admin-api+} provides an endpoint for requesting a
      Private Link connection configured for {+atlas-sp+}.

      :oas-atlas-tag:`Create One Private Link
      </Streams/operation/createPrivateLinkConnection>`

      For an |azure| Private Link connection, you must set the
      following key-value pairs:

      .. list-table::
         :widths: 30 70
         :header-rows: 1

         * - Key
           - Value

         * - ``serviceEndpointId`` 
           - Your EventHub namespace `endpoint <https://learn.microsoft.com/en-us/rest/api/eventhub/namespaces/get?view=rest-eventhub-2024-01-01&tabs=HTTP>`__

         * - ``dnsDomain``
           - Fully qualified domain name, with port number, of the
             bootstrap server in your |azure| Event Hub namespace. This
             domain name conforms to the format described :azure:`here
	     </event-hubs/event-hubs-quickstart-kafka-enabled-event-hubs?tabs=passwordless>`.

      The following example command requests a connection to your |azure| Event Hub and illustrates a typical response:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            curl --location 'https://cloud.mongodb.com/api/atlas/v2/groups/8358217d3abb5c76c3434648/streams/privateLinkConnections' \
            --digest \
            --user "slrntglrbn:933fb118-ac62-4991-db05-ee67a3481fde" \
            --header 'Content-Type: application/json' \
            --header 'Accept: application/vnd.atlas.2023-02-01+json' \
            --data '{ "provider": "AZURE", "region": "US_EAST_2", "serviceEndpointId": "/subscriptions/b82d6aa0-0b0a-ffa3-7c22-e167dc44f5b0/resourceGroups/asp/providers/Microsoft.EventHub/namespaces/sample", "dnsDomain": "sample.servicebus.windows.net" }'

         .. output::
            :language: sh

            {"_id":"6aa12e7ccd660d4b2380b1c1","dnsDomain":"sample.servicebus.windows.net","provider":"AZURE","region":"US_EAST_2","serviceEndpointId":"/subscriptions/b82d6aa0-0b0a-ffa3-7c22-e167dc44f5b0/resourceGroups/asp/providers/Microsoft.EventHub/namespaces/sample"}                

      After you send the request, note the value of the ``_id`` field
      in the response body. You will need this in a later step.

   .. step:: Accept the requested connection within your cloud
      provider account.

      For Private Link connections to |azure|, navigate to your Event
      Hub networking page and select the :guilabel:`Private endpoint
      connections` tab. In the table of connections, identify your
      newly requested connection and approve it.

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
           - Your Event Hub :azure:`connection string
             </event-hubs/event-hubs-get-connection-string>`

         * - ``authentication.username``
           -  ``"$ConnectionString"``

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
         --data '{ "name": "eventhubpl33333", "bootstrapServers": "sample.servicebus.windows.net:9093", "security": { "protocol": "SASL_SSL" }, "authentication": { "mechanism": "PLAIN", "password": "Endpoint=sb://sample.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=Irlo3OoRkc27T3ZoGOlbhEOqXQRXzb12+Q2hNXm0lc=", "username": "$ConnectionString" }, "type": "Kafka", "networking": { "access": { "type": "PRIVATE_LINK", "connectionId": "38972b0cbe9c2aa40a30a246" } } }'
