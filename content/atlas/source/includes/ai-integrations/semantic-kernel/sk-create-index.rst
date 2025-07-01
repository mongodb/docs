.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst
      
   .. step:: Define the {+avs+} index.

      This index definition indexes the 
      ``embedding`` field as the :ref:`vector
      <avs-types-vector-search>` type. The ``embedding`` field
      contains the embeddings created using OpenAI's
      ``text-embedding-ada-002`` embedding model. The index
      definition specifies ``1536`` vector dimensions and
      measures similarity using ``cosine``.
      
      .. tabs:: 

         .. tab:: Visual Editor 
            :tabid: vib 

            .. include:: /includes/avs/shared/avs-vib-description-short.rst

            To configure the index, select :guilabel:`Cosine` 
            from the :guilabel:`Similarity Method` dropdown.

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
                        "path": "embedding",
                        "numDimensions": 1536,
                        "similarity": "cosine"
                     }
                  ]
               }

   .. step:: Click :guilabel:`Next` to review the index. 

   .. include:: /includes/avs/index-examples/steps-avs-finish-index-creation.rst
