a. Install the MongoDB Kotlin Coroutine Driver.

   For more detailed installation instructions and version compatibility,
   see the :ref:`MongoDB Kotlin Coroutine Driver documentation
   <kotlin-quickstart>`.

#. Define the index.

   Create a file named ``VectorIndex.kt``. Copy and paste the following
   code into the file.

   .. literalinclude:: /includes/avs/index-management/create-index/basic-example-coroutine.kt
      :language: kotlin
      :copyable: true
      :caption: VectorIndex.kt
      :emphasize-lines: 12
      :linenos:

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst

   This code also includes a polling mechanism to check if the index is ready to use.

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Run the ``VectorIndex.kt`` file in your IDE.
   The output should resemble the following:
   
   .. literalinclude:: /includes/avs/index-management/create-index/create-index-output.sh
