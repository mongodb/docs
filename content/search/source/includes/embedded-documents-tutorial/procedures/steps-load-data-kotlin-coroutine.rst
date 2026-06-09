Create a Sample Collection and Load the Data 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You must begin by creating a collection named ``schools`` in an 
existing or new database on your cluster. After creating the 
collection, you must upload the sample data into your collection. To
learn more about the documents in the sample collection, see
:ref:`embedded-documents-tutorial-sample-collection`. 

The steps in this section walk you through creating a new database 
and collection, and loading the sample data into your collection.

.. procedure::
   :style: normal

   .. step:: Set up your Kotlin project with the MongoDB Kotlin Coroutine driver.

      .. include:: /includes/index/shared/code-snippets/add-kotlin-co-dependency.rst

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Kotlin Coroutine Driver documentation </kotlin/coroutine/current/quick-start/>`.

   .. step:: Create and populate the collections.
            
      .. literalinclude:: /includes/embedded-documents-tutorial/code-snippets/kotlin/sample-data.kt
         :language: kotlin
         :copyable:
         :linenos:

      .. include:: /includes/index/shared/facts/find-connection-string.rst

   .. step:: Compile and run the file to create the collection.

      Compile and run your application in your IDE or your shell. 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            kotlinc FileName.kt -include-runtime -d FileName.jar
            java -jar FileName.jar

         .. output::
            :visible: false

            Schools collection successfully created and populated.