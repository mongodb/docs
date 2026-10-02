.. procedure:: 
   :style: normal 

   .. step:: Download the local embedding model.

      This example uses the `nomic-embed-text
      <https://ollama.com/library/nomic-embed-text>`__ model
      from Ollama.

      Run the following command to pull the embedding model:

      .. code-block:: console

         ollama pull nomic-embed-text

   .. step:: Generate embeddings.

      To encapsulate the logic for each piece of the implementation, create a
      few classes to coordinate and manage the services.

      a. Create a file called ``OllamaAIService.cs``, and paste the following code
         into it:

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/LocalRag/OllamaAiService.snippet.ollama-ai-service.cs
            :language: csharp
            :caption: OllamaAIService.cs
            :category: usage example

         This class also defines the chat model and the ``SummarizeAnswer()``
         method that you use later to answer questions on your data.

      #. Create another file called ``MongoDBDataService.cs`` and paste the
         following code into it:

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/LocalRag/MongoDbDataService.snippet.mongodb-data-service.cs
            :language: csharp
            :caption: MongoDBDataService.cs
            :category: usage example

         This class also defines the ``CreateVectorIndex()`` and
         ``PerformVectorQuery()`` methods that you use in later steps.

         Generating embeddings takes time and computational resources. 
         In this example, you generate embeddings for only 250 documents
         from the collection, which should take less than a few minutes. If you
         want to change the number of documents you're generating embeddings
         for:
         
         - Change the number of documents: Adjust the ``.Limit(250)``
           number in the ``Find()`` call in ``GetDocuments()``.
         - Generate embeddings for all documents: Omit the ``.Limit(250)``
           entirely from the ``Find()`` call in ``GetDocuments()``.

      #. Create another file called ``EmbeddingGenerator.cs`` and paste the
         following code into it:

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/LocalRag/EmbeddingGenerator.snippet.embedding-generator.cs
            :language: csharp
            :caption: EmbeddingGenerator.cs
            :category: usage example

         This code contains the logic to:

         - Get documents from the database.
         - Use the embedding model to generate vector embeddings for the
           ``summary`` field of each document.
         - Update the documents with the new embeddings.

      #. Paste the following code into ``Program.cs``:

         .. literalinclude:: /includes/local-rag/code-snippets/chsarp/Program-add-embeddings.cs
            :language: csharp
            :caption: Program.cs
            :linenos:

      #. Compile and run your project to generate embeddings:

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: shell

               dotnet run MyCompany.RAG.Local.csproj

            .. output::
               :language: console

               Generating embeddings.
               250 documents updated successfully.
