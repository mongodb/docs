To enable vector search queries on your vector store,
create an {+avs+} index on the ``langchain_db.test`` collection.

In your notebook, run the following code to create
an index of the :ref:`vectorSearch <avs-types-vector-search>` type
that specifies indexing the following fields:

- ``embedding`` field as the :ref:`vector <avs-types-vector-search>` type. The ``embedding`` field contains the embeddings
  created using OpenAI's ``text-embedding-ada-002`` embedding model. The index definition specifies ``1536`` vector dimensions 
  and measures similarity using ``cosine``.
- ``page`` field as the :ref:`filter <avs-types-vector-search>` type for pre-filtering data by the page number in the PDF.

.. code-block:: python
   :copyable: true 
   :linenos: 

   # Create your index model, then create the search index
   search_index_model = SearchIndexModel(
      definition={
         "fields": [
            {
            "type": "vector",
            "path": "embedding",
            "numDimensions": 1536,
            "similarity": "cosine"
            },
            {
            "type": "filter",
            "path": "page"
            }
         ]
      },
      name="vector_index",
      type="vectorSearch"
   )

   atlas_collection.create_search_index(model=search_index_model)

The index should take about one minute to build. While it builds, the index is in an :ref:`initial sync <troubleshoot-initial-sync>`
state. When it finishes building, you can start querying the data in your collection.