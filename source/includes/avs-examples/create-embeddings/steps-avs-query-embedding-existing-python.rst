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

      .. tabs::
         :hidden:
         
         .. tab:: Open-Source
            :tabid: open-source

            .. NOTE: If you edit this Python file, also update the Jupyter Notebook at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/open-source-existing-data.ipynb
            
            .. include:: /includes/avs-run-query-description.rst

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs-examples/create-embeddings/query_embeddings_existing.py
                  :language: python
               
               .. output:: /includes/avs-examples/tutorial/output-existing-open-source-python.json
                  :language: shell

         .. tab:: OpenAI
            :tabid: openai

            .. NOTE: If you edit this Python file, also update the Jupyter Notebook at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/openai-existing-data.ipynb
            
            .. include:: /includes/avs-run-query-description.rst

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs-examples/create-embeddings/query_embeddings_existing.py
                  :language: python

               .. output:: /includes/avs-examples/tutorial/output-existing-openai.json
                  :language: shell
