.. procedure::
   :style: normal

   .. step:: Connect to your |service| cluster.
      
      Run the following code to establish a connection 
      to your |service| {+cluster+}. It specifies the following:

      - ``langchain_db.test`` as the name of the collection for which to load the data.
      - ``vector_index`` as the name of the {+avs+} index to use for querying the data.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/langchain.ipynb

      .. code-block:: python

         # Connect to your Atlas cluster
         client = MongoClient(ATLAS_CONNECTION_STRING)

         # Define collection and index name
         db_name = "langchain_db"
         collection_name = "test"
         atlas_collection = client[db_name][collection_name]
         vector_search_index = "vector_index"

   .. step:: Load the sample data.

      For this tutorial, you use a publicly accessible 
      PDF document titled `MongoDB Atlas Best Practices 
      <https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP>`_
      as the data source for your vector store. This document describes
      various recommendations and core concepts for 
      managing your |service| deployments.

      To load the sample data, run the following code snippet.
      It does the following:

      - Retrieves the PDF from the specified URL and loads the raw text data.
      - Uses a `text splitter <https://python.langchain.com/docs/how_to/#text-splitters/>`__
        to split the data into smaller documents.
      - Specifies chunk parameters, which determines the number of characters in each document and 
        the number of characters that should overlap between two consecutive documents.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/langchain.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            # Load the PDF
            loader = PyPDFLoader("https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP")
            data = loader.load()

            # Split PDF into documents
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)
            docs = text_splitter.split_documents(data)

            # Print the first document
            docs[0]

         .. output:: 
            :language: json

            Document(page_content='Mong oDB Atlas Best P racticesJanuary 20 19A MongoD B White P aper', metadata={'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 0})

   .. step:: Instantiate the vector store.

      Run the following code to create a vector store instance
      named ``vector_store`` from the sample documents. 
      This snippet uses the ``from_documents``
      method to create the ``MongoDBAtlasVectorSearch`` vector store
      and specifies the following parameters:
      
      - The sample documents to store in the vector database.
      - An OpenAI embedding model as the model used to convert text into 
        vector embeddings for the ``embedding`` field. By default, this
        model is ``text-embedding-ada-002``.
      - ``langchain_db.test`` as the |service| collection to store the documents.
      - ``vector_index`` as the index to use for querying the vector store.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/langchain.ipynb

      .. code-block:: python
       
         # Create the vector store
         vector_store = MongoDBAtlasVectorSearch.from_documents(
             documents = docs,
             embedding = OpenAIEmbeddings(disallowed_special=()),
             collection = atlas_collection,
             index_name = vector_search_index
         )

      After running the sample code, you can
      view your vector embeddings :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
      by navigating to the ``langchain_db.test`` collection in your {+cluster+}.

      .. tip::

         `MongoDBAtlasVectorSearch API Reference <https://python.langchain.com/api_reference/mongodb/vectorstores/langchain_mongodb.vectorstores.MongoDBAtlasVectorSearch.html>`__

