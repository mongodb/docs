Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

.. tabs::  

   .. tab:: Index as token Type Only Example
      :tabid: token-type-only

      The following index definition indexes string values in the  
      ``title`` field as |fts| |fts-field-type| type and converts the
      field value to ``lowercase``, which allows you to do the
      following: 
      
      - Perform case-insensitive sort, as specified by the
        ``normalizer``, on the ``title`` field.
      - Run exact match queries on the ``title`` field using the
        following operators:  

        - :ref:`equals <equals-ref>`
        - :ref:`in <in-ref>`
        - :ref:`range <range-ref>`

      .. io-code-block:: 
         :copyable: true

         .. input:: /includes/fts/field-types/token/create-index-api-token.sh
            :language: shell
            :linenos:
         
         .. output:: 
            :visible: false

            {"collectionName":"comments","database":"sample_mflix","indexID":"687a8d52a3b4982b8c228383","latestDefinition":{"mappings":{"dynamic":true,"fields":{"title":{"normalizer":"lowercase","type":"token"}}}},"latestDefinitionVersion":{"version":0},"name":"default_15","queryable":false,"status":"PENDING","type":"search"}

   .. tab:: Index as Multiple Types Example
      :tabid: multiple-types

      The following index definition indexes the ``genres`` field as  
      ``string`` and ``token`` types to return the following: 
      
      - Search results for queries using |fts| operators like
        :ref:`text <text-ref>`, :ref:`phrase <phrase-ref>`, and other operators that
        perform text search on the ``genres`` field. 
      - Sorted results for queries using the :pipeline:`$search`
        :ref:`sort <sort-ref>` option on the ``genres`` field.
      - Exact matches for queries using |fts| operators like
        :ref:`equals <equals-ref>`, :ref:`in <in-ref>`, and :ref:`range <range-ref>`.  

      .. io-code-block:: 
         :copyable: true

         .. input:: /includes/fts/field-types/token/create-index-api-token-multi.sh
            :language: shell
            :linenos:
         
         .. output:: 
            :visible: false

            {"collectionName":"movies","database":"sample_mflix","indexID":"687a8ce25532743c25aa2d34","latestDefinition":{"mappings":{"dynamic":true,"fields":{"genres":[{"type":"string"},{"type":"token"}]}}},"latestDefinitionVersion":{"version":0},"name":"default_20","queryable":false,"status":"PENDING","type":"search"}