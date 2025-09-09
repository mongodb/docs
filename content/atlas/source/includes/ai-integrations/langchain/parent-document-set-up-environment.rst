.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command:

      .. code-block:: python

         pip install --quiet --upgrade langchain langchain-community langchain-core langchain-mongodb langchain-voyageai langchain-openai pymongo pypdf

   .. step:: Define environment variables.

      Run the following code, replacing the placeholders with 
      the following values:
      
      - Your Voyage AI and OpenAI API Key.
      - Your MongoDB cluster's connection string.
      
      .. code-block:: python

         import os
       
         os.environ["VOYAGE_API_KEY"] = "<voyage-api-key>"
         os.environ["OPENAI_API_KEY"] = "<openai-api-key>"
         MONGODB_URI = "<connection-string>"

      .. note:: 

         .. include:: /includes/search-shared/find-connection-string.rst
