.. procedure::
   :style: normal

   .. include:: /includes/avs/shared/steps-avs-go-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following commands:

      .. code-block::

         go get github.com/joho/godotenv
         go get go.mongodb.org/mongo-driver/v2/mongo
         go get github.com/tmc/langchaingo/llms

   .. step:: Create a ``.env`` file to manage secrets.

      In your project, create a ``.env`` file to store your |service| connection
      string and Hugging Face access token.

      .. code-block::

         HUGGINGFACEHUB_API_TOKEN = "<access-token>"
         ATLAS_CONNECTION_STRING = "<connection-string>"

      Replace the ``<access-token>`` placeholder value with your Hugging Face access token.

      .. include:: /includes/avs/shared/avs-replace-connection-string.rst

   .. step:: Define a function to generate vector embeddings.

      a. Create a directory in your project called ``common`` to store common code
         that you'll use in later steps:

         .. code-block::

            mkdir common && cd common

      #. Create a file named ``get-embeddings.go`` and paste 
         the following code. This code defines a function named ``GetEmbeddings``
         to generate an embedding for a given input. This function specifies:

         - The ``feature-extraction`` task using the `Go port of the LangChain
           <https://tmc.github.io/langchaingo/docs/>`__ library. To learn more,
           see the `Tasks <https://huggingface.co/docs/transformers.js/en/index#tasks>`__
           documentation in the LangChain JavaScript documentation.
         - The `mxbai-embed-large-v1 <https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1>`__ 
           embedding model.

         .. literalinclude:: /includes/avs/rag/get-embeddings.go
            :language: go
            :copyable:
            :caption: get-embeddings.go

         .. include:: /includes/avs/facts/note-hugging-face-503.rst

      #. Move back into the main project root directory.

         .. code-block:: console

            cd ../
