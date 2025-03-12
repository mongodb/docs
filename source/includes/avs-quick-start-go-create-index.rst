a. Initialize your Go module:

   .. code-block:: sh
      :copyable: true

      mkdir go-vector-quickstart && cd go-vector-quickstart
      go mod init go-vector-quickstart

#. Add the Go Driver as a dependency in your project:

   .. code-block:: sh

      go get go.mongodb.org/mongo-driver/v2/mongo

   For more detailed installation instructions, see the
   :ref:`MongoDB Go Driver documentation <golang-quickstart>`.

#. Define the index.

   Create a file named ``vector-index.go``. Copy and paste the following
   code into the file.

   .. literalinclude:: /includes/avs-examples/index-management/create-index/basic-example.go
      :language: go
      :copyable: true
      :caption: vector-index.go
      :emphasize-lines: 18
      :linenos:

   .. include:: /includes/avs-quick-start-basic-index-description.rst

   This code also includes a polling mechanism to check if the index is ready to use.

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Run the following command to create the index.

   .. io-code-block::
      :copyable: true 

      .. input:: 
         :language: shell 

         go run vector-index.go

      .. output::
         :language: console

         2025/03/11 10:46:44 New search index named vector_index is building.
         2025/03/11 10:46:44 Polling to check if the index is ready. This may take up to a minute.
         2025/03/11 10:47:09 vector_index is ready for querying.
