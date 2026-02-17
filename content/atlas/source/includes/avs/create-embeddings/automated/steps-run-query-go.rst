.. procedure::
   :style: normal

   .. step:: Create a new file named ``main.go``.

      Create a new Go file to connect to your deployment and query the
      auto-embedding {+avs+} index that you created in the previous step.

   .. step:: Copy and paste the sample code in the file.

      .. literalinclude:: /includes/avs/create-embeddings/automated/query.go
         :language: go
         :dedent:
         :start-after: start-query-go
         :end-before: end-query-go
         :linenos:
         :copyable: true
         :caption: main.go

   .. step:: Replace the ``<connection-string>`` placeholder.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Query your collection.

      Run the following command to query your collection:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            go run main.go

         .. output:: /includes/avs/create-embeddings/automated/go-query-output.js
            :language: text
            :visible: false
            :dedent: