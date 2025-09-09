.. procedure::
   :style: normal

   .. step:: Initialize the project and install dependencies.

      Create a new project directory, then install the required dependencies:

      .. code-block:: python

            mkdir langgraph-mongodb-ai-agent
            cd langgraph-mongodb-ai-agent
            pip install --quiet --upgrade python-dotenv langgraph langgraph-checkpoint-mongodb langgraph-store-mongodb langchain langchain-mongodb langchain-voyageai langchain-openai pymongo

 
      .. note::

         Your project will use the following structure:

         .. code-block:: text

            langgraph-mongodb-ai-agent
            ├── .env
            ├── config.py
            ├── search-tools.py
            ├── memory-tools.py
            ├── agent.py
            ├── main.py

   .. step:: Set environment variables.
      
      Create a ``.env`` file in your project and specify 
      the following variables. Replace the placeholder values with valid
      API keys and your MongoDB cluster's connection string.     
       
      .. code-block:: python

         VOYAGE_API_KEY = "<voyage-api-key>"
         OPENAI_API_KEY = "<openai-api-key>"
         MONGODB_URI = "<connection-string>"

      .. note::
         
         .. include:: /includes/search-shared/find-connection-string.rst
