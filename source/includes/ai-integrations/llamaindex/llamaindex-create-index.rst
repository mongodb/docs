To enable vector search queries on your vector store,
create an {+avs+} index on the ``llamaindex_db.test`` collection.

In your notebook, run the following code to create
an index of the :ref:`vectorSearch <avs-types-vector-search>` type
that indexes the following fields:

- ``embedding`` field as the :ref:`vector
  <avs-types-vector-search>` type. The ``embedding`` field
  contains the embeddings created using OpenAI's
  ``text-embedding-ada-002`` embedding model. The index
  definition specifies ``1536`` vector dimensions and
  measures similarity using ``cosine``.
- ``metadata.page_label`` field as the :ref:`filter 
  <avs-types-vector-search>` type for pre-filtering data 
  by the page number in the PDF.

..
   NOTE: If you edit this Python code, also update the Jupyter Notebook
   at https://github.com/mongodb/docs-notebooks/blob/main/integrations/llamaindex.ipynb

.. code-block:: python
   :copyable: true 

   # Specify the collection for which to create the index
   collection = mongo_client["llamaindex_db"]["test"]

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
           "path": "metadata.page_label"
         }
       ]
     },
     name="vector_index",
     type="vectorSearch",
   )

   collection.create_search_index(model=search_index_model)

.. include:: /includes/fact-index-build-initial-sync.rst
