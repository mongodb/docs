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

   .. step:: Create embeddings for a vector search query, then run the query. 

      .. include:: /includes/admonitions/avs-run-query-description-python.rst 

      .. note:: 

         The query might take some time to complete.

      .. tabs::
         :hidden:
         
         .. tab:: Open-Source
            :tabid: open-source

            ..
               NOTE: If you edit this Python file, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/open-source-new-data.ipynb

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs-examples/create-embeddings/vector-search-query-embeddings-new-open-source.py
                  :language: python

               .. output:: /includes/avs-examples/create-embeddings/output-new-open-source-python.json
                  :language: shell

         .. tab:: OpenAI
            :tabid: openai

            ..
               NOTE: If you edit this Python code, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/openai-new-data.ipynb

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs-examples/create-embeddings/vector-search-query-embeddings-new-openai.py
                  :language: python

               .. output:: /includes/avs-examples/create-embeddings/output-new-openai.json
                  :language: shell

