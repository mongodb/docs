.. procedure::
   :style: normal

   .. include:: /includes/steps-avs-nodejs-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following command:

      .. code-block::

         npm install mongodb @xenova/transformers

   .. step:: Define a function to generate vector embeddings.

      Create a file named ``get-embeddings.js`` and paste 
      the following code. This code defines a function named
      to generate an embedding for a given input. This function specifies:

      - The ``feature-extraction`` task from Hugging Face's `transformers.js <https://huggingface.co/docs/transformers.js/en/index>`__
        library. To learn more, see `Tasks <https://huggingface.co/docs/transformers.js/en/index#tasks>`__.
      - The `nomic-embed-text-v1 <https://huggingface.co/xenova/nomic-embed-text-v1>`__ 
        embedding model.

      .. literalinclude:: /includes/avs-examples/rag/get-embeddings.js
         :language: js
         :copyable:
         :caption: get-embeddings.js
