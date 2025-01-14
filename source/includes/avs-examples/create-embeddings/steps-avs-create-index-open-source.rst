To enable vector search queries on your data,
you must create an {+avs+} index on your
collection.

a. Paste the following code in your notebook.
   
   This code creates an index on your collection that specifies the 
   ``embedding`` field as the :ref:`vector
   <avs-types-vector-search>` type, the similarity function 
   as ``dotProduct``, and the number of dimensions as ``768``.

   ..
      NOTE: If you edit this Python code, also update the Jupyter Notebooks
      at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/open-source-new-data.ipynb
      and https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/open-source-existing-data.ipynb

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
              "numDimensions": 768
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
