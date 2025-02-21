.. procedure::
   :style: normal
      
   .. step:: Create a file named ``create-embeddings.js`` and paste the following code.
            
      Use the following code to generate embeddings from an existing
      collection in |service|.
      
      Specifically, this code uses the ``getEmbedding`` function 
      that you defined and the MongoDB :driver:`Node.js Driver </nodejs/>` 
      to generate embeddings from an array 
      of sample texts and ingest them into the ``sample_db.embeddings`` 
      collection in |service|.

      .. literalinclude:: /includes/avs-examples/tutorial/create-embeddings-new.js
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
                  [ 0.031927742, -0.014192767, -0.021851597, 0.045498233, -0.0077904654, ... ]
                  [ -0.01664538, 0.013198251, 0.048684783, 0.014485021, -0.018121032, ... ]
                  [ 0.030449908, 0.046782598, 0.02126599, 0.025799986, -0.015830345, ... ]
                  Count of documents inserted: 3

         .. tab:: OpenAI
            :tabid: openai

            .. io-code-block:: 
               :copyable: true 

               .. input::

                  node --env-file=.env create-embeddings.js

               .. output:: 
                  :language: sh

                  Generating embeddings and inserting documents...
                  [ 0.031927742, -0.014192767, -0.021851597, 0.045498233, -0.0077904654, ... ]
                  [ -0.01664538, 0.013198251, 0.048684783, 0.014485021, -0.018121032, ... ]
                  [ 0.030449908, 0.046782598, 0.02126599, 0.025799986, -0.015830345, ... ]
                  Count of documents inserted: 3

      .. note::

         The number of dimensions in the output have been truncated for
         readability.
       
      You can also view your vector embeddings :ref:`in the {+atlas-ui+}
      <atlas-ui-view-collections>` by navigating to the ``sample_db.embeddings`` 
      collection in your {+cluster+}.
