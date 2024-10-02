.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.
         
      .. tabs::
         :hidden:
         
         .. tab:: Open-Source
            :tabid: open-source

            .. include:: /includes/avs-examples/create-embeddings/steps-avs-create-index-open-source.rst

         .. tab:: OpenAI
            :tabid: openai

            .. include:: /includes/avs-examples/create-embeddings/steps-avs-create-index-openai.rst

   .. step:: Create embeddings for vector search queries and run a query. 

      .. include:: /includes/avs-run-query-description.rst

      .. tabs::
         :hidden:
         
         .. tab:: Open-Source
            :tabid: open-source

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs-examples/tutorial/vector-search-query-embeddings-new.py
                  :language: python

               .. output:: /includes/avs-examples/tutorial/output-new-open-source-python.json
                  :language: json

         .. tab:: OpenAI
            :tabid: openai

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs-examples/tutorial/vector-search-query-embeddings-new.py
                  :language: python

               .. output:: /includes/avs-examples/tutorial/output-new-openai.json
                  :language: json
