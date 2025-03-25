.. procedure::
   :style: normal

   .. step:: Construct your vector search query.

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro.rst

      a. Create a file named ``atlasVectorSearchQuery.kt``.

      #. Copy and paste the following sample query into the
         ``atlasVectorSearchQuery.kt`` file:

         .. literalinclude:: /includes/avs/pipeline-stage-examples/basic-query-coroutine.kt
            :language: kotlin
            :linenos:

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.

      Run the ``atlasVectorSearchQuery.kt`` file in your IDE.
      The output should resemble the following:

      .. literalinclude:: /includes/avs/pipeline-stage-examples/basic-query-nodejs-output.js
         :language: js
         :linenos:
