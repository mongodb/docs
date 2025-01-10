.. procedure:: 
   :style: normal 

   .. step:: Add the Go Driver to your project.

      Add the Go Driver as a dependency in your project:

      .. code-block:: sh

         go get go.mongodb.org/mongo-driver/mongo

   .. step:: Define the index.

      Create a file named ``vector-index.go``. Copy and paste the following
      code into the file, and replace the ``<connectionString>``
      placeholder value.

      .. literalinclude:: /includes/avs-examples/index-management/create-index/filter-example.go
         :language: go
         :copyable: true
         :caption: vector-index.go
         :emphasize-lines: 18
         :linenos:

      This index definition indexes the ``plot_embedding`` field
      as the ``vector`` type and the ``genres`` and ``year`` fields
      as the ``filter`` type in an {+avs+} index. The ``plot_embedding``
      field contains embeddings created using OpenAI's
      ``text-embedding-ada-002`` embeddings model. The index definition
      specifies ``1536`` vector dimensions and measures similarity using
      ``dotProduct`` function.

   .. step:: Run the following command to create the index.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            go run vector-index.go

         .. output::
            :language: shell

            2024/10/17 09:38:21 Creating the index.
            2024/10/17 09:38:22 Polling to confirm successful index creation.
            2024/10/17 09:38:22 NOTE: This may take up to a minute.
            2024/10/17 09:38:48 Name of Index Created: vector_index
