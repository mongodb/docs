.. procedure::
   :style: normal

   .. step:: Set up the environment.

      a. Initialize the project and install dependencies.

         Create a new project directory, then install the required dependencies:

         .. code-block:: none

            mkdir mongodb-ai-agent
            cd mongodb-ai-agent
            npm init -y
            npm install --quiet dotenv mongodb voyageai openai langchain @langchain/community @langchain/core mathjs pdf-parse

         .. note::

            Your project will use the following structure:

            .. code-block:: text

               mongodb-ai-agent
               ├── .env
               ├── config.js
               ├── ingest-data.js
               ├── tools.js
               ├── memory.js
               ├── planning.js
               └── index.js

      #. Configure the environment.

         .. include:: /includes/avs/ai-agent/shared/env-config-description.rst

   .. step:: Configure the agent. 
         
      Create a file named ``config.js`` in your project. This file will
      read in your environment variables and connect the application to
      services like the MongoDB database and OpenAI. 

      .. collapsible::
         :heading: config.js
         :sub_heading: Copy and paste the following code into your config.js file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/javascript/config.js
            :language: javascript
            :copyable:

   .. step:: Use MongoDB as a vector database.

      Create a file named ``ingest-data.js`` in your project. This script
      ingests a sample PDF that contains a recent `MongoDB earnings report
      <https://investors.mongodb.com/node/12881/pdf>`__ into a collection
      in MongoDB by using the ``voyage-3-large`` embedding model. This
      code also includes a function to create a vector search index on your
      data if it doesn't already exist.

      To learn more, see :ref:`rag-ingestion`.

      .. collapsible::
         :heading: ingest-data.js
         :sub_heading: Copy and paste the following code into your ingest-data.js file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/javascript/ingest-data.js
            :language: javascript
            :copyable:

   .. step:: Define tools for the agent.

      Create a file named ``tools.js`` in your project. This file defines
      the tools that the agent can use to answer questions. In this
      example, you define the following tools:
      
      - ``vectorSearchTool``: Runs a :ref:`vector search query 
        <return-vector-search-results>` to retrieve relevant 
        documents from your collection.
      - ``calculatorTool``: Uses the ``mathjs`` library for 
        basic math operations.

      .. collapsible::
         :heading: tools.js
         :sub_heading: Copy and paste the following code into your tools.js file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/javascript/tools.js
            :language: javascript
            :copyable: 

   .. step:: Add memory to the agent.

      Create a file named ``memory.js`` in your project. This file defines the
      system that the agent uses to store its interactions. In this example, you
      implement short-term memory by defining the following functions:

      - ``storeChatMessage``: to store information about an interaction in a MongoDB collection.
      - ``retrieveSessionHistory``: to get all interactions for a specific session by using the ``session_id`` field.

      .. collapsible::
         :heading: memory.js
         :sub_heading: Copy and paste the following code into your memory.js file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/javascript/memory.js
            :language: javascript
            :copyable:     

   .. step:: Define the agent's planning.

      Create a file named ``planning.js`` in your project. This file will
      include various prompts and LLM calls to determine the agent's
      execution flow. In this example, you define the following functions:

      - ``openAIChatCompletion``: Helper function to call the OpenAI API
        for generating responses.
      - ``toolSelector``: Determines how the LLM selects the appropriate tool for a task.
      - ``generateAnswer``: Orchestrates the agent's execution flow by
        using tools, calling the LLM, and processing the results.
      - ``getLLMResponse``: Helper function for LLM response generation.

      .. collapsible::
         :heading: planning.js
         :sub_heading: Copy and paste the following code into your planning.js file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/javascript/planning.js
            :language: javascript
            :copyable:

   .. step:: Test the agent.

      Finally, create a file named ``index.js`` in your project. This file
      runs the agent and allows you to interact with it. 

      .. collapsible::
         :heading: index.js
         :sub_heading: Copy and paste the following code into your index.js file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/javascript/index.js
            :language: javascript
            :copyable:    

      Save your project, then run the following command. When you run the agent:

      - If you haven't already, instruct the agent to ingest the sample data.
      - Enter a session ID to start a new session or continue an existing session.
      - Ask questions. The agent generates a response based on your tools, the previous interactions, and the prompts defined in the planning phase.
        
      Refer to the example output for a sample interaction:

      .. io-code-block::

         .. input:: 
            :language: none

            node index.js

         .. output::
            :language: none
            :visible: true

            Ingest sample data? (y/n): y
            Chunked PDF into 100 documents.
            Inserted documents: 100

            Attempting to create/verify Vector Search Index...
            New index named vector_index is building.
            Polling to check if the index is ready. This may take up to a minute.
            vector_index is ready for querying.
            Enter a session ID: 123

            Enter your query (or type 'quit' to exit): What was MongoDB's latest acquisition?
            Tool selected:  vector_search_tool

            Answer:
            MongoDB recently acquired Voyage AI, a pioneer in embedding and reranking models that power next-generation AI applications.

            Enter your query (or type 'quit' to exit): What do they do?
            Tool selected:  vector_search_tool

            Answer: Voyage AI is a company that specializes in
            state-of-the-art embedding and reranking models designed to
            power next-generation AI applications. These technologies help
            organizations build more advanced and trustworthy AI
            capabilities.

            Enter your query (or type 'quit' to exit): What is 123+456?
            Tool selected:  calculator_tool

            Answer:
            579

      .. include:: /includes/avs/ai-agent/shared/verify-embeddings-tip.rst

   .. step:: Continue building.

      .. include:: /includes/avs/ai-agent/shared/continue-building.rst
