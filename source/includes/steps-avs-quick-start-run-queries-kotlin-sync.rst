.. procedure::
   :style: normal

   .. step:: Install the MongoDB Kotlin Sync Driver.

      For instructions on adding the driver as a dependency in your project,
      see the :ref:`MongoDB Kotlin Sync Driver documentation
      <kotlin-sync-download-install>`.

   .. step:: Construct your vector search query.

      .. include:: /includes/fact-avs-quick-start-intro.rst

      a. Create a file named ``atlasVectorSearchQuery.kt``.

      #. Copy and paste the following sample query into the
         ``atlasVectorSearchQuery.kt`` file:

         .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query-sync.kt
            :language: kotlin
            :linenos:

      .. include:: /includes/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers.rst

   .. step:: Run your query.

      Run the ``atlasVectorSearchQuery.kt`` file in your IDE.
      The output should resemble the following:

      .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query-nodejs-output.js
         :language: js
         :linenos:
