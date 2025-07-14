.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command in your notebook:

      .. code-block:: python

         pip install --quiet --upgrade langgraph langgraph-checkpoint-mongodb langchain langchain-mongodb langchain-voyageai langchain-openai pymongo

   .. step:: Set environment variables.

      Run the following code to set the environment variables for this tutorial.
      Provide your API keys and |service| {+cluster+}'s |srv| :manual:`connection string
      </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.
      
      
      .. code-block:: python

         import os
         
         os.environ["VOYAGE_API_KEY"] = "<voyage-api-key>"
         os.environ["OPENAI_API_KEY"] = "<openai-api-key>"
         MONGODB_URI = "<connection-string>"

      .. note:: 

         .. include:: /includes/fact-connection-string-format-drivers.rst