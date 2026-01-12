Add a Schema Registry Connection through {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
      
   .. include:: /includes/nav/steps-stream-processing.rst  

   .. step:: Go to the :guilabel:`Connection Registry`.  

      a. Locate the overview panel of the {+spw+} you want to  
         modify and click :guilabel:`Configure`.  

      #. Select the :guilabel:`Connection Registry` tab.  

   .. step:: Click :guilabel:`+ Add connection`.  

   .. step:: Add a new connection.  

      a. Select an :guilabel:`Schema Registry` connection.  

      #. Provide a :guilabel:`Connection Name`. Each connection
         name must be unique within a {+spw+}.  This is the name
         used to reference the connection in {+atlas-sp+}
         :ref:`aggregations <atlas-sp-aggregation>`.

      #. From the :guilabel:`Authentication Type` dropdown, select
         either ``USER_INFO`` or ``SASL_INHERIT``. If you select
	 ``SASL_INHERIT``, the connection inherits the same
	 credentials as the Kafka connection with which you pair the
	 Schema Registry, and you won't provide values for
	 :guilabel:`Username` or :guilabel:`Password`.

      #. In the :guilabel:`Username` field, provide the username
         associated with your Confluent Cloud API Key.

      #. In the :guilabel:`Password` field, provide the password
         associated with your Confluent Cloud API Key.

      #. In the :guilabel:`Schema Registry URL(s)` field, provide any
	 URLs associated with your Schema Registry.
	 
      #. Click :guilabel:`Add connection`.
