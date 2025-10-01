.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-data-explorer.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Define the {+avs+} index.

      .. tabs::

         .. tab:: Visual Editor 
            :tabid: vib 

            Specify |embedding-field-name| as the field to index and specify
            ``1536`` dimensions.

            .. include:: /includes/avs/extracts/steps-avs-index-basic.rst

         .. tab:: JSON Editor 
            :tabid: jsoneditor 

            Paste the following index definition in the JSON editor:

            .. code-block:: json 
               :copyable: true 
               :linenos: 

               {
                   "fields": [
                       {
                           "type": "vector",
                           "numDimensions": 1536,
                           "path": "plot_embedding",
                           "similarity": "dotProduct"
                       }
                   ]
               }

   .. step:: Click :guilabel:`Next` to review the index. 

   .. include:: /includes/avs/index-examples/steps-avs-finish-index-creation.rst
