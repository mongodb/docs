.. procedure::
   :style: normal

   .. step:: Create the vector search index.
         
      .. include:: /includes/avs/create-embeddings/manual/steps-avs-create-index-python.rst

   .. step:: Create embeddings for a vector search query, then run the query. 

      .. include:: /includes/avs/tutorial/avs-run-query-description.rst

      .. include:: /includes/avs/facts/fact-avs-results-vary.rst
       
      .. tabs::
         :hidden:
         
         .. tab:: Open-Source
            :tabid: open-source

            ..
               NOTE: If you edit this Python file, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/open-source-new-data.ipynb

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs/create-embeddings/manual/query_embeddings_new.py
                  :language: python

               .. output:: /includes/avs/create-embeddings/manual/output-new-open-source-python.json
                  :language: shell

         .. tab:: Voyage AI
            :tabid: voyage-ai

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs/create-embeddings/manual/query_embeddings_new_voyage.py
                  :language: python

               .. output:: /includes/avs/create-embeddings/manual/output-new-voyage.json
                  :language: shell

         .. tab:: OpenAI
            :tabid: openai

            ..
               NOTE: If you edit this Python code, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/openai-new-data.ipynb

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs/create-embeddings/manual/query_embeddings_new.py
                  :language: python

               .. output:: /includes/avs/create-embeddings/manual/output-new-openai.json
                  :language: shell

