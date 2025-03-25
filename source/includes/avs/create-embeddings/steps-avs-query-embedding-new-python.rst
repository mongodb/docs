.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.
         
      .. tabs::
         :hidden:
         
         .. tab:: Open-Source
            :tabid: open-source

            .. include:: /includes/avs/create-embeddings/steps-avs-create-index-open-source.rst

         .. tab:: OpenAI
            :tabid: openai

            .. include:: /includes/avs/create-embeddings/steps-avs-create-index-openai.rst

   .. step:: Create embeddings for a vector search query, then run the query. 

      .. include:: /includes/avs/tutorial/avs-run-query-description.rst

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
               
               .. input:: /includes/avs/create-embeddings/query_embeddings_new.py
                  :language: python

               .. output:: /includes/avs/create-embeddings/output-new-open-source-python.json
                  :language: shell

         .. tab:: OpenAI
            :tabid: openai

            ..
               NOTE: If you edit this Python code, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/openai-new-data.ipynb

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs/create-embeddings/query_embeddings_new.py
                  :language: python

               .. output:: /includes/avs/create-embeddings/output-new-openai.json
                  :language: shell

