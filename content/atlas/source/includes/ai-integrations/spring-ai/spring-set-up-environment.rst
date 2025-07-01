.. procedure::
   :style: normal

   .. step:: Create a Spring Java application.
      
      a. Navigate to the `Spring Initializr <https://start.spring.io/>`__
         and configure your project with the following settings:

         - Project: :guilabel:`Maven`

         - Language: :guilabel:`Java`

         - Spring Boot: You can use the default version that is selected.

         - Project Metadata:

         - Java: :guilabel:`21`

         - You can use default values for all other fields.

      #. On the right side of the Spring Initializr, click :guilabel:`ADD
         DEPENDENCIES`, then search for and add the following dependencies:

         - :guilabel:`MongoDB Atlas Vector Database`
         - :guilabel:`Spring Data MongoDB`

      #. Click :guilabel:`GENERATE` to download a zipped version of
         your Spring project. Unzip the file and open it in your IDE.

   .. step:: Add dependencies.

      a. Spring AI provides Spring Boot auto-configuration for {+avs+}.
         
         Add the following dependencies to the ``dependencies`` array
         in your project's ``pom.xml`` file. These dependencies add
         Spring AI and the auto-configuration library to your
         application:

         .. code-block:: xml
            :caption: pom.xml

            <dependency>
            	<groupId>org.springframework.ai</groupId>
            	<artifactId>spring-ai-openai-spring-boot-starter</artifactId>
            </dependency>
            
            <dependency>
            	<groupId>org.springframework.ai</groupId>
            	<artifactId>spring-ai-spring-boot-autoconfigure</artifactId>
            </dependency>
            
            <dependency>
            	<groupId>org.springframework.boot</groupId>
            	<artifactId>spring-boot-starter-web</artifactId>
            </dependency>

      #. Next, ensure that your ``pom.xml`` file contains a
         ``dependencyManagement`` entry for the Spring AI Bill of
         Materials (BOM).
         
         .. important::
            
            Set the ``spring-ai.version`` constant used for the Spring AI
            BOM to ``1.0.0-SNAPSHOT`` to implement the most recent Spring AI
            features into your application.


         To learn more about the Spring AI BOM, see the `Dependency
         Management <https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management>`__
         section of the Spring AI documentation.

      #. Finally, add the Spring AI Snapshot repository into the
         ``repositories`` entry in the ``pom.xml`` file:

         .. code-block:: xml
            :caption: pom.xml

            <repository>
              <id>spring-snapshots</id>
              <name>Spring Snapshots</name>
              <url>https://repo.spring.io/snapshot</url>
              <releases>
                <enabled>false</enabled>
              </releases>
            </repository>

         To learn more about these repositories, see the `Add Milestone and Snapshot Repositories
         <https://docs.spring.io/spring-ai/reference/getting-started.html#repositories>`__
         section of the Spring AI documentation.

         After you finish editing the ``pom.xml`` file, reload your
         project to make sure your dependencies are installed.

   .. step:: Define application properties.

      Locate the ``src/main/resources/application.properties`` file and
      replace the contents of that file with the
      following properties. Replace the placeholders with your OpenAI
      API key and your Atlas connection string:

      .. code-block:: none
         :emphasize-lines: 2, 5
         :caption: src/main/resources/application.properties

         spring.application.name=springai-mongodb
         spring.ai.openai.api-key=<OpenAI API Key>
         spring.ai.openai.embedding.options.model=text-embedding-ada-002
         
         spring.data.mongodb.uri=<connection string>
         spring.data.mongodb.database=springai_test
         spring.ai.vectorstore.mongodb.indexName=vector_index
         spring.ai.vectorstore.mongodb.collection-name=vector_store

      .. note:: 

         Your connection string should use the following format:

         .. code-block::

            mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net/?<settings>
         
         To learn more about retrieving your connection string, see the
         :ref:`atlas-getting-started` tutorial.
