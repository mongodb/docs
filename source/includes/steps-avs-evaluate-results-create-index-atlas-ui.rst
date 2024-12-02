.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. step:: Create an {+avs+} index.

      To create, click :guilabel:`Create Search Index`.

   .. step:: Select :guilabel:`JSON Editor` under :guilabel:`Atlas Vector Search` and click :guilabel:`Next`. 

   .. step:: Enter the :guilabel:`Index Name`, and set the :guilabel:`Database and Collection`.

      a. In the :guilabel:`Index Name` field, enter a name for the index.

         .. note:: 

            Index name must be unique within the namespace, regardless
            of the index type.
         
         .. example::
         
            Enter **vector_index** as the name for this index. If
            you already have an index named *vector_index* on this
            collection, enter a different name for the index. 

      #. In the :guilabel:`Database and Collection` section, find the 
         database, and select the collection.

         .. example:: 

            In the :guilabel:`Database and Collection` section, find the
            ``sample_mflix`` database, and select the ``embedded_movies``
            collection.

   .. step:: Specify an index definition.

      .. example:: 

         This index definition indexes the ``plot_embedding`` field as the
         ``vector`` type with automatic binary ``quantization`` enabled
         and the ``genres`` field as the ``filter`` type in an {+avs+}
         index. The ``plot_embedding`` field contains embeddings created
         using OpenAI's ``text-embedding-ada-002`` embeddings model. The
         index definition specifies ``1536`` vector dimensions and measures
         distance using ``euclidean`` similarity function.

         .. code-block:: json 
            :linenos:

            {
              "fields": [
                {
                  "numDimensions": 1536,
                  "path": "plot_embedding",
                  "similarity": "euclidean",
                  "type": "vector",
                  "quantization": "binary"
                },
                {
                  "path": "genres",
                  "type": "filter"
                }
              ]
            }

   .. step:: Click :guilabel:`Next` to review the index. 

   .. include:: /includes/steps-fts-finish-index-creation.rst
