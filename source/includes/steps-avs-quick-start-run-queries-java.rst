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
                 <version>5.2.0</version>
              </dependency>

         - If you are using Gradle, add the following dependency to your
           ``build.gradle`` dependencies list:

           .. code-block:: json
              :copyable: true

              dependencies {
                 implementation 'org.mongodb:mongodb-driver-sync:5.2.0'
              }

      #. Add the Java driver JAR files to your ``CLASSPATH``.

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Java Driver documentation
      </java/sync/current/quick-start/#std-label-add-mongodb-dependency>`.

   .. step:: Construct your vector search query.

      .. include:: /includes/fact-avs-quick-start-intro.rst

      a. Create a file named ``BasicQuery.java``.

      #. Copy and paste the following sample query into the 
         ``BasicQuery.java`` file:

         .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query.java
            :language: java
            :linenos:

      .. include:: /includes/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers.rst

   .. step:: Run your query.
    
      Compile and run the ``BasicQuery.java`` file:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            javac BasicQuery.java
            java BasicQuery

         .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-java-output.js 
            :language: js
            :linenos: 
