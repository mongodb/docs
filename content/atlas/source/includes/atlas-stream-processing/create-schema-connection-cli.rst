Add an Schema Registry Connection through {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a `Schema Registry
<https://docs.confluent.io/platform/current/schema-registry/index.html>`__ connection
to your {+spw+} through the {+atlas-ui+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: Create a Schema Registry.

      Follow the procedure outlined in the `Confluent Cloud
      documentation
      <https://docs.confluent.io/platform/current/schema-registry/installation/index.html>`__.

   .. step:: Create a Confluent Cloud API Key.

      Follow the procedure outlined in the `Confluent Cloud
      documentation
      <https://docs.confluent.io/cloud/current/security/authenticate/workload-identities/service-accounts/api-keys/manage-api-keys.html#add-an-api-key>`__
      to create a Confluent Cloud API Key for your Schema Registry.
      
   .. step:: Create the Schema Registry connection.

      .. include:: /includes/extracts/atlas-streams-connections-create.rst

      In your configuration file, set the following key-value pairs:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Key
           - Value

         * - ``type``
           - ``"SchemaRegistry"``

         * - ``provider``
           - ``"CONFLUENT"``

         * - ``schemaRegistryUrls``
           - The URLs associated with your schema registry.	    
	     
         * - ``schemaRegistryAuthentication.type``
	   - ``"USER_INFO"`` or ``"SASL_INHERIT"``. If you use
	     ``"USER_INFO"``, you must also provide values for
	     ``schemaRegistryAuthentication.username`` and
	     ``schemaRegistryAuthentication.password``.
	     
         * - ``schemaRegistryAuthentication.username``
	   - The username associated with your Confluent Cloud API
	     Key.

         * - ``schemaRegistryAuthentication.password``
	   - The password associated with your Confluent Cloud API Key.	   
