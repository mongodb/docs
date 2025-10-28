Try an Example for the |fts-field-type| Type
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst 

.. tabs::

   .. tab:: Basic Example 
      :tabid: basic

      The following index definition for the 
      ``sample_mflix.movies`` collection in the :ref:`sample 
      dataset <available-sample-datasets>` indexes the 
      ``title`` field with string values.

      .. io-code-block:: 
         :copyable: true

         .. input:: /includes/fts/field-types/string/create-index-basic-api.sh
            :language: shell
            :linenos:
         
         .. output:: 
            :visible: false

            {"collectionName":"movies","database":"sample_mflix","indexID":"<indexID>","latestDefinition":{"mappings":{"dynamic":true,"fields":{"title":{"type":"string"}}}},"latestDefinitionVersion":{"version":0},"name":"default","queryable":false,"status":"PENDING","type":"search"}

   .. tab:: Multi Example
      :tabid: multi

      .. include:: /includes/fts/field-types/string/multi-example-intro.rst

      .. io-code-block:: 
         :copyable: true

         .. input:: /includes/fts/field-types/string/create-index-multi-api.sh
            :language: shell
            :linenos:
         
         .. output:: 
            :visible: false

            {"collectionName":"movies","database":"sample_mflix","indexID":"<indexID>","latestDefinition":{"mappings":{"dynamic":false,"fields":{"title":{"multi":{"english":{"analyzer":"lucene.english","type":"string"},"french":{"analyzer":"lucene.french","type":"string"},"stableSimilarity":{"similarity":{"type":"stableTfl"},"type":"string"}},"type":"string"}}}},"latestDefinitionVersion":{"version":0},"name":"default","queryable":false,"status":"PENDING","type":"search"} 