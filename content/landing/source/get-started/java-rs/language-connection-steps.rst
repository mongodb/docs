.. procedure::

   .. step:: Load sample data

      .. include:: /get-started/includes/load-sample-data.rst

   .. step:: Download and install

      Before you begin this tutorial, ensure that you install
      the following dependencies:

      - `JDK <https://www.oracle.com/java/technologies/javase-downloads.html>`__ 
        version 8 or later 
      - Integrated development environment (IDE), such as `IntelliJ IDEA <https://www.jetbrains.com/idea/download/>`__
        or `Eclipse <https://www.eclipse.org/downloads/packages/>`__

      In your IDE, create a new `Maven <https://maven.apache.org/>`__
      project. Add the Bill of Materials (BOM) for MongoDB JVM
      artifacts and the {+java-rs-driver+} driver to your
      ``pom.xml`` file.
      
      .. code-block:: xml

         <dependencyManagement>
             <dependencies>
                <dependency>
                     <groupId>org.mongodb</groupId>
                     <artifactId>mongodb-driver-bom</artifactId>
                     <version>{+java-rs-driver-version+}</version>
                     <type>pom</type>
                     <scope>import</scope>
                </dependency>
                 <dependency>
                     <groupId>io.projectreactor</groupId>
                     <artifactId>reactor-bom</artifactId>
                     <version>2023.0.7</version>
                     <type>pom</type>
                     <scope>import</scope>
                 </dependency>
             </dependencies>
         </dependencyManagement>

         <dependencies>
             <dependency>
                 <groupId>io.projectreactor</groupId>
                 <artifactId>reactor-core</artifactId>
             </dependency>
             <dependency>
                 <groupId>io.projectreactor</groupId>
                 <artifactId>reactor-test</artifactId>
                 <scope>test</scope>
             </dependency>
            <dependency>
                 <groupId>org.mongodb</groupId>
                 <artifactId>mongodb-driver-reactivestreams</artifactId>
            </dependency>
         </dependencies>

   .. step:: Create your application

      In your project, create a new Java file in the Java package
      named QueryDatabase. Copy and paste the following code into the
      QueryDatabase file: 

      .. literalinclude:: /shared/drivers-get-started/java-rs/get-started-connect.java
         :language: java

   .. step:: Add your connection string

      .. include:: /get-started/includes/connection-string-note.rst

   .. step:: Run your application

      Run your application from your IDE or in your shell. The
      output contains details about the retrieved
      movie document:

      .. include:: /get-started/includes/application-output.rst