.. procedure::
   :style: normal

   .. step:: Instantiate the retriever.
      
      The fastest way to configure ``MongoDBAtlasParentDocumentRetriever`` is to 
      use the ``from_connection_string`` method. This code specifies the following parameters:

      - ``connection_string``: Your |service| connection string to connect to your {+cluster+}.
      - ``child_splitter``: The text splitter to use to split the parent documents into smaller, child documents.
      - ``embedding_model``: The embedding model to use to embed the child documents.
      - ``database_name`` and ``collection_name``: The database and collection name for which to ingest the documents.
      - The following optional parameters to configure the ``MongoDBAtlasVectorSearch`` vector store:

        - ``text_key``: The field in the documents that contains the text to embed.
        - ``relevance_score``: The relevance score to use for the vector search query.
        - ``search_kwargs``: How many child documents to retrieve in the initial search.

      .. literalinclude:: /includes/ai-integrations/langchain/parent-document-retriever.py
         :language: python
         :copyable:

      .. tip::

         - `MongoDBAtlasParentDocumentRetriever API Reference <https://langchain-mongodb.readthedocs.io/en/latest/langchain_mongodb/retrievers/langchain_mongodb.retrievers.parent_document.MongoDBAtlasParentDocumentRetriever.html#langchain_mongodb.retrievers.parent_document.MongoDBAtlasParentDocumentRetriever>`__
         - `MongoDBAtlasVectorSearch API Reference <https://langchain-mongodb.readthedocs.io/en/latest/langchain_mongodb/vectorstores/langchain_mongodb.vectorstores.MongoDBAtlasVectorSearch.html>`__
         - `MongoDBDocStore API Reference <https://langchain-mongodb.readthedocs.io/en/latest/langchain_mongodb/docstores/langchain_mongodb.docstores.MongoDBDocStore.html#langchain_mongodb.docstores.MongoDBDocStore>`__

   .. step:: Ingest the data

      Then, run the following code to ingest the documents into |service| by using
      retriever's ``add_documents`` method. It takes the parent documents as an 
      input and ingests both parent and child documents based on how you configured 
      the retriever. 

      .. code-block:: python
         
         parent_doc_retriever.add_documents(docs)

   .. step:: *(Optional)* Verify your documents.

      After running the sample code, you can view the documents 
      :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
      by navigating to the ``langchain_db.parent_document`` collection in your {+cluster+}.

      Both parent and child documents have a ``page_content`` field that contains the
      chunked text. The child documents also have an additional ``embedding``
      field that contains the vector embeddings of the chunked text, and a 
      ``doc_id`` field that corresponds to the ``_id`` of the parent document.

      You can run the following queries in the {+atlas-ui+}, 
      replacing the ``<id>`` placeholder with a valid document ID:

      - To see child documents that share the same parent document ID:

        .. code-block:: json

           { doc_id: "<id>" }
             
      - To see the parent document of those child documents:

        .. code-block:: json
           
           { _id: "<id>" }
      