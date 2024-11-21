.. procedure::
   :style: normal

   .. step:: Create your Java project and install dependencies.

      a. From your IDE, create a Java project using Maven or Gradle.

      #. Add the following dependencies:

         - If you are using Maven, add the following dependencies to the
           ``dependencies`` array in your project's ``pom.xml`` file:

           .. code-block:: javascript
              :caption: pom.xml

              <dependencies>
                <!-- MongoDB Java Sync Driver v5.2.0 or later -->
                <dependency>
                  <groupId>org.mongodb</groupId>
                  <artifactId>mongodb-driver-sync</artifactId>
                  <version>[5.2.0,)</version>
                </dependency>
                <!-- Java library for working with OpenAI models -->
                <dependency>
                  <groupId>dev.langchain4j</groupId>
                  <artifactId>langchain4j-open-ai</artifactId>
                  <version>0.35.0</version>
                </dependency>
              </dependencies>

         - If you are using Gradle, add the following to the ``dependencies``
           array in your project's ``build.gradle`` file:

           .. code-block:: json
              :caption: build.gradle

              dependencies {
                 // MongoDB Java Sync Driver v5.2.0 or later
                 implementation 'org.mongodb:mongodb-driver-sync:[5.2.0,)'
                 // Java library for working with OpenAI models
                 implementation 'dev.langchain4j:langchain4j-open-ai:0.35.0'
              }

      #. Run your package manager to install the dependencies to your project.

   .. step:: Set your environment variables.

      .. note::

         This example sets the variables for the project in the IDE. Production
         applications might manage environment variables through a deployment
         configuration, CI/CD pipeline, or secrets manager, but you can adapt
         the provided code to fit your use case.

      .. include:: /includes/avs-examples/shared/avs-set-env-java.rst

      .. code-block:: shell
         :caption: Environment variables

         OPEN_AI_API_KEY=<api-key>
         ATLAS_CONNECTION_STRING=<connection-string>

      Replace the ``<api-key>`` placeholder value with your OpenAI API key.

      .. include:: /includes/avs-examples/shared/avs-replace-connection-string.rst

   .. step:: Define a method to generate vector embeddings.

      Create a file named ``EmbeddingProvider.java`` and paste 
      the following code.

      This code defines two methods to generate embeddings for a given input using the
      `text-embedding-3-small
      <https://platform.openai.com/docs/guides/embeddings/#embedding-models>`__
      OpenAI embedding model:

      - **Multiple Inputs**: The ``getEmbeddings`` method accepts an
        array of text inputs (``List<String>``), allowing you to create multiple
        embeddings in a single API call. The method converts the API-provided
        arrays of floats to BSON arrays of doubles for storing in your |service|
        {+cluster+}.

      -  **Single Input**: The ``getEmbedding`` method accepts a
         single ``String``, which represents a query you want to make against
         your vector data. The method converts the API-provided array of floats
         to a BSON array of doubles to use when querying your collection.

      .. literalinclude:: /includes/avs-examples/rag/EmbeddingProviderOpenAI.java
         :language: java
         :caption: EmbeddingProvider.java
