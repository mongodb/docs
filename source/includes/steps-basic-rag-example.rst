.. procedure::
   :style: normal

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following code in the notebook to install the dependencies:

      .. code-block:: shell

         pip install --quiet pymongo langchain langchain_community langchain_mongodb langchain_huggingface pypdf sentence_transformers

   .. step:: Ingest data into |service|.

      In this section, you :ref:`ingest <rag-ingestion>` sample 
      data into |service| that |llm|\s don't have access to.
      The following code uses the :ref:`LangChain integration <langchain>` and 
      :driver:`PyMongo driver </pymongo/>` to do the following:
      
      - Load a PDF that contains `MongoDB's latest earnings report
        <https://investors.mongodb.com/node/12236/pdf>`__.
      - Split the data into chunks, specifying the *chunk size*
        (number of characters) and *chunk overlap* (number of overlapping characters 
        between consecutive chunks). 
      - Load the `nomic-embed-text-v1 <https://huggingface.co/nomic-ai/nomic-embed-text-v1>`__ 
        embedding model from Hugging Face's model hub.
      - Create vector embeddings from the data and store 
        these embeddings in the ``rag_db.test`` collection 
        in your |service| {+cluster+}.

      Paste and run the following code in your notebook, replacing 
      ``<connection-string>`` with your |service| :ref:`connection string 
      <connect-via-driver>`:

      .. code-block:: python

         from langchain_community.document_loaders import PyPDFLoader
         from langchain.text_splitter import RecursiveCharacterTextSplitter
         from langchain_huggingface import HuggingFaceEmbeddings
         from langchain_mongodb import MongoDBAtlasVectorSearch
         from pymongo import MongoClient
         import warnings

         # Ignore warnings
         warnings.filterwarnings('ignore')

         # Load the PDF
         loader = PyPDFLoader("https://investors.mongodb.com/node/12236/pdf")
         data = loader.load()

         # Split the data into chunks
         text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=20)
         docs = text_splitter.split_documents(data)

         # Load the embedding model (https://huggingface.co/nomic-ai/nomic-embed-text-v1")
         model = HuggingFaceEmbeddings(model_name="nomic-ai/nomic-embed-text-v1", model_kwargs={ "trust_remote_code": True })

         # Connect to your Atlas cluster
         client = MongoClient("<connection-string>")
         collection = client["rag_db"]["test"]

         # Store the data as vector embeddings in Atlas
         vector_store = MongoDBAtlasVectorSearch.from_documents(
             documents = docs,
             embedding = model,
             collection = collection,
             index_name = "vector_index"
         )

      .. tip:: 

         After running the code, you can
         view your vector embeddings :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
         by navigating to the ``rag_db.test`` collection in your {+cluster+}.
   
   .. step:: Use {+avs+} to retrieve documents.

      In this section, you set up {+avs+} to :ref:`retrieve <rag-retrieval>` 
      documents from your vector database. Complete the following steps:
      
      a. Create an {+avs+} index on your vector embeddings.
      
         .. tabs::

            .. tab:: {+Free-Clusters+}
               :tabid: free

               For free and shared {+clusters+}, follow the steps to 
               :ref:`create an index through the {+atlas-ui+} 
               <avs-create-index>`. Name the index ``vector_index``
               and use the following index definition:
                   
               .. code-block:: json
                  :copyable: true 

                  {
                     "fields": [
                        {
                           "type": "vector",
                           "path": "embedding",
                           "numDimensions": 768,
                           "similarity": "euclidean"
                        }
                     ]
                  }

            .. tab:: {+Dedicated-Clusters+}
               :tabid: dedicated

               For {+dedicated-clusters+}, you can
               create the index directly from your application 
               by using the PyMongo driver. Paste and run the following 
               code in your notebook:

               .. code-block:: python

                  pymongo.operations import SearchIndexModel

                  # Create your index model, then create the search index
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
                    name = "vector_index",
                    type = "vectorSearch" 
                  )
                  collection.create_search_index(model=search_index_model)
         
      #. Configure {+avs+} as a retriever. 
      
         In your notebook, run the following code to set up your 
         retrieval system and run a sample semantic search query 
         by using the :ref:`LangChain integration <langchain>`:

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: python

               # Instantiate Atlas Vector Search as a retriever
               retriever = vector_store.as_retriever(
                  search_type = "similarity"
               )

               # Run a sample query in order of relevance
               retriever.invoke("AI technology")

            .. output::

               [Document(metadata={'_id': '66a910ba7f78f7ec6760ceba', 'source': 'https://investors.mongodb.com/node/12236/pdf', 'page': 0}, page_content="more of our customers. We also see a tremendous opportunity to win more legacy workloads, as AI has now become a catalyst to modernize these\napplications. MongoDB's  document-based architecture is particularly well-suited for the variety and scale of data required by AI-powered applications."),
                Document(metadata={'_id': '66a910ba7f78f7ec6760ced6', 'source': 'https://investors.mongodb.com/node/12236/pdf', 'page': 1}, page_content='artificial intelligence, in our offerings or partnerships; the growth and expansion of the market for database products and our ability to penetrate that\nmarket; our ability to integrate acquired businesses and technologies successfully or achieve the expected benefits of such acquisitions; our ability to'),
                Document(metadata={'_id': '66a910ba7f78f7ec6760cec3', 'source': 'https://investors.mongodb.com/node/12236/pdf', 'page': 0}, page_content='MongoDB  continues to expand its AI ecosystem with the announcement of the MongoDB AI Applications Program (MAAP),'),
                Document(metadata={'_id': '66a910ba7f78f7ec6760cec4', 'source': 'https://investors.mongodb.com/node/12236/pdf', 'page': 1}, page_content='which provides customers with reference architectures, pre-built partner integrations, and professional services to help\nthem quickly build AI-powered applications. Accenture will establish a center of excellence focused on MongoDB  projects,\nand is the first global systems integrator to join MAAP.')]

   .. step:: Generate responses with the |llm|.

      In this section, you :ref:`generate <rag-ingestion>` 
      responses by prompting an |llm| to use the retrieved documents 
      as context. The following code uses LangChain to do the following:
      
      - Access the `Mistral 7B Instruct <https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2>`__ 
        model from Hugging Face's model hub.
      - Instruct the |llm| to include the user's question and retrieved documents 
        in the prompt by using a `prompt template 
        <https://python.langchain.com/docs/modules/model_io/prompts/quick_start#prompttemplate>`__ 
        and `chain <https://python.langchain.com/docs/modules/chains>`__.
      - Prompt the |llm| about MongoDB's latest AI announcements.
      
      Paste and run the following code in your notebook, replacing ``<token>`` 
      with your Hugging Face access token. The generated response might vary.

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            from langchain_huggingface import HuggingFaceEndpoint
            from langchain.prompts import PromptTemplate
            from langchain_core.runnables import RunnablePassthrough
            from langchain_core.output_parsers import StrOutputParser
            import os

            # Authenticate to your Hugging Face account
            os.environ["HF_TOKEN"] = "<token>"
         
            # Access the LLM (https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2)
            llm = HuggingFaceEndpoint(repo_id="mistralai/Mistral-7B-Instruct-v0.2")

            # Create prompt and RAG workflow
            prompt = PromptTemplate.from_template("""
               Answer the following question based on the given context.

               Question: {question}
               Context: {context}
            """)

            rag_chain = (
               { "context": retriever, "question": RunnablePassthrough()}
               | prompt
               | llm
               | StrOutputParser()
            )

            # Prompt the LLM
            question = "In a few sentences, what are MongoDB's latest AI announcements?"
            answer = rag_chain.invoke(question)
            print(answer)

         .. output:: 
            
            Answer: MongoDB recently announced the MongoDB AI Applications Program 
            (MAAP) as part of their efforts to expand their AI ecosystem.
            The document-based architecture of MongoDB is particularly well-suited 
            for AI-powered applications, offering an opportunity to win more legacy 
            workloads. These announcements were made at MongoDB.local NYC.
