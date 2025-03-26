
.. procedure::
   :style: normal

   .. step:: Query the database for relevant documents.

      a. Navigate to the ``common`` directory.

         .. code-block:: console

            cd common
   
      #. Create a file called ``retrieve-documents.go`` and paste the following
         code into it:
      
         .. literalinclude:: /includes/avs/local-rag/retrieve-documents.go
            :language: go
            :caption: retrieve-documents.go

         This code uses the `mongovector.SimilaritySearch()
         <https://pkg.go.dev/github.com/tmc/langchaingo/vectorstores/mongovector#Store.SimilaritySearch>`__
         method to perform a vector query on your local |service| {+deployment+}
         or your |service| {+cluster+}.

      #. Run a test query to confirm you're getting the expected results. Move
         back to the project root directory.

         .. code-block:: console

            cd ../
      
      #. Create a new file called ``test-query.go``, and paste the following
         code into it:

         .. literalinclude:: /includes/avs/local-rag/test-query.go
            :language: go
            :caption: test-query.go

      #. Run the following code to execute the query:

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: console

               go run test-query.go

            .. output:: /includes/avs/local-rag/test-query-output-go.sh

   .. step:: Download the local |llm| model.

      Run the following command to pull the generative model:

      .. code-block:: console

         ollama pull mistral

   .. step:: Answer questions on your data.

      Create a file called ``local-llm.go`` and paste the following code:

      .. literalinclude:: /includes/avs/local-rag/local-llm.go
         :language: go
         :caption: local-llm.go
    
      This code does the following:

      - Creates an embedding for your query string.

      - Queries for relevant documents.

      - Prompts the |llm| and returns the response. The generated response
        might vary.

      Run the following code to complete your |rag| implementation:
   
      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: console

            go run local-llm.go

         .. output:: /includes/avs/local-rag/llm-output-go.sh
