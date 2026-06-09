Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Set up your Java project with the MongoDB Java driver.
      
      .. include:: /includes/index/shared/code-snippets/add-java-dependency.rst

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Java Driver documentation </java/sync/current/get-started/>`.
      
   .. step:: Define the index.

      In your project's base package directory, create a file called
      ``CreateIndex.java`` and copy and paste the following code into
      this file:

      .. literalinclude:: /includes/index/field-types/string/code-snippets/java/CreateIndex.java
         :language: java
         :caption: CreateIndex.java
         :linenos:
         :copyable: true

      .. include:: /includes/index/shared/facts/find-connection-string.rst

   .. step:: Compile and run the file to create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            javac CreateIndex.java
            java CreateIndex

         .. output::
            :visible: false

            New index name: default
