.. procedure::
   :style: normal
      
   .. step:: Create a file named ``create-embeddings.go`` and paste the following code.
            
      Use the following code to generate embeddings from an existing
      collection.
      
      Specifically, this code uses the ``GetEmbeddings()`` function 
      that you defined and the MongoDB :driver:`Go Driver </go/>` 
      to generate embeddings from an array 
      of sample texts and ingest them into the ``sample_db.embeddings`` 
      collection.

      .. tabs::
         :hidden:
         
         .. tab:: Open-Source
            :tabid: open-source
                  
            .. literalinclude:: /includes/avs/tutorial/create-embeddings-new-open-source.go
               :language: go
               :copyable:
               :caption: create-embeddings.go

         .. tab:: OpenAI
            :tabid: openai

            .. literalinclude:: /includes/avs/tutorial/create-embeddings-new-open-ai.go
               :language: go
               :copyable:
               :caption: create-embeddings.go

   .. step:: Save and run the file.

      .. tabs::
         :hidden:
         
         .. tab:: Open-Source
            :tabid: open-source
                  
            .. io-code-block:: 
               :copyable: true 

               .. input::

                  go run create-embeddings.go

               .. output:: 
                  :language: sh

                  Successfully inserted 3 documents

         .. tab:: OpenAI
            :tabid: openai

            .. io-code-block:: 
               :copyable: true 

               .. input::

                  go run create-embeddings.go

               .. output:: 
                  :language: sh

                  Successfully inserted 3 documents
       
      .. include:: /includes/avs/facts/fact-view-embeddings-atlas-ui-new-data.rst
