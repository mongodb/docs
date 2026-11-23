.. procedure:: 
   :style: normal 

   .. step:: Download the local embedding model.

      This example uses the `voyage-4-nano
      <https://huggingface.co/voyageai/voyage-4-nano>`__ embedding model,
      which you run locally with Ollama by using the official GGUF build
      from the `MongoDB Hugging Face organization
      <https://huggingface.co/MongoDB/voyage-4-nano-GGUF>`__. This model
      requires Ollama 0.40.7 or later. Use only the official build because
      community GGUF conversions are incompatible with the voyage-4
      embedding space.

      Run the following command to pull the embedding model:

      .. code-block:: shell

         ollama pull hf.co/MongoDB/voyage-4-nano-GGUF:Q8_0

   .. step:: Generate embeddings.

      a. Create a file called ``get-embeddings.js``, and paste the following code
         into it:

         .. literalinclude:: /code-examples/tested/javascript/driver/vector_search/local_rag/get-embeddings.snippet.local-rag-get-embeddings.js
            :language: javascript
            :caption: get-embeddings.js
            :category: usage example

      #. Create another file called ``generate-embeddings.js`` and paste the
         following code into it:

         .. literalinclude:: /code-examples/tested/javascript/driver/vector_search/local_rag/generate-embeddings.snippet.local-rag-create-embeddings.js
            :language: javascript
            :caption: generate-embeddings.js
            :category: usage example

         For a subset of documents in the collection, this code generates an
         embedding from the document's ``summary`` field, then updates the
         document with a new field called ``embeddings`` that contains the
         embedding.

      #. Run the following command to execute the code:

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: shell

               node --env-file=.env generate-embeddings.js

            .. output:: /code-examples/tested/javascript/driver/vector_search/local_rag/local-rag-create-embeddings-output.sh
               :language: console
               :visible: false
