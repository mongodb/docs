.. procedure::
   :style: normal

   .. step:: When the sample data finishes loading, click :guilabel:`Create Search Index`.

   .. step:: Make the following selections on the page and then click :guilabel:`Next`.

      .. |database-name| replace:: ``sample_mflix``
      .. |collection-name| replace:: ``embedded_movies``
      .. |search-type| replace:: {+avs+}

      .. include:: /includes/shared/list-tables/list-table-configure-index.rst

   .. step:: Define the index.

      .. tabs:: 

         .. tab:: Visual Editor 
            :tabid: vib 

            .. include:: /includes/quick-start/facts/avs-vib-description-short.rst

            .. include:: /includes/quick-start/procedures/steps-avs-index-quantization.rst
      
         .. tab:: JSON Editor 
            :tabid: jsoneditor

            Copy and paste the following :ref:`vector search index definition <vector-search-quickstart-vector-index-definition>` 
            into the JSON Editor. 

            .. code-block::
               :copyable: true 
               :linenos: 

               {
                  "fields": [{
                  "type": "vector",
                  "path": "plot_embedding_voyage_3_large",
                  "numDimensions": 2048,
                  "similarity": "dotProduct",
                  "quantization": "scalar"
                  }]
               }

      .. include:: /includes/quick-start/facts/avs-quick-start-basic-index-description.rst

   .. step:: Click :guilabel:`Next`.

   .. step:: Click :guilabel:`Create Vector Search Index`. 

      The index should take about one minute to build. When your vector index is 
      finished building, the :guilabel:`Status` column reads :guilabel:`Active`.
