.. procedure::
   :style: normal

   .. step:: Initialize your Go module.

      .. code-block:: sh
         :copyable: true

         mkdir go-vector-quickstart && cd go-vector-quickstart
         go mod init go-vector-quickstart

   .. step:: Add the Go Driver as a dependency in your project.

      .. code-block:: sh

         go get go.mongodb.org/mongo-driver/v2/mongo

      For more detailed installation instructions, see the
      :ref:`MongoDB Go Driver documentation <go-get-started>`.

   .. step:: Define the index.

      Create a file named ``vector-index.go``. Copy and paste the
      following code into the file.

      .. literalinclude:: /includes/unionwith/code-snippets/vector/go/create-index.go
         :language: go
         :copyable: true
         :caption: vector-index.go
         :emphasize-lines: 18
         :linenos:

      .. include:: /includes/unionwith/facts/vector/index-definition.rst

      This code also includes a polling mechanism to check if the index
      is ready to use.

   .. step:: Specify the ``<connectionString>``.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            go run vector-index.go

         .. output::
            :language: console

            2026/07/14 18:06:39 Creating the index.
            2026/07/14 18:06:41 Polling to confirm successful index creation.
            2026/07/14 18:06:41 NOTE: This may take up to a minute.
            2026/07/14 18:08:20 Name of Index Created: multiple-vector-search
