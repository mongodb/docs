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

      .. code-block:: console

         ollama pull hf.co/MongoDB/voyage-4-nano-GGUF:Q8_0

   .. step:: Generate embeddings.

      a. Create a ``common`` directory to store code that you'll reuse in
         multiple steps.

         .. code-block:: console

            mkdir common && cd common

      #. Create a file called ``get-embeddings.go``, and paste the following code
         into it:

         .. literalinclude:: /code-examples/tested/go/driver/vector_search/local_rag/get_embeddings.snippet.get-embeddings.go
            :language: go
            :caption: get-embeddings.go
            :category: usage example

      #. To simplify marshalling and unmarshalling documents in this collection
         to and from BSON, create a file called ``models.go`` and paste the
         following code into it:

         .. literalinclude:: /code-examples/tested/go/driver/vector_search/local_rag/models.snippet.models.go
            :language: go
            :caption: models.go
            :category: usage example

      #. Return to the root directory.

         .. code-block::

            cd ../

      #. Create another file called ``generate-embeddings.go`` and paste the
         following code into it:

         .. literalinclude:: /code-examples/tested/go/driver/vector_search/local_rag/generate_embeddings.snippet.generate-embeddings.go
            :language: go
            :caption: generate-embeddings.go
            :category: usage example

         In this example, we set a limit of 250 documents when generating
         embeddings. The process to generate embeddings for the more than
         5000 documents in the collection is slow. If you want to change the
         number of documents you're generating embeddings for:

         - Change the number of documents: Adjust the ``.SetLimit(250)``
           number in the ``findOptions`` variable.
         - Generate embeddings for all documents: Omit the ``findOptions``
           argument from the ``Find()`` call.

      #. Run the following command to execute the code:

         .. io-code-block:: 
            :copyable: true

            .. input::
               :language: shell

               go run generate-embeddings.go

            .. output::
               :language: console

               2025/03/11 11:26:58 Generating embeddings.
               2025/03/11 11:27:00 250 documents updated successfully.
