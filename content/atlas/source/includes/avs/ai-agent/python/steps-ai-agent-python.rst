.. procedure::
   :style: normal

   .. step:: Set up the environment.

      a. Initialize the project and install dependencies.

         Create a new project directory, then install the required dependencies:

         .. code-block:: none

            mkdir mongodb-ai-agent 
            cd mongodb-ai-agent 
            pip install --quiet --upgrade pymongo voyageai openai langchain langchain-mongodb
            langchain-community python-dotenv

         .. note::

            Your project will use the following structure:

            .. code-block:: text

               mongodb-ai-agent
               ├── .env
               ├── config.py
               ├── ingest_data.py
               ├── tools.py
               ├── memory.py
               ├── planning.py
               ├── main.py

      #. Configure the environment.

         .. include:: /includes/avs/ai-agent/shared/env-config-description.rst

   .. step:: Configure the agent. 
         
      Create a file named ``config.py`` in your project. This file will
      read in your environment variables and connect the application to
      services like the MongoDB database and OpenAI. 

      .. collapsible::
         :heading: config.py
         :sub_heading: Copy and paste the following code into your config.py file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/python/config.py
            :language: python
            :copyable:

   
   .. step:: Use MongoDB as a vector database.

      Create a file named ``ingest_data.py`` in your project. This script
      ingests a sample PDF that contains a recent `MongoDB earnings report
      <https://investors.mongodb.com/node/12881/pdf>`__ into a collection
      in MongoDB by using the ``voyage-3-large`` embedding model. This
      code also includes a function to create a vector search index on your
      data if it doesn't already exist. 

      To learn more, see :ref:`rag-ingestion`.

      .. collapsible::
         :heading: ingest_data.py
         :sub_heading: Copy and paste the following code into your ingest_data.py file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/python/ingest_data.py
            :language: python
            :copyable: 

   .. step:: Define tools for the agent.

      Create a file named ``tools.py`` in your project. This file defines
      the tools that the agent can use to answer questions. In this example, 
      you define the following tools:
      
      - ``vector_search_tool``: Runs a :ref:`vector search query <return-vector-search-results>` to retrieve relevant documents from your collection.
      - ``calculator_tool``: Uses the ``eval()`` function for basic math operations.

      .. collapsible::
         :heading: tools.py
         :sub_heading: Copy and paste the following code into your tools.py file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/python/tools.py
            :language: python
            :copyable: 

   .. step:: Add memory to the agent.

      Create a file named ``memory.py`` in your project. This file defines
      the system that the agent uses to store its interactions. In this
      example, you implement short-term memory by defining the following
      functions:

      - ``store_chat_message``: to store information about an interaction in a MongoDB collection.
      - ``retrieve_session_history``: to get all interactions for a specific session 
        by using the ``session_id`` field.

      .. collapsible::
         :heading: memory.py
         :sub_heading: Copy and paste the following code into your memory.py file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/python/memory.py
            :language: python
            :copyable:  

   .. step:: Define the agent's planning.

      Create a file named ``planning.py`` in your project. This file will
      include various prompts and LLM calls to determine the agent's
      execution flow. In this example, you define the following functions:

      - ``tool_selector``: Determines how the LLM selects the appropriate tool for a task.
      - ``generate_answer``: Orchestrates the agent's execution flow by using tools, 
        calling the LLM, and processing the results.
      - ``get_llm_response``: Helper function for LLM response generation.

      .. collapsible::
         :heading: planning.py
         :sub_heading: Copy and paste the following code into your planning.py file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/python/planning.py
            :language: python
            :copyable:   

   .. step:: Test the agent.

      Finally, create a file named ``main.py`` in your project. This file
      runs the agent and allows you to interact with it. 

      .. collapsible::
         :heading: main.py
         :sub_heading: Copy and paste the following code into your main.py file.
         :expanded: false

         .. literalinclude:: /includes/avs/ai-agent/python/main.py
            :language: python
            :copyable:

      Save your project, then run the following command. When you run the agent:

      - If you haven't already, instruct the agent to ingest the sample data.
      - Enter a session ID to start a new session or continue an existing session.
      - Ask questions. The agent generates a response based on your tools, 
        the previous interactions, and the prompts defined in the planning phase.

      Refer to the example output for a sample interaction:
      
      .. io-code-block::

         .. input:: 
            :language: none

            python main.py

         .. output::
            :language: none
            :visible: true

            Ingest sample data? (y/n): y
            Successfully split PDF into 104 chunks.
            Generating embeddings and ingesting documents...
            Inserted 104 documents into the collection.
            Search index 'vector_index' creation initiated.
            Polling to check if the index is ready. This may take up to a minute.
            vector_index is ready for querying.
            Enter a session ID: 123

            Enter your query (or type 'quit' to exit): What was MongoDB's latest acquisition?
            Tool selected:  vector_search_tool

            Answer:
            MongoDB's latest acquisition was Voyage AI.

            Enter your query (or type 'quit' to exit): What do they do?
            Tool selected:  vector_search_tool

            Answer:
            Voyage AI is a company that specializes in state-of-the-art embedding and reranking models designed to power next-generation AI applications. These technologies help organizations build more advanced and trustworthy AI capabilities.

            Enter your query (or type 'quit' to exit): What is 123+456?
            Tool selected:  calculator_tool

            Answer:
            579

      .. include:: /includes/avs/ai-agent/shared/verify-embeddings-tip.rst

   .. step:: Continue building. 

      .. include:: /includes/avs/ai-agent/shared/continue-building.rst
