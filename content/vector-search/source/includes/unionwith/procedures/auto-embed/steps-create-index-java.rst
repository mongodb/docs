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

   .. step:: Run your package manager to install the dependencies to your project.

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Java Driver documentation
      </java/sync/current/quick-start/#std-label-add-mongodb-dependency>`.

   .. step:: Define the indexes.

      a. Create a file named ``CreateIndexes.java``.

      #. Copy and paste the following code into the ``CreateIndexes.java``
         file.

         .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/java/create-index.java
            :language: java
            :copyable: true
            :caption: CreateIndexes.java
            :emphasize-lines: 20
            :linenos:

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-auto-embed.rst

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-vector.rst

   .. step:: Specify the ``<connectionString>``.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Run the file in your IDE, or execute a command from the command line to run the code.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            javac CreateIndexes.java
            java CreateIndexes

         .. output::
            :language: console

            Successfully created vector index named: multiple-auto-embed-search
            Successfully created vector index named: multiple-models-search
            Wait for the indexes to leave the BUILDING status and become queryable.
            Polling to confirm the indexes have left the BUILDING status.
            multiple-auto-embed-search index is ready to query
            multiple-models-search index is ready to query
