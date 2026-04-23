.. procedure::
   :style: normal

   .. step:: Create the vector search index.
         
      .. include:: /includes/crud-embeddings/manual/procedures/steps-avs-create-index-python.rst

   .. step:: Create embeddings for a vector search query, then run the query. 

      .. include:: /includes/quick-start/facts/avs-run-query-description.rst

      .. include:: /includes/crud-embeddings/manual/facts/fact-avs-results-vary.rst
       
      .. tabs::
         :hidden:
         
         .. tab:: Open-Source
            :tabid: open-source

            ..
               NOTE: If you edit this Python file, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/open-source-new-data.ipynb

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/crud-embeddings/manual/code-snippets/python/query_embeddings_new.py
                  :language: python

               .. output:: /includes/crud-embeddings/manual/code-snippets/json/output-new-open-source-python.json
                  :language: shell

         .. tab:: Voyage AI
            :tabid: voyage-ai

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/crud-embeddings/manual/code-snippets/python/query_embeddings_new_voyage.py
                  :language: python

               .. output:: /includes/crud-embeddings/manual/code-snippets/json/output-new-voyage.json
                  :language: shell

         .. tab:: OpenAI
            :tabid: openai

            ..
               NOTE: If you edit this Python code, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/openai-new-data.ipynb

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/crud-embeddings/manual/code-snippets/python/query_embeddings_new.py
                  :language: python

               .. output:: /includes/crud-embeddings/manual/code-snippets/json/output-new-openai.json
                  :language: shell

