.. procedure::
   :style: normal

   .. step:: Load the sample data.

      For this tutorial, you use a publicly accessible 
      PDF document about a recent `MongoDB earnings report
      <https://investors.mongodb.com/node/13176/pdf>`_
      as the data source for your vector store.

      To load the sample data, run the following code snippet.
      It does the following:

      - Retrieves the PDF from the specified URL and loads the raw text data.
      - Uses a `text splitter <https://python.langchain.com/docs/how_to/#text-splitters/>`__
        to split the data into smaller documents.
      - Specifies chunk parameters, which determines the number of characters in each document and 
        the number of characters that should overlap between two consecutive documents.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            # Load the PDF
            loader = PyPDFLoader("https://investors.mongodb.com/node/13176/pdf")
            data = loader.load()

            # Split PDF into documents
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)
            docs = text_splitter.split_documents(data)

            # Print the first document
            docs[0]

         .. output:: 
            :language: json

            Document(metadata={'producer': 'West Corporation using ABCpdf', 'creator': 'PyPDF', 'creationdate': '2025-03-05T21:06:26+00:00', 'title': 'MongoDB, Inc. Announces Fourth Quarter and Full Year Fiscal 2025 Financial Results', 'source': 'https://investors.mongodb.com/node/13176/pdf', 'total_pages': 9, 'page': 0, 'page_label': '1'}, page_content='MongoDB, Inc. Announces Fourth Quarter and Full Year Fiscal 2025 Financial Results\nMarch 5, 2025\nFourth Quarter Fiscal 2025 Total Revenue of $548.4 million, up 20% Year-over-Year')

   .. step:: Instantiate the vector store.

      Run the following code to create a vector store instance
      named ``vector_store`` from the sample documents.
      This snippet specifies the following:

      - The connection string to your |service| {+cluster+}.
      - ``langchain_db.test`` as the |service| namespace to store the documents.
      - The ``text-embedding-3-large`` embedding model from OpenAI 
        to convert the text into vector embeddings for the ``embedding`` field.
      - ``vector_index`` as the index to use for querying the vector store.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. code-block:: python

         # Instantiate the vector store using your MongoDB connection string
         vector_store = MongoDBAtlasVectorSearch.from_connection_string(
           connection_string = ATLAS_CONNECTION_STRING,
           namespace = "langchain_db.test",
           embedding =  OpenAIEmbeddings(model="text-embedding-3-large"),
           index_name = "vector_index"
         )

         # Add documents to the vector store
         vector_store.add_documents(documents=docs)

      After running the sample code, you can
      view your vector embeddings :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
      by navigating to the ``langchain_db.test`` collection in your {+cluster+}.

      .. tip::

         `MongoDBAtlasVectorSearch API Reference <https://langchain-mongodb.readthedocs.io/en/latest/langchain_mongodb/vectorstores/langchain_mongodb.vectorstores.MongoDBAtlasVectorSearch.html>`__
