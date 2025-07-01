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

            export OPENAI_API_KEY="<api-key>"
            export ATLAS_CONNECTION_STRING="<connection-string>"

      Replace the ``<api-key>`` placeholder value with your OpenAI API key.

      .. include:: /includes/avs/shared/avs-replace-connection-string.rst

   .. step:: Create a function to generate vector embeddings.

      Create a new class named ``OpenAIService`` in a file of the same name by
      pasting the following code. This code defines an async Task named
      ``GetEmbeddingsAsync`` to generate a array of embeddings for an array
      of given string inputs. This function uses OpenAI's
      ``text-embedding-3-small`` model to generate an embedding for a given input.

      .. literalinclude:: /includes/avs/rag/OpenAIService-GetEmbeddingsAsync.cs
         :language: csharp
         :copyable:
         :caption: OpenAIService.cs

   .. step:: Ingest data into |service|.

      In this section, you :ref:`ingest <rag-ingestion>` sample 
      data into |service| that |llm|\s don't have access to.
      
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

         .. literalinclude:: /includes/avs/rag/PdfIngester.cs
            :language: csharp
            :copyable:
            :caption: PdfIngester.cs
      
      #. Prepare to store the data and embeddings in Atlas.

         Create a new class named ``MongoDBDataService`` in a file of the
         same name by pasting the following code. This code defines an async
         Task named ``AddDocumentsAsync`` to add documents to |service|. This
         function uses the
         :driver:`Collection.InsertManyAsync() </csharp/current/usage-examples/insertMany/>`
         C# Driver method to insert a list of the ``BsonDocument`` type. This
         code stores the embeddings alongside the chunked data in the
         ``rag_db.test`` collection in your |service| {+cluster+}.

         .. literalinclude:: /includes/avs/rag/MongoDBDataService-AddDocumentsAsync.cs
            :language: csharp
            :copyable:
            :caption: MongoDBDataService.cs

      #. Convert the data to vector embeddings.

         Create a new class named ``EmbeddingGenerator`` in a file of the same
         name by pasting the following code. This code prepares the chunked
         documents for ingestion by creating a list of documents with their
         corresponding vector embeddings. You generate these embeddings 
         using the ``GetEmbeddingsAsync`` function that you defined earlier.

         .. literalinclude:: /includes/avs/rag/EmbeddingGenerator.cs
            :language: csharp
            :copyable:
            :caption: EmbeddingGenerator.cs
      
      #. Update the ``Program.cs`` file.

         Paste this code in your ``Program.cs``:

         .. literalinclude:: /includes/avs/rag/Program-CreateEmbeddings.cs
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

            .. output:: /includes/avs/rag/ingest-data-output-csharp.sh
               :language: shell
               :visible: false
   
   .. step:: Use {+avs+} to retrieve documents.

      In this section, you set up {+avs+} to :ref:`retrieve <rag-retrieval>` 
      documents from your vector database. To create an Atlas Vector Search
      index for a collection using the :driver:`MongoDB C# driver v3.1.0 </csharp/current/quick-start/>`
      or later, perform the following steps:
      
      a. Define the {+avs+} index.
      
         Add a new ``CreateVectorIndex()`` method in the file named
         ``MongoDBDataService.cs`` to define the search index. This code
         connects to your |service| {+cluster+} and creates an index of the
         :ref:`vectorSearch <avs-types-vector-search>`
         type on the ``rag_db.test`` collection.    

         .. literalinclude:: /includes/avs/rag/MongoDBDataService-CreateIndex.cs
            :language: csharp
            :caption: MongoDBDataService.cs
            :emphasize-lines: 18-66

      #. Update the ``Program.cs`` file.

         Replace the code in ``Program.cs`` with the following code to create
         the index:

         .. literalinclude:: /includes/avs/rag/Program-CreateIndex.cs
            :language: csharp
            :caption: Program.cs

      #. Compile and run your project to create the index.

         .. code-block:: csharp
            :copyable: true

            dotnet run MyCompany.RAG.csproj

      #. Define a function to retrieve relevant data.

         Add a new ``PerformVectorQuery`` method in the file named
         ``MongoDBDataService.cs`` to retrieve relevant documents. To learn
         more, refer to :ref:`return-vector-search-results`.

         .. literalinclude:: /includes/avs/rag/MongoDBDataService-PerformVectorQuery.cs
            :language: csharp
            :caption: MongoDBDataService.cs
            :emphasize-lines: 23-58

      #. Test retrieving the data.
      
         i. Create a new class named ``PerformTestQuery`` in a file of the same 
            name by pasting the following code. This code transforms a text
            input string into vector embeddings, and queries the database for
            matching results. It uses the ``GetEmbeddingsAsync`` function to create
            embeddings from the search query. Then, it runs the query to return
            semantically-similar documents.

            .. literalinclude:: /includes/avs/rag/PerformTestQuery.cs
               :language: csharp
               :caption: PerformTestQuery.cs

         #. Update the ``Program.cs`` file.

            Replace the code in ``Program.cs`` with the following code to
            perform a test query:

            .. literalinclude:: /includes/avs/rag/Program-TestQuery.cs
               :language: csharp
               :caption: Program.cs

         #. Compile and run your project to check the query results.

            .. io-code-block:: 
               :copyable: true

               .. input::
                  :language: shell

                  dotnet run MyCompany.RAG.csproj

               .. output:: /includes/avs/rag/retrieve-documents-output-csharp.sh
                  :language: shell
                  :visible: false

   .. step:: Generate responses with the |llm|.

      In this section, you :ref:`generate <rag-ingestion>` 
      responses by prompting an |llm| to use the retrieved documents 
      as context. This example uses the function you just defined to retrieve
      matching documents from the database, and additionally:
      
      - Accesses the `gpt-4o-mini <https://platform.openai.com/docs/models/gpt-4o-mini>`__ 
        model from OpenAI.
      - Instructs the |llm| to include the user's question and retrieved
        documents in the prompt.
      - Prompts the |llm| about MongoDB's latest AI announcements.
      
      a. Add the imports, the new ``ChatClient`` information, and a new method
         called ``GenerateAnswer`` in the file named ``OpenAIService.cs``.

         .. literalinclude:: /includes/avs/rag/OpenAIService-GenerateAnswer.cs
            :language: csharp
            :caption: OpenAIService.cs
            :emphasize-lines: 4, 6, 14-15, 22-38

      #. Create a ``RAGPipeline`` class.

         Create a new class named ``RAGPipeline`` in a file of the same name
         by pasting the following code. This code coordinates the following
         components:

         - ``GetEmbeddingsAsync`` function: transform the string query into vector
           embeddings.
         - ``PerformVectorQuery`` function: retrieve semantically-similar
           results from the database.
         - ``GenerateAnswer`` function: pass the documents retrieved from the
           database to the |llm| to generate the response.

         .. literalinclude:: /includes/avs/rag/RAGPipeline.cs
            :language: csharp
            :caption: RAGPipeline.cs

      #. Update the ``Program.cs`` file.

         Replace the code in ``Program.cs`` with the following code to call
         your RAG pipeline:

         .. literalinclude:: /includes/avs/rag/Program-RAGPipeline.cs
            :language: csharp
            :caption: Program.cs

      #. Compile and run your project to perform RAG. The generated
         response might vary.

         .. io-code-block:: 
            :copyable: true 

            .. input::
               :language: shell
      
               dotnet run MyCompany.RAG.csproj

            .. output:: /includes/avs/rag/generate-responses-output-csharp.sh
               :language: shell
               :visible: false
