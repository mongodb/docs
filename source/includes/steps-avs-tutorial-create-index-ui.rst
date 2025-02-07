.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Define the {+avs+} index. 
     
     In this step, you define an index of the :ref:`vectorSearch
     <avs-types-vector-search>` type for 
     the following fields: 
     
     - ``plot_embedding`` field as the :ref:`vector
       <avs-types-vector-search>` type. The ``plot_embedding`` field
       contains embeddings created using OpenAI's
       ``text-embedding-ada-002`` embedding model. The index
       definition specifies ``1536`` vector dimensions and
       measures similarity using ``dotProduct``. 
     - ``genres`` field as the :ref:`filter <avs-types-vector-search>`
       type for pre-filtering data by string values in the field.
     - ``year`` field as the :ref:`filter <avs-types-vector-search>`
       type for pre-filtering data by numeric values in the field.

     .. tabs::

        .. tab:: Visual Editor 
           :tabid: vib 

           .. include:: /includes/avs-vib-description-short.rst

           .. include:: /includes/extracts/steps-avs-index-quantization-filters.rst
            
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
                    "path": "plot_embedding",
                    "numDimensions": 1536,
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

   .. include:: /includes/steps-avs-finish-index-creation.rst
