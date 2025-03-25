
.. procedure::
   :style: normal

   .. step:: Query the database for relevant documents.

      a. Add a new ``PerformVectorQuery()`` method in the file named
         ``MongoDBDataService.cs``:

         .. literalinclude:: /includes/avs/local-rag/MongoDBDataService-perform-vector-query.cs
            :language: csharp
            :emphasize-lines: 28-64
            :caption: MongoDBDataService.cs

         This code performs a vector query on your local |service|
         {+deployment+} or your |service| {+cluster+}.

      #. Create another file called ``PerformTestQuery.cs`` and paste the
         following code into it:

         .. literalinclude:: /includes/avs/local-rag/PerformTestQuery.cs
            :language: csharp
            :caption: PerformTestQuery.cs
            :linenos:

         This code contains the logic to:

         - Define an embedding for the query.
         - Retrieve matching documents from the ``MongoDBDataService``.
         - Construct a string containing the "Summary" and "Listing URL" from
           each document to pass on to the LLM for summarizing.

      #. Run a test query to confirm you're getting the expected results. 
      
         Replace the code in ``Program.cs`` with the following code:

         .. literalinclude:: /includes/avs/local-rag/Program-test-query.cs
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

            .. output:: /includes/avs/local-rag/test-query-output-csharp.sh

   .. step:: Download the local |llm| model.

      Run the following command to pull the generative model:

      .. code-block:: console

         ollama pull mistral

   .. step:: Answer questions on your data.

      a. Add some new static members to your ``OllamaAIService.cs`` class, for
         use in a new ``SummarizeAnswer`` async Task:

         .. literalinclude:: /includes/avs/local-rag/OllamaAIService-summarize-answer.cs
            :language: csharp
            :emphasize-lines: 10-11, 18-30
            :caption: OllamaAIService.cs
      
         This prompts the |llm| and returns the response. The generated response
         might vary.

      #. Define a new ``PerformQuestionAnswer`` class to:
      
         - Define an embedding for the query.
         - Retrieve matching documents from the ``MongoDBDataService``.
         - Use the LLM to summarize the response.

         .. literalinclude:: /includes/avs/local-rag/PerformQuestionAnswer.cs
            :language: csharp
            :caption: AIService.cs

      #. Replace the contents of ``Program.cs`` with a new block to perform the
         task:

         .. literalinclude:: /includes/avs/local-rag/Program-summarize-results.cs
            :language: csharp
            :caption: Program.cs

      #. Save the file, and then compile and run your project to complete your
         |rag| implementation:

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: console

               dotnet run MyCompany.RAG.Local.csproj

            .. output:: /includes/avs/local-rag/llm-output-csharp.sh
