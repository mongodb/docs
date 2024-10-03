.. procedure::
   :style: normal

   .. include:: /includes/steps-avs-nodejs-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following command:

      .. code-block::

         npm install mongodb openai

   .. step:: Define a function to generate vector embeddings.

      a. Create a file named ``get-embeddings.js`` and paste 
         the following code. This code defines a function named ``getEmbedding`` 
         that uses OpenAI's ``text-embedding-3-small`` model to generate an 
         embedding for a given input.

         .. literalinclude:: /includes/avs-examples/rag/get-embeddings-openai.js
            :language: js
            :copyable:
            :caption: get-embeddings.js

      #. Replace ``<apiKey>`` with your OpenAI API key, then save the file.
      