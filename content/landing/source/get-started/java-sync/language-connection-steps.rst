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
      artifacts and the {+java-driver+} to your ``pom.xml`` file.
      
      .. code-block:: xml

         <dependencyManagement>
             <dependencies>
                 <dependency>
                     <groupId>org.mongodb</groupId>
                     <artifactId>mongodb-driver-bom</artifactId>
                     <version>5.5.1</version>
                     <type>pom</type>
                     <scope>import</scope>
                 </dependency>
                 <dependency>
                     <groupId>org.mongodb</groupId>
                     <artifactId>mongodb-driver-sync</artifactId>
                 </dependency>
             </dependencies>
         </dependencyManagement>

   .. step:: Create your application

      In your project directory, create a new Java class file called
      ``Quickstart.java``. Copy and paste the following code into
      that file. This code connects to your cluster and queries your
      sample data.
      
      .. literalinclude:: /shared/drivers-get-started/java-sync/get-started-connect.java
         :language: java
         :start-after: // begin QuickStart
         :end-before: // end QuickStart
         :dedent:

   .. step:: Add your connection string

      .. include:: /get-started/includes/connection-string-note.rst

   .. step:: Run your application

      Run your application from your IDE or in your shell. The
      output contains details about the retrieved
      movie document:

      .. include:: /get-started/includes/application-output.rst