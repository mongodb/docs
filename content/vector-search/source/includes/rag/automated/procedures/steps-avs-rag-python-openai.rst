.. procedure::
   :style: normal

   .. step:: Set up the environment.

      a. Run the following code to install the dependencies for this tutorial:

         .. literalinclude:: /includes/rag/automated/code-snippets/openai/python/install-dependencies.py
            :language: python
            :copyable: true

      #. Run the following code to set the environment variables
         for this tutorial, replacing the placeholders with your API keys.

         .. literalinclude:: /includes/rag/automated/code-snippets/openai/python/set-env-variables.py
            :language: python
            :copyable: true

   .. step:: Ingest data into your MongoDB deployment.

      In this section, you :ref:`ingest <rag-ingestion>` sample 
      data into MongoDB that LLMs don't have access to.

      a. Load and split the data.

         Run this code to load and split sample data by using the
         :ref:`LangChain integration <langchain>`. Specifically, this code 
         does the following:
            
         - Loads a PDF that contains a `MongoDB earnings report
           <https://investors.mongodb.com/node/12236/pdf>`__.
         
         - Splits the data into chunks, specifying the *chunk size*
           (number of characters) and *chunk overlap* (number of overlapping characters 
           between consecutive chunks).

         .. literalinclude:: /includes/rag/automated/code-snippets/shared/python/load-split-data.py
            :language: python
            :copyable: true

      #. Store the data in MongoDB.

         Run the following code to connect to your MongoDB deployment.
         Before running the code, replace ``<connection-string>`` with
         your MongoDB connection string.

         .. literalinclude:: /includes/rag/automated/code-snippets/shared/python/ingest-documents.py
            :language: python
            :copyable: true

         .. tip::

            After you run the code, if you're using |service|, you can
            verify your vector embeddings by navigating to the
            ``rag_db.test`` namespace
            :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`.
      
   .. step:: Use {+avs+} to retrieve documents.

      In this section, you create a :ref:`retrieval <rag-retrieval>` 
      system using {+avs+} to get relevant documents from your database. 
      Paste and run each of the following code snippets in your notebook:

      a. Create a {+avs+} index on your data.
      
         Run the following code to create the index directly
         from your application with the :driver:`PyMongo Driver </pymongo/>`.
         This code also includes a polling mechanism to check if the 
         index is ready to use.

         To learn more, see :ref:`avs-types-vector-search`.

         .. literalinclude:: /includes/rag/automated/code-snippets/shared/python/create-search-index.py
            :language: python
            :copyable: true

      #. Define a function to run vector search queries.

         Run this code to create a retrieval function called
         ``get_query_results()`` that runs a basic vector search query and 
         return semantically similar documents.

         To learn more, see :ref:`return-vector-search-results`.

         .. io-code-block:: 
            :copyable: true 

            .. input:: /includes/rag/automated/code-snippets/shared/python/get-query-results.py
               :language: python

            .. output:: /includes/rag/automated/code-snippets/output/get-query-results-output.sh
               :language: none
               :visible: false

   .. step:: Generate responses with the LLM.

      In this section, you :ref:`generate <rag-ingestion>` 
      responses by prompting an LLM to use the retrieved documents 
      as context. This code does the following:

      - Uses the ``get_query_results()`` function you defined to retrieve 
        relevant documents from your collection.
      - Creates a prompt using the user's question and retrieved
        documents as context.
      - Prompts the LLM about MongoDB's latest AI announcements. 
        The generated response might vary.

      Run the following code to specify a search query and retrieve
      relevant documents:

      .. literalinclude:: /includes/rag/automated/code-snippets/openai/python/search-query.py
         :language: python
         :copyable: true

      Then, run the following code to generate a response from the LLM:

      .. io-code-block:: 
         :copyable: true
         
         .. input:: /includes/rag/automated/code-snippets/openai/python/generate-response.py
            :language: python

         .. output:: /includes/rag/automated/code-snippets/output/generate-responses-output-openai.sh
            :language: none
            :visible: false