.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command:

      .. code-block:: python

         pip install --quiet --upgrade langchain langchain-community langchain-core langchain-mongodb langchain-openai pymongo pypdf

   .. step:: Define environmental variables.

      Run the following code, replacing the placeholders with 
      the following values:
      
      - Your OpenAI API Key.
      - Your |service| {+cluster+}'s |srv| :manual:`connection string
        </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

      .. code-block:: python

         import os
       
         os.environ["OPENAI_API_KEY"] = "<api-key>"
         ATLAS_CONNECTION_STRING = "<connection-string>"

      .. note:: 

         .. include:: /includes/fact-connection-string-format-drivers.rst