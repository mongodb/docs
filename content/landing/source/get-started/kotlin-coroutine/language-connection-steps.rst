.. procedure::

   .. step:: Load sample data

      .. include:: /get-started/includes/load-sample-data.rst

   .. step:: Download and install

      Before you begin this tutorial, ensure that you install the
      following dependencies: 

      - `Kotlin <https://kotlinlang.org/docs/jvm-get-started.html>`__
        installed and running on JDK 1.8 or later 
      - Integrated development environment (IDE), such as `IntelliJ
        IDEA <https://www.jetbrains.com/idea/download/>`__ or `Eclipse
        <https://www.eclipse.org/downloads/packages/>`__ 

      Create a new Maven project in your IDE. Add the Bill of
      Materials (BOM) for MongoDB JVM artifacts and the
      {+kotlin-coroutine-driver+} dependency to your ``pom.xml`` file.
      This code also adds a serialization package to enable the driver
      to convert between Kotlin objects and BSON.

      .. code-block:: xml

         <dependencyManagement>
             <dependencies>
                 <dependency>
                     <groupId>org.mongodb</groupId>
                     <artifactId>mongodb-driver-bom</artifactId>
                     <version>{+kotlin-version+}</version>
                     <type>pom</type>
                     <scope>import</scope>
                 </dependency>
             </dependencies>
         </dependencyManagement>

         <dependencies>
             <dependency>
                 <groupId>org.mongodb</groupId>
                 <artifactId>mongodb-kotlin-coroutine-driver</artifactId>
             </dependency>
             <dependency>
                 <groupId>org.mongodb</groupId>
                 <artifactId>bson-kotlinx</artifactId>
             </dependency>
         </dependencies>

      After you configure your dependencies, ensure that they are
      available to your project by running the dependency manager and
      refreshing the project in your IDE.

   .. step:: Create your application

      Create a file called ``GetStarted.kt`` in your
      project. Copy and paste the following code into the file. This
      code connects to your cluster and queries your 
      sample data. 

      .. literalinclude:: /shared/drivers-get-started/kotlin-coroutine/get-started-connect.kt
         :language: kotlin

   .. step:: Add your connection string

      .. include:: /get-started/includes/connection-string-note.rst

   .. step:: Run your application

      Run your application from your IDE or in your shell. The output
      contains details about the retrieved movie document.

      .. include:: /get-started/includes/application-output.rst