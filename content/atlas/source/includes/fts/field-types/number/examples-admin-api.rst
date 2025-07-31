Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst 
   
.. tabs:: 
  
   .. tab:: Representation Example
      :tabid: representation

      The following index definition for the 
      ``sample_analytics.accounts`` collection in the :ref:`sample 
      dataset <available-sample-datasets>` indexes the 
      ``account_id`` field with 64-bit integer values. The 
      following example also: 
    
      - Indexes all other integer values in the ``account_id`` field.
      - Rounds any decimal values and indexes small double type 
        values in the ``account_id`` field.

      .. io-code-block:: 
         :copyable: true

         .. input:: /includes/fts/field-types/number/create-index-example-representation-api.sh
            :language: shell
            :linenos:
         
         .. output:: 
            :visible: false 

            {"collectionName":"accounts","database":"sample_analytics","indexID":"<indexID>","latestDefinition":{"mappings":{"dynamic":false,"fields":{"account_id":{"type":"number","representation":"int64"}}}},"latestDefinitionVersion":{"version":0},"name":"default","queryable":false,"status":"PENDING","type":"search"}       

   .. tab:: Index Integers Example
      :tabid: indexints 

      The following index definition for the
      ``sample_analytics.accounts`` collection in the  
      :ref:`sample dataset <available-sample-datasets>` indexes integer 
      values and omits doubles values in the the ``account_id``.

      .. io-code-block:: 
         :copyable: true

         .. input:: /includes/fts/field-types/number/create-index-example-integers-api.sh
            :language: shell
            :linenos:
         
         .. output:: 
            :visible: false 

            {"collectionName":"accounts","database":"sample_analytics","indexID":"<indexID>","latestDefinition":{"mappings":{"dynamic":false,"fields":{"account_id":{"type":"number","representation":"int64","indexDoubles":false}}}},"latestDefinitionVersion":{"version":0},"name":"default","queryable":false,"status":"PENDING","type":"search"}      

   .. tab:: Index Doubles Example
      :tabid: indexdoubles

      The following index definition for the
      ``sample_airbnb.listingsAndReviews`` collection in the  
      :ref:`sample dataset <available-sample-datasets>` indexes
      ``double`` type values and omits the 32-bit and 64-bit integer
      values in the ``bathrooms`` field.

      .. io-code-block:: 
         :copyable: true

         .. input:: /includes/fts/field-types/number/create-index-example-doubles-api.sh
            :language: shell
            :linenos:
         
         .. output:: 
            :visible: false 

            {"collectionName":"listingsAndReviews","database":"sample_airbnb","indexID":"<indexID>","latestDefinition":{"mappings":{"dynamic":false,"fields":{"bathrooms":{"type":"number","indexIntegers":false}}}},"latestDefinitionVersion":{"version":0},"name":"default","queryable":false,"status":"PENDING","type":"search"}      