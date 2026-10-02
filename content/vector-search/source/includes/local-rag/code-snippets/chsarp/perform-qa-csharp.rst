
.. procedure::
   :style: normal

   .. step:: Query the database for relevant documents.

      a. Add a new ``PerformVectorQuery()`` method in the file named
         ``MongoDBDataService.cs``:

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/LocalRag/MongoDbDataService.snippet.mongodb-data-service.cs
            :language: csharp
            :caption: MongoDBDataService.cs
            :category: usage example

         This code performs a vector query on your cluster.

      #. Create another file called ``PerformTestQuery.cs`` and paste the
         following code into it:

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/LocalRag/PerformTestQuery.snippet.perform-test-query.cs
            :language: csharp
            :caption: PerformTestQuery.cs
            :category: usage example

         This code contains the logic to:

         - Define an embedding for the query.
         - Retrieve matching documents from the ``MongoDBDataService``.
         - Construct a string containing the "Summary" and "Listing URL" from
           each document to pass on to the LLM for summarizing.

      #. Run a test query to confirm you're getting the expected results. 
      
         Replace the code in ``Program.cs`` with the following code:

         .. literalinclude:: /includes/local-rag/code-snippets/chsarp/Program-test-query.cs
            :language: csharp
            :caption: Program.cs
            :linenos:

      #. Save the file, and then compile and run your project to test that you
         get the expected query results:

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: shell

               dotnet run MyCompany.RAG.Local.csproj

            .. output:: /includes/local-rag/code-snippets/output/test-query-output-csharp.sh

   .. step:: Download the local LLM model.

      Run the following command to pull the generative model:

      .. code-block:: console

         ollama pull mistral

   .. step:: Answer questions on your data.

      a. Add some new static members to your ``OllamaAIService.cs`` class, for
         use in a new ``SummarizeAnswer`` async Task:

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/LocalRag/OllamaAiService.snippet.ollama-ai-service.cs
            :language: csharp
            :caption: OllamaAIService.cs
            :category: usage example
      
         This prompts the LLM and returns the response. The generated response
         might vary.

      #. Define a new ``PerformQuestionAnswer`` class to:
      
         - Define an embedding for the query.
         - Retrieve matching documents from the ``MongoDBDataService``.
         - Use the LLM to summarize the response.

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/LocalRag/PerformQuestionAnswer.snippet.perform-question-answer.cs
            :language: csharp
            :caption: PerformQuestionAnswer.cs
            :category: usage example

      #. Replace the contents of ``Program.cs`` with a new block to perform the
         task:

         .. literalinclude:: /includes/local-rag/code-snippets/chsarp/Program-summarize-results.cs
            :language: csharp
            :caption: Program.cs

      #. Save the file, and then compile and run your project to complete your
         |rag| implementation:

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: console

               dotnet run MyCompany.RAG.Local.csproj

            .. output:: /includes/local-rag/code-snippets/output/llm-output-csharp.sh
