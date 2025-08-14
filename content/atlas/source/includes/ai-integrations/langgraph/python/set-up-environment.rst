.. procedure::
   :style: normal

   .. step:: Initialize the project and install dependencies.

      Create a new project directory, then install the required dependencies:

      .. code-block:: python

            mkdir langgraph-mongodb-ai-agent
            cd langgraph-mongodb-ai-agent
            pip install --quiet --upgrade python-dotenv langgraph langgraph-checkpoint-mongodb langgraph-store-mongodb langchain langchain-mongodb langchain-voyageai langchain-openai pymongo

   .. step:: Set environment variables.
      
      Create a ``.env`` file in your project and specify 
      the following variables. Replace the placeholder values with valid
      API keys and your |service| {+cluster+}'s |srv| :manual:`connection string
      </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.
      
      .. code-block:: python

         VOYAGE_API_KEY = "<voyage-api-key>"
         OPENAI_API_KEY = "<openai-api-key>"
         MONGODB_URI = "<connection-string>"

      .. include:: /includes/fact-connection-string-format-drivers.rst
