.. procedure::
   :style: normal

   .. step:: Add the Java driver version 5.2 or higher as a dependency in your project.
      
      Select one of the following tabs, depending on your package manager:

      .. tabs::

         .. tab:: Maven
            :tabid: maven

            If you are using Maven, add the following dependencies to the
            ``dependencies`` array in your project's ``pom.xml`` file:

            .. code-block:: xml
               :caption: pom.xml

               <dependencies>
                  <!-- MongoDB Java Sync Driver v5.2.0 or later -->
                  dependency>
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

   .. step:: Run your package manager to install the dependencies to your project.

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Java Driver documentation
      </java/sync/current/quick-start/#std-label-add-mongodb-dependency>`.

   .. step:: Define your index in a new file.

      This example uses a file named ``VectorIndex.java`` with the following
      index definition:

      .. literalinclude:: /includes/search-in-community/basic-example.java
         :language: java
         :copyable: true
         :caption: VectorIndex.java
         :emphasize-lines: 20
         :linenos:

      .. include:: /includes/search-in-community/vs-quick-start-basic-index-description.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst
      
   .. step:: Run the vector index file. 
   
      Run the file in your IDE, or execute a command from the command line to
      run the code.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            javac VectorIndex.java
            java VectorIndex

         .. output:: /includes/search-in-community/create-index-output.sh
            :language: console

   .. step:: Define your query in a new file.
      
      This example uses a file named ``BasicQuery.java`` with the the following
      sample query:

      .. literalinclude:: /includes/search-in-community/basic-query.java
         :language: java
         :emphasize-lines: 24
         :linenos:

      .. include:: /includes/search-in-community/fact-vs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.
    
      The following code block compiles and runs the ``BasicQuery.java`` file:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            javac BasicQuery.java
            java BasicQuery

         .. output:: /includes/search-in-community/basic-query-java-output.js
            :language: js
            :linenos: 