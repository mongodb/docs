.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Specify the index definition.

      .. example:: 

         This index definition indexes the ``plot_embedding_voyage_3_large`` field as the
         ``vector`` type with automatic binary ``quantization`` enabled
         and the ``genres`` field as the ``filter`` type in a {+avs+}
         index. The ``plot_embedding_voyage_3_large`` field contains embeddings created
         using |voyage|'s ``voyage-3-large`` embedding model. The
         index definition specifies ``2048`` vector dimensions and measures
         distance using ``dotProduct`` similarity function.

      .. tabs:: 

         .. tab:: Visual Editor 
            :tabid: vib 

            |service| automatically detects fields that contain vector embeddings,
            as well as their corresponding dimensions. For the |avs-namespace|
            collection, select the |embedding-field-name| field. 

            .. include:: /includes/avs/extracts/steps-avs-index-quantization-filters.rst
               
         .. tab:: JSON Editor 
            :tabid: jsoneditor 

            Paste the following index definition in the JSON editor:

            .. code-block:: json 
               :linenos:

               {
                 "fields": [
                   {
                     "numDimensions": 2048,
                     "path": "plot_embedding_voyage_3_large",
                     "similarity": "dotProduct",
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

   .. include:: /includes/avs/index-examples/steps-avs-finish-index-creation.rst
