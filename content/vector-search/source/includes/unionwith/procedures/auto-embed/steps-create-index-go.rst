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

   .. step:: Define the indexes.

      a. Create a file named ``create-index.go``.

      #. Copy and paste the following code into the ``create-index.go``
         file.

         .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/go/create-index.go
            :language: go
            :copyable: true
            :caption: create-index.go
            :emphasize-lines: 17
            :linenos:

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-auto-embed.rst

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-vector.rst

   .. step:: Specify the ``<connectionString>``.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Create the indexes.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            go run create-index.go

         .. output::
            :language: console

            Creating the indexes.
            Polling to confirm successful index creation.
            NOTE: This may take up to a minute.
            Name of Index Created: multiple-auto-embed-search
            Name of Index Created: multiple-models-search
