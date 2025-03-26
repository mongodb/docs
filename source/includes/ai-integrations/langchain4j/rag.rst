.. procedure::
   :style: normal

   .. step:: Set up your project for |rag|.

      a. Add the following dependencies to the ``dependencies`` array
         in your project's ``pom.xml`` file, but do not remove any of
         the :ref:`dependencies you already added
         <langchain4j-add-dependencies-step>`. These dependencies add
         the LangChain4j AI services and OpenAI API for LangChain4j
         libraries to your application:

         .. code-block:: xml
            :caption: pom.xml

            <dependency>
                <groupId>dev.langchain4j</groupId>
                <artifactId>langchain4j-open-ai</artifactId>
                <version>1.0.0-beta1</version>
            </dependency>
            <dependency>
                <groupId>dev.langchain4j</groupId>
                <artifactId>langchain4j</artifactId>
                <version>1.0.0-beta1</version>
            </dependency>

         After you finish editing the ``pom.xml`` file, reload your
         project to make sure your dependencies are installed.

      b. Add the following imports to your imports list in your
         ``Main.java`` file:

         .. literalinclude:: /includes/ai-integrations/langchain4j/Main.java
            :start-after: start-rag-imports
            :end-before: end-rag-imports
            :language: java
            :copyable:
            :dedent:

      c. Set the ``OPENAI_KEY`` environment variable to your **OpenAI
         API key**. You use this key to create a chat model that
         generates a response to your query.

   .. step:: Load the sample data.

      In this step, you ingest data from an external source into
      |service|. Download the :github:`rainforest-docs.json
      <mongodb/docs-code-examples/blob/main/sample-data/atlas/ai-integrations/rainforest-docs.json>`
      sample data file from the ``docs-code-examples`` GitHub
      repository. The documents in this file contain information about
      plants, animals, and weather in the rainforest.

      Upload this file to the ``resources`` directory in your project,
      which is at the same level as the ``java`` directory that contains
      your application files.

      You must process the data into a usable format that you can create
      embeddings from and persist to |service|. This code defines the
      ``loadJsonDocuments()`` method that performs the following actions:

      - Retrieves the sample data from your ``resources`` directory by
        using the ``ClassLoader`` class

      - Parses the JSON documents to a ``List`` of MongoDB ``Document``
        instances by using the ``ObjectMapper`` class

      Add the following code to your ``Main.java`` file **outside** of
      your main method:

      .. literalinclude:: /includes/ai-integrations/langchain4j/Main.java
         :start-after: start-load-method
         :end-before: end-load-method
         :language: java
         :copyable:
         :dedent:

      Then, add the following code in the main method body to call the
      ``loadJsonDocuments()`` method and load your documents:

      .. literalinclude:: /includes/ai-integrations/langchain4j/Main.java
         :start-after: start-read-json
         :end-before: end-read-json
         :language: java
         :copyable:
         :dedent:

   .. step:: Store vector embeddings in |service|.
      
      In this step, you create vector embeddings from your sample
      documents and persist them to |service|.

      This code converts the content of the ``text`` fields in the
      sample documents to embeddings and persists the data to |service|.
      The code includes a delay to accommodate the time needed for the
      vector conversion.
      
      Add the following code into your ``Main.java`` file:

      .. literalinclude:: /includes/ai-integrations/langchain4j/Main.java
         :start-after: start-persist-rag
         :end-before: end-persist-rag
         :language: java
         :copyable:
         :dedent:

   .. step:: Instantiate the chat model and specify the content retriever.

      In this step, you instantiate a chat model from OpenAI so you can
      answer questions based on your data. You also specify a content
      retriever that surfaces relevant documents to inform the response
      crafted by the chat model.

      This code performs the following actions:

      - Instantiates the chat model by using your OpenAI API key
      
      - Creates the content retriever with the following specifications:
        
        - Retrieves at most ``3`` relevant documents
        
        - Retrieves documents that have a relevance score of at least
          ``0.75``

      Add the following code to your ``Main.java`` file in the main
      method body:

      .. literalinclude:: /includes/ai-integrations/langchain4j/Main.java
         :start-after: start-create-chat-retriever
         :end-before: end-create-chat-retriever
         :language: java
         :copyable:
         :dedent:

      .. tip:: Metadata Filtering
         
         You can implement metadata filtering in your ``ContentRetriever``
         by using the ``filter()`` builder method and passing an instance of
         a ``Filter``. See the :ref:`metadata filtering example <langchain4j-metadata-filtering>`
         in the preceding step to learn how to construct a ``Filter``.

   .. step:: Create the chat assistant.
      
      Create a simple ``Assistant`` interface that implements the AI
      Services API in your application. Create an interface file called
      ``Assistant.java`` at the same level as your ``Main.java`` file.

      Define the ``Assistant`` interface:

      .. literalinclude:: /includes/ai-integrations/langchain4j/Assistant.java
         :language: java
         :copyable:
         :dedent:

      In your ``Main.java`` file, instantiate the ``Assistant``:

      .. literalinclude:: /includes/ai-integrations/langchain4j/Main.java
         :start-after: start-assistant
         :end-before: end-assistant
         :language: java
         :copyable:
         :dedent:

   .. step:: Perform queries on your data.

      Finally, perform a query on your sample data. Add the following
      code to your ``Main.java`` file to run a query and
      print the output:

      .. io-code-block::
         :copyable:
      
         .. input:: /includes/ai-integrations/langchain4j/Main.java
            :language: java
            :start-after: start-rag-query
            :end-before: end-rag-query
            :dedent:
      
         .. output::
            :visible: false
      
            Response:
            In the rainforest, there are numerous species of insects
            such as beetles, butterflies, moths, wasps, bees, flies, and
            ants. Of the many insects that live in the rainforest, ants
            are particularly important as they play a crucial role in
            nutrient recycling and aeration of the soil. Moreover, many
            of these insects are involved in the processes of
            pollination and decomposition. The adaptations these insects
            have developed enable their survival in the rainforest's
            specific conditions, characterized by heavy rainfall.
