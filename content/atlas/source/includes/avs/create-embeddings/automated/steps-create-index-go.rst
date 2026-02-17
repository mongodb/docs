.. procedure::
   :style: normal

   .. step:: Define the index in a Go file.

      To define a {+avs+} auto-embedding index, complete the following steps:

      a. Run the following command in your terminal to create a ``.go`` file in
         a Go project directory:

         .. code-block:: shell

            touch create-index.go

      b. Copy and paste the following index definition into the file:

         .. literalinclude:: /includes/avs/create-embeddings/automated/createIndex.go
            :language: go
            :copyable: true
            :start-after: start-create-index
            :end-before: end-create-index
            :caption: create-index.go
            :linenos:

      c. Replace the ``<connection-string>`` placeholder in the index definition
         with your deployment's connection string and save the file.

         To learn more, see :ref:`connect-via-driver`.

   .. step:: Create the index.

      To create the index, run the following command:

      .. code-block:: shell

         go run create-index.go