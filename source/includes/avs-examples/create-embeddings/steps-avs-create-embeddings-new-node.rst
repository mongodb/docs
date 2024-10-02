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
          
   .. step:: Specify the connection string.

      Replace ``<connectionString>`` with your |service| {+cluster+}'s |srv| 
      :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      .. note::
         
         .. include:: /includes/fact-connection-string-format-drivers.rst

   .. step:: Save and run the file.

      .. tabs::
         :hidden:
         
         .. tab:: Open-Source
            :tabid: open-source
                  
            .. io-code-block:: 
               :copyable: true 

               .. input::

                  node create-embeddings.js

               .. output:: 
                  :language: sh

                  [ -0.04323853924870491, -0.008460805751383305, 0.012494648806750774, -0.013014335185289383, ... ]
                  [ -0.017400473356246948, 0.04922063276171684, -0.002836339408531785, -0.030395228415727615, ... ]
                  [ -0.016950927674770355, 0.013881809078156948, -0.022074559703469276, -0.02838018536567688, ... ]

         .. tab:: OpenAI
            :tabid: openai

            .. io-code-block:: 
               :copyable: true 

               .. input::

                  node create-embeddings.js

               .. output:: 
                  :language: sh

                  [ 0.031927742, -0.014192767, -0.021851597, 0.045498233, -0.0077904654, ... ]
                  [ -0.01664538, 0.013198251, 0.048684783, 0.014485021, -0.018121032, ... ]
                  [ 0.030449908, 0.046782598, 0.02126599, 0.025799986, -0.015830345, ... ]

      .. note::

         The number of dimensions in the output have been truncated for
         readability.
       
      You can also view your vector embeddings :ref:`in the {+atlas-ui+}
      <atlas-ui-view-collections>` by navigating to the ``sample_db.embeddings`` 
      collection in your {+cluster+}.
