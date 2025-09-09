.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command in your notebook:

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain-hybrid-search.ipynb

      .. code-block:: python

         pip install --quiet --upgrade langchain langchain-community langchain-core langchain-mongodb langchain-voyageai langchain-openai pymongo pypdf

   .. step:: Set environment variables.

      Run the following code to set the environment variables for this tutorial.
      Provide your API keys and MongoDB cluster's connection string.
      
      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain-hybrid-search.ipynb

      .. code-block:: python

         import os
         
         os.environ["VOYAGE_API_KEY"] = "<voyage-api-key>"
         os.environ["OPENAI_API_KEY"] = "<openai-api-key>"
         MONGODB_URI = "<connection-string>"

      .. note:: 

         .. include:: /includes/search-shared/find-connection-string.rst
