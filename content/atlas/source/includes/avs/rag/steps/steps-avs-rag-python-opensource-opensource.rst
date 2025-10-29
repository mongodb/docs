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

         pip install --quiet --upgrade pymongo sentence_transformers huggingface_hub einops langchain langchain_community pypdf
      
      Then, run the following code to set the environment variables
      for this tutorial, replacing the placeholders with your API keys.

      .. code-block:: python
        
         import os

         os.environ["HF_TOKEN"] = "<hf-token>"

   .. step:: Ingest data into your MongoDB deployment.

      In this section, you :ref:`ingest <rag-ingestion>` sample 
      data into MongoDB that LLMs don't have access to.
      Paste and run each of the following code snippets in your notebook:

      a. Define a function to generate vector embeddings.

         Paste and run the following code in your notebook to create
         a function named ``get_embedding()`` that generates vector embeddings by 
         using the `nomic-embed-text-v1 <https://huggingface.co/nomic-ai/nomic-embed-text-v1>`__ embedding model
         from `Sentence Transformers <https://huggingface.co/sentence-transformers>`__.
         
         ..
            NOTE: If you edit this Python file, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/rag.ipynb

         .. literalinclude:: /includes/avs/rag/ingest/get-embeddings.py
            :language: python
            :copyable:
            
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

      #. Convert the data to vector embeddings.

         Run this code to prepare the chunked documents for ingestion
         by creating a list of documents with their corresponding vector embeddings.
         You generate these embeddings by using the ``get_embedding()`` function that 
         you just defined.

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/rag.ipynb

         .. code-block:: python

            # Prepare documents for insertion
            docs_to_insert = [{
                "text": doc.page_content,
                "embedding": get_embedding(doc.page_content)
            } for doc in documents]

      #. Store the data and embeddings in MongoDB.

         Run this code to insert the documents containing the embeddings 
         into the ``rag_db.test`` collection. Before running the code, replace 
         ``<connection-string>`` with your MongoDB connection string.

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/rag.ipynb
         
         .. code-block:: python
          
            from pymongo import MongoClient

            # Connect to your MongoDB deployment
            client = MongoClient("<connection-string>")
            collection = client["rag_db"]["test"]

            # Insert documents into the collection
            result = collection.insert_many(docs_to_insert)

         .. tip:: 

            After you run the code, if you're using |service|, you can verify your vector embeddings
            by navigating to the ``rag_db.test`` namespace
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

         .. code-block:: python

            from pymongo.operations import SearchIndexModel
            import time

            # Create your index model, then create the search index
            index_name="vector_index"
            search_index_model = SearchIndexModel(
              definition = {
                "fields": [
                  {
                    "type": "vector",
                    "numDimensions": 768,
                    "path": "embedding",
                    "similarity": "cosine"
                  }
                ]
              },
              name = index_name,
              type = "vectorSearch" 
            )
            collection.create_search_index(model=search_index_model)

            # Wait for initial sync to complete
            print("Polling to check if the index is ready. This may take up to a minute.")
            predicate=None
            if predicate is None:
               predicate = lambda index: index.get("queryable") is True

            while True:
               indices = list(collection.list_search_indexes(index_name))
               if len(indices) and predicate(indices[0]):
                  break
               time.sleep(5)
            print(index_name + " is ready for querying.")

      #. Define a function to run vector search queries.

         Run this code to create a retrieval function called
         ``get_query_results()`` that runs a basic vector search query.
         It uses the ``get_embedding()`` function to create embeddings from the
         search query. Then, it runs the query to return semantically similar
         documents. Your results might vary depending on the embedding model you use.

         To learn more, see :ref:`return-vector-search-results`.

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: python
               
               # Define a function to run vector search queries
               def get_query_results(query):
                 """Gets results from a vector search query."""
                 
                 query_embedding = get_embedding(query)
                 pipeline = [
                     {
                           "$vectorSearch": {
                             "index": "vector_index",
                             "queryVector": query_embedding,
                             "path": "embedding",
                             "exact": True,
                             "limit": 5
                           }
                     }, {
                           "$project": {
                             "_id": 0,
                             "text": 1
                        }
                     }
                 ]

                 results = collection.aggregate(pipeline)

                 array_of_results = []
                 for doc in results:
                     array_of_results.append(doc)
                 return array_of_results

               # Test the function with a sample query
               import pprint
               pprint.pprint(get_query_results("AI technology"))

            .. output::
               :visible: false
               
               [{'text': 'more of our customers. We also see a tremendous opportunity to win '
                         'more legacy workloads, as AI has now become a catalyst to modernize '
                         'these\n'
                         "applications. MongoDB's  document-based architecture is "
                         'particularly well-suited for the variety and scale of data required '
                         'by AI-powered applications.'},
                {'text': 'artificial intelligence, in our offerings or partnerships; the '
                         'growth and expansion of the market for database products and our '
                         'ability to penetrate that\n'
                         'market; our ability to integrate acquired businesses and '
                         'technologies successfully or achieve the expected benefits of such '
                         'acquisitions; our ability to'},
                {'text': 'MongoDB  continues to expand its AI ecosystem with the announcement '
                         'of the MongoDB AI Applications Program (MAAP),'},
                {'text': 'which provides customers with reference architectures, pre-built '
                         'partner integrations, and professional services to help\n'
                         'them quickly build AI-powered applications. Accenture will '
                         'establish a center of excellence focused on MongoDB  projects,\n'
                         'and is the first global systems integrator to join MAAP.'},
                {'text': 'Bendigo and Adelaide Bank partnered with MongoDB  to modernize '
                         'their core banking technology. With the help of\n'
                         'MongoDB Relational Migrator and generative AI-powered modernization '
                         'tools, Bendigo and Adelaide Bank decomposed an\n'
                         'outdated consumer-servicing application into microservices and '
                         'migrated off its underlying legacy relational database'}]

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

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            from huggingface_hub import InferenceClient

            # Specify search query, retrieve relevant documents, and convert to string
            query = "What are MongoDB's latest AI announcements?"
            context_docs = get_query_results(query)
            context_string = " ".join([doc["text"] for doc in context_docs])

            # Construct prompt for the LLM using the retrieved documents as the context
            prompt = f"""Use the following pieces of context to answer the question at the end.
                {context_string}
                Question: {query}
            """

            # Use a model from Hugging Face
            llm = InferenceClient(
                "mistralai/Mixtral-8x22B-Instruct-v0.1",
                provider = "fireworks-ai",
                token = os.getenv("HF_TOKEN"))

            # Prompt the LLM (this code varies depending on the model you use)
            output = llm.chat_completion(
                messages=[{"role": "user", "content": prompt}],
                max_tokens=150
            )
            print(output.choices[0].message.content)

         .. output:: 
            
            MongoDB's latest AI announcements include the 
            MongoDB AI Applications Program (MAAP), a program designed 
            to help customers build AI-powered applications more efficiently. 
            Additionally, they have announced significant performance 
            improvements in MongoDB 8.0, featuring faster reads, updates, 
            bulk inserts, and time series queries. Another announcement is the 
            general availability of Atlas Stream Processing to build sophisticated, 
            event-driven applications with real-time data.

