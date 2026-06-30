.. procedure::
   :style: normal

   .. step:: Create a new file named ``main.go``.

      Create a new Go file to connect to your deployment and query the
      auto-embedding {+avs+} index that you created in the previous step.

   .. step:: Copy and paste the sample code in the file.

      .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/go/auto-embed-query.go
         :language: go
         :dedent:
         :linenos:
         :copyable: true
         :caption: main.go

      For details on all the {+avs+} query settings for Automated Embedding, see 
      :ref:`$vectorSearch syntax <vectorSearch-agg-pipeline-syntax>`.

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

         .. output:: /includes/quick-start/code-snippets/output/auto-embed-go-query-output.js
            :language: text
            :visible: false
            :dedent: