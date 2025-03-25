a. When the sample data finishes loading, click :guilabel:`Create Search Index`.

#. Make the following selections on the page and then click :guilabel:`Next`.

   .. include:: /includes/nav/list-table-configure-index.rst

#. Define the index.

   .. tabs:: 

      .. tab:: Visual Editor 
         :tabid: vib 

         .. include:: /includes/avs/shared/avs-vib-description-short.rst

         .. include:: /includes/avs/extracts/steps-avs-index-quantization.rst
   
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
                "path": "plot_embedding",
                "numDimensions": 1536,
                "similarity": "dotProduct"
                "quantization": "scalar"
                }]
            }

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst

#. Click :guilabel:`Next`.

#. Click :guilabel:`Create Vector Search Index`. 

   The index should take about one minute to build. When your vector index is 
   finished building, the :guilabel:`Status` column reads :guilabel:`Active`.
 