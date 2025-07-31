Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Set up your Java project with the MongoDB Java driver.

      .. include:: /includes/fts/field-types/add-java-dependency.rst

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Java Driver documentation
      </java/sync/current/quick-start/#std-label-add-mongodb-dependency>`.

   .. step:: Define the index.

      In your project's base package directory, create a 
      ``CreateIndex.java`` file and copy and paste the following code 
      into this file.  

      .. literalinclude:: /includes/fts/field-types/objectId/create-index-basic-placeholders.java
         :language: java
         :caption: CreateIndex.java
         :linenos:
         :copyable: true

      .. include:: /includes/fts/field-types/find-connection-string.rst

   .. step:: Compile and run the file to create the index.

      Compile and run your application in your IDE or your shell. 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            javac CreateIndex.java
            java CreateIndex

         .. output::
            :visible: false

            New index name: default