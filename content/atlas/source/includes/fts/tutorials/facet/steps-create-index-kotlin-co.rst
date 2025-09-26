Create the |fts| Index for Facet 
--------------------------------

In this section, you will create a |fts| index on the ``genres``, 
``year``, and ``released`` fields in the ``sample_mflix.movies`` 
collection. 

.. procedure::

   .. step:: Set up your Kotlin project with the MongoDB Kotlin Coroutine driver.

      .. include:: /includes/fts/tutorials/add-kotlin-co-dependency.rst

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Kotlin Coroutine Driver documentation </kotlin/coroutine/current/quick-start/>`.

   .. step:: Define the index.

      In your project's base package directory, create a 
      ``CreateIndex.kt`` file and copy and paste the following code 
      into this file.  

      .. literalinclude:: /includes/fts/tutorials/facet/CreateIndex.kt
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

            New index name: facet-tutorial