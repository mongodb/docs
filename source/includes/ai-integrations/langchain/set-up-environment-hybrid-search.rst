.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command in your notebook:

      .. code-block:: python

         pip install --upgrade --quiet langchain langchain-community langchain-core langchain-mongodb langchain-openai pymongo pypdf

   .. step:: Set environmental variables.

      Run the following code to set the environmental variables for this tutorial.
      Provide your OpenAI API Key and |service| {+cluster+}'s |srv| :manual:`connection string
      </reference/connection-string/#find-your-mongodb-atlas-connection-string>`
      when prompted.
        
      .. code-block:: python

         import getpass, os

         os.environ["OPENAI_API_KEY"] = getpass.getpass("OpenAI API Key:")
         ATLAS_CONNECTION_STRING = getpass.getpass("MongoDB Atlas SRV Connection String:")

      .. note:: 

         .. include:: /includes/fact-connection-string-format-drivers.rst