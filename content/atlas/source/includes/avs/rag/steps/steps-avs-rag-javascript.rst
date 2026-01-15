.. procedure::
   :style: normal

   .. step:: Set up the environment.

      .. include:: /includes/avs/rag/avs-rag-set-up-environment-node.rst

   .. step:: Create a function to generate vector embeddings.

      To generate embeddings, use an embedding model. For this tutorial,
      you can use an open-source model from Hugging Face or a 
      proprietary model from Voyage AI.
         
      In your project, create a file called ``get-embeddings.js`` and paste
      the following code:

      .. tabs::
         
         .. tab:: Voyage AI
            :tabid: voyage-ai

            .. literalinclude:: /includes/avs/rag/ingest/get-embeddings-voyage.js
               :language: python
               :copyable:

            The ``getEmbedding()`` function generates vector embeddings by 
            using the ``voyage-3-large`` embedding model
            from :ref:`Voyage AI <voyage-landing>`.

            .. tip::

               To learn more, see `Voyage AI Typescript Library 
               <https://www.npmjs.com/package/voyageai>`__.

         .. tab:: Open-Source
            :tabid: open-source

            .. literalinclude:: /includes/avs/rag/ingest/get-embeddings.js
               :language: javascript

            The ``getEmbedding()`` function generates vector embeddings by 
            using the `nomic-embed-text-v1 <https://huggingface.co/nomic-ai/nomic-embed-text-v1>`__ embedding model
            from `Sentence Transformers <https://huggingface.co/sentence-transformers>`__.
         
   .. step:: Ingest data into your MongoDB deployment.

      In this section, you :ref:`ingest <rag-ingestion>` sample 
      data into MongoDB that LLMs don't have access to.
      The following code uses the :ref:`LangChain integration <langchain-js>`
      and :driver:`Node.js driver </node/current/quick-start>` to do the
      following:
      
      - Load a PDF that contains a `MongoDB earnings report
        <https://investors.mongodb.com/node/12236/pdf>`__.
      - Split the data into chunks, specifying the *chunk size*
        (number of characters) and *chunk overlap* (number of overlapping
        characters between consecutive chunks). 
      - Create vector embeddings from the chunked data by using 
        the ``getEmbedding()`` function that you defined.
      - Store these embeddings alongside the chunked data in the
        ``rag_db.test`` collection.

      Create a file called ``ingest-data.js`` in your project, and paste the
      following code:

      .. literalinclude:: /includes/avs/rag/ingest/ingest-data.js
         :language: javascript

      Then, run the following command to execute the code:

      .. io-code-block::
         :copyable: true

         .. input:: 
            :language: sh

            node --env-file=.env ingest-data.js

         .. output:: 
            :language: sh

            Generating embeddings and inserting documents...
            Count of documents inserted: 86

      .. tip:: 

         This code takes some time to run. If you're using |service|, you can verify your vector embeddings
         by navigating to the ``rag_db.test`` namespace
         :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`.
   
   .. step:: Use {+avs+} to retrieve documents.

      In this section, you set up {+avs+} to :ref:`retrieve <rag-retrieval>` 
      documents from your vector database. Complete the following steps:
      
      a. Create a {+avs+} index on your vector embeddings.
      
         Create a new file named ``rag-vector-index.js`` and paste the following code. 
         This code connects to your MongoDB deployment and creates an 
         index of the :ref:`vectorSearch <avs-types-vector-search>` type on 
         the ``rag_db.test`` collection. Replace the ``<dimensions>`` placeholder 
         with one of the following values:
         
         - ``768`` if you used ``nomic-embed-text-v1``
         - ``1024`` if you used ``voyage-3-large``

         .. literalinclude:: /includes/avs/rag/index/create-index.js
            :language: javascript

         Then, run the following command to execute the code:

         .. code-block:: shell

            node --env-file=.env rag-vector-index.js
         
      #. Define a function to retrieve relevant data.

         Create a new file called ``retrieve-documents.js``.
         
         In this step, you create a retrieval function called
         ``getQueryResults()`` that runs a query to retrieve relevant documents.
         It uses the ``getEmbedding()`` function to create an embedding from the
         search query. Then, it runs the query to return semantically-similar
         documents. 

         To learn more, refer to :ref:`return-vector-search-results`.

         Paste this code into your file:

         .. literalinclude:: /includes/avs/rag/retrieve/retrieve-documents.js
            :language: javascript

      #. Test retrieving the data.
      
         Create a new file called ``retrieve-documents-test.js``. In this step,
         you check that the function you just defined returns relevant results.
         
         
         Paste this code into your file:

         .. literalinclude:: /includes/avs/rag/retrieve/retrieve-documents-test.js
            :language: javascript

         Then, run the following command to execute the code.
         Your results might vary depending on the embedding model you use.

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: shell

               node --env-file=.env retrieve-documents-test.js

            .. output:: /includes/avs/rag/output/retrieve-data-output.sh
               :language: console
               :visible: false

   .. step:: Generate responses with the LLM.

      In this section, you :ref:`generate <rag-ingestion>` 
      responses by prompting an LLM to use the retrieved documents 
      as context. For this tutorial, you can use a model from OpenAI or an 
      open-source model from Hugging Face. This example uses the 
      function you just defined to retrieve matching documents from the 
      database, and additionally:

      - Instructs the LLM to include the user's question and retrieved
        documents in the prompt.
      - Prompts the LLM about MongoDB's latest AI announcements.
      
      Create a new file called ``generate-responses.js``, and paste the following
      code into it:

      .. tabs::

         .. tab:: OpenAI
            :tabid: openai

            .. literalinclude:: /includes/avs/rag/generate/generate-responses-openai.js
               :language: javascript

         .. tab:: Open-Source
            :tabid: open-source

            .. literalinclude:: /includes/avs/rag/generate/generate-responses-hf.js
               :language: javascript

      Then, run this command to execute the code. The generated response might
      vary.

      .. io-code-block:: 
         :copyable: true 

         .. input::
            :language: shell
      
            node --env-file=.env generate-responses.js

         .. output:: 
            
            MongoDB's latest AI announcements include the launch of the MongoDB
            AI Applications Program (MAAP), which provides customers with
            reference architectures, pre-built partner integrations, and
            professional services to help them build AI-powered applications
            quickly. Accenture has joined MAAP as the first global systems
            integrator, establishing a center of excellence focused on MongoDB
            projects. Additionally, Bendigo and Adelaide Bank have partnered
            with MongoDB to modernize their core banking technology using
            MongoDB's Relational Migrator and generative AI-powered
            modernization tools.
