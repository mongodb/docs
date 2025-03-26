.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      To enable vector search queries on your data,
      you must create an {+avs+} index on your
      collection.

      Complete the following steps to create an index on the
      ``sample_db.embeddings`` collection that specifies the 
      ``embedding`` field as the :ref:`vector
      <avs-types-vector-search>` type 
      and the similarity measure as ``dotProduct``.

      a. Create a file named named ``create-index.js`` and paste the following code.

         .. literalinclude:: /includes/avs/tutorial/create-index-new-data.js
            :language: js
            :copyable:
            :caption: create-index.js

      #. Replace the ``<dimensions>`` placeholder value with ``768`` if you
         used the open-source model and ``1536`` if you used the model from
         OpenAI.
    
      #. Save the file, then run the following command:

         .. code-block::
            
            node --env-file=.env create-index.js

      .. note::
         
         .. include:: /includes/search-shared/fact-index-build-initial-sync.rst

      To learn more, see :ref:`avs-create-index`.

   .. step:: Create embeddings for vector search queries and run a query. 
      
      a. Create a file named named ``vector-query.js`` and paste the following code.

         .. include:: /includes/avs/tutorial/avs-run-query-description.rst

         .. literalinclude:: /includes/avs/tutorial/vector-query.js
            :language: js
            :copyable:
            :caption: vector-query.js

      #. Save the file, then run the following command:
         
         .. tabs:: 
            :hidden:

            .. tab:: Open-Source
               :tabid: open-source
       
               .. io-code-block:: 
                  :copyable: true 
                  
                  .. input:: 

                     node --env-file=.env vector-query.js

                  .. output:: /includes/avs/tutorial/output-new-open-source-node.json
                     :language: shell

            .. tab:: OpenAI
               :tabid: openai

               .. io-code-block:: 
                  :copyable: true 
                  
                  .. input:: 
                     :language: shell

                     node --env-file=.env vector-query.js

                  .. output:: /includes/avs/create-embeddings/output-new-openai.json 
                     :language: shell