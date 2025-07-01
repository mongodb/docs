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

         .. literalinclude:: /includes/avs/local-rag/OllamaAIService-get-embeddings.cs
            :language: csharp
            :caption: OllamaAIService.cs

      #. Create another file called ``MongoDBDataService.cs`` and paste the
         following code into it:

         .. literalinclude:: /includes/avs/local-rag/MongoDBDataService-get-docs-update-docs.cs
            :language: csharp
            :caption: MongoDBDataService.cs
            :linenos:

         Generating embeddings takes time and computational resources. 
         In this example, you generate embeddings for only 250 documents
         from the collection, which should take less than a few minutes. If you
         want to change the number of documents you're generating embeddings
         for:
         
         - Change the number of documents: Adjust the ``.Limit(250)``
           number in the ``Find()`` call in line 21.
         - Generate embeddings for all documents: Omit the ``.Limit(250)``
           entirely in the ``Find()`` call in line 21.

      #. Create another file called ``EmbeddingGenerator.cs`` and paste the
         following code into it:

         .. literalinclude:: /includes/avs/local-rag/EmbeddingGenerator.cs
            :language: csharp
            :caption: EmbeddingGenerator.cs
            :linenos:

         This code contains the logic to:

         - Get documents from the database.
         - Use the embedding model to generate vector embeddings for the
           ``summary`` field of each document.
         - Update the documents with the new embeddings.

      #. Paste the following code into ``Program.cs``:

         .. literalinclude:: /includes/avs/local-rag/Program-add-embeddings.cs
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
