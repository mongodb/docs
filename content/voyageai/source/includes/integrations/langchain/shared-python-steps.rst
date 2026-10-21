.. step:: Load the sample data.

   This tutorial uses a publicly accessible PDF document about a
   MongoDB earnings report as the data source for your vector store.

   Add the following code to the ``langchain_get_started.py`` file to
   load the PDF and split the raw text into smaller documents:

   .. literalinclude:: /includes/integrations/langchain/python-openai/langchain_get_started.py
      :language: python
      :start-after: # start-load-data
      :end-before: # end-load-data

   The ``chunk_size`` and ``chunk_overlap`` parameters control the
   number of characters in each document and the number of characters
   that overlap between two consecutive documents. Each document
   includes a ``page_label`` field in its metadata, which you index as
   a filter in a future step.

.. step:: Instantiate MongoDB as a vector store.

   Add the following code to the ``langchain_get_started.py`` file to
   create a vector store instance named ``vector_store`` from the
   sample documents. This code specifies the following values:

   - Your MongoDB connection string.
   - ``voyage_db.langchain_python`` as the MongoDB namespace to store
     the documents.
   - ``voyage-4-large`` as the embedding model to convert
     the text into vector embeddings for the ``embedding`` field.
   - ``vector_index`` as the index to use when querying the vector
     store.

   .. literalinclude:: /includes/integrations/langchain/python-openai/langchain_get_started.py
      :language: python
      :start-after: # start-vector-store
      :end-before: # end-vector-store

.. step:: Create the MongoDB Vector Search index.

   To enable vector search queries on your vector store, create a
   MongoDB Vector Search index on the ``voyage_db.langchain_python``
   collection. Add the following code to the
   ``langchain_get_started.py`` file to create the index by using the
   LangChain helper method:

   .. literalinclude:: /includes/integrations/langchain/python-openai/langchain_get_started.py
      :language: python
      :start-after: # start-create-index
      :end-before: # end-create-index

   The index definition indexes the following fields:

   - ``embedding``: Indexed as the ``vector`` type with ``1024``
     dimensions, the default number of dimensions for the
     ``voyage-4-large`` model
   - ``page_label``: Indexed as the ``filter`` type, so you can
     pre-filter your data by the PDF page number

   The index takes about one minute to build. The code waits before it
   runs any queries, because the index must finish indexing your
   documents before it can return results.

.. step:: Run semantic search queries.

   Add the following code to the ``langchain_get_started.py`` file to
   run vector search queries on your data:

   .. literalinclude:: /includes/integrations/langchain/python-openai/langchain_get_started.py
      :language: python
      :start-after: # start-search
      :end-before: # end-search

   The preceding query uses the ``similarity_search_with_score()``
   method to perform a semantic search for the string ``New AI product
   partnerships``. It specifies the ``k`` parameter to return only
   the three most relevant documents, each with a relevance score
   between ``0`` and ``1``.

   To pre-filter your data, pass a ``pre_filter`` argument that
   matches specific field values. The following query returns only
   documents that appear on page 2 of the PDF:

   .. literalinclude:: /includes/integrations/langchain/python-openai/langchain_get_started.py
      :language: python
      :start-after: # start-search-filtered
      :end-before: # end-search-filtered
