.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Specify the index definition.

      .. tabs:: 

         .. tab:: Visual Editor 
            :tabid: vib 

            |service| automatically detects fields that contain vector 
            embeddings, as well as their corresponding dimensions, 
            and pre-populates up to three vector fields. 
            To configure the index, do the following:

            .. include:: /includes/avs/extracts/steps-avs-index-general.rst

            To learn more about the {+avs+} index settings, see
            :ref:`avs-types-vector-search`. 

            .. example::

               .. tabs:: 

                  .. tab:: Basic Example
                     :tabid: basic

                     For the ``embedded_movies`` collection, the ``plot_embedding`` field displays. 

                     .. include:: /includes/avs/extracts/steps-avs-index-basic.rst

                     This index definition indexes only the vector
                     embeddings field (``plot_embedding``) for performing vector search.  

                  .. tab:: Advanced Example 
                     :tabid: advanced

                     For the ``embedded_movies`` collection, the ``plot_embedding`` field displays.

                     .. include:: /includes/avs/extracts/steps-avs-index-quantization-filters.rst

                     This index definition indexes the following fields: 
            
                     - A string field (``genres``) and a numeric field (``year``)
                       for pre-filtering the data. 
                     - The vector embeddings field (``plot_embedding``) for
                       performing vector search against pre-filtered data.       
                     
                     It also enables automatic quantization (``scalar``) for efficient 
                     processing of the embeddings.

         .. tab:: JSON Editor 
            :tabid: jsoneditor 

            An {+avs+} index resembles the following example: 

            .. code-block:: json
               :copyable: true 
               :linenos:

               {
                 "fields":[ 
                   {
                     "type": "vector",
                     "path": <field-to-index>,
                     "numDimensions": <number-of-dimensions>,
                     "similarity": "euclidean | cosine | dotProduct",
                     "quantization": "none | scalar | binary"
                   },
                   {
                     "type": "filter",
                     "path": "<field-to-index>"
                   },
                   ...
                 ]
               }

            To learn more about the fields in the index, see
            :ref:`avs-types-vector-search`. 

            .. example:: 

               .. include:: /includes/avs/tutorial/avs-openai-index-description.rst

               .. tabs:: 

                  .. tab:: Basic Example
                     :tabid: basic

                     The following index definition indexes only the vector
                     embeddings field for performing vector search.  

                     .. code-block:: json 
                        :linenos:

                        {
                          "fields": [{
                            "type": "vector",
                            "path": "plot_embedding",
                            "numDimensions": 1536,
                            "similarity": "dotProduct"
                          }]
                        }

                  .. tab:: Advanced Example 
                     :tabid: advanced

                     This index definition indexes the following fields: 
            
                     - A string field (``genres``) and a numeric field (``year``)
                       for pre-filtering the data. 
                     - The vector embeddings field (``plot_embedding``) for
                       performing vector search against pre-filtered data.
                     
                     It also enables automatic quantization (``scalar``) for efficient 
                     processing of the embeddings.

                     .. code-block:: json 
                        :linenos:

                        {
                          "fields": [{
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
                          }]
                        }

   .. step:: Click :guilabel:`Next` to review the index. 

   .. include:: /includes/avs/index-examples/steps-avs-finish-index-creation.rst
