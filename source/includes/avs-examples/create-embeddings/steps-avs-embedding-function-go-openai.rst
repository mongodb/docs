.. procedure::
   :style: normal

   .. include:: /includes/steps-avs-go-config.rst

   .. step:: Install and import dependencies.

      In a terminal window, run the following commands:

      .. code-block::

         go get github.com/joho/godotenv
         go get go.mongodb.org/mongo-driver/v2/mongo
         go get github.com/milosgajdos/go-embeddings/openai

   .. step:: Create a ``.env`` file to manage secrets.

      In your project, create a ``.env`` file to store your connection
      string and OpenAI API token.

      .. code-block::

         OPENAI_API_KEY = "<api-key>"
         ATLAS_CONNECTION_STRING = "<connection-string>"

      Replace the ``<api-key>`` 
      and ``<connection-string>`` placeholder values with your OpenAI API key
      and the |srv| :manual:`connection string 
      </reference/connection-string/#find-your-mongodb-atlas-connection-string>`
      for your |service| {+cluster+}.  Your connection string should use
      the following format:

      .. code-block::
      
         mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net

      .. note::
         
         .. include:: /includes/fact-connection-string-format-drivers.rst

   .. step:: Define a function to generate vector embeddings.

      a. Create a directory in your project called ``common`` to store code
         you'll use in multiple steps:

         .. code-block::

            mkdir common && cd common

      #. Create a file named ``get-embeddings.go`` and paste 
         the following code. This code defines a function named ``GetEmbeddings`` 
         that uses OpenAI's ``text-embedding-3-small`` model to generate an 
         embedding for a given input.

         .. literalinclude:: /includes/avs-examples/rag/get-embeddings-openai.go
            :language: go
            :copyable:
            :caption: get-embeddings.go

      #. Move back into the main project root directory.

         .. code-block:: console

            cd ../
      