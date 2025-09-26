To enable vector search queries on your data,
you must create a {+avs+} index on your
collection.

a. Paste the following code in your notebook.

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
              "similarity": "dotProduct",
              "numDimensions": <dimensions>
            }
          ]
        },
        name="vector_index",
        type="vectorSearch"
      )
      collection.create_search_index(model=search_index_model)

#. Replace the ``<dimensions>`` placeholder with one of 
   the following values:

   - ``768`` if you used ``nomic-embed-text-v1``
   - ``1024`` if you used ``voyage-3-large``
   - ``1536`` if you used ``text-embedding-3-small``

#. Run the code.
 
   .. include:: /includes/search-shared/fact-index-build-initial-sync.rst
            
To learn more, see :ref:`avs-create-index`.
