.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command in your notebook:

      .. code-block:: python

         pip install --quiet --upgrade langgraph langgraph-checkpoint-mongodb langchain langchain_mongodb langchain-openai pymongo

   .. step:: Set environmental variables.

      Run the following code to set the environmental variables for this tutorial.
      Provide your OpenAI API Key and |service| {+cluster+}'s |srv| :manual:`connection string
      </reference/connection-string/#find-your-mongodb-atlas-connection-string>`
      when prompted.
      
      .. code-block:: python

         import os

         os.environ["OPENAI_API_KEY"] = "<api-key>"
         MONGODB_URI = "<connection-string>"

      .. note:: 

         .. include:: /includes/fact-connection-string-format-drivers.rst