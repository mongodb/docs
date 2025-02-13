
.. procedure::
   :style: normal

   .. step:: Load the sample data.

      For this tutorial, you use a publicly accessible 
      PDF document titled `MongoDB Atlas Best Practices 
      <https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP>`_
      as the data source for your vector store. This document describes
      various recommendations and core concepts for 
      managing your |service| deployments.

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
            !mkdir -p 'data/'
            !wget 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP' -O 'data/atlas_best_practices.pdf'
            sample_data = SimpleDirectoryReader(input_files=["./data/atlas_best_practices.pdf"]).load_data()
            
            # Print the first document
            sample_data[0]

         .. output:: 
            :language: json

            Document(id_='e9893be3-e1a3-4249-9355-e4f42539f508', embedding=None, metadata={'page_label': '1', 'file_name': 'atlas_best_practices.pdf', 
            'file_path': 'data/atlas_best_practices.pdf', 'file_type': 'application/pdf', 'file_size': 512653, 'creation_date': '2024-02-20', 
            'last_modified_date': '2020-10-27', 'last_accessed_date': '2024-02-20'}, excluded_embed_metadata_keys=['file_name', 'file_type', 'file_size', 
            'creation_date', 'last_modified_date', 'last_accessed_date'], excluded_llm_metadata_keys=['file_name', 'file_type', 'file_size', 'creation_date', 
            'last_modified_date', 'last_accessed_date'], relationships={}, text='Mong oDB Atlas Best P racticesJanuary 20 19A MongoD B White P aper\n', 
            start_char_idx=None, end_char_idx=None, text_template='{metadata_str}\n\n{content}', metadata_template='{key}: {value}', metadata_seperator='\n')
         
   .. step:: Instantiate the vector store.

      Run the following code to create a vector store 
      named ``atlas_vector_store`` by using the 
      ``MongoDBAtlasVectorSearch`` method, which
      specifies the following:
      
      - A connection to your |service| {+cluster+}.
      - ``llamaindex_db.test`` as the |service| database and collection 
        used to store the documents.
      - ``vector_index`` as the index to use for querying the vector store.

      Then, you save the vector store to a `storage context
      <https://docs.llamaindex.ai/en/stable/api_reference/storage/storage_context/>`__,
      which is a LlamaIndex container object used to prepare your data for storage.
      
      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. code-block:: python

         # Connect to your Atlas cluster
         mongo_client = pymongo.MongoClient(ATLAS_CONNECTION_STRING)

         # Instantiate the vector store
         atlas_vector_store = MongoDBAtlasVectorSearch(
             mongo_client,
             db_name = "llamaindex_db", 
             collection_name = "test",
             vector_index_name = "vector_index"
         ) 
         vector_store_context = StorageContext.from_defaults(vector_store=atlas_vector_store)

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
      |service| {+cluster+}, as specified by the vector store's storage context.
      
      .. note:: 

         This method uses the embedding model and chunk settings 
         that you configured when you
         :ref:`set up your environment <llamaindex-environment>`.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. code:: python

         vector_store_index = VectorStoreIndex.from_documents(
            sample_data, storage_context=vector_store_context, show_progress=True
         )
         
      .. tip:: 

         After running the sample code, you can
         view your vector embeddings :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
         by navigating to the ``langchain_db.test`` collection in your {+cluster+}.
         