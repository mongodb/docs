.. procedure:: 
   :style: normal 

   .. step:: Add the MongoDB Java Sync Driver to your project.

      a. Add the Java driver version 5.2 or higher as a dependency in your
         project, depending on your package manager:

         .. tabs::

            .. tab:: Maven
               :tabid: maven

               If you are using Maven, add the following dependencies to the
               ``dependencies`` array in your project's ``pom.xml`` file:

               .. code-block:: xml
                  :caption: pom.xml

                  <dependencies>
                     <!-- MongoDB Java Sync Driver v5.2.0 or later -->
                     <dependency>
                        <groupId>org.mongodb</groupId>
                        <artifactId>mongodb-driver-sync</artifactId>
                        <version>[5.2.0,)</version>
                     </dependency>
                  </dependencies>

               .. tab:: Gradle
                  :tabid: gradle

                  If you are using Gradle, add the following to the ``dependencies``
                  array in your project's ``build.gradle`` file:

                  .. code-block:: json
                     :caption: build.gradle

                     dependencies {
                        // MongoDB Java Sync Driver v5.2.0 or later
                        implementation 'org.mongodb:mongodb-driver-sync:[5.2.0,)'
                     }

      #. Run your package manager to install the dependencies to your project.

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
         :emphasize-lines: 19
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
            :language: shell

            Successfully created a vector index named: [vector_index]
            It may take up to a minute for the index to build before you can query using it.
            Polling to confirm the index has completed building.
            vector_index index is ready to query
