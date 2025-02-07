.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Specify the index definition.

      .. example:: 

         This index definition indexes the ``plot_embedding`` field as the
         ``vector`` type with automatic binary ``quantization`` enabled
         and the ``genres`` field as the ``filter`` type in an {+avs+}
         index. The ``plot_embedding`` field contains embeddings created
         using OpenAI's ``text-embedding-ada-002`` embeddings model. The
         index definition specifies ``1536`` vector dimensions and measures
         distance using ``euclidean`` similarity function.

      .. tabs:: 

         .. tab:: Visual Editor 
            :tabid: vib 

            .. include:: /includes/avs-vib-description-short.rst

            .. include:: /includes/extracts/steps-avs-index-quantization-filters.rst
               
         .. tab:: JSON Editor 
            :tabid: jsoneditor 

            Paste the following index definition in the JSON editor:

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

   .. include:: /includes/steps-avs-finish-index-creation.rst
