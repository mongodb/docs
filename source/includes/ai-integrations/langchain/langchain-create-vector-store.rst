.. procedure::
   :style: normal

   .. step:: Connect to your |service| cluster.
      
      Run the following code to establish a connection 
      to your |service| {+cluster+}. It specifies the following:

      - ``langchain_db.test`` as the name of the collection for which to load the data.
      - ``vector_index`` as the name of the {+avs+} index to use for querying the data.

      .. code-block::

         # Connect to your Atlas cluster
         client = MongoClient(MONGODB_ATLAS_CLUSTER_URI)

         # Define collection and index name
         db_name = "langchain_db"
         collection_name = "test"
         atlas_collection = client[db_name][collection_name]
         vector_search_index = "vector_index"

   .. step:: Load the sample data.

      For this tutorial, you use a publicly accessible 
      PDF document titled `MongoDB Atlas Best Practices 
      <https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP>`_
      as the data source for your vector store.
      
      Run the following code snippet to retrieve the PDF from the specified URL,
      load the raw text data, and split the data into documents:

      .. code-block:: python

         # Load the PDF
         loader = PyPDFLoader("https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP")
         data = loader.load()

         # Split PDF into documents
         text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)
         docs = text_splitter.split_documents(data)

   .. step:: Create the vector store.

      Run the following code to create a vector store 
      named ``vector_search`` from the sample documents. 
      This snippet uses the ``MongoDBAtlasVectorSearch.from_documents``
      method and specifies the following parameters:
      
      - The sample documents to store in the vector database.
      - OpenAI's embedding model as the model used to convert text into 
        vector embeddings for the ``embedding`` field.
      - ``langchain_db.test`` as the |service| collection for which to insert the documents.
      - ``vector_index`` as the index to use for querying the vector store.

      .. code-block:: python
       
         # Create the vector store
         vector_search = MongoDBAtlasVectorSearch.from_documents(
             documents = docs,
             embedding = OpenAIEmbeddings(disallowed_special=()),
             collection = atlas_collection,
             index_name = vector_search_index,
         )
         