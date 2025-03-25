.. procedure::
   :style: normal
      
   .. step:: Create a file named ``create-embeddings.js`` and paste the following code.
            
      Use the following code to generate embeddings from an existing
      collection in |service|. This code uses the ``getEmbedding`` 
      function that you defined and the :driver:`Node.js Driver </nodejs/>` 
      to generate embeddings from an array of sample texts and ingest them 
      into the ``sample_db.embeddings`` collection in |service|.

      If you defined the ``convertEmbeddingsToBSON`` function,  
      uncomment lines ``3`` and ``32``-``33``  to convert your 
      embeddings to |bson| ``binData`` vectors.

      .. literalinclude:: /includes/avs/tutorial/create-embeddings-new.js
         :language: javascript
         :copyable:
         :caption: create-embeddings.js

   .. step:: Save and run the file.

      .. tabs::
         :hidden:
         
         .. tab:: Open-Source
            :tabid: open-source
                  
            .. io-code-block:: 
               :copyable: true 

               .. input::

                  node --env-file=.env create-embeddings.js

               .. output:: 
                  :language: sh

                  Generating embeddings and inserting documents...
                  Count of documents inserted: 3
       
      You can view your vector embeddings :ref:`in the {+atlas-ui+}
      <atlas-ui-view-collections>` by navigating to the ``sample_db.embeddings`` 
      collection in your {+cluster+}.
