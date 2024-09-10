.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-avs-nodejs-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following command:

      .. code-block::

         npm install mongodb openai

   .. step:: Create vector embeddings and store them in |service|.

      a. Create a file named ``create-embeddings.js`` and paste 
         the following code. This code does the following:

         - Creates and exports an asynchronous function named ``getEmbedding`` 
           that uses OpenAI's ``text-embedding-3-small`` model to generate an 
           embedding for a given input.
         - Generates embeddings from the sample text data and 
           ingests them into the ``sample_db.embeddings`` 
           collection in |service| by using the MongoDB 
           :driver:`Node.js Driver </nodejs/>`.

         .. literalinclude:: /includes/avs-examples/tutorial/create-embeddings-openai.js
            :language: js
            :copyable:
            :caption: create-embeddings.js

      #. Replace the following placeholder values:

         - ``<apiKey>`` with your OpenAI |api| key.
         - ``<connectionString>`` with your |service| {+cluster+}'s |srv| 
           :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

         .. note::
            
            .. include:: /includes/fact-connection-string-format-drivers.rst
      
      #. Save the file, then run the following command:

         .. io-code-block:: 
            :copyable: true 

            .. input::
               :language: sh

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
         <atlas-ui-view-collections>`
         by navigating to the ``sample_db.embeddings`` collection in your {+cluster+}.
