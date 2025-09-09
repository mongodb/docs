
.. procedure::
   :style: normal

   .. step:: Load the sample data.

      For this tutorial, you use a publicly accessible 
      PDF document that contains that contains a `recent MongoDB earnings report
      <https://investors.mongodb.com/node/13176/pdf>`_
      as the data source for your vector store. This document describes
      MongoDB's financial results for the fourth quarter and full year of fiscal 2025.

      To load the sample data, run the following code snippet.
      It does the following:

      - Creates a new directory called ``data``.
      - Retrieves the PDF from the specified URL and saves it as a file in the directory.
      - Uses the ``SimpleDirectoryReader`` `data connector
        <https://docs.llamaindex.ai/en/stable/module_guides/loading/connector/>`__
        to extract raw text and metadata from the file. It also formats the data into
        documents.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            # Load the sample data
	    from urllib.request import urlretrieve
	    urlretrieve("https://investors.mongodb.com/node/13176/pdf", "mongodb-earnings-report.pdf")
	    sample_data = SimpleDirectoryReader(input_files=["mongodb-earnings-report.pdf"]).load_data()
	    
            # Print the first document	    
            sample_data[0]

         .. output:: 
            :language: text
            :visible: false

            Document(id_='62b7cace-30c0-4687-9d87-e178547ae357', embedding=None,
            metadata={'page_label': '1', 'file_name': 'mongodb-earnings-report.pdf',
            'file_path': 'data/mongodb-earnings-report.pdf', 'file_type':
            'application/pdf', 'file_size': 150863, 'creation_date': '2025-05-28',
            'last_modified_date': '2025-05-28'},
            excluded_embed_metadata_keys=['file_name', 'file_type', 'file_size',
            'creation_date', 'last_modified_date', 'last_accessed_date'],
            excluded_llm_metadata_keys=['file_name', 'file_type', 'file_size',
            'creation_date', 'last_modified_date', 'last_accessed_date'],
            relationships={}, metadata_template='{key}: {value}', metadata_separator='\n',
            text_resource=MediaResource(embeddings=None, data=None, text='MongoDB, Inc.
            Announces Fourth Quarter and Full Year Fiscal 2025 Financial Results\nMarch 5,
            2025\nFourth Quarter Fiscal 2025 Total Revenue of $548.4 million, up 20%
            Year-over-Year\nFull Year Fiscal 2025 Total Revenue of $2.01 billion, up 19%
            Year-over-Year\nContinued Strong Customer Growth with Over 54,500 Customers as
            of January 31, 2025\nMongoDB Atlas Revenue up 24% Year-over-Year; 71% of Total
            Q4 Revenue\nNEW YORK , March 5, 2025 /PRNewswire/ -- MongoDB, Inc. (NASDAQ:
            MDB) today announced its financial results for the fourth quarter and
            fiscal\nyear ended January 31, 2025.\n\xa0\n  \xa0\n"MongoDB  delivered a
            strong end to fiscal 2025 with 24% Atlas revenue growth and significant margin
            expansion. Atlas consumption in the quarter\nwas better than expected and we
            continue to see good performance in new workload wins due to the flexibility,
            scalability and performance of the\nMongoDB  platform. In fiscal year 2026 we
            expect to see stable consumption growth in Atlas, our main growth driver,"
            said Dev Ittycheria, President\nand Chief Executive Officer of MongoDB
            .\n"Looking ahead, we remain incredibly excited about our long-term growth
            opportunity. MongoDB  removes the constraints of legacy databases,\nenabling
            businesses to innovate at AI speed with our flexible document model and
            seamless scalability. Following the Voyage AI acquisition, we\ncombine
            real-time data, sophisticated embedding and retrieval models and semantic
            search directly in the database, simplifying the development of\ntrustworthy
            AI-powered apps."\nFourth Quarter Fiscal 2025 Financial Highlights\nRevenue:
            Total revenue was $548.4 million for the fourth quarter of fiscal 2025, an
            increase of 20% year-over-year.\nSubscription revenue was $531.0 million, an
            increase of 19% year-over-year, and services revenue was $17.4 million,
            an\nincrease of 34% year-over-year.\nGross Profit: Gross profit was $399.4
            million for the fourth quarter of fiscal 2025, representing a 73% gross
            margin\ncompared to 75% in the year-ago period. Non-GAAP gross profit was
            $411.7 million, representing a 75% non-GAAP gross\nmargin, compared to a
            non-GAAP gross margin of 77% in the year-ago period.\nLoss from Operations:
            Loss from operations was $18.6 million for the fourth quarter of fiscal 2025,
            compared to a loss\nfrom operations of $71.0 million in the year-ago period.
            Non-GAAP income from operations was $112.5 million, compared\nto non-GAAP
            income from operations of $69.2 million in the year-ago period.\nNet Income
            (Loss): Net income was $15.8 million, or $0.20 per share, based on 77.6
            million weighted-average shares\noutstanding, for the fourth quarter of fiscal
            2025. This compares to a net loss of $55.5 million, or $0.77 per share, in
            the\nyear-ago period. Non-GAAP net income was $108.4 million, or $1.28 per
            share, based on 84.6 million fully diluted\nweighted-average shares
            outstanding. This compares to a non-GAAP net income of $71.1 million, or $0.86
            per share, in\nthe year-ago period.\nCash Flow: As of January 31, 2025,
            MongoDB  had $2.3 billion in cash, cash equivalents, short-term investments
            and\nrestricted cash. During the three months ended January 31, 2025, MongoDB
            generated $50.5 million of cash from\noperations, compared to $54.6 million of
            cash from operations in the year-ago period. MongoDB  used $26.0 million of
            cash\nin capital expenditures and used $1.6 million of cash in principal
            payments of finance leases, leading to free cash flow of\n$22.9 million,
            compared to free cash flow of $50.5 million in the year-ago period.\nFull Year
            Fiscal 2025 Financial Highlights\nRevenue: Total revenue was $2.01 billion for
            the full year fiscal 2025, an increase of 19% year-over-year.
            Subscription\nrevenue was $1.94 billion, an increase of 19% year-over-year,
            and services revenue was $62.6 million, an increase of
            12%\nyear-over-year.\nGross Profit: Gross profit was $1.47 billion for the
            full year fiscal 2025, representing a 73% gross margin compared to',
            path=None, url=None, mimetype=None), image_resource=None, audio_resource=None,
            video_resource=None, text_template='{metadata_str}\n\n{content}')
         
   .. step:: Instantiate the vector store.

      Run the following code to create a vector store by using the 
      ``MongoDBAtlasVectorSearch`` method, which
      specifies the following:
      
      - A connection to your MongoDB cluster.
      - ``llamaindex_db.test`` as the MongoDB database and collection
        used to store the documents.
      - ``vector_index`` as the index to use for querying the vector store.

      Then, you save the vector store to a `storage context
      <https://docs.llamaindex.ai/en/stable/api_reference/storage/storage_context/>`__,
      which is a LlamaIndex container object used to prepare your data for storage.
      
      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. code-block:: python

         # Connect to your MongoDB cluster
         mongo_client = pymongo.MongoClient(MONGODB_URI)

         # Instantiate the vector store
         vector_store = MongoDBAtlasVectorSearch(
             mongo_client,
             db_name = "llamaindex_db", 
             collection_name = "test",
             vector_index_name = "vector_index"
         ) 
         vector_store_context = StorageContext.from_defaults(vector_store=vector_store)

   .. step:: Store your data as vector embeddings.

      Once you've loaded your data and instantiated |service| as a vector store, 
      generate vector embeddings from your data and store them in |service|. 
      To do this, you must build a `vector store index 
      <https://docs.llamaindex.ai/en/stable/understanding/indexing/indexing/>`__.
      This type of index is a LlamaIndex data structure that 
      splits, embeds, and then stores your data in the vector store.

      The following code uses the ``VectorStoreIndex.from_documents``
      method to build the vector store index on your sample data. It turns
      your sample data into vector embeddings and stores these embeddings 
      as documents in the ``llamaindex_db.test`` collection in your
      MongoDB cluster, as specified by the vector store's storage context.
      
      .. note:: 

         This method uses the embedding model and chunk settings 
         that you configured when you set up your environment.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. code:: python

         vector_store_index = VectorStoreIndex.from_documents(
            sample_data, storage_context=vector_store_context, show_progress=True
         )
         
      .. tip:: 

         After running the sample code, if you're using |service|, you can verify your vector embeddings
         by navigating to the ``llamaindex_db.test`` namespace
         :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`.
         
