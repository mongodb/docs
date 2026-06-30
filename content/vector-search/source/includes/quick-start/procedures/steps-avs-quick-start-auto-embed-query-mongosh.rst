.. procedure::
   :style: normal

   .. step:: Construct and run your vector search query.

      Copy and paste the following sample query into your terminal and then
      run it using {+mongosh+}.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/pipeline-stage/vectorSearch/code-snippets/shell/auto-embed-query-quickstart.sh
            :language: json
            :linenos:

         .. output:: /includes/pipeline-stage/vectorSearch/code-snippets/output/auto-embed-quickstart-query-shell-output.js
            :language: js
            :linenos:
            :visible: false

      For details on all the {+avs+} query settings for Automated Embedding, see
      :ref:`$vectorSearch syntax <vectorSearch-agg-pipeline-syntax>`.

      .. include:: /includes/quick-start/facts/fact-avs-auto-embed-quick-start-query-intro.rst

