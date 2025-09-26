.. procedure:: 
   :style: normal 

   .. step:: Add the Go Driver to your project.

      Add the Go Driver as a dependency in your project:

      .. code-block:: sh

         go get go.mongodb.org/mongo-driver/v2/mongo

   .. step:: Define the index.

      Create a file named ``vector-index.go`` and copy and paste the
      following code into the file. 

      This index definition indexes the ``plot_embedding_voyage_3_large`` field
      as the ``vector`` type and the ``genres`` and ``year`` fields
      as the ``filter`` type in a {+avs+} index. The ``plot_embedding_voyage_3_large``
      field contains embeddings created using |voyage|'s
      ``voyage-3-large`` embedding model. The index definition
      specifies ``2048`` vector dimensions and measures similarity using
      ``dotProduct`` function.

      .. literalinclude:: /includes/avs/index-management/create-index/filter-example.go
         :language: go
         :copyable: true
         :caption: vector-index.go
         :emphasize-lines: 18
         :linenos:

   .. step:: Replace the ``<connection-string>`` in the code and then save the file.

      .. include:: /includes/search-shared/find-connection-string.rst

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
