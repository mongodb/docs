.. procedure::
   :style: normal

   .. step:: Create your Java project and install dependencies.

      a. From your IDE, create a Java project using Maven or Gradle.

      #. Add the following dependencies, depending on your package manager:

         .. tabs::

            .. tab:: Maven
               :tabid: maven

               If you are using Maven, add the following dependencies to the
               ``dependencies`` array and Bill of Materials (BOM) to the
               ``dependencyManagement`` array in your project's ``pom.xml`` file:

               .. code-block:: xml
                  :caption: pom.xml

                  <dependencies>
                      <!-- MongoDB Java Sync Driver -->
                      <dependency>
                          <groupId>org.mongodb</groupId>
                          <artifactId>mongodb-driver-sync</artifactId>
                          <version>5.2.0</version>
                      </dependency>
                      <!-- Core LangChain4j library (provides Document interface, etc.) -->
                      <dependency>
                          <groupId>dev.langchain4j</groupId>
                          <artifactId>langchain4j</artifactId>
                      </dependency>
                      <!-- Voyage AI integration -->
                      <dependency>
                          <groupId>dev.langchain4j</groupId>
                          <artifactId>langchain4j-voyage-ai</artifactId>
                      </dependency>
                      <!-- Open AI integration -->
                      <dependency>
                          <groupId>dev.langchain4j</groupId>
                          <artifactId>langchain4j-open-ai</artifactId>
                      </dependency>                 
                      <!-- Apache PDFBox Document Parser -->
                      <dependency>
                          <groupId>dev.langchain4j</groupId>
                          <artifactId>langchain4j-document-parser-apache-pdfbox</artifactId>
                      </dependency>
                  </dependencies>
                  <dependencyManagement>
                     <dependencies>
                           <!-- Bill of Materials (BOM) to manage Java library versions -->
                           <dependency>
                              <groupId>dev.langchain4j</groupId>
                              <artifactId>langchain4j-bom</artifactId>
                              <version>1.1.0</version>
                              <type>pom</type>
                              <scope>import</scope>
                           </dependency>
                     </dependencies>
                  </dependencyManagement>

            .. tab:: Gradle
               :tabid: gradle

               If you are using Gradle, add the following Bill of Materials (BOM)
               and dependencies to the ``dependencies`` array in in your project's
               ``build.gradle`` file:

               .. code-block:: json
                  :caption: build.gradle

                  dependencies {
                     // Bill of Materials (BOM) to manage Java library versions
                     implementation platform('dev.langchain4j:langchain4j-bom:1.1.0')

                     // MongoDB Java Sync Driver v5.2.0 or later
                     implementation 'org.mongodb:mongodb-driver-sync:5.2.0'

                     // Java library for Voyage AI models
                     implementation 'dev.langchain4j:langchain4j-voyage-ai'

                     // Java library for Open AI models
                     implementation 'dev.langchain4j:langchain4j-open-ai'

                     // Java library for URL Document Loader
                     implementation 'dev.langchain4j:langchain4j'

                     // Java library for Apache PDFBox Document Parser
                     implementation 'dev.langchain4j:langchain4j-document-parser-apache-pdfbox'
                  }

      #. Run your package manager to install the dependencies to your project.

   .. step:: Set your environment variables.

      .. note::

         This example sets the variables for the project in the IDE. Production
         applications might manage environment variables through a deployment
         configuration, CI/CD pipeline, or secrets manager, but you can adapt
         the provided code to fit your use case.

      .. include:: /includes/avs/shared/avs-set-env-java.rst

      .. code-block:: shell
         :caption: Environment variables

            VOYAGE_AI_KEY=<voyage-api-key>
            OPENAI_API_KEY=<openai-api-key>
            MONGODB_URI=<connection-string>

      Update the placeholders with the following values:

      - Replace the ``<voyage-api-key>`` placeholder value with your Voyage AI API key.
      - Replace the ``<openai-api-key>`` placeholder value with your OpenAI API key.
      - .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Define methods to parse and split the data.

      Create a file named ``PDFProcessor.java`` and paste the following code.

      This code defines the following methods:

      - The ``parsePDFDocument`` method uses the `Apache PDFBox
        <https://pdfbox.apache.org/>`__ library and
        `LangChain4j URL Document Loader
        <https://docs.langchain4j.dev/integrations/document-loaders/url>`__ to
        load and parse a PDF file at a given URL. The method returns the parsed
        PDF as a langchain4j Document.
      - The ``splitDocument`` method splits a given langchain4j Document into
        chunks according to the specified *chunk size* (number of characters)
        and *chunk overlap* (number of overlapping characters between
        consecutive chunks). The method returns a list of text segments.

      .. literalinclude:: /includes/avs/rag/ingest/PDFProcessor.java
         :language: java
         :caption: PDFProcessor.java

   .. step:: Define a method to generate vector embeddings.

      Create a file named ``EmbeddingProvider.java`` and paste
      the following code.

      This code defines two methods to generate embeddings for a given input using the
      :ref:`voyage-3-large <voyage-models>`
      embedding model from |voyage|:

      - **Multiple Inputs**: The ``getEmbeddings()`` method accepts an
        array of text inputs (``List<String>``), allowing you to create multiple
        embeddings in a single API call. The method converts the API-provided
        arrays of floats to BSON arrays of doubles for storing in MongoDB.

      -  **Single Input**: The ``getEmbedding()`` method accepts a
         single ``String``, which represents a query you want to make against
         your vector data. The method converts the API-provided array of floats
         to a BSON array of doubles to use when querying your collection.

      .. literalinclude:: /includes/avs/create-embeddings/manual/EmbeddingProviderVoyageRag.java
         :language: java
         :caption: EmbeddingProvider.java

   .. step:: Ingest data into your MongoDB deployment.

      In this section, you :ref:`ingest <rag-ingestion>` sample 
      data into MongoDB that LLMs don't have access to.

      Create a file named ``IngestData.java`` and paste the following code.

      This code does the following:

      - Loads a PDF that contains a `MongoDB earnings report
        <https://investors.mongodb.com/node/12236/pdf>`__.
      - Splits the data into chunks.
      - Creates vector embeddings from the chunked data by using 
        the ``getEmbeddings()`` method that you defined.
      - Stores these embeddings alongside the chunked data in the
        ``rag_db.test`` collection.

      .. literalinclude:: /includes/avs/rag/ingest/DataIngest.java
         :language: java
         :caption: IngestData.java

      Then, run the code. If you're using |service|, you can verify your vector embeddings
      by navigating to the ``rag_db.test`` namespace
      :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`.
   
   .. step:: Use {+avs+} to retrieve documents.

      In this section, you set up {+avs+} to :ref:`retrieve <rag-retrieval>` 
      documents from your vector database. Complete the following steps:
      
      a. Create a {+avs+} index on your vector embeddings.
      
         Create a new file named ``CreateVectorSearchIndex.java`` and paste the
         following code. This code connects to your MongoDB deployment and
         creates an index of the :ref:`vectorSearch <avs-types-vector-search>`
         type on the ``rag_db.test`` collection.

         .. literalinclude:: /includes/avs/rag/index/VectorIndex.java
            :language: java
            :caption: CreateVectorSearchIndex.java

         Then, run the code.

      #. Define a method to retrieve relevant data.

         Create a new file called ``RetrieveDocuments.java``.
         
         In this step, you create a retrieval method called
         ``getQueryResults()`` that runs a query to retrieve relevant documents.
         It uses the ``getEmbedding()`` method to create an embedding from the
         search query. Then, it runs the query to return semantically-similar
         documents. 

         To learn more, refer to :ref:`return-vector-search-results`.

         Paste this code into your file:

         .. note:: The retrieval functionality is integrated into the LLMPrompt.java file.

         Then, run the code. Your results might vary.

   .. step:: Generate responses with the LLM.

      In this section, you :ref:`generate <rag-ingestion>` 
      responses by prompting an LLM to use the retrieved documents 
      as context.
      
      Create a new file called ``GenerateResponses.java``, and paste the following
      code into it. This example uses the 
      method you just defined to retrieve matching documents from the 
      database, and additionally:

      - Instructs the LLM to include the user's question and retrieved
        documents in the prompt.
      - Prompts the LLM about MongoDB's latest AI announcements.

      .. literalinclude:: /includes/avs/rag/generate/LLMPrompt.java
         :language: java
         :caption: GenerateResponses.java

      Then, run the code. The generated response might vary.

