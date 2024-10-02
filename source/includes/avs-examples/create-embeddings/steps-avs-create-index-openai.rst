To enable vector search queries on your data,
you must create an {+avs+} index on your
collection.

a. Paste the following code in your notebook.
   
   This code creates an index on 
   your collection that specifies the 
   ``embedding`` field as the :ref:`vector
   <avs-types-vector-search>` type, the similarity measure 
   as ``euclidean``, and the number of dimensions as ``1536``.

   .. code-block:: python
      :copyable: true 

      from pymongo.operations import SearchIndexModel

      # Create your index model, then create the search index
      search_index_model = SearchIndexModel(
        definition = {
          "fields": [
            {
              "type": "vector",
              "path": "embedding",
              "similarity": "euclidean",
               "numDimensions": 1536
            }
          ]
        },
        name="vector_index",
        type="vectorSearch",
      )
      collection.create_search_index(model=search_index_model)

#. Run the code.
 
   .. include:: /includes/fact-index-build-initial-sync.rst
            
To learn more, see :ref:`avs-create-index`.
  