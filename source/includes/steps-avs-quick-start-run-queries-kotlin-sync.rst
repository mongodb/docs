.. procedure::
   :style: normal

   .. step:: Install the MongoDB Kotlin Sync Driver.

      Add the Kotlin Sync driver version 5.2 or higher as a dependency in your
      project:

      - If you are using Gradle, add the following dependency to your
         ``build.gradle`` dependencies list:

         .. code-block:: json
            :copyable: true

            dependencies {
               implementation 'mongodb-driver-kotlin-sync:5.2.0'
            }

      - If you are using Maven, add the following dependency to your
         ``pom.xml`` dependencies list:

         .. code-block:: xml
            :copyable: true

            <dependency>
               <groupId>org.mongodb</groupId>
               <artifactId>mongodb-driver-kotlin-sync</artifactId>
               <version>5.2.0</version>
            </dependency>

      For more detailed installation instructions and version compatibility,
      see the :ref:`MongoDB Kotlin Sync Driver documentation
      <kotlin-sync-download-install>`.

   .. step:: Construct your vector search query.

      .. include:: /includes/fact-avs-quick-start-intro.rst

      a. Create a file named ``atlasVectorSearchQuery.kt``.

      #. Copy and paste the following sample query into the
         ``atlasVectorSearchQuery.kt`` file:

         .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query-sync.kt
            :language: kotlin
            :linenos:

      .. include:: /includes/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers.rst

   .. step:: Run your query.

      Run the ``atlasVectorSearchQuery.kt`` file in your IDE.
      The output should resemble the following:

      .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query-nodejs-output.js
         :language: js
         :linenos:
