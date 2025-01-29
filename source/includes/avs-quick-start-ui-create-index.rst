a. When the sample data finishes loading, click :guilabel:`Create Search Index`.

#. Under the :guilabel:`Atlas Vector Search` section, select the 
   :guilabel:`JSON Editor` and click :guilabel:`Next`.

#. In the :guilabel:`Database and Collection` section, expand the 
   ``sample_mflix`` database and select the ``embedded_movies`` collection.

   Each :term:`document` in this :term:`collection` contains information about a movie, 
   including a summary of the movie's plot as a string, which has also 
   been converted to and stored as a vector embedding in the document's ``plot_embedding`` field. 

#. In the :guilabel:`Index Name` field, specify ``vector_index``.

#. Copy and paste the following :ref:`vector search index definition <vector-search-quickstart-vector-index-definition>` 
   into the JSON Editor. 

   .. code-block::
      :copyable: true 
      :linenos: 

      {
        "fields": [{
          "type": "vector",
          "path": "plot_embedding",
          "numDimensions": 1536,
          "similarity": "dotProduct",
          "quantization": "scalar"
        }]
      }

   .. include:: /includes/avs-quick-start-basic-index-description.rst

#. Click :guilabel:`Next`.

#. Click :guilabel:`Create Search Index`. 

   The index should take about one minute to build. When your vector index is 
   finished building, the :guilabel:`Status` column reads :guilabel:`Active`.
