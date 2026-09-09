:ref:`Add a connection <atlas-sp-manage-connection-add>`. {+kafka+}
PrivateLink connections support either the ``SASL_SSL`` or the ``SSL``
security protocol. Select the tab for the protocol you want to use and
provide the following key-value pairs:

.. tabs::

   .. tab:: SASL_SSL
      :tabid: sasl-ssl

      .. include:: /includes/atlas-stream-processing/kafka-pl-connection-fields-api-sasl-ssl.rst

   .. tab:: SSL
      :tabid: ssl

      .. include:: /includes/atlas-stream-processing/kafka-pl-connection-fields-api-ssl.rst

The following example command creates a {+kafka+} connection in
{+service+} using ``SASL_SSL`` with the ``SCRAM-512`` mechanism:

.. include:: /includes/fact-service-accounts-first.rst

.. code-block:: sh

   curl --location 'https://cloud.mongodb.com/api/atlas/v2/groups/8358217d3abb5c76c3434648/streams/spinstance/connections' \
   --header "Authorization: Bearer {ACCESS-TOKEN}" \
   --header 'Content-Type: application/json' \
   --header 'Accept: application/vnd.atlas.2023-02-01+json' \
   --data '{ 
     "name": "confluent_demo", 
     "bootstrapServers": "slr-ntgrbn.sample.us-east-1.aws.confluent.cloud:9092", 
     "security": { 
       "protocol": "SASL_SSL" 
       }, 
     "authentication": { 
       "mechanism": "SCRAM-512", 
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
