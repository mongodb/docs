:gold:`Important:` This example shows you how to add a connection
secured using ``SASL_SSL``. You can also secure a connection using
mutual ``SSL``.

For more information, on the supported fields for this API for ``SSL``
authentication, see the :oas-bump-atlas-op:`createStreamConnection
<creategroupstreamconnection>` {+atlas-admin-api+} endpoint.

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
     - ``"SCRAM-SHA"``

   * - ``authentication.password``
     - The password for SCRAM-SHA authentication 

   * - ``authentication.username``
     - The username for SCRAM-SHA authentication

   * - ``type``
     - ``"Kafka"``

   * - ``networking.access.type``
     - ``"PRIVATE_LINK"``

   * - ``networking.access.connectionId``
     - ``_id`` value from your Private Link request response

Set all other values as necessary.

The following example command creates a {+kafka+} connection in {+service+}:

.. code-block:: sh

   curl --location 'https://cloud.mongodb.com/api/atlas/v2/groups/8358217d3abb5c76c3434648/streams/spinstance/connections' \ 
   --digest \ 
   --user "slrntglrbn:933fb118-ac62-4991-db05-ee67a3481fde" \ 
   --header 'Content-Type: application/json' \ 
   --header 'Accept: application/vnd.atlas.2023-02-01+json' \ 
   --data '{ 
     "name": "msk_demo", 
     "bootstrapServers": "slr-ntgrbn.sample.kafka.us-east-1.amazonaws.com:9092", 
     "security": { 
       "protocol": "SASL_SSL" 
       }, 
     "authentication": {
       "mechanism": "SCRAM-SHA",
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
