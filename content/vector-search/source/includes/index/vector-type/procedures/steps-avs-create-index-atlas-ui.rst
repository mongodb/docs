.. procedure:: 
   :style: normal 

   .. include:: /includes/shared/procedures/steps-atlas-search.rst

   .. include:: /includes/shared/procedures/steps-configure-index.rst

   .. step:: Specify the index definition.

      .. collapsible:: 
         :heading: Visual Editor
         :sub_heading: Use the Visual Editor for a guided experience.
         :expanded: false

         |service| automatically detects fields that contain vector 
         embeddings, as well as their corresponding dimensions, 
         and pre-populates up to three vector fields. 
         To configure the index, do the following:


         .. include:: /includes/index/vector-type/facts/steps-avs-index-general.rst

         To learn more about the {+avs+} index settings, see
         :ref:`avs-types-vector-search`. 

         .. include:: /includes/index/vector-type/facts/avs-voyageai-index-description.rst

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               For the ``embedded_movies`` collection, the ``plot_embedding_voyage_3_large`` field displays. 
               
               .. include:: /includes/index/vector-type/facts/steps-avs-index-basic.rst

               This index definition indexes only the vector
               embeddings field (``plot_embedding_voyage_3_large``) for
               performing vector search. By default, {+avs+} uses the |hnsw|
               ``indexingMethod`` for indexing the field.

            .. tab:: Filter Example 
               :tabid: advanced

               For the ``embedded_movies`` collection, |service| displays the
               ``plot_embedding_voyage_3_large`` and ``plot_embedding`` fields.

               .. include:: /includes/shared/procedures/steps-avs-index-quantization-filters.rst

               This index definition indexes the following fields: 
    
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding_voyage_3_large``) for
                 performing vector search against pre-filtered data.       
              
               It also enables automatic quantization (``scalar``) for efficient
               processing of the embeddings. By default, {+avs+} uses the |hnsw|
               ``indexingMethod`` for indexing the field.

      .. collapsible:: 
         :heading: JSON Editor 
         :sub_heading: Use JSON Editor to edit the raw JSON. 
         :expanded: false

         .. include:: /includes/shared/procedures/steps-avs-index-quantization-filters.rst

         A {+avs+} index resembles the following example: 

         .. code-block:: json
            :copyable: true 
            :linenos:

            {
              "fields":[ 
                {
                  "type": "vector",
                  "path": "<field-to-index>",
                  "numDimensions": <number-of-dimensions>,
                  "similarity": "euclidean | cosine | dotProduct",
                  "quantization": "none | scalar | binary"
                },
                {
                  "type": "filter",
                  "path": "<field-to-index>"
                },
                ...
              ],
              "nestedRoot": "<embedded-document-field-name>"
            }

         To learn more about the fields in the index, see
         :ref:`avs-types-vector-search`. 

         .. include:: /includes/index/vector-type/facts/avs-voyageai-index-description.rst

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
                      "path": "plot_embedding_voyage_3_large",
                      "numDimensions": 2048,
                      "similarity": "dotProduct"
                    }]
                  }

            .. tab:: Filter Example 
               :tabid: advanced

               This index definition indexes the following fields: 
            
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding_voyage_3_large``) 
                 using the |hnsw| ``indexingMethod`` for performing vector 
                 search against pre-filtered data.
                     
               It also enables automatic quantization (``scalar``) for efficient 
               processing of the embeddings and uses the |hnsw| ``indexingMethod``.

               .. code-block:: json 
                  :linenos:

                  {
                    "fields": [{
                      "type": "vector",
                      "path": "plot_embedding_voyage_3_large",
                      "numDimensions": 2048,
                      "similarity": "dotProduct",
                      "quantization": "scalar",
                      "indexingMethod": "hnsw"
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

            .. tab:: Flat Example 
                :tabid: flat 

                This index definition indexes the following fields: 
      
                - A string field (``genres``) and a numeric field (``year``)
                  for pre-filtering the data. 
                - The vector embeddings field (``plot_embedding_voyage_3_large``) 
                  using the ``flat`` indexing method for performing vector 
                  search against pre-filtered data.
                
                It also enables automatic quantization (``scalar``) for efficient 
                processing of the embeddings.

                .. code-block:: json 
                  :linenos:

                  {
                    "fields": [{
                      "type": "vector",
                      "path": "plot_embedding_voyage_3_large",
                      "numDimensions": 2048,
                      "similarity": "dotProduct",
                      "quantization": "scalar",
                      "indexingMethod": "flat"


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

            .. tab:: Stored Source Example
                :tabid: storedSource

                .. include:: /includes/index/vector-type/facts/stored-source-example.rst

                .. code-block:: json
                  :linenos:

                  {
                    "fields": [{
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
                    }],
                    "storedSource": {
                      "include": [
                        "genres", "plot", "title", "year"
                      ]
                    }
                  }

   .. step:: Click :guilabel:`Next` to review the index.

   .. include:: /includes/shared/procedures/steps-avs-finish-index-creation.rst
