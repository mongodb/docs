.. procedure::
   :style: normal

   .. include:: /includes/crud-embeddings/manual/procedures/steps-avs-go-config.rst

   .. step:: Create a ``.env`` file to manage secrets.

      In your project, create a ``.env`` file to store your MongoDB connection string
      and OpenAI API token.

      .. code-block::

         OPENAI_API_KEY = "<api-key>"
         MONGODB_URI = "<connection-string>"

      Replace the ``<api-key>`` placeholder value with your OpenAI API key.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Define a function to generate vector embeddings.

      a. Create a directory in your project called ``common`` to store code
         you'll use in multiple steps:

         .. code-block::

            mkdir common && cd common

      #. Create a file named ``get-embeddings.go`` and paste 
         the following code. This code defines a function named ``GetEmbeddings()`` 
         that uses OpenAI's ``text-embedding-3-small`` model to generate an 
         embedding for a given input.

         .. literalinclude:: /includes/rag/code-snippets/ingest/go/get-embeddings-openai.go
            :language: go
            :copyable:
            :caption: get-embeddings.go

   .. step:: Install and import dependencies.

      .. code-block::

         go mod tidy

   .. step:: Change directories back to your project root.

      .. code-block::

         cd ..
      