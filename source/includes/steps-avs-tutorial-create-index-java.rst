.. procedure:: 
   :style: normal 

   .. step:: Add the MongoDB Java Sync Driver to your project.

      a. Add the Java driver version 5.2 or higher as a dependency in your project:

         - If you are using Maven, add the following dependency to your
           ``pom.xml`` dependencies list:

           .. code-block:: xml
              :copyable: true

              <dependency>
                 <groupId>org.mongodb</groupId>
                 <artifactId>mongodb-driver-sync</artifactId>
                 <version>[5.2.0,)</version>
              </dependency>

         - If you are using Gradle, add the following dependency to your
           ``build.gradle`` dependencies list:

           .. code-block:: json
              :copyable: true

              dependencies {
                 implementation 'org.mongodb:mongodb-driver-sync:[5.2.0,)'
              }

      #. Add the Java driver JAR files to your ``CLASSPATH``.

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Java Driver documentation
      </java/sync/current/quick-start/#std-label-add-mongodb-dependency>`.

   .. step:: Define the index.

      Create a file named ``VectorIndex.java``. Copy and paste the following
      code into the file, and replace the ``<connectionString>`` placeholder
      value.

      .. literalinclude:: /includes/avs-examples/index-management/create-index/filter-example.java
         :language: java
         :copyable: true
         :caption: VectorIndex.java
         :emphasize-lines: 21
         :linenos:

      This index definition indexes the ``plot_embedding`` field
      as the ``vector`` type and the ``genres`` and ``year`` fields
      as the ``filter`` type in an {+avs+} index. The ``plot_embedding``
      field contains embeddings created using OpenAI's
      ``text-embedding-ada-002`` embeddings model. The index definition
      specifies ``1536`` vector dimensions and measures similarity using
      ``dotProduct`` function.

   .. step:: Run the file to create the index.

      Run the file in your IDE, or execute a command from the command line to
      run the code.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            javac VectorIndex.java
            java VectorIndex

         .. output::
            :language: console

            Successfully created a vector index named: [vector_index]
            It may take up to a minute for the index to build before you can query using it.
            Polling to confirm the index has completed building.
            vector_index index is ready to query
