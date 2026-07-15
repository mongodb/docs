.. procedure::
   :style: normal

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension. This notebook allows you to 
      run Python code snippets individually. In your notebook, run the 
      following code to install the dependencies for this tutorial:

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/rag.ipynb

      .. code-block:: shell

         pip install --quiet --upgrade pymongo voyageai openai langchain langchain_community pypdf
      
      Then, run the following code to set the environment variables
      for this tutorial, replacing the placeholders with your API keys.

      .. code-block:: python
        
         import os

         os.environ["VOYAGE_API_KEY"] = "<voyage-api-key>"
         os.environ["OPENAI_API_KEY"] = "<openai-api-key>"

   .. step:: Ingest data into your MongoDB deployment.

      In this section, you :ref:`ingest <rag-ingestion>` sample 
      data into MongoDB that LLMs don't have access to.
      Paste and run each of the following code snippets in your notebook:

      a. Define a function to generate vector embeddings.

         .. include:: /includes/shared/facts/mdb-vs-voyage-model-description.rst

         .. literalinclude:: /code-examples/tested/python/pymongo/vector_search/rag/get_embeddings_voyage.snippet.get-embedding-voyage.py
            :language: python
            :copyable: true
            :category: usage example
            
      #. Load and split the data.

         Run this code to load and split sample data by using the
         :ref:`LangChain integration <langchain>`.
         Specifically, this code does the following:
         
         - Loads a PDF that contains a `MongoDB earnings report
           <https://investors.mongodb.com/node/12236/pdf>`__.
         
         - Splits the data into chunks, specifying the *chunk size*
           (number of characters) and *chunk overlap* (number of overlapping characters 
           between consecutive chunks).

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/rag.ipynb

         .. code-block:: python

            from langchain_community.document_loaders import PyPDFLoader
            from langchain_text_splitters import RecursiveCharacterTextSplitter

            # Load the PDF
            loader = PyPDFLoader("https://investors.mongodb.com/node/12236/pdf")
            data = loader.load()

            # Split the data into chunks
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=20)
            documents = text_splitter.split_documents(data)

      #. Store the data and embeddings in MongoDB.

         Run the following code to connect to your MongoDB deployment.
         Before running the code, replace ``<connection-string>`` with
         your MongoDB connection string.

         .. code-block:: python

            from pymongo import MongoClient

            # Connect to your MongoDB deployment
            client = MongoClient("<connection-string>")
            collection = client["rag_db"]["test"]

         Then, run the following code to prepare the chunked documents
         and insert them into the ``rag_db.test`` collection:

         ..
            NOTE: If you edit this code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/rag.ipynb

         .. literalinclude:: /code-examples/tested/python/pymongo/vector_search/rag/rag_pipeline.snippet.ingest-documents.py
            :language: python
            :copyable: true
            :category: usage example

         .. tip::

            After you run the code, if you're using |service|, you can
            verify your vector embeddings by navigating to the
            ``rag_db.test`` namespace
            :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`.
      
   .. step:: Use {+avs+} to retrieve documents.

      In this section, you create a :ref:`retrieval <rag-retrieval>` 
      system using {+avs+} to get relevant documents from your vector database. 
      Paste and run each of the following code snippets in your notebook:

      a. Create a {+avs+} index on your vector embeddings.
      
         Run the following code to create the index directly
         from your application with the :driver:`PyMongo Driver </pymongo/>`.
         This code also includes a polling mechanism to check if the 
         index is ready to use.

         To learn more, see :ref:`avs-types-vector-search`.

         .. literalinclude:: /code-examples/tested/python/pymongo/vector_search/rag/rag_pipeline.snippet.create-search-index.py
            :language: python
            :copyable: true
            :category: usage example

      #. Define a function to run vector search queries.

         Run this code to create a retrieval function called
         ``get_query_results()`` that runs a basic vector search query.
         It uses the ``get_embedding()`` function to create embeddings from the
         search query. Then, it runs the query to return semantically similar
         documents.

         To learn more, see :ref:`return-vector-search-results`.

         .. literalinclude:: /code-examples/tested/python/pymongo/vector_search/rag/rag_pipeline.snippet.get-query-results.py
            :language: python
            :copyable: true
            :category: usage example

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

      .. code-block:: python

         from openai import OpenAI

         # Specify search query and retrieve relevant documents
         query = "What are MongoDB's latest AI announcements?"
         context_docs = get_query_results(query)

      Then, run the following code to generate a response from the LLM:

      .. literalinclude:: /code-examples/tested/python/pymongo/vector_search/rag/rag_pipeline.snippet.generate-response.py
         :language: python
         :copyable: true
         :category: usage example

      .. literalinclude:: /includes/rag/code-snippets/output/generate-responses-output-openai.sh
         :language: none
         :copyable: false

