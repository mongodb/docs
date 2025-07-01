.. procedure:: 
   :style: normal 

   .. step:: Download the local embedding model.

      This example uses the `nomic-embed-text
      <https://ollama.com/library/nomic-embed-text>`__ model
      from Ollama.

      Run the following command to pull the embedding model:

      .. code-block:: console

         ollama pull nomic-embed-text

   .. step:: Generate embeddings.

      a. Create a ``common`` directory to store code that you'll reuse in
         multiple steps.

         .. code-block:: console

            mkdir common && cd common

      #. Create a file called ``get-embeddings.go``, and paste the following code
         into it:

         .. literalinclude:: /includes/avs/local-rag/get-embeddings.go
            :language: go
            :caption: get-embeddings.go

      #. To simplify marshalling and unmarshalling documents in this collection
         to and from BSON, create a file called ``models.go`` and paste the
         following code into it:

         .. literalinclude:: /includes/avs/local-rag/models.go
            :language: go
            :caption: models.go

      #. Return to the root directory.

         .. code-block::

            cd ../

      #. Create another file called ``generate-embeddings.go`` and paste the
         following code into it:

         .. literalinclude:: /includes/avs/local-rag/generate-embeddings.go
            :language: go
            :caption: generate-embeddings.go
            :linenos:

         In this example, we set a limit of 250 documents when generating
         embeddings. The process to generate embeddings for the more than
         5000 documents in the collection is slow. If you want to change the
         number of documents you're generating embeddings for:
         
         - Change the number of documents: Adjust the ``.SetLimit(250)``
           number in the ``Find()`` options in line 51.
         - Generate embeddings for all documents: Omit the options in the
           ``Find()`` call in line 54.

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
