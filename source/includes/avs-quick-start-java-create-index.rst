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

#. Create a file named ``VectorIndex.java``. Copy and paste the following
   code into the file.

   .. literalinclude:: /includes/avs-examples/index-management/create-index/basic-example.java
      :language: java
      :copyable: true
      :caption: VectorIndex.java
      :emphasize-lines: 20
      :linenos:

   .. include:: /includes/avs-quick-start-basic-index-description.rst

   This code also includes a polling mechanism to check if the index is ready to use.

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Run the file in your IDE, or execute a command from the command line to
   run the code.

   .. io-code-block::
      :copyable: true 

      .. input:: 
         :language: shell 

         javac VectorIndex.java
         java VectorIndex

      .. output:: /includes/avs-examples/index-management/create-index/create-index-output.sh
         :language: console
