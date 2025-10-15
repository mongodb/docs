.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Define the {+avs+} index. 
     
     In this step, you define an index of the :ref:`vectorSearch
     <avs-types-vector-search>` type for 
     the following fields: 
     
     - ``plot_embedding_voyage_3_large`` field as the :ref:`vector
       <avs-types-vector-search>` type. The ``plot_embedding_voyage_3_large`` field 
       contains embeddings created using |voyage|'s ``voyage-3-large`` embedding model. 
       The index definition specifies ``2048`` vector dimensions and
       measures similarity using ``dotProduct``. 
     - ``genres`` field as the :ref:`filter <avs-types-vector-search>`
       type for pre-filtering data by string values in the field.
     - ``year`` field as the :ref:`filter <avs-types-vector-search>`
       type for pre-filtering data by numeric values in the field.

     .. tabs::

        .. tab:: Visual Editor 
           :tabid: vib 

           |service| automatically detects fields that contain vector embeddings,
           as well as their corresponding dimensions. For the |avs-namespace|
           collection, the |embedding-field-name| and |voyage-embedding-field|
           fields displays. For this tutorial, you need to index only
           the |voyage-embedding-field| field. 

           .. include:: /includes/avs/extracts/steps-avs-index-quantization-filters.rst
            
        .. tab:: JSON Editor 
           :tabid: jsoneditor 

           Replace the default definition with the following index definition.

           .. code-block:: json 
              :copyable: true 
              :linenos: 

              {
                "fields": [
                  {
                    "type": "vector",
                    "path": "plot_embedding_voyage_3_large",
                    "numDimensions": 2048,
                    "similarity": "dotProduct",
                    "quantization": "scalar"
                  },
                  {
                    "type": "filter",
                    "path": "genres"
                  },
                  {
                    "type": "filter",
                    "path": "year"
                  }
                ]
              }

   .. step:: Click :guilabel:`Next` to review the index. 

   .. include:: /includes/avs/index-examples/steps-avs-finish-index-creation.rst
