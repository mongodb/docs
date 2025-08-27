.. procedure::
   :style: normal
      
   .. step:: Create a file named ``create-embeddings.js`` and paste the following code.
            
      Use the following code to generate embeddings from an existing
      collection. This code uses the ``getEmbedding()`` 
      function that you defined and the :driver:`Node.js Driver </node/current/>` 
      to generate embeddings from an array of sample texts and ingest them 
      into the ``sample_db.embeddings`` collection.

      .. collapsible::
         :heading: (Advanced) Compress your embeddings.
         :sub_heading: Expand this section if you defined the function to convert your embeddings to BSON binary format.
         :expanded: false
         
         If you defined the ``convertEmbeddingsToBSON`` function,  
         uncomment lines ``3`` and ``32``-``33``  to convert your 
         embeddings to |bson| ``binData`` vectors.

      .. literalinclude:: /includes/avs/tutorial/create-embeddings-new.js
         :language: javascript
         :copyable:
         :linenos:
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
       
      .. include:: /includes/avs/facts/fact-view-embeddings-atlas-ui-new-data.rst
