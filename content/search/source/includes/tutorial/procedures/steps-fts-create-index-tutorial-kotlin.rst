.. procedure::
   :style: normal

   .. step:: Install the MongoDB Kotlin Coroutine Driver.

      Create a new Kotlin project and install the
      :ref:`MongoDB Kotlin Coroutine Driver documentation
      <kotlin-quickstart>`.

   .. step:: Define the index.

      Create a file named ``CreateIndex.kt``. Copy and paste the following
      code into the file.

      .. literalinclude:: /includes/tutorial/code-snippets/kotlin/CreateIndex.kt
         :language: kotlin
         :caption: CreateIndex.kt
         :emphasize-lines: 10
         :linenos:

      .. include:: /includes/index/shared/facts/find-connection-string.rst

   .. step:: Run the ``CreateIndex.kt`` file in your IDE.
