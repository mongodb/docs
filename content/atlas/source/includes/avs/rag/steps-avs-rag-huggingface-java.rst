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
                     <!-- MongoDB Java Sync Driver v5.2.0 or later -->
                     <dependency>
                           <groupId>org.mongodb</groupId>
                           <artifactId>mongodb-driver-sync</artifactId>
                           <version>[5.2.0,)</version>
                     </dependency>
                     <!-- Java library for Hugging Face models -->
                     <dependency>
                           <groupId>dev.langchain4j</groupId>
                           <artifactId>langchain4j-hugging-face</artifactId>
                     </dependency>
                     <!-- Java library for URL Document Loader -->
                     <dependency>
                           <groupId>dev.langchain4j</groupId>
                           <artifactId>langchain4j</artifactId>
                     </dependency>
                     <!-- Java library for ApachePDFBox Document Parser -->
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
                              <version>0.36.2</version>
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
                     implementation platform('dev.langchain4j:langchain4j-bom:0.36.2')

                     // MongoDB Java Sync Driver v5.2.0 or later
                     implementation 'org.mongodb:mongodb-driver-sync:5.2.0'

                     // Java library for Hugging Face models
                     implementation 'dev.langchain4j:langchain4j-hugging-face'

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

            HUGGING_FACE_ACCESS_TOKEN=<access-token>
            ATLAS_CONNECTION_STRING=<connection-string>

      Update the placeholders with the following values:

      - Replace the ``<access-token>`` placeholder value with your Hugging Face access token.
      - .. include:: /includes/avs/shared/avs-replace-connection-string.rst

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

      .. literalinclude:: /includes/avs/rag/PDFProcessor.java
         :language: java
         :caption: PDFProcessor.java

   .. step:: Define a method to generate vector embeddings.

      Create a file named ``EmbeddingProvider.java`` and paste
      the following code.

      This code defines two methods to generate embeddings for a given input using the
      `mxbai-embed-large-v1
      <https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1>`__
      open-source embedding model:

      - **Multiple Inputs**: The ``getEmbeddings`` method accepts an
        array of text segment inputs (``List<TextSegment>``), allowing you to create multiple
        embeddings in a single API call. The method converts the API-provided
        arrays of floats to BSON arrays of doubles for storing in your |service|
        {+cluster+}.

      -  **Single Input**: The ``getEmbedding`` method accepts a
         single ``String``, which represents a query you want to make against
         your vector data. The method converts the API-provided array of floats
         to a BSON array of doubles to use when querying your collection.

      .. literalinclude:: /includes/avs/rag/EmbeddingProvider.java
         :language: java
         :caption: EmbeddingProvider.java

   .. step:: Define a method to ingest data into |service|.

      Create a file named ``DataIngest.java`` and paste the following
      code.
      
      This code uses the `LangChain4j <https://docs.langchain4j.dev/intro/>`__
      library and the MongoDB :driver:`Java Sync Driver </java/sync/>` to
      :ref:`ingest <rag-ingestion>` sample data into |service| that |llm|\s
      don't have access to.

      Specifically, this code does the following:

      i. Connects to your |service| {+cluster+}.
      #. Loads and parses the `MongoDB earnings report
         <https://investors.mongodb.com/node/12236/pdf>`__ PDF file from the URL
         using the ``parsePDFDocument`` method that you previously defined.
      #. Splits the data into chunks using the ``splitDocument`` method that you
         previously defined.
      #. Creates vector embeddings from the chunked data using
         the ``GetEmbeddings`` method that you previously defined.
      #. Stores the embeddings alongside the chunked data in the
         ``rag_db.test`` collection in your |service| {+cluster+}.

         .. literalinclude:: /includes/avs/rag/DataIngest.java
            :language: java
            :caption: DataIngest.java

   .. step:: Generate the embeddings.

      .. include:: /includes/avs/facts/note-hugging-face-503.rst

      Save and run the ``DataIngest.java`` file. The output resembles:

      .. literalinclude:: /includes/avs/rag/ingest-data-output-java.sh
         :language: shell
   
   .. step:: Use {+avs+} to retrieve documents.

      In this section, you set up {+avs+} to :ref:`retrieve <rag-retrieval>` 
      documents from your vector database.
      
      a. Create a file named ``VectorIndex.java`` and paste the following
         code.

         This code creates an {+avs+} index on your collection using the
         following index definition:

         - Index the ``embedding`` field in a :ref:`vector
           <avs-types-vector-search>` index type for the ``rag_db.test``
           collection. This field contains the embedding created using the
           embedding model.
         - Enforce ``1024`` vector dimensions and measure similarity between
           vectors using ``cosine``.

         .. literalinclude:: /includes/avs/rag/VectorIndex.java
            :language: java
            :caption: VectorIndex.java

      #. Create the {+avs+} index.

         Save and run the file. The output resembles:

         .. literalinclude:: /includes/avs/tutorial/output-vector-index-creation.sh
            :language: shell

   .. step:: Create the code to generate responses with the |llm|.

      In this section, you :ref:`generate <rag-ingestion>`
      responses by prompting an |llm| to use the retrieved documents 
      as context.

      Create a new file called ``LLMPrompt.java``, and paste the following code into it.

      This code does the following:
      
      i. Queries the ``rag_db.test`` collection for any matching
         documents using a ``retrieveDocuments`` method.

         This method uses the ``getEmbedding`` method that you created earlier
         to generate an embedding from the search query, then runs the query to
         return semantically-similar documents.

         To learn more, refer to :ref:`return-vector-search-results`.

      #. Accesses the `Mistral 7B Instruct
         <https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3>`__ model
         from Hugging Face's model hub, and creates a templated prompt using a
         ``createPrompt`` method.

         The method instructs the |llm| to include the user's question
         and retrieved documents in the defined prompt.

      #. Prompts the |llm| about MongoDB's latest AI announcements, then returns
         a generated response.
      
         .. literalinclude:: /includes/avs/rag/LLMPrompt.java
            :language: java
            :caption: LLMPrompt.java

   .. step:: Generate responses with the |llm|.
      
      Save and run the file. The output resembles the following, but note that
      the generated response might vary.

      .. literalinclude:: /includes/avs/rag/generate-responses-output-java.sh
         :language: console
