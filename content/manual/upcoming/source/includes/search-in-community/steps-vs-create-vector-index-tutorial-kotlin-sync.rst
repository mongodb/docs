.. procedure::
   :style: normal

   .. step:: Install the MongoDB Kotlin Coroutine Driver.

      For more detailed installation instructions and version compatibility,
      see the `MongoDB Kotlin Coroutine Driver documentation
      <https://www.mongodb.com/docs/languages/kotlin/kotlin-sync-driver/current/get-started/download-and-install/>`__.

   .. step:: Define your index in a new file.
      
      This example uses a file named ``VectorIndex.kt`` with the following index
      definition:

      .. literalinclude:: /includes/search-in-community/basic-example-coroutine.kt
         :language: kotlin
         :copyable: true
         :caption: VectorIndex.kt
         :emphasize-lines: 12
         :linenos:

      .. include:: /includes/search-in-community/vs-quick-start-basic-index-description.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Run your index creation file in your IDE.
      
      The output should resemble the following:
      
      .. literalinclude:: /includes/search-in-community/create-index-output.sh

   .. step:: Define your query in a new file.

      This example uses a file named ``vectorSearchQuery.kt`` with the
      following sample query:

      .. literalinclude:: /includes/search-in-community/basic-query-coroutine.kt
         :language: kotlin
         :emphasize-lines: 14
         :linenos:

      .. include:: /includes/search-in-community/fact-vs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.

      Run your query file in your IDE. The output should resemble the following:

      .. literalinclude:: /includes/search-in-community/basic-query-nodejs-output.js
         :language: js
         :linenos: