a. Install the MongoDB Kotlin Sync Driver.

   For more detailed installation instructions and version compatibility,
   see the :ref:`MongoDB Kotlin Sync Driver documentation
   <kotlin-sync-download-install>`.

#. Define the index.

   Create a file named ``VectorIndex.kt``. Copy and paste the following
   code into the file.

   .. literalinclude:: /includes/avs/index-management/create-index/basic-example-sync.kt
      :language: kotlin
      :copyable: true
      :caption: VectorIndex.kt
      :emphasize-lines: 9
      :linenos:

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst

   This code also includes a polling mechanism to check if the index is ready to use.

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Run the ``VectorIndex.kt`` file in your IDE.
   The output should resemble the following:
   
   .. literalinclude:: /includes/avs/index-management/create-index/create-index-output.sh
