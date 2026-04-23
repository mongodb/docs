.. procedure::
   :style: normal

   .. step:: Construct your vector search query.

      .. include:: /includes/quick-start/facts/fact-avs-quick-start-intro.rst

      a. Create a file named ``atlasVectorSearchQuery.kt``.

      #. Copy and paste the following sample query into the
         ``atlasVectorSearchQuery.kt`` file:

         .. literalinclude:: /includes/quick-start/code-snippets/kotlin/basic-query-coroutine.kt
            :language: kotlin
            :linenos:

      .. include:: /includes/quick-start/facts/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.

      Run the ``atlasVectorSearchQuery.kt`` file in your IDE.
      The output should resemble the following:

      .. literalinclude:: /includes/quick-start/code-snippets/go/basic-query-kotlin-output.js
         :language: js
         :linenos:
