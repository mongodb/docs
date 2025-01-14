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

            ..
               NOTE: If you edit this Python file, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/open-source-new-data.ipynb

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs-examples/tutorial/vector-search-query-embeddings-new.py
                  :language: python

               .. output:: /includes/avs-examples/tutorial/output-new-open-source-python.json
                  :language: json

         .. tab:: OpenAI
            :tabid: openai

            ..
               NOTE: If you edit this Python code, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/openai-new-data.ipynb

            .. io-code-block:: 
               :copyable: true 
               
               .. input:: /includes/avs-examples/tutorial/vector-search-query-embeddings-new.py
                  :language: python

               .. output:: /includes/avs-examples/tutorial/output-new-openai.json
                  :language: json
