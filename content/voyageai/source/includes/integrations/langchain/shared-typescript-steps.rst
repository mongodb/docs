.. step:: Load the sample data.

   This tutorial uses a publicly accessible PDF document about a
   MongoDB earnings report as the data source for your vector store.

   Add the following code inside the ``try`` block of your ``run``
   function to save the PDF locally, load it, and split the raw text
   into smaller documents:

   .. literalinclude:: /includes/integrations/langchain/typescript-openai/langchain-get-started.ts
      :language: typescript
      :start-after: // start-load-data
      :end-before: // end-load-data
      :dedent:

   The ``chunkSize`` and ``chunkOverlap`` parameters control the number
   of characters in each document and the number of characters that
   overlap between two consecutive documents. Each document includes a
   ``loc.pageNumber`` field in its metadata, which you index as a
   filter in a future step.

.. step:: Instantiate MongoDB as a vector store.

   Add the following code to the end of the ``try`` block. This code
   creates a vector store from the sample documents and specifies the
   following values:

   - ``voyage_db.langchain_typescript`` as the MongoDB namespace to
     store the documents.
   - The ``voyage-4-large`` embedding model from {+voyage+} to convert
     the text into vector embeddings for the ``embedding`` field.
   - ``vector_index`` as the index to use when querying the vector
     store.

   .. literalinclude:: /includes/integrations/langchain/typescript-openai/langchain-get-started.ts
      :language: typescript
      :start-after: // start-vector-store
      :end-before: // end-vector-store
      :dedent:

   .. important::

      Set the ``basePath`` option to ``https://ai.mongodb.com/v1`` when
      your {+model-api-key+} is created in |service|. The
      ``VoyageEmbeddings`` class defaults to
      ``https://api.voyageai.com/v1``, which does not accept |service|
      keys. If you created your key on the {+voyage+} platform, omit
      the ``basePath`` option.

.. step:: Create the MongoDB Vector Search index.

   To enable vector search queries on your vector store, create a
   MongoDB Vector Search index on the ``voyage_db.langchain_typescript``
   collection. Add the following code to the end of the ``try`` block:

   .. literalinclude:: /includes/integrations/langchain/typescript-openai/langchain-get-started.ts
      :language: typescript
      :start-after: // start-create-index
      :end-before: // end-create-index
      :dedent:

   The index definition indexes the following fields:

   - ``embedding``: Indexed as the ``vector`` type with ``1024``
     dimensions, the default number of dimensions for the
     ``voyage-4-large`` model
   - ``loc.pageNumber``: Indexed as the ``filter`` type, so you can
     pre-filter your data by the PDF page number

.. step:: Run semantic search queries.

   Add the following code to the end of the ``try`` block to run vector
   search queries on your data:

   .. literalinclude:: /includes/integrations/langchain/typescript-openai/langchain-get-started.ts
      :language: typescript
      :start-after: // start-search
      :end-before: // end-search-filtered
      :dedent:

   The first query uses the ``similaritySearchWithScore()`` method to
   perform a semantic search for the string ``New AI product
   partnerships`` and returns the three most relevant documents, each
   with a relevance score between ``0`` and ``1``. The second query
   passes a ``preFilter`` argument to return only documents that
   appear on page 2 of the PDF.
