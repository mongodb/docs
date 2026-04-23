.. procedure::
   :style: normal

   .. step:: Install the MongoDB Kotlin Coroutine Driver.

      For more detailed installation instructions and version compatibility,
      see the :ref:`MongoDB Kotlin Coroutine Driver documentation
      <kotlin-quickstart>`.

   .. step:: Define the index.

      Create a file named ``VectorIndex.kt``. Copy and paste the following
      code into the file.

      .. literalinclude:: /includes/quick-start/code-snippets/kotlin/basic-example-coroutine.kt
         :language: kotlin
         :copyable: true
         :caption: VectorIndex.kt
         :emphasize-lines: 12
         :linenos:

      .. include:: /includes/quick-start/facts/avs-quick-start-basic-index-description.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Run the ``VectorIndex.kt`` file in your IDE.
   
      The output should resemble the following:
   
      .. literalinclude:: /includes/quick-start/code-snippets/shell/create-index-output.sh
