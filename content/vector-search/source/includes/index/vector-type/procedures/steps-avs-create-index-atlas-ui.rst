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

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               For the ``embedded_movies`` collection, |service| displays the 
               ``plot_embedding_voyage_3_large`` and ``plot_embedding`` fields. 

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

            .. tab:: Stored Source Example
               :tabid: storedSource

               The ``storedSource`` option is not supported by the
               :guilabel:`Visual Editor`. Use the |json| Editor to
               configure ``fields`` for storage on ``mongot``.

      .. collapsible::
         :heading: JSON Editor
         :sub_heading: Use the JSON Editor to edit the raw JSON.
         :expanded: false

         {+avs+} index resembles the following example: 

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

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               The following index definition on the ``sample_mflix.embedded_movies`` 
               collection indexes only the ``plot_embedding_voyage_3_large`` field 
               using the ``dotProduct`` similarity function as the ``vector`` type 
               for performing vector search. It uses the default |hnsw| 
               ``indexingMethod``.

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

               The following index definition on the ``sample_mflix.embedded_movies`` 
               collection indexes the following fields: 
    
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

            .. tab:: Nested Field Example 
               :tabid: nested 

               Run the following Python script to create nested embeddings for the 
               ``reviews.comments`` field in the ``sample_airbnb.listingsAndReviews`` 
               collection after replacing following placeholder values:

               .. list-table:: 
                  :widths: 30 70 
                  :header-rows: 1

                  * - Placeholder 
                    - Valid Value 

                  * - ``<CONNECTION-STRING>``
                    - Cluster connection string. To learn more, see
                      :ref:`connect-via-driver`.

                  * - ``<API-KEY>``
                    - Voyage AI API key. To learn more, see
                      `Voyage AI API Keys <https://www.mongodb.com/docs/voyageai/management/api-keys/>`__.

               The script creates 1024-dimension embeddings using the 
               ``voyage-4-large`` model for the ``reviews.comments`` field in the 
               ``reviews`` array. It adds the embeddings to the ``reviews`` array 
               as a new field named ``comments_embedding``.

               .. literalinclude:: /includes/pipeline-stage/vectorSearch/code-snippets/python/add-nested-embeddings.py
                  :language: python
                  :linenos:
                  :copyable: true
              
               The following index definition on the ``sample_airbnb.listingsAndReviews`` 
               collection indexes the following fields:
    
               - The string fields (``address.country`` and ``property_type``), a 
                 numeric field (``bedrooms``), and a date field (``reviews.date``) 
                 for pre-filtering the data. 
               - The vector embeddings field (``reviews.comments_embedding``) for 
                 performing vector search against pre-filtered data.
               - The ``reviews`` array field as the ``nestedRoot`` field for indexing
                 nested vector fields.

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
