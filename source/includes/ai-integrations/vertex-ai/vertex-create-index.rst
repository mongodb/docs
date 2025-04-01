.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-data-explorer.rst

   .. step:: Create the |avs-namespace| collection.

      a. Click the :guilabel:`+ Create Database` button. 
      #. For the :guilabel:`Database name` enter |database-name|.
      #. For the :guilabel:`Collection name`,  enter |collection-name|.
      #. Click :guilabel:`Create` to create the database and its 
         first collection.

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Define the {+avs+} index.

      This :ref:`vectorSearch <avs-types-vector-search>` type index definition 
      indexes the |embedding-field-name| field as the :ref:`vector
      <avs-types-vector-search>` type. The |embedding-field-name| field
      contains the vector embeddings created 
      using the embedding model that you specify in 
      your application. The index definition 
      specifies ``768`` vector dimensions and
      measures similarity using ``cosine``.

      .. tabs::

         .. tab:: Visual Editor 
            :tabid: vib 

            Specify |embedding-field-name| as the field to index and specify
            ``768`` dimensions.

            .. include:: /includes/extracts/steps-avs-index-basic.rst

         .. tab:: JSON Editor 
            :tabid: jsoneditor 

            Paste the following index definition in the JSON editor:

            .. code-block:: json 
               :copyable: true 
               :linenos: 

               {
                   "fields": [
                       {
                           "type":"vector",
                           "path":"vec",
                           "numDimensions":768,
                           "similarity": "cosine"
                       }
                   ]
               }

   .. step:: Click :guilabel:`Next` to review the index. 

   .. include:: /includes/steps-avs-finish-index-creation.rst
