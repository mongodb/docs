.. procedure::
   :style: normal

   .. step:: Create a new Java application.
      
      a. Open your IDE and create a new Java project and set the
         following configurations:

         - Name: LangChain4jSampleApp

         - Language: :guilabel:`Java`

         - Build system: :guilabel:`Maven`

         - JDK: Any version greater than ``8``

         You might see an option to include sample code. Selecting this
         option might help you test that your environment works and
         locate the application file that you edit in the following steps.

   .. step:: Add dependencies.
      
      .. _langchain4j-add-dependencies-step:

      a. Add the following dependencies to the ``dependencies`` array
         in your project's ``pom.xml`` file. These dependencies add
         LangChain4j, Voyage AI API for LangChain4j, and MongoDB Java
         Sync Driver libraries to your application:

         .. code-block:: xml
            :caption: pom.xml

            <dependency>
                <groupId>dev.langchain4j</groupId>
                <artifactId>langchain4j-mongodb-atlas</artifactId>
                <version>1.0.0-beta1</version>
            </dependency>
            <dependency>
                <groupId>dev.langchain4j</groupId>
                <artifactId>langchain4j-voyage-ai</artifactId>
                <version>1.0.0-beta1</version>
            </dependency>
            <dependency>
                <groupId>org.mongodb</groupId>
                <artifactId>mongodb-driver-sync</artifactId>
                <version>5.4.0</version>
            </dependency>

      #. Next, add a ``dependencyManagement`` entry below your
         dependency list for the LangChain4j Bill of Materials (BOM):

         .. code-block:: xml
            :caption: pom.xml

            <dependencyManagement>
                <dependencies>
                    <dependency>
                        <groupId>dev.langchain4j</groupId>
                        <artifactId>langchain4j-bom</artifactId>
                        <version>1.0.0-beta1</version>
                        <type>pom</type>
                        <scope>import</scope>
                    </dependency>
                </dependencies>
            </dependencyManagement>

         To learn more about the LangChain4j BOM, see the `Get Started
         <https://docs.langchain4j.dev/get-started>`__ page in the
         LangChain4j documentation.

         After you finish editing the ``pom.xml`` file, reload your
         project to make sure your dependencies are installed.

   .. step:: Import classes and methods.

      Locate the main application file ``Main.java`` in your project.
      Replace any existing imports with the following list of imports:

      .. literalinclude:: /includes/ai-integrations/langchain4j/Main.java
         :start-after: start-imports
         :end-before: end-imports
         :language: java
         :copyable:
         :dedent:

      Later in this tutorial, you use these classes and methods to
      create vector embeddings and query data.

   .. step:: Set environment variables.

      Depending on your IDE, there might be multiple ways to set
      environment variables that your application can retrieve. To
      set environment variables in IntelliJ, you must create a run
      configuration for your application. To learn more, see the
      `Operating system <https://www.jetbrains.com/help/idea/run-debug-configuration-java-application.html#operating-system>`__
      section of the Run/debug configuration: Application page in the
      IntelliJ documentation.

      Set the following environment variables:

      - ``MONGODB_URI``: Set to your |service| connection string.
      - ``VOYAGE_AI_KEY``: Set to your Voyage AI API key.

      .. note:: 

         Your connection string should use the following format:

         .. code-block::

            mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net/?<settings>
         
         To learn more about retrieving your connection string, see the
         :ref:`atlas-getting-started` tutorial.

   .. step:: Retrieve environment variables.

      Retrieve your environment variables by adding the following code
      inside the main method in your application's ``Main.java`` file:

      .. literalinclude:: /includes/ai-integrations/langchain4j/Main.java
         :start-after: start-env-vars
         :end-before: end-env-vars
         :language: java
         :copyable:
         :dedent:
