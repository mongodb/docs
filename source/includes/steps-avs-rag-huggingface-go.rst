.. procedure::
   :style: normal

   .. step:: Set up the environment.

      a. Initialize your Go project.

         Run the following commands in your terminal 
         to create a new directory named ``rag-mongodb`` and
         initialize your project:

         .. code-block::

            mkdir rag-mongodb
            cd rag-mongodb
            go mod init rag-mongodb

      #. Install and import dependencies.

         Run the following commands:

         .. code-block::

            go get github.com/joho/godotenv
            go get go.mongodb.org/mongo-driver/mongo
            go get github.com/tmc/langchaingo/llms
            go get github.com/tmc/langchaingo/documentloaders
            go get github.com/tmc/langchaingo/embeddings/huggingface
            go get github.com/tmc/langchaingo/llms/huggingface
            go get github.com/tmc/langchaingo/prompts

      #. Create a ``.env`` file.

         In your project, create a ``.env`` file to store your |service| connection
         string and Hugging Face access token.

         .. code-block::
            :caption: .env

            HUGGINGFACEHUB_API_TOKEN = "<access-token>"
            ATLAS_CONNECTION_STRING = "<connection-string>"

         Replace the ``<access-token>`` placeholder value with your Hugging Face access token.

         .. include:: /includes/avs-examples/shared/avs-replace-connection-string.rst

   .. step:: Create a function to generate vector embeddings.

      In this section, you create a function that:

      - Loads the `mxbai-embed-large-v1 <https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1>`__ 
        embedding model from Hugging Face's model hub.
      - Creates vector embeddings from the inputted data.

      a. Run the following command to create a directory that stores common functions, including one that you'll
         reuse to create embeddings.

         .. code-block::

            mkdir common && cd common

      #. Create a file called ``get-embeddings.go`` in the ``common`` directory,
         and paste the following code into it:

         .. literalinclude:: /includes/avs-examples/rag/get-embeddings.go
            :language: go
            :caption: get-embeddings.go

   .. step:: Ingest data into |service|.

      In this section, you :ref:`ingest <rag-ingestion>` sample 
      data into |service| that |llm|\s don't have access to.
      The following code uses the `Go library for LangChain
      <https://tmc.github.io/langchaingo/docs/>`__
      and :driver:`Go driver </go/current/quick-start>` to do the
      following:
      
      - Create a HTML file that contains a `MongoDB earnings report
        <https://investors.mongodb.com/node/12236>`__.
      - Split the data into chunks, specifying the *chunk size*
        (number of characters) and *chunk overlap* (number of overlapping
        characters between consecutive chunks). 
      - Create vector embeddings from the chunked data by using 
        the ``GetEmbeddings`` function that you defined.
      - Store these embeddings alongside the chunked data in the
        ``rag_db.test`` collection in your |service| {+cluster+}.

      a. Navigate to the root of the ``rag-mongodb`` project directory.

      #. Create a file called ``ingest-data.go`` in your project, and paste the
         following code into it:

         .. literalinclude:: /includes/avs-examples/rag/ingest-data.go
            :language: go
            :caption: ingest-data.go

      #. Run the following command to execute the code:

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: shell

               go run ingest-data.go

            .. output:: /includes/avs-examples/rag/ingest-data-output-go.sh
               :language: console
               :visible: false
   
   .. step:: Use {+avs+} to retrieve documents.

      In this section, you set up {+avs+} to :ref:`retrieve <rag-retrieval>` 
      documents from your vector database. Complete the following steps:
      
      a. Create an {+avs+} index on your vector embeddings.
      
         Create a new file named ``rag-vector-index.go`` and paste the
         following code. This code connects to your |service| {+cluster+} and
         creates an index of the :ref:`vectorSearch <avs-types-vector-search>`
         type on the ``rag_db.test`` collection.    

         .. literalinclude:: /includes/avs-examples/rag/create-index.go
            :language: go
            :caption: rag-vector-index.go

      #. Run the following command to create the index:

         .. code-block:: shell

            go run rag-vector-index.go

      #. Define a function to retrieve relevant data.

         In this step, you create a retrieval function called
         ``GetQueryResults`` that runs a query to retrieve relevant documents.
         It uses the ``GetEmbeddings`` function to create embeddings from the
         search query. Then, it runs the query to return semantically-similar
         documents.

         To learn more, refer to :ref:`return-vector-search-results`.

         In the ``common`` directory, create a new file called
         ``get-query-results.go``, and paste the following code into it:

         .. literalinclude:: /includes/avs-examples/rag/get-query-results.go
            :language: go
            :caption: get-query-results.go

      #. Test retrieving the data.
      
         i. In the ``rag-mongodb`` project directory, create a new file called ``retrieve-documents-test.go``. In this step,
            you check that the function you just defined returns relevant results.
         
         #. Paste this code into your file:

            .. literalinclude:: /includes/avs-examples/rag/retrieve-documents-test.go
               :language: go
               :caption: retrieve-documents-test.go

         #. Run the following command to execute the code:

            .. io-code-block:: 
               :copyable: true

               .. input::
                  :language: shell

                  go run retrieve-documents-test.go

               .. output:: /includes/avs-examples/rag/retrieve-documents-output-go.sh
                  :language: console
                  :visible: false

   .. step:: Generate responses with the |llm|.

      In this section, you :ref:`generate <rag-ingestion>` 
      responses by prompting an |llm| to use the retrieved documents 
      as context. This example uses the function you just defined to retrieve
      matching documents from the database, and additionally:
      
      - Accesses the `Mistral 7B Instruct <https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3>`__ 
        model from Hugging Face's model hub.
      - Instructs the |llm| to include the user's question and retrieved
        documents in the prompt.
      - Prompts the |llm| about MongoDB's latest AI announcements.
      
      a. Create a new file called ``generate-responses.go``, and paste the following
         code into it:

         .. literalinclude:: /includes/avs-examples/rag/generate-responses.go
            :language: go
            :caption: generate-responses.go

      #. Run this command to execute the code. The generated response might
         vary.

         .. io-code-block:: 
            :copyable: true 

            .. input::
               :language: shell
      
               go run generate-responses.go

            .. output:: /includes/avs-examples/rag/generate-responses-output-go.sh
               :language: console
               :visible: false
