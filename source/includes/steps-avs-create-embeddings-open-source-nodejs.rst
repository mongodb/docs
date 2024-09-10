.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-avs-nodejs-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following command:

      .. code-block::

         npm install mongodb @xenova/transformers

   .. step:: Create vector embeddings and store them in |service|.

      a. Create a file named ``create-embeddings.js`` and paste 
         the following code. This code does the following:

         - Creates and exports an asynchronous function named ``getEmbedding`` 
           to generate an embedding for a given input. This function also specifies:

           - The ``feature-extraction`` task from Hugging Face's `transformers.js <https://huggingface.co/docs/transformers.js/en/index>`__
             library. To learn more, see `Tasks <https://huggingface.co/docs/transformers.js/en/index#tasks>`__.
           - The `nomic-embed-text-v1 <https://huggingface.co/xenova/nomic-embed-text-v1>`__ 
             embedding model.

         - Generates embeddings from the sample text data and ingests
           them into the ``sample_db.embeddings`` 
           collection in |service| by using the MongoDB 
           :driver:`Node.js Driver </nodejs/>`.

         .. literalinclude:: /includes/avs-examples/tutorial/create-embeddings-open-source.js
            :language: js
            :copyable:
            :caption: create-embeddings.js

      #. Replace ``<connectionString>`` with your |service| {+cluster+}'s |srv| 
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

               [ -0.04323853924870491, -0.008460805751383305, 0.012494648806750774, -0.013014335185289383, ... ]
               [ -0.017400473356246948, 0.04922063276171684, -0.002836339408531785, -0.030395228415727615, ... ]
               [ -0.016950927674770355, 0.013881809078156948, -0.022074559703469276, -0.02838018536567688, ... ]

         .. note::

            The number of dimensions in the output have been truncated for
            readability.
            
         You can also view your vector embeddings :ref:`in the {+atlas-ui+} 
         <atlas-ui-view-collections>`
         by navigating to the ``sample_db.embeddings`` collection in your {+cluster+}.
