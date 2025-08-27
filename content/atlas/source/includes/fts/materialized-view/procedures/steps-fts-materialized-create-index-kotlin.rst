.. procedure::
   :style: normal

   .. step:: Define the index.

      Create a ``CreateIndex.kt`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into this file.

      .. literalinclude:: /includes/fts/materialized-view/create-index-example.kt
         :language: kotlin
         :caption: CreateIndex.kt
         :linenos:
         :copyable: true

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Compile and run the file to create the index.

      Compile and run your application in your IDE or your shell. 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            kotlinc CreateIndex.kt -include-runtime -d CreateIndex.jar
            java -jar CreateIndex.jar

         .. output::
            :visible: false

            New index name: monthlySalesIndex
