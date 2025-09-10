.. procedure::
   :style: normal

   .. step:: Set up your Java project with the MongoDB Java driver.

      .. include:: /includes/fts/field-types/add-java-dependency.rst

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Java Driver documentation </java/sync/current/get-started/>`.

   .. step:: Define the index.

      In your project's base package directory, create a
      ``CreateMaterializedView.java`` file and copy and paste the
      following code into this file.  

      .. include:: /includes/fts/string-tutorial/fact-data-transformation.rst

      .. literalinclude:: /includes/fts/string-tutorial/CreateMaterializedView.java
         :language: java
         :caption: CreateMaterializedView.java
         :linenos:
         :copyable: true

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Compile and run the file to create the index.

      Compile and run your application in your IDE or your shell. 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            javac CreateMaterializedView.java
            java CreateMaterializedView

         .. output::
            :visible: false

            Materialized view created!
