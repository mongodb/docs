.. procedure::
   :style: normal

   .. include:: /includes/avs/shared/steps-avs-go-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following commands:

      .. code-block::

         go get github.com/joho/godotenv
         go get go.mongodb.org/mongo-driver/v2/mongo

   .. step:: Set your environment variables.

      In your terminal window, run the following commands
      to set the required environment variables.

      .. code-block::

         export VOYAGE_API_KEY="<api-key>"
         export MONGODB_URI="<connection-string>"

      Replace the ``<api-key>`` placeholder value with your Voyage API key.

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Define a function to generate vector embeddings.

      a. Create a directory in your project called ``common`` to store code
         you'll use in multiple steps:

         .. code-block::

            mkdir common && cd common

      #. Create a file named ``get-embeddings.go`` and paste 
         the following code. This code defines a function named ``GetEmbeddings()`` 
         that uses Voyage AI's ``voyage-3-large`` model to generate an 
         embedding for a given input.

         .. literalinclude:: /includes/avs/rag/ingest/get-embeddings-voyage.go
            :language: go
            :copyable:
            :caption: get-embeddings.go

      #. Move back into the main project root directory.

         .. code-block:: console

            cd ../
