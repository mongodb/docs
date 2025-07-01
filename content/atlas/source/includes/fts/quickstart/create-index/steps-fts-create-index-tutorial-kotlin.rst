a. Install the MongoDB Kotlin Coroutine Driver.

   Create a new Kotlin project and install the
   :ref:`MongoDB Kotlin Coroutine Driver documentation
   <kotlin-quickstart>`.

#. Define the index.

   Create a file named ``CreateIndex.kt``. Copy and paste the following
   code into the file.

   .. literalinclude:: /includes/fts/search-index-management/CreateIndex.kt
      :language: kotlin
      :caption: CreateIndex.kt
      :emphasize-lines: 10
      :linenos:

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Run the ``CreateIndex.kt`` file in your IDE.
