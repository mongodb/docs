.. procedure::
   :style: normal

   .. step:: Set up the environment.

      a. Initialize your .NET project.

         Run the following commands in your terminal 
         to create a new directory named ``MyCompany.RAG`` and
         initialize your project:

         .. code-block::

            dotnet new console -o MyCompany.RAG
            cd MyCompany.RAG

      #. Install and import dependencies.

         Run the following commands:

         .. code-block::

            dotnet add package MongoDB.Driver --version 3.1.0
            dotnet add package PdfPig
            dotnet add package OpenAI

      #. Set your environment variables.

         Export the following environment variables, ``set`` them in PowerShell,
         or use your IDE's environment variable manager to make these variables
         available to your project.

         .. code-block::

            export VOYAGE_API_KEY="<voyage-api-key>"
            export OPENAI_API_KEY="<openai-api-key>"
            export MONGODB_URI="<connection-string>"

      Replace the placeholder values with your Voyage AI and OpenAI API keys.
 
      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create a function to generate vector embeddings.

      Create a new class named ``AIService`` in a file of the same name by
      pasting the following code. This code defines an async Task named
      ``GetEmbeddingsAsync()`` to generate a array of embeddings for an array
      of given string inputs. This function uses Voyage AI's
      ``voyage-3-large`` model to generate an embedding for a given input.

      .. literalinclude:: /includes/avs/rag/ingest/AIService-GetEmbeddingsAsync-VoyageAI-RAG.cs
         :language: csharp
         :copyable:
         :caption: AIService.cs

   .. step:: Ingest data into your MongoDB deployment.

      In this section, you :ref:`ingest <rag-ingestion>` sample 
      data into MongoDB that LLMs don't have access to.
      
      a. Load and split the data.

         Create a new class named ``PdfIngester`` in a file of the same name
         by pasting the following code. This code contains a few functions to
         do the following:

         - Load a PDF that contains a MongoDB earnings report.
         - Use `PdfPig <https://github.com/UglyToad/PdfPig>`__ to parse the
           PDF into text.
         - Split the text into chunks, specifying the chunk size
           (number of characters) and chunk overlap (number of overlapping
           characters between consecutive chunks).

         .. literalinclude:: /includes/avs/rag/ingest/PdfIngester.cs
            :language: csharp
            :copyable:
            :caption: PdfIngester.cs
      
      #. Prepare to store the data and embeddings in MongoDB.

         Create a new class named ``MongoDBDataService`` in a file of the
         same name by pasting the following code. This code defines an async
         Task named ``AddDocumentsAsync`` to add documents to MongoDB. This
         function uses the
         :ref:`Collection.InsertManyAsync() <csharp-insert-guide>`
         C# Driver method to insert a list of the ``BsonDocument`` type. This
         code stores the embeddings alongside the chunked data in the
         ``rag_db.test`` collection.

         .. literalinclude:: /includes/avs/rag/ingest/MongoDBDataService-AddDocumentsAsync.cs
            :language: csharp
            :copyable:
            :caption: MongoDBDataService.cs

      #. Convert the data to vector embeddings.

         Create a new class named ``EmbeddingGenerator`` in a file of the same
         name by pasting the following code. This code prepares the chunked
         documents for ingestion by creating a list of documents with their
         corresponding vector embeddings. You generate these embeddings 
         using the ``GetEmbeddingsAsync()`` function that you defined earlier.

         .. literalinclude:: /includes/avs/rag/ingest/EmbeddingGenerator.cs
            :language: csharp
            :copyable:
            :caption: EmbeddingGenerator.cs
      
      #. Update the ``Program.cs`` file.

         Paste this code in your ``Program.cs``:

         .. literalinclude:: /includes/avs/rag/ingest/Program-CreateEmbeddings.cs
            :language: csharp
            :copyable:
            :caption: Program.cs

         This code:

         - Uses the ``PdfIngester`` to load and chunk the PDF into text segments
         - Uses the ``EmbeddingGenerator`` to generate embeddings for each text
           chunk from the PDF, and write the text chunks and embeddings
           to the ``rag_db.test`` collection

         Replace the ``<path-name>`` placeholder with the path where you want
         to download the report. On a macOS system, the path should resemble
         ``/Users/<username>/MyCompany.RAG/``. The path should end with a
         trailing slash.

      #. Compile and run your project to generate embeddings.

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: shell

               dotnet run MyCompany.RAG.csproj

            .. output:: /includes/avs/rag/output/ingest-data-output-csharp.sh
               :language: shell
               :visible: false
   
   .. step:: Use {+avs+} to retrieve documents.

      In this section, you set up {+avs+} to :ref:`retrieve <rag-retrieval>` 
      documents from your vector database. To create a {+avs+}
      index for a collection using the :driver:`MongoDB C# driver v3.1.0 </csharp/current/quick-start/>`
      or later, perform the following steps:
      
      a. Define the {+avs+} index.

         In the ``MongoDBDataService`` class, add the following code to define
         a {+avs+} index on the ``embedding`` field:

         .. literalinclude:: /includes/avs/rag/index/MongoDBDataService-CreateIndex.cs
            :language: csharp
            :copyable:

      #. Create the {+avs+} index.

         In the ``Program.cs`` file, replace the existing code with the
         following code to create the index:

         .. literalinclude:: /includes/avs/rag/index/Program-CreateIndex.cs
            :language: csharp
            :copyable:
            :caption: Program.cs

      #. Compile and run your project to create the index.

         .. code-block:: shell

            dotnet run MyCompany.RAG.csproj

      #. Define a function to retrieve relevant data.

         In the ``MongoDBDataService`` class, add the following code to define
         a function that runs a query to retrieve relevant documents.
         It uses the ``GetEmbeddingsAsync()`` function to create an embedding from the
         search query. Then, it runs the query to return semantically-similar
         documents. 

         To learn more, refer to :ref:`return-vector-search-results`.

         .. literalinclude:: /includes/avs/rag/retrieve/MongoDBDataService-PerformVectorQuery.cs
            :language: csharp
            :copyable:

      #. Test retrieving the data.

         In the ``Program.cs`` file, replace the existing code with the
         following code to test the retrieval function:

         .. literalinclude:: /includes/avs/rag/retrieve/Program-TestQuery.cs
            :language: csharp
            :copyable:
            :caption: Program.cs

      #. Compile and run your project to test the retrieval function.

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: shell

               dotnet run MyCompany.RAG.csproj

            .. output:: /includes/avs/rag/output/retrieve-data-output.sh
               :language: shell
               :visible: false

   .. step:: Generate responses with the LLM.

      In this section, you :ref:`generate <rag-ingestion>` 
      responses by prompting an LLM to use the retrieved documents 
      as context.
      
      a. In the ``AIService`` class, add the following code to define a
         function that prompts the LLM to use the retrieved documents as
         context:

         .. literalinclude:: /includes/avs/rag/generate/OpenAIService-GenerateAnswer.cs
            :language: csharp
            :copyable:

      #. In the ``Program.cs`` file, replace the existing code with the
         following code. This example uses the 
         function you just defined to retrieve matching documents from the 
         database, and additionally:

         - Instructs the LLM to include the user's question and retrieved
           documents in the prompt.
         - Prompts the LLM about MongoDB's latest AI announcements.

         .. literalinclude:: /includes/avs/rag/generate/Program-RAGPipeline.cs
            :language: csharp
            :copyable:
            :caption: Program.cs

      #. Compile and run your project. The generated response might vary.

         .. io-code-block:: 
            :copyable: true 

            .. input::
               :language: shell
         
               dotnet run MyCompany.RAG.csproj

            .. output:: 
               
               MongoDB's latest AI announcements include the MongoDB AI Applications
               Program (MAAP), which provides customers with reference architectures,
               pre-built partner integrations, and professional services to help them
               quickly build AI-powered applications. Accenture will establish a
               center of excellence focused on MongoDB projects and is the first
               global systems integrator to join MAAP.

